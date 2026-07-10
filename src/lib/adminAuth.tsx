import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type Role = 'admin' | 'doctor' | null;

interface Ctx {
  session: Session | null;
  user: User | null;
  role: Role;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<Ctx>({ session: null, user: null, role: null, loading: true, signOut: async () => {} });

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(() => fetchRole(s.user.id), 0);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) fetchRole(data.session.user.id);
      else setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function fetchRole(uid: string) {
    const { data } = await supabase.from('user_roles').select('role').eq('user_id', uid);
    if (data?.some(r => r.role === 'admin')) setRole('admin');
    else if (data?.some(r => r.role === 'doctor')) setRole('doctor');
    else setRole(null);
    setLoading(false);
  }

  return (
    <AuthCtx.Provider value={{
      session,
      user: session?.user ?? null,
      role,
      loading,
      signOut: async () => { await supabase.auth.signOut(); },
    }}>{children}</AuthCtx.Provider>
  );
}

export const useAdminAuth = () => useContext(AuthCtx);

export function RequireAdmin({ children, allow = ['admin'] }: { children: ReactNode; allow?: ('admin' | 'doctor')[] }) {
  const { session, role, loading } = useAdminAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  if (!session) return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  if (!role || !allow.includes(role)) return <Navigate to="/admin/login?denied=1" replace />;
  return <>{children}</>;
}
