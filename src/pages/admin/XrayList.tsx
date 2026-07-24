import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/lib/adminAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scan, ArrowRight, Archive, Users, UserCheck, Clock3, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { DEMO_XRAY_CASES, isDirectXrayUrl, isVirtualDemoXray } from '@/lib/xrayDemoCases';

type XrayStatus = 'new' | 'in_review' | 'ready' | 'sent' | 'accepted' | 'rejected' | 'archived';

interface XrayRow {
  id: string;
  patient_name: string;
  email: string | null;
  phone: string;
  preferred_visit_date: string | null;
  message: string | null;
  xray_image_url: string;
  status: XrayStatus;
  price_total: number | null;
  currency: string | null;
  doctor_id: string | null;
  delivery_status: string | null;
  created_at: string;
  updated_at: string;
  is_demo?: boolean;
  preview_url?: string;
}

const STATUS: Record<XrayStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  in_review: { label: 'In review', className: 'bg-amber-100 text-amber-700' },
  ready: { label: 'Ready to send', className: 'bg-purple-100 text-purple-700' },
  sent: { label: 'Sent', className: 'bg-cyan-100 text-cyan-700' },
  accepted: { label: 'Accepted', className: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Declined', className: 'bg-slate-100 text-slate-700' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-600' },
};

export default function XrayList() {
  const { user, role } = useAdminAuth();
  const [rows, setRows] = useState<XrayRow[]>([]);
  const [statusFilter, setStatusFilter] = useState('active');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [usingPreviewCases, setUsingPreviewCases] = useState(false);
  const canDelete = role === 'admin' || role === 'super_admin';

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('xray_requests').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    const databaseRows = (data || []) as XrayRow[];
    const loaded = databaseRows.length ? databaseRows : DEMO_XRAY_CASES as XrayRow[];
    setUsingPreviewCases(databaseRows.length === 0);
    const paths = [...new Set(loaded.map(row => row.xray_image_url).filter(path => path && !isDirectXrayUrl(path)))];
    const signedEntries = await Promise.all(paths.map(async path => {
      const { data: signed } = await supabase.storage.from('xrays').createSignedUrl(path, 900);
      return [path, signed?.signedUrl] as const;
    }));
    const signedByPath = new Map(signedEntries);
    setRows(loaded.map(row => ({
      ...row,
      preview_url: isDirectXrayUrl(row.xray_image_url) ? row.xray_image_url : signedByPath.get(row.xray_image_url),
    })));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function archiveCase(id: string) {
    if (!canDelete || !confirm('Archive this X-ray case? It will leave the active clinical pool but remain in the audit record.')) return;
    const { error } = await supabase.rpc('archive_xray_request', { _request_id: id });
    if (error) toast.error(error.message);
    else { toast.success('Case archived'); load(); }
  }

  const counts = useMemo(() => ({
    pool: rows.filter(row => !row.doctor_id && row.status !== 'archived').length,
    mine: rows.filter(row => row.doctor_id === user?.id && row.status !== 'archived').length,
    ready: rows.filter(row => row.status === 'ready').length,
    sent: rows.filter(row => ['sent', 'accepted', 'rejected'].includes(row.status)).length,
  }), [rows, user?.id]);

  const filtered = rows.filter(row => {
    const statusMatches = statusFilter === 'all'
      || (statusFilter === 'active' && !['archived', 'accepted', 'rejected'].includes(row.status))
      || row.status === statusFilter;
    const ownerMatches = ownerFilter === 'all'
      || (ownerFilter === 'pool' && !row.doctor_id)
      || (ownerFilter === 'mine' && row.doctor_id === user?.id);
    return statusMatches && ownerMatches;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Clinical X-ray Pool</h1>
          <p className="text-sm text-muted-foreground">Claim a patient case, create the visual plan and deliver the secure response.</p>
        </div>
        <Button asChild variant="outline"><a href="/xray-quote" target="_blank" rel="noreferrer">Open patient upload form ↗</a></Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Unassigned pool', value: counts.pool, icon: Users, color: 'text-blue-600' },
          { label: 'My active cases', value: counts.mine, icon: UserCheck, color: 'text-amber-600' },
          { label: 'Ready to send', value: counts.ready, icon: Clock3, color: 'text-purple-600' },
          { label: 'Patient delivery', value: counts.sent, icon: Send, color: 'text-emerald-600' },
        ].map(metric => <Card key={metric.label} className="p-4 flex items-center gap-3"><metric.icon className={`w-5 h-5 ${metric.color}`} /><div><div className="text-2xl font-bold">{metric.value}</div><div className="text-xs text-muted-foreground">{metric.label}</div></div></Card>)}
      </div>

      {usingPreviewCases && (
        <Card className="border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Five synthetic Preview cases are loaded because this backend has no patient records. They contain no real patient data and never contact WhatsApp.
        </Card>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accessible cases</SelectItem>
            <SelectItem value="pool">Unassigned pool</SelectItem>
            <SelectItem value="mine">My cases</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active workflow</SelectItem>
            <SelectItem value="all">Every status</SelectItem>
            {Object.entries(STATUS).map(([value, item]) => <SelectItem key={value} value={value}>{item.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="divide-y">
        {!loading && filtered.length === 0 && (
          <div className="p-10 text-center">
            <Scan className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No cases match this view.</p>
            <p className="text-xs text-muted-foreground mt-2">New patient uploads appear in the unassigned pool.</p>
          </div>
        )}
        {loading && <div className="p-10 text-center text-sm text-muted-foreground">Loading private cases…</div>}
        {filtered.map(row => {
          const status = STATUS[row.status] || STATUS.new;
          const isMine = row.doctor_id === user?.id;
          return (
            <div key={row.id} className="p-4 flex items-center gap-4 flex-wrap">
              <div className="w-24 h-20 rounded bg-slate-950 overflow-hidden shrink-0 grid place-items-center">
                {row.preview_url ? <img src={row.preview_url} alt="Private patient X-ray preview" className="w-full h-full object-contain" /> : <Scan className="w-6 h-6 text-slate-500" />}
              </div>
              <div className="flex-1 min-w-[220px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{row.patient_name}</strong>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${status.className}`}>{status.label}</span>
                  {row.is_demo && <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-fuchsia-100 text-fuchsia-700">Demo</span>}
                  {!row.doctor_id && <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-blue-50 text-blue-700">Pool</span>}
                  {isMine && <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-amber-50 text-amber-700">My case</span>}
                  {row.status === 'accepted' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{row.phone} · Visit: {row.preferred_visit_date ? new Date(`${row.preferred_visit_date}T12:00:00`).toLocaleDateString() : 'Flexible'} · Submitted: {new Date(row.created_at).toLocaleString()}</div>
                {row.message && <p className="text-sm mt-1 line-clamp-2 text-foreground/80">{row.message}</p>}
                {!!row.price_total && <p className="text-sm font-bold text-primary mt-1">{row.currency} {row.price_total}</p>}
              </div>
              <Button asChild size="sm">
                <Link to={`/admin/xrays/${row.id}`}>{!row.doctor_id ? 'Claim & plan' : 'Open plan'} <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
              {canDelete && row.status !== 'archived' && !row.is_demo && !isVirtualDemoXray(row.id) && <Button size="icon" variant="ghost" aria-label="Archive case" onClick={() => archiveCase(row.id)}><Archive className="w-4 h-4 text-muted-foreground" /></Button>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}
