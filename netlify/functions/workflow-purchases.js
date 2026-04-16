import { verifyUser, supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

export default async (req) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  let user;
  try {
    user = await verifyUser(req);
  } catch {
    return errorResponse('Authentication required', 401);
  }

  try {
    const { data: purchases, error } = await supabaseAdmin
      .from('purchases')
      .select(`
        id,
        workflow_id,
        status,
        amount_cents,
        purchased_at,
        workflows ( slug, title )
      `)
      .eq('user_id', user.id)
      .in('status', ['completed', 'pending']);

    if (error) {
      console.error('Failed to fetch purchases:', error);
      return errorResponse('Failed to fetch purchases', 500);
    }

    const formatted = (purchases || []).map((p) => ({
      purchaseId: p.id,
      workflowId: p.workflow_id,
      workflowSlug: p.workflows?.slug,
      workflowTitle: p.workflows?.title,
      status: p.status,
      amountCents: p.amount_cents,
      purchasedAt: p.purchased_at,
    }));

    return jsonResponse({ purchases: formatted });
  } catch (err) {
    console.error('Workflow purchases error:', err);
    return errorResponse('Something went wrong', 500);
  }
};
