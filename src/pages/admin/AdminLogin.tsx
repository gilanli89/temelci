import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/lib/adminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const nav = useNavigate();
  const { session, role } = useAdminAuth();

  useEffect(() => {
    if (session && role) nav('/admin', { replace: true });
  }, [session, role, nav]);

  useEffect(() => {
    if (params.get('denied')) toast.error('Access denied — your account has no admin role.');
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` }
        });
        if (error) throw error;
        toast.success('Account created — you can sign in now.');
        setMode('signin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Auth failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-secondary/30 grid place-items-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center"><Lock className="w-5 h-5" /></div>
          <div>
            <h1 className="font-display text-xl font-bold">Temelci CMS</h1>
            <p className="text-xs text-muted-foreground">Admin panel access</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? '…' : (mode === 'signin' ? 'Sign in' : 'Create account')}
          </Button>
          <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center">
            {mode === 'signin' ? 'First time? Create the first admin account' : 'Have an account? Sign in'}
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground mt-6 text-center">
          The first registered account automatically becomes admin. Additional accounts are doctors by default.
        </p>
      </Card>
    </div>
  );
}
