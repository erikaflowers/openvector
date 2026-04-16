import Stripe from 'stripe';
import { verifyAdmin, supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req) => {
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    await verifyAdmin(req);
  } catch {
    return errorResponse('Admin access required', 403);
  }

  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case 'listWorkflows':
        return await listWorkflows();

      case 'getWorkflow':
        return await getWorkflow(body.slug);

      case 'createWorkflow':
        return await createWorkflow(body);

      case 'updateWorkflow':
        return await updateWorkflow(body);

      case 'deleteWorkflow':
        return await deleteWorkflow(body.workflowId);

      case 'createPage':
        return await createPage(body);

      case 'updatePage':
        return await updatePage(body);

      case 'deletePage':
        return await deletePage(body.pageId);

      case 'reorderPages':
        return await reorderPages(body);

      default:
        return errorResponse(`Unknown action: ${action}`);
    }
  } catch (err) {
    console.error('Admin workflow error:', err);
    return errorResponse('Something went wrong', 500);
  }
};

// --- Workflow CRUD ---

async function listWorkflows() {
  const { data, error } = await supabaseAdmin
    .from('workflows')
    .select('*, workflow_pages(count)')
    .order('sort_order', { ascending: true });

  if (error) return errorResponse(error.message, 500);
  return jsonResponse({ workflows: data });
}

async function getWorkflow(slug) {
  if (!slug) return errorResponse('slug is required');

  const { data: workflow, error } = await supabaseAdmin
    .from('workflows')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !workflow) return errorResponse('Workflow not found', 404);

  const { data: pages } = await supabaseAdmin
    .from('workflow_pages')
    .select('*')
    .eq('workflow_id', workflow.id)
    .order('page_number', { ascending: true });

  return jsonResponse({ workflow, pages: pages || [] });
}

async function createWorkflow({ title, slug, subtitle, description, priceCents, coverImageUrl }) {
  if (!title || !slug || !priceCents) {
    return errorResponse('title, slug, and priceCents are required');
  }

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return errorResponse('slug must be lowercase alphanumeric with hyphens only');
  }

  // Create Stripe Product + Price
  let stripeProductId = null;
  let stripePriceId = null;

  if (process.env.STRIPE_SECRET_KEY) {
    const product = await stripe.products.create({
      name: title,
      description: subtitle || description || undefined,
      metadata: { source: 'openvector', slug },
    });
    stripeProductId = product.id;

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: priceCents,
      currency: 'usd',
    });
    stripePriceId = price.id;
  }

  const { data, error } = await supabaseAdmin
    .from('workflows')
    .insert({
      title,
      slug,
      subtitle: subtitle || null,
      description: description || null,
      cover_image_url: coverImageUrl || null,
      price_cents: priceCents,
      stripe_product_id: stripeProductId,
      stripe_price_id: stripePriceId,
      status: 'draft',
    })
    .select()
    .single();

  if (error) {
    // If DB insert fails but Stripe product was created, try to archive it
    if (stripeProductId) {
      try { await stripe.products.update(stripeProductId, { active: false }); } catch {}
    }
    return errorResponse(error.message, 500);
  }

  return jsonResponse({ workflow: data }, 201);
}

async function updateWorkflow({ workflowId, title, subtitle, description, priceCents, coverImageUrl, status, sortOrder }) {
  if (!workflowId) return errorResponse('workflowId is required');

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (subtitle !== undefined) updates.subtitle = subtitle;
  if (description !== undefined) updates.description = description;
  if (coverImageUrl !== undefined) updates.cover_image_url = coverImageUrl;
  if (status !== undefined) updates.status = status;
  if (sortOrder !== undefined) updates.sort_order = sortOrder;

  // If price changed, create a new Stripe Price (prices are immutable in Stripe)
  if (priceCents !== undefined) {
    updates.price_cents = priceCents;

    const { data: workflow } = await supabaseAdmin
      .from('workflows')
      .select('stripe_product_id')
      .eq('id', workflowId)
      .single();

    if (workflow?.stripe_product_id && process.env.STRIPE_SECRET_KEY) {
      const newPrice = await stripe.prices.create({
        product: workflow.stripe_product_id,
        unit_amount: priceCents,
        currency: 'usd',
      });
      updates.stripe_price_id = newPrice.id;
    }
  }

  if (Object.keys(updates).length === 0) {
    return errorResponse('No fields to update');
  }

  const { data, error } = await supabaseAdmin
    .from('workflows')
    .update(updates)
    .eq('id', workflowId)
    .select()
    .single();

  if (error) return errorResponse(error.message, 500);
  return jsonResponse({ workflow: data });
}

