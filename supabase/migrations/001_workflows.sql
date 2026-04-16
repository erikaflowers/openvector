-- ============================================================
-- Migration: Paid Workflows
-- Run this in the Supabase SQL Editor
--
-- Structure: cleanup → tables → functions → policies → triggers → indexes
-- Safe to re-run after partial failures.
-- ============================================================


-- ============================================================
-- PHASE 0: CLEANUP (drop anything from failed prior runs)
-- Only touches objects on tables that exist.
-- ============================================================

do $$
begin
  -- profiles policies & triggers
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    drop policy if exists "profiles_select_own" on public.profiles;
    drop policy if exists "profiles_update_own" on public.profiles;
    drop trigger if exists profiles_protect_admin on public.profiles;
    drop trigger if exists profiles_updated_at on public.profiles;
  end if;

  -- workflows policies & triggers
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'workflows') then
    drop policy if exists "workflows_select_published" on public.workflows;
    drop policy if exists "workflows_insert_admin" on public.workflows;
    drop policy if exists "workflows_update_admin" on public.workflows;
    drop policy if exists "workflows_delete_admin" on public.workflows;
    drop trigger if exists workflows_updated_at on public.workflows;
  end if;

  -- workflow_pages policies & triggers
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'workflow_pages') then
    drop policy if exists "workflow_pages_select" on public.workflow_pages;
    drop policy if exists "workflow_pages_insert_admin" on public.workflow_pages;
    drop policy if exists "workflow_pages_update_admin" on public.workflow_pages;
    drop policy if exists "workflow_pages_delete_admin" on public.workflow_pages;
    drop trigger if exists workflow_pages_updated_at on public.workflow_pages;
  end if;

  -- purchases policies
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'purchases') then
    drop policy if exists "purchases_select_own" on public.purchases;
  end if;

  -- workflow_progress policies
  if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'workflow_progress') then
    drop policy if exists "workflow_progress_select_own" on public.workflow_progress;
    drop policy if exists "workflow_progress_insert_own" on public.workflow_progress;
    drop policy if exists "workflow_progress_delete_own" on public.workflow_progress;
  end if;

  -- auth trigger
  drop trigger if exists on_auth_user_created on auth.users;
end $$;

-- Functions
drop function if exists public.protect_admin_flag();
drop function if exists public.handle_new_user();
drop function if exists public.is_admin();
drop function if exists public.update_updated_at();


-- ============================================================
-- PHASE 1: TABLES (all tables first, no policies)
-- ============================================================

-- 1a. profiles — may already exist in the shared ZV database
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  stripe_customer_id text unique,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Patch existing profiles table with columns it may be missing
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists is_admin boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- Add unique constraint on stripe_customer_id if missing
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_stripe_customer_id_key'
  ) then
    begin
      alter table public.profiles add constraint profiles_stripe_customer_id_key unique (stripe_customer_id);
    exception when others then null;
    end;
  end if;
end $$;

alter table public.profiles enable row level security;

-- 1b. workflows
create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  cover_image_url text,
  price_cents integer not null,
  stripe_price_id text unique,
  stripe_product_id text unique,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workflows enable row level security;

-- 1c. purchases (before workflow_pages — pages policy references purchases)
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workflow_id uuid not null references public.workflows(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'refunded')),
  amount_cents integer not null,
  purchased_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, workflow_id)
);

alter table public.purchases enable row level security;

-- 1d. workflow_pages
create table if not exists public.workflow_pages (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  slug text not null,
  title text not null,
  page_number integer not null,
  content_md text not null default '',
  video_id text,
  video_duration integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workflow_id, slug),
  unique (workflow_id, page_number)
);

alter table public.workflow_pages enable row level security;

-- 1e. workflow_progress
create table if not exists public.workflow_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  page_id uuid not null references public.workflow_pages(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, page_id)
);

alter table public.workflow_progress enable row level security;


-- ============================================================
-- PHASE 2: FUNCTIONS (all tables exist, safe to reference them)
-- ============================================================

-- is_admin() helper — used by most RLS policies
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- Prevent regular users from self-promoting to admin
-- Allows changes from postgres (SQL Editor) and service_role (Netlify Functions)
create or replace function public.protect_admin_flag()
returns trigger
language plpgsql
as $$
begin
  -- Allow postgres (SQL Editor) and service_role to change is_admin
  if session_user = 'postgres' or current_setting('role', true) != 'authenticated' then
    return new;
  end if;
  -- Regular authenticated users cannot change their own admin flag
  if new.is_admin != old.is_admin then
    new.is_admin := old.is_admin;
  end if;
  return new;
end;
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Auto-update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- PHASE 3: RLS POLICIES (all tables + functions exist)
-- ============================================================

-- profiles
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- workflows
create policy "workflows_select_published" on public.workflows
  for select using (status = 'published' or public.is_admin());

create policy "workflows_insert_admin" on public.workflows
  for insert with check (public.is_admin());

create policy "workflows_update_admin" on public.workflows
  for update using (public.is_admin());

create policy "workflows_delete_admin" on public.workflows
  for delete using (public.is_admin());

-- purchases
create policy "purchases_select_own" on public.purchases
  for select using (auth.uid() = user_id or public.is_admin());
-- No insert/update policies — writes go through service role (webhook)

-- workflow_pages (purchases table exists now, safe to reference)
create policy "workflow_pages_select" on public.workflow_pages
  for select using (
    public.is_admin()
    or (
      exists (
        select 1 from public.workflows w
        where w.id = workflow_id and w.status = 'published'
      )
      and (
        page_number = 1
        or exists (
          select 1 from public.purchases p
          where p.user_id = auth.uid()
            and p.workflow_id = workflow_pages.workflow_id
            and p.status = 'completed'
        )
      )
    )
  );

create policy "workflow_pages_insert_admin" on public.workflow_pages
  for insert with check (public.is_admin());

create policy "workflow_pages_update_admin" on public.workflow_pages
  for update using (public.is_admin());

create policy "workflow_pages_delete_admin" on public.workflow_pages
  for delete using (public.is_admin());

-- workflow_progress
create policy "workflow_progress_select_own" on public.workflow_progress
  for select using (auth.uid() = user_id);

create policy "workflow_progress_insert_own" on public.workflow_progress
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.purchases p
      where p.user_id = auth.uid()
        and p.workflow_id = workflow_progress.workflow_id
        and p.status = 'completed'
    )
  );

create policy "workflow_progress_delete_own" on public.workflow_progress
  for delete using (auth.uid() = user_id);


-- ============================================================
-- PHASE 4: TRIGGERS
-- ============================================================

create trigger profiles_protect_admin before update on public.profiles
  for each row execute function public.protect_admin_flag();

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger workflows_updated_at before update on public.workflows
  for each row execute function public.update_updated_at();

create trigger workflow_pages_updated_at before update on public.workflow_pages
  for each row execute function public.update_updated_at();


-- ============================================================
-- PHASE 5: INDEXES
-- ============================================================

create index if not exists idx_workflow_pages_workflow_id on public.workflow_pages(workflow_id);
create index if not exists idx_workflow_pages_ordering on public.workflow_pages(workflow_id, page_number);
create index if not exists idx_purchases_user_id on public.purchases(user_id);
create index if not exists idx_purchases_workflow_id on public.purchases(workflow_id);
create index if not exists idx_purchases_status on public.purchases(user_id, status);
create index if not exists idx_workflow_progress_user on public.workflow_progress(user_id, workflow_id);
