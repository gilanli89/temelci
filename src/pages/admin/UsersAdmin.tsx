import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAdminAuth } from '@/lib/adminAuth';

export default function UsersAdmin() {
  const [rows, setRows] = useState<any[]>([]);
  const { user: me } = useAdminAuth();

  async function load() {
    const [profiles, roles] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('user_roles').select('*'),
    ]);
    const byUser: Record<string, string[]> = {};
    (roles.data || []).forEach((r: any) => {
      byUser[r.user_id] = byUser[r.user_id] || [];
      byUser[r.user_id].push(r.role);
    });
    setRows((profiles.data || []).map((p: any) => ({ ...p, roles: byUser[p.id] || [] })));
  }
  useEffect(() => { load(); }, []);

  async function setRole(userId: string, role: 'admin' | 'doctor') {
    await supabase.from('user_roles').delete().eq('user_id', userId);
    const { error } = await supabase.from('user_roles').insert({ user_id: userId, role });
    if (error) toast.error(error.message); else { toast.success('Role updated'); load(); }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Users & Roles</h1>
      <p className="text-sm text-muted-foreground mb-4">
        New accounts can register from the login page. Assign roles here. Admins have full CMS access, doctors can only review X-ray requests.
      </p>
      <Card className="divide-y">
        {rows.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No users yet.</div>}
        {rows.map(r => (
          <div key={r.id} className="p-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="font-semibold">{r.full_name || r.email || '—'}</div>
              <div className="text-xs text-muted-foreground">{r.email} · joined {new Date(r.created_at).toLocaleDateString()}</div>
              <div className="flex gap-1 mt-1">
                {r.roles.map((rl: string) => <span key={rl} className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">{rl}</span>)}
                {r.roles.length === 0 && <span className="text-[10px] text-muted-foreground">No role</span>}
              </div>
            </div>
            {r.id !== me?.id && (
              <Select value={r.roles[0] || ''} onValueChange={v => setRole(r.id, v as any)}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Assign…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            )}
            {r.id === me?.id && <span className="text-xs text-muted-foreground italic">(you)</span>}
          </div>
        ))}
      </Card>
    </div>
  );
}
