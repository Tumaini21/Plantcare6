import { useEffect } from 'react';
import { useAuth } from './store';
import { supabase } from '../supabase/client';

export function useAuthStateChange() {
  const setAuth = useAuth((state) => state.setAuth);
  const clearAuth = useAuth((state) => state.clearAuth);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth(session.user, session.access_token);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setAuth(session.user, session.access_token);
      } else if (event === 'SIGNED_OUT') {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth, clearAuth]);
}