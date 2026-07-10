import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';

export default function BeforeAfterAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  async function load() {
    const [ba, tr] = await Promise.all([
      supabase.from('before_after').select('*').order('sort_order', { ascending: true }),
      supabase.from('treatments').select('id,title,language'),
    ]);
    setItems(ba.data || []); setTreatments(tr.data || []);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete?')) return;
    const { error } = await supabase.from('before_after').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Before / After Gallery</h1>
        <Button onClick={() => { setEditing({ published: true, language: 'en' }); setOpen(true); }}><Plus className="w-4 h-4 mr-2" />New case</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(b => (
          <Card key={b.id} className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <img src={b.before_image} alt="before" className="aspect-square object-cover rounded" />
              <img src={b.after_image} alt="after" className="aspect-square object-cover rounded" />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm">{b.title || 'Untitled case'}</h3>
                <p className="text-xs text-muted-foreground">{b.language} · {b.published ? 'Published' : 'Draft'}</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(b); setOpen(true); }}><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => del(b.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit case' : 'New case'}</DialogTitle></DialogHeader>
          {editing && <BAForm data={editing} treatments={treatments} onSaved={() => { setOpen(false); load(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BAForm({ data, treatments, onSaved }: any) {
  const [form, setForm] = useState<any>(data);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  async function up(field: 'before_image' | 'after_image', e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    try { const { url } = await uploadToBucket('media', file, 'before-after'); set(field, url); } catch { toast.error('Upload failed'); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.before_image || !form.after_image) { toast.error('Upload both images'); return; }
    setSaving(true);
    const q = form.id ? supabase.from('before_after').update(form).eq('id', form.id) : supabase.from('before_after').insert(form);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success('Saved'); onSaved(); }
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div><Label>Title</Label><Input value={form.title || ''} onChange={e => set('title', e.target.value)} placeholder="Hollywood smile · 8 veneers" /></div>
      <div><Label>Description</Label><Textarea rows={2} value={form.description || ''} onChange={e => set('description', e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Before image</Label>
          {form.before_image && <img src={form.before_image} className="w-full aspect-square object-cover rounded mt-1" />}
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded cursor-pointer hover:bg-secondary text-sm mt-2 w-full justify-center">
            <Upload className="w-4 h-4" /> Upload<input type="file" accept="image/*" className="hidden" onChange={e => up('before_image', e)} />
          </label>
        </div>
        <div>
          <Label>After image</Label>
          {form.after_image && <img src={form.after_image} className="w-full aspect-square object-cover rounded mt-1" />}
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded cursor-pointer hover:bg-secondary text-sm mt-2 w-full justify-center">
            <Upload className="w-4 h-4" /> Upload<input type="file" accept="image/*" className="hidden" onChange={e => up('after_image', e)} />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Language</Label>
          <select className="w-full h-10 rounded-md border border-input bg-background px-3" value={form.language} onChange={e => set('language', e.target.value)}>
            {['en','tr','el','ru','ar','he','de'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div><Label>Related treatment</Label>
          <select className="w-full h-10 rounded-md border border-input bg-background px-3" value={form.treatment_id || ''} onChange={e => set('treatment_id', e.target.value || null)}>
            <option value="">— None —</option>
            {treatments.map((t: any) => <option key={t.id} value={t.id}>{t.title} ({t.language})</option>)}
          </select>
        </div>
      </div>
      <div><Label>Sort order</Label><Input type="number" value={form.sort_order || 0} onChange={e => set('sort_order', +e.target.value)} /></div>
      <div className="flex items-center gap-2"><Switch checked={form.published} onCheckedChange={v => set('published', v)} /><Label>Published</Label></div>
      <Button type="submit" disabled={saving} className="w-full">{saving ? 'Saving…' : 'Save case'}</Button>
    </form>
  );
}
