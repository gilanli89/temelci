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
import { useSEO } from '@/hooks/useSEO';

export default function AdminLogin() {
  useSEO({
    title: 'Temelci CMS sign in',
    description: 'Private content management access.',
    canonical: 'https://temelcidentist.com/admin/login',
    robots: 'noindex,nofollow,noarchive',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const [mode, setMode] = useState<'sign-in' | 'forgot' | 'reset'>(
    params.get('mode') === 'reset' ? 'reset' : 'sign-in',
  );
  const nav = useNavigate();
  const { session, role } = useAdminAuth();

  useEffect(() => {
    if (session && role && mode !== 'reset') nav('/admin', { replace: true });
  }, [session, role, mode, nav]);

  useEffect(() => {
    if (params.get('denied')) toast.error('Access denied — your account has no admin role.');
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Auth failed');
    } finally { setLoading(false); }
  }

  async function sendReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/admin/login?mode=reset`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      toast.success('Check your email for a secure password reset link.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not send reset email');
    } finally { setLoading(false); }
  }

  async function setNewPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!session) {
      toast.error('Open the secure link from your invitation or reset email first.');
      return;
    }
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success('Password saved.');
      nav('/admin', { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update password');
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
        {mode === 'sign-in' && <form onSubmit={submit} className="space-y-4">
          <div><Label>Email</Label><Input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div><Label>Password</Label><Input type="password" required minLength={10} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? '…' : 'Sign in'}</Button>
          <Button type="button" variant="link" className="w-full" onClick={() => setMode('forgot')}>Forgot password?</Button>
        </form>}

        {mode === 'forgot' && <form onSubmit={sendReset} className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter your invited admin email. We will send a secure reset link.</p>
          <div><Label>Email</Label><Input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? '…' : 'Send reset link'}</Button>
          <Button type="button" variant="link" className="w-full" onClick={() => setMode('sign-in')}>Back to sign in</Button>
        </form>}

        {mode === 'reset' && <form onSubmit={setNewPassword} className="space-y-4">
          <p className="text-sm text-muted-foreground">Choose a strong password for your CMS account.</p>
          <div><Label>New password</Label><Input type="password" required minLength={10} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
          <div><Label>Confirm password</Label><Input type="password" required minLength={10} autoComplete="new-password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} /></div>
          <Button type="submit" disabled={loading || !session} className="w-full">{loading ? '…' : 'Save password'}</Button>
          {!session && <p className="text-xs text-muted-foreground text-center">Open this page from your invitation or reset email.</p>}
        </form>}
        <p className="text-[11px] text-muted-foreground mt-6 text-center">
          Access is invitation-only. Ask the clinic owner to add your account.
        </p>
      </Card>
    </div>
  );
}
