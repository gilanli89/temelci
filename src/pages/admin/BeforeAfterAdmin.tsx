import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
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

type Case = Tables<'before_after'>;
type TreatmentOption = Pick<Tables<'treatments'>, 'id' | 'title'>;
type CaseForm = TablesInsert<'before_after'> & { id?: string };

const emptyCase: CaseForm = {
  before_image: '',
  after_image: '',
  before_alt: '',
  after_alt: '',
  title: '',
  description: '',
  tags: [],
  language: 'en',
  published: false,
  content_status: 'draft',
  patient_consent_confirmed: false,
  sort_order: 0,
};

export default function BeforeAfterAdmin() {
  const [items, setItems] = useState<Case[]>([]);
  const [treatments, setTreatments] = useState<TreatmentOption[]>([]);
  const [editing, setEditing] = useState<CaseForm | null>(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    const [casesResult, treatmentsResult] = await Promise.all([
      supabase.from('before_after').select('*').is('deleted_at', null).eq('language', 'en').order('sort_order'),
      supabase.from('treatments').select('id,title').is('deleted_at', null).eq('language', 'en').order('title'),
    ]);
    if (casesResult.error) toast.error(casesResult.error.message);
    if (treatmentsResult.error) toast.error(treatmentsResult.error.message);
    setItems(casesResult.data || []);
    setTreatments(treatmentsResult.data || []);
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function archive(id: string) {
    if (!confirm('Archive this case? It will disappear from the public gallery.')) return;
    const { error } = await supabase.from('before_after').update({
      deleted_at: new Date().toISOString(),
      published: false,
      content_status: 'archived',
    }).eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Case archived'); void load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Before / After Gallery</h1>
          <p className="text-sm text-muted-foreground">Publish only cases with recorded patient consent.</p>
        </div>
        <Button onClick={() => { setEditing({ ...emptyCase }); setOpen(true); }}><Plus className="w-4 h-4 mr-2" />New case</Button>
      </div>
      {items.length === 0 && <Card className="p-8 text-center text-muted-foreground">No cases yet. Add the first consented case when the photography is ready.</Card>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <Card key={item.id} className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <img src={item.before_image} alt={item.before_alt || 'Before treatment'} className="aspect-square w-full object-cover rounded" />
              <img src={item.after_image} alt={item.after_alt || 'After treatment'} className="aspect-square w-full object-cover rounded" />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm">{item.title || 'Untitled case'}</h3>
                <p className="text-xs text-muted-foreground">{item.published ? 'Published' : 'Draft'} · {item.patient_consent_confirmed ? 'Consent recorded' : 'Consent missing'}</p>
              </div>
              <div className="flex gap-1">
                <Button aria-label="Edit case" size="icon" variant="ghost" onClick={() => { setEditing(item); setOpen(true); }}><Edit className="w-4 h-4" /></Button>
                <Button aria-label="Archive case" size="icon" variant="ghost" onClick={() => void archive(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit case' : 'New case'}</DialogTitle></DialogHeader>
          {editing && <BeforeAfterForm data={editing} treatments={treatments} onSaved={() => { setOpen(false); void load(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BeforeAfterForm({ data, treatments, onSaved }: { data: CaseForm; treatments: TreatmentOption[]; onSaved: () => void }) {
  const [form, setForm] = useState<CaseForm>(data);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'before_image' | 'after_image' | null>(null);
  const set = <K extends keyof CaseForm>(key: K, value: CaseForm[K]) => setForm(current => ({ ...current, [key]: value }));

  async function upload(field: 'before_image' | 'after_image', file?: File) {
    if (!file) return;
    setUploading(field);
    try {
      const { url } = await uploadToBucket('media', file, 'before-after');
      set(field, url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!form.before_image || !form.after_image) return toast.error('Upload both images.');
    if (!form.before_alt?.trim() || !form.after_alt?.trim()) return toast.error('Add descriptive alt text for both images.');
    if (form.published && !form.patient_consent_confirmed) return toast.error('Patient consent must be recorded before publication.');

    setSaving(true);
    const payload: TablesInsert<'before_after'> | TablesUpdate<'before_after'> = {
      ...form,
      language: 'en',
      content_status: form.published ? 'published' : 'draft',
      tags: form.tags || [],
    };
    delete (payload as CaseForm).id;
    const result = form.id
      ? await supabase.from('before_after').update(payload).eq('id', form.id)
      : await supabase.from('before_after').insert(payload as TablesInsert<'before_after'>);
    setSaving(false);
    if (result.error) toast.error(result.error.message);
    else { toast.success('Case saved'); onSaved(); }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div><Label>Title</Label><Input required value={form.title || ''} onChange={event => set('title', event.target.value)} placeholder="Hollywood smile · 8 veneers" /></div>
      <div><Label>Description</Label><Textarea rows={3} value={form.description || ''} onChange={event => set('description', event.target.value)} /></div>
      <div><Label>Tags</Label><Input value={(form.tags || []).join(', ')} onChange={event => set('tags', event.target.value.split(',').map(tag => tag.trim()).filter(Boolean))} placeholder="veneers, smile makeover" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(['before_image', 'after_image'] as const).map(field => {
          const isBefore = field === 'before_image';
          return <div key={field}>
            <Label>{isBefore ? 'Before image' : 'After image'}</Label>
            {form[field] && <img src={form[field]} alt="Preview" className="w-full aspect-square object-cover rounded mt-1" />}
            <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded cursor-pointer hover:bg-secondary text-sm mt-2 w-full justify-center">
              <Upload className="w-4 h-4" /> {uploading === field ? 'Uploading…' : 'Upload image'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" disabled={Boolean(uploading)} onChange={event => void upload(field, event.target.files?.[0])} />
            </label>
            <Label className="mt-2 block">Image alt text</Label>
            <Input required value={(isBefore ? form.before_alt : form.after_alt) || ''} onChange={event => set(isBefore ? 'before_alt' : 'after_alt', event.target.value)} placeholder={isBefore ? 'Smile before veneer treatment' : 'Smile after veneer treatment'} />
          </div>;
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><Label>Related treatment</Label>
          <select className="w-full h-10 rounded-md border border-input bg-background px-3" value={form.treatment_id || ''} onChange={event => set('treatment_id', event.target.value || null)}>
            <option value="">— None —</option>
            {treatments.map(treatment => <option key={treatment.id} value={treatment.id}>{treatment.title}</option>)}
          </select>
        </div>
        <div><Label>Sort order</Label><Input type="number" value={form.sort_order || 0} onChange={event => set('sort_order', Number(event.target.value))} /></div>
      </div>
      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between gap-4"><div><Label>Patient consent recorded</Label><p className="text-xs text-muted-foreground">Confirm a signed release permits public use of both images.</p></div><Switch checked={Boolean(form.patient_consent_confirmed)} onCheckedChange={value => set('patient_consent_confirmed', value)} /></div>
        <div className="flex items-center justify-between gap-4"><div><Label>Published</Label><p className="text-xs text-muted-foreground">Visible on the public before/after page.</p></div><Switch checked={Boolean(form.published)} onCheckedChange={value => set('published', value)} /></div>
      </div>
      <Button type="submit" disabled={saving || Boolean(uploading)} className="w-full">{saving ? 'Saving…' : 'Save case'}</Button>
    </form>
  );
}
