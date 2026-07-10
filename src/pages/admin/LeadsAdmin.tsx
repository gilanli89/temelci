import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MessageCircle, Trash2 } from 'lucide-react';

const STATUSES = ['new', 'contacted', 'won', 'lost'];
const COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  won: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-gray-100 text-gray-700',
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) toast.error(error.message); else load();
  }
  async function updateNotes(id: string, notes: string) {
    await supabase.from('leads').update({ notes }).eq('id', id);
  }
  async function del(id: string) {
    if (!confirm('Delete?')) return;
    await supabase.from('leads').delete().eq('id', id);
    load();
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Leads ({leads.length})</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({leads.length})</SelectItem>
            {STATUSES.map(s => <SelectItem key={s} value={s}>{s} ({leads.filter(l => l.status === s).length})</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Card className="divide-y">
        {filtered.length === 0 && <div className="p-10 text-center text-muted-foreground">No leads yet.</div>}
        {filtered.map(l => (
          <div key={l.id} className="p-4">
            <div className="flex items-start gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{l.name || 'Anonymous'}</strong>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${COLORS[l.status] || COLORS.new}`}>{l.status}</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-secondary">{l.source}</span>
                  {l.lang && <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-secondary">{l.lang}</span>}
                </div>
                <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-1">
                  {l.email && <a href={`mailto:${l.email}`} className="hover:text-primary inline-flex items-center gap-1"><Mail className="w-3 h-3" />{l.email}</a>}
                  {l.phone && <a href={`tel:${l.phone}`} className="hover:text-primary inline-flex items-center gap-1"><Phone className="w-3 h-3" />{l.phone}</a>}
                  {l.phone && <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" className="hover:text-primary inline-flex items-center gap-1"><MessageCircle className="w-3 h-3" />WhatsApp</a>}
                  <span>{new Date(l.created_at).toLocaleString()}</span>
                </div>
                {l.message && <p className="mt-2 text-sm bg-secondary/40 p-2 rounded">{l.message}</p>}
                {expanded === l.id && (
                  <Textarea className="mt-2" rows={2} placeholder="Internal notes…"
                    defaultValue={l.notes || ''} onBlur={e => updateNotes(l.id, e.target.value)} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Select value={l.status} onValueChange={v => updateStatus(l.id, v)}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === l.id ? null : l.id)}>Notes</Button>
                <Button size="icon" variant="ghost" onClick={() => del(l.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
