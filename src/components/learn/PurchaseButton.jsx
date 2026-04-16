import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../lib/supabase';

function PurchaseButton({ workflow, onPurchaseStart }) {
  const { isLoggedIn, signIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const priceFormatted = workflow.price_cents
    ? `$${(workflow.price_cents / 100).toFixed(2)}`
    : 'Free';

  async function handleBuy() {
    if (!isLoggedIn) {
      signIn();
      return;
    }

    setLoading(true);
    setError(null);
    onPurchaseStart?.();

    try {
      const session = await supabase?.auth.getSession();
      const token = session?.data?.session?.access_token;
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workflowSlug: workflow.slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="ovl-purchase">
      <button
        className="ovl-purchase-btn"
        onClick={handleBuy}
        disabled={loading}
      >
        {loading ? (
          <span className="ovl-purchase-loading">Processing...</span>
        ) : (
          <>
            <span className="ovl-purchase-label">
              {isLoggedIn ? 'Buy This Workflow' : 'Sign In to Purchase'}
            </span>
            <span className="ovl-purchase-price">{priceFormatted}</span>
          </>
        )}
      </button>
      {error && <p className="ovl-purchase-error">{error}</p>}
    </div>
  );
}

export default PurchaseButton;
