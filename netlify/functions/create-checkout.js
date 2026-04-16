import Stripe from 'stripe';
import { verifyUser, supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const SITE_URL = process.env.URL || 'https://open.zerovector.design';

export default async (req) => {
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  let user;
  try {
    user = await verifyUser(req);
  } catch {
    return errorResponse('Authentication required', 401);
  }

  try {
    const { workflowSlug } = await req.json();
    if (!workflowSlug) {
      return errorResponse('workflowSlug is required');
    }

    // Look up the workflow
    const { data: workflow, error: wfError } = await supabaseAdmin
      .from('workflows')
      .select('id, slug, title, description, price_cents, stripe_price_id, status')
      .eq('slug', workflowSlug)
      .eq('status', 'published')
      .single();

    if (wfError || !workflow) {
      return errorResponse('Workflow not found', 404);
    }

    if (!workflow.stripe_price_id) {
      return errorResponse('Workflow is not available for purchase', 400);
    }

    // Check if user already purchased this workflow
    const { data: existing } = await supabaseAdmin
      .from('purchases')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('workflow_id', workflow.id)
      .single();

    if (existing?.status === 'completed') {
      return errorResponse('You have already purchased this workflow', 409);
    }

    // Find or create Stripe customer
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    let stripeCustomerId = profile?.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      stripeCustomerId = customer.id;

      // Store the Stripe customer ID in profiles
      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', user.id);
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: stripeCustomerId,
      line_items: [{ price: workflow.stripe_price_id, quantity: 1 }],
      success_url: `${SITE_URL}/learn/workflows/${workflow.slug}?purchase=success`,
      cancel_url: `${SITE_URL}/learn/workflows/${workflow.slug}`,
      metadata: {
        user_id: user.id,
        workflow_id: workflow.id,
        workflow_slug: workflow.slug,
      },
      client_reference_id: user.id,
    });

    // Upsert a pending purchase record
    // (upsert in case there's a previous pending/refunded record for this user+workflow)
    if (existing) {
      await supabaseAdmin
        .from('purchases')
        .update({
          stripe_checkout_session_id: session.id,
          status: 'pending',
          amount_cents: workflow.price_cents,
        })
        .eq('id', existing.id);
    } else {
      await supabaseAdmin
        .from('purchases')
        .insert({
          user_id: user.id,
          workflow_id: workflow.id,
          stripe_checkout_session_id: session.id,
          status: 'pending',
          amount_cents: workflow.price_cents,
        });
    }

    return jsonResponse({ checkoutUrl: session.url });
  } catch (err) {
    console.error('Create checkout error:', err);
    return errorResponse('Something went wrong', 500);
  }
};