async function deleteWorkflow(workflowId) {
  if (!workflowId) return errorResponse('workflowId is required');

  // Check for existing purchases before deleting
  const { data: purchases } = await supabaseAdmin
    .from('purchases')
    .select('id')
    .eq('workflow_id', workflowId)
    .eq('status', 'completed')
    .limit(1);

  if (purchases?.length > 0) {
    return errorResponse(
      'Cannot delete a workflow with active purchases. Archive it instead.',
      409
    );
  }

  const { error } = await supabaseAdmin
    .from('workflows')
    .delete()
    .eq('id', workflowId);

  if (error) return errorResponse(error.message, 500);
  return jsonResponse({ deleted: true });
}

// --- Page CRUD ---

async function createPage({ workflowId, title, slug, contentMd, videoId, videoDuration }) {
  if (!workflowId || !title || !slug) {
    return errorResponse('workflowId, title, and slug are required');
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return errorResponse('slug must be lowercase alphanumeric with hyphens only');
  }

  // Get the next page number
  const { data: lastPage } = await supabaseAdmin
    .from('workflow_pages')
    .select('page_number')
    .eq('workflow_id', workflowId)
    .order('page_number', { ascending: false })
    .limit(1)
    .single();

  const nextPageNumber = (lastPage?.page_number || 0) + 1;

  const { data, error } = await supabaseAdmin
    .from('workflow_pages')
    .insert({
      workflow_id: workflowId,
      title,
      slug,
      page_number: nextPageNumber,
      content_md: contentMd || '',
      video_id: videoId || null,
      video_duration: videoDuration || null,
    })
    .select()
    .single();

  if (error) return errorResponse(error.message, 500);
  return jsonResponse({ page: data }, 201);
}

async function updatePage({ pageId, title, slug, contentMd, videoId, videoDuration }) {
  if (!pageId) return errorResponse('pageId is required');

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (slug !== undefined) updates.slug = slug;
  if (contentMd !== undefined) updates.content_md = contentMd;
  if (videoId !== undefined) updates.video_id = videoId;
  if (videoDuration !== undefined) updates.video_duration = videoDuration;

  if (Object.keys(updates).length === 0) {
    return errorResponse('No fields to update');
  }

  const { data, error } = await supabaseAdmin
    .from('workflow_pages')
    .update(updates)
    .eq('id', pageId)
    .select()
    .single();

  if (error) return errorResponse(error.message, 500);
  return jsonResponse({ page: data });
}

async function deletePage(pageId) {
  if (!pageId) return errorResponse('pageId is required');

  // Get the page info before deleting (for renumbering)
  const { data: page } = await supabaseAdmin
    .from('workflow_pages')
    .select('workflow_id, page_number')
    .eq('id', pageId)
    .single();

  if (!page) return errorResponse('Page not found', 404);

  const { error } = await supabaseAdmin
    .from('workflow_pages')
    .delete()
    .eq('id', pageId);

  if (error) return errorResponse(error.message, 500);

  // Renumber remaining pages to close the gap
  const { data: remaining } = await supabaseAdmin
    .from('workflow_pages')
    .select('id, page_number')
    .eq('workflow_id', page.workflow_id)
    .order('page_number', { ascending: true });

  if (remaining) {
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].page_number !== i + 1) {
        await supabaseAdmin
          .from('workflow_pages')
          .update({ page_number: i + 1 })
          .eq('id', remaining[i].id);
      }
    }
  }

  return jsonResponse({ deleted: true });
}

async function reorderPages({ workflowId, pageIds }) {
  if (!workflowId || !pageIds?.length) {
    return errorResponse('workflowId and pageIds array are required');
  }

  // Update each page's page_number based on its position in the array
  for (let i = 0; i < pageIds.length; i++) {
    const { error } = await supabaseAdmin
      .from('workflow_pages')
      .update({ page_number: i + 1 })
      .eq('id', pageIds[i])
      .eq('workflow_id', workflowId);

    if (error) return errorResponse(error.message, 500);
  }

  return jsonResponse({ reordered: true });
}
