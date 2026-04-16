import Stripe from 'stripe';
import { supabaseAdmin, jsonResponse, errorResponse } from './lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export default async (req) => {
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  if (!WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return errorResponse('Webhook not configured', 500);
  }

  // Verify Stripe signature using the raw body
  let event;
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return errorResponse('Invalid signature', 400);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        const workflowId = session.metadata?.workflow_id;

        if (!userId || !workflowId) {
          console.error('Missing metadata in checkout session:', session.id);
          break;
        }

        // Update purchase to completed
        const { error } = await supabaseAdmin
          .from('purchases')
          .update({
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent,
            purchased_at: new Date().toISOString(),
          })
          .eq('stripe_checkout_session_id', session.id);

        if (error) {
          console.error('Failed to update purchase:', error);
          // If the update failed because the row doesn't exist (race condition),
          // insert it directly
          await supabaseAdmin
            .from('purchases')
            .upsert({
              user_id: userId,
              workflow_id: workflowId,
              stripe_checkout_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent,
              status: 'completed',
              amount_cents: session.amount_total,
              purchased_at: new Date().toISOString(),
            }, { onConflict: 'user_id,workflow_id' });
        }

        console.log(`Purchase completed: user=${userId} workflow=${workflowId}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;

        if (!paymentIntentId) {
          console.error('No payment_intent on refunded charge:', charge.id);
          break;
        }

        const { error } = await supabaseAdmin
          .from('purchases')
          .update({ status: 'refunded' })
          .eq('stripe_payment_intent_id', paymentIntentId);

        if (error) {
          console.error('Failed to update refund:', error);
        }

        console.log(`Purchase refunded: payment_intent=${paymentIntentId}`);
        break;
      }

      default:
        // Unhandled event type — acknowledge receipt
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 to acknowledge receipt
    return jsonResponse({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    // Still return 200 — Stripe retries on non-2xx, and we don't want
    // retries for application-level errors we've already logged
    return jsonResponse({ received: true });
  }
};
