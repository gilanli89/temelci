import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';
import { slugify } from '@/components/admin/SeoScore';

const LANGS = ['en','tr','el','ru','ar','he','de'];

export default function TreatmentsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  async function load() {
    const { data } = await supabase.from('treatments').select('*').order('sort_order').order('created_at');
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete?')) return;
    const { error } = await supabase.from('treatments').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Treatments</h1>
        <Button onClick={() => { setEditing({ language: 'en', active: true, currency: 'EUR', sort_order: (items[items.length-1]?.sort_order || 0) + 10 }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />New treatment
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(t => (
          <Card key={t.id} className="p-4">
            {t.featured_image && <img src={t.featured_image} alt="" className="w-full h-32 object-cover rounded mb-3" />}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <div className="text-xs text-muted-foreground">/{t.language}/{t.slug} · {t.category || '—'}</div>
                {t.default_price && <div className="text-sm font-bold text-primary mt-1">{t.currency} {t.default_price}</div>}
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(t); setOpen(true); }}><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => del(t.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit treatment' : 'New treatment'}</DialogTitle></DialogHeader>
          {editing && <TreatmentForm data={editing} onSaved={() => { setOpen(false); load(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TreatmentForm({ data, onSaved }: { data: any; onSaved: () => void }) {
  const [form, setForm] = useState<any>(data);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    try { const { url } = await uploadToBucket('media', file, 'treatments'); set('featured_image', url); }
    catch { toast.error('Upload failed'); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title || '') };
    const q = form.id
      ? supabase.from('treatments').update(payload).eq('id', form.id)
      : supabase.from('treatments').insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success('Saved'); onSaved(); }
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Title</Label><Input required value={form.title || ''} onChange={e => set('title', e.target.value)} /></div>
        <div><Label>Slug</Label><Input value={form.slug || ''} onChange={e => set('slug', slugify(e.target.value))} placeholder="auto" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Language</Label>
          <Select value={form.language} onValueChange={v => set('language', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{LANGS.map(l => <SelectItem key={l} value={l}>{l.toUpperCase()}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Category</Label><Input value={form.category || ''} onChange={e => set('category', e.target.value)} placeholder="cosmetic" /></div>
        <div><Label>Sort</Label><Input type="number" value={form.sort_order || 0} onChange={e => set('sort_order', +e.target.value)} /></div>
      </div>
      <div><Label>Short description</Label><Textarea rows={2} value={form.description || ''} onChange={e => set('description', e.target.value)} /></div>
      <div><Label>Full content (HTML)</Label><Textarea rows={6} value={form.content || ''} onChange={e => set('content', e.target.value)} /></div>
      <div>
        <Label>Featured image</Label>
        <div className="flex items-center gap-3 mt-1">
          {form.featured_image && <img src={form.featured_image} className="w-20 h-14 object-cover rounded" />}
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded cursor-pointer hover:bg-secondary">
            <Upload className="w-4 h-4" /> Upload<input type="file" accept="image/*" className="hidden" onChange={upload} />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Price</Label><Input type="number" step="0.01" value={form.default_price || ''} onChange={e => set('default_price', e.target.value ? +e.target.value : null)} /></div>
        <div><Label>Currency</Label>
          <Select value={form.currency || 'EUR'} onValueChange={v => set('currency', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{['EUR','USD','GBP','TRY'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div><Label>SEO title</Label><Input value={form.seo_title || ''} onChange={e => set('seo_title', e.target.value)} /></div>
      <div><Label>SEO description</Label><Textarea rows={2} value={form.seo_description || ''} onChange={e => set('seo_description', e.target.value)} /></div>
      <div className="flex items-center gap-2"><Switch checked={form.active} onCheckedChange={v => set('active', v)} /><Label>Active</Label></div>
      <Button type="submit" disabled={saving} className="w-full">{saving ? 'Saving…' : 'Save treatment'}</Button>
    </form>
  );
}
