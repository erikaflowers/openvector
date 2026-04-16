import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useUser } from './UserContext';
import { supabase } from '../lib/supabase';

const WorkflowContext = createContext(null);

export function WorkflowProvider({ children }) {
  const { user, isLoggedIn } = useUser();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch purchases when user logs in
  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setPurchases([]);
      return;
    }

    async function fetchPurchases() {
      setLoading(true);
      try {
        const session = await supabase?.auth.getSession();
        const token = session?.data?.session?.access_token;
        if (!token) return;

        const res = await fetch('/.netlify/functions/workflow-purchases', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setPurchases(data.purchases || []);
        }
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, [isLoggedIn, user?.id]);

  const hasPurchased = useCallback((workflowId) => {
    return purchases.some(
      (p) => p.workflowId === workflowId && p.status === 'completed'
    );
  }, [purchases]);

  const hasPurchasedBySlug = useCallback((workflowSlug) => {
    return purchases.some(
      (p) => p.workflowSlug === workflowSlug && p.status === 'completed'
    );
  }, [purchases]);

  const refreshPurchases = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const session = await supabase?.auth.getSession();
      const token = session?.data?.session?.access_token;
      if (!token) return;

      const res = await fetch('/.netlify/functions/workflow-purchases', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPurchases(data.purchases || []);
      }
    } catch (err) {
      console.error('Failed to refresh purchases:', err);
    }
  }, [isLoggedIn]);

  return (
    <WorkflowContext.Provider value={{
      purchases,
      hasPurchased,
      hasPurchasedBySlug,
      refreshPurchases,
      loading,
    }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflows() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error('useWorkflows must be used within WorkflowProvider');
  return ctx;
}
