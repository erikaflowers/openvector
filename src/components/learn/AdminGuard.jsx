import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../lib/supabase';

function AdminGuard({ children }) {
  const { user, isLoggedIn, loading: authLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn || !user?.id || !supabase) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }

    async function checkAdmin() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(data?.is_admin || false);
      } catch {
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    }

    checkAdmin();
  }, [isLoggedIn, user?.id, authLoading]);

  if (authLoading || checking) {
    return (
      <div className="ovl-admin-guard">
        <p className="ovl-admin-guard-text">Checking access...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="ovl-admin-guard">
        <h2>Sign In Required</h2>
        <p className="ovl-admin-guard-text">You must be signed in to access this page.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="ovl-admin-guard">
        <h2>Access Denied</h2>
        <p className="ovl-admin-guard-text">This page is restricted to administrators.</p>
      </div>
    );
  }

  return children;
}

export default AdminGuard;
