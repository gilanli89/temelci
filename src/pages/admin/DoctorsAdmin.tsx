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
import { slugify } from '@/components/admin/SeoScore';

export default function DoctorsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  async function load() {
    const { data } = await supabase.from('doctors').select('*').order('sort_order');
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete?')) return;
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Doctors</h1>
        <Button onClick={() => { setEditing({ active: true, sort_order: (items[items.length-1]?.sort_order || 0) + 10 }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />New doctor
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(d => (
          <Card key={d.id} className="p-4">
            {d.photo && <img src={d.photo} alt={d.name} className="w-full h-48 object-cover rounded mb-3" />}
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{d.title || '—'}</p>
            <div className="flex gap-1 justify-end">
              <Button size="icon" variant="ghost" onClick={() => { setEditing(d); setOpen(true); }}><Edit className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => del(d.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit doctor' : 'New doctor'}</DialogTitle></DialogHeader>
          {editing && <DoctorForm data={editing} onSaved={() => { setOpen(false); load(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DoctorForm({ data, onSaved }: { data: any; onSaved: () => void }) {
  const [form, setForm] = useState<any>(data);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    try { const { url } = await uploadToBucket('media', file, 'doctors'); set('photo', url); } catch { toast.error('Upload failed'); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.name || '') };
    const q = form.id ? supabase.from('doctors').update(payload).eq('id', form.id) : supabase.from('doctors').insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success('Saved'); onSaved(); }
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div><Label>Name</Label><Input required value={form.name || ''} onChange={e => set('name', e.target.value)} /></div>
      <div><Label>Title / Role</Label><Input value={form.title || ''} onChange={e => set('title', e.target.value)} placeholder="Cosmetic Dentist" /></div>
      <div><Label>Bio</Label><Textarea rows={4} value={form.bio || ''} onChange={e => set('bio', e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Phone</Label><Input value={form.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
        <div><Label>Email</Label><Input value={form.email || ''} onChange={e => set('email', e.target.value)} /></div>
      </div>
      <div><Label>WhatsApp</Label><Input value={form.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} placeholder="+90..." /></div>
      <div><Label>Specialties (comma separated)</Label>
        <Input value={(form.specialties || []).join(', ')}
          onChange={e => set('specialties', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} />
      </div>
      <div>
        <Label>Photo</Label>
        <div className="flex items-center gap-3 mt-1">
          {form.photo && <img src={form.photo} className="w-20 h-20 object-cover rounded-full" />}
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded cursor-pointer hover:bg-secondary">
            <Upload className="w-4 h-4" /> Upload<input type="file" accept="image/*" className="hidden" onChange={upload} />
          </label>
        </div>
      </div>
      <div><Label>Sort order</Label><Input type="number" value={form.sort_order || 0} onChange={e => set('sort_order', +e.target.value)} /></div>
      <div className="flex items-center gap-2"><Switch checked={form.active} onCheckedChange={v => set('active', v)} /><Label>Active</Label></div>
      <Button type="submit" disabled={saving} className="w-full">{saving ? 'Saving…' : 'Save doctor'}</Button>
    </form>
  );
}
