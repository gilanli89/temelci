import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scan, ArrowRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_review: 'bg-amber-100 text-amber-700',
  quoted: 'bg-purple-100 text-purple-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-gray-100 text-gray-700',
};

export default function XrayList() {
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  async function load() {
    const { data } = await supabase.from('xray_requests').select('*').order('created_at', { ascending: false });
    setRows(data || []);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete request?')) return;
    await supabase.from('xray_requests').delete().eq('id', id);
    load();
  }

  const filtered = filter === 'all' ? rows : rows.filter(r => r.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">X-Ray Quote Requests ({rows.length})</h1>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {Object.keys(COLORS).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button asChild variant="outline"><a href="/xray-quote" target="_blank">Open patient form ↗</a></Button>
        </div>
      </div>
      <Card className="divide-y">
        {filtered.length === 0 && (
          <div className="p-10 text-center">
            <Scan className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No requests yet.</p>
            <p className="text-xs text-muted-foreground mt-2">Share <code>/xray-quote</code> with patients to receive uploads.</p>
          </div>
        )}
        {filtered.map(r => (
          <div key={r.id} className="p-4 flex items-center gap-4 flex-wrap">
            {r.xray_image_url && <img src={r.xray_image_url} alt="" className="w-20 h-20 object-cover rounded bg-secondary" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <strong>{r.patient_name}</strong>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${COLORS[r.status] || COLORS.new}`}>{r.status.replace('_',' ')}</span>
                {r.price_total && <span className="text-sm font-bold text-primary">{r.currency} {r.price_total}</span>}
              </div>
              <div className="text-xs text-muted-foreground">
                {r.phone} · {r.email || '—'} · {new Date(r.created_at).toLocaleString()}
              </div>
              {r.message && <p className="text-sm mt-1 line-clamp-2 text-foreground/80">{r.message}</p>}
            </div>
            <Button asChild size="sm"><Link to={`/admin/xrays/${r.id}`}>Review <ArrowRight className="w-3 h-3 ml-1" /></Link></Button>
            <Button size="icon" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
