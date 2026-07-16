import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TipTapEditor } from '@/components/admin/TipTapEditor';
import { SeoScore, slugify } from '@/components/admin/SeoScore';
import { toast } from 'sonner';
import { Edit, ExternalLink, Plus, Trash2, Upload } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';

type Treatment = Tables<'treatments'>;
type Category = Tables<'treatment_categories'>;
type TreatmentDraft = Omit<Treatment, 'id' | 'created_at' | 'updated_at'> & { id?: string };

const emptyTreatment: TreatmentDraft = {
  active: true, benefits: [], category: null, category_slug: null, content: '', content_status: 'draft',
  created_by: null, currency: 'EUR', default_price: null, deleted_at: null, description: '', expected_results: [],
  featured_image: null, focus_keyword: null, icon: null, language: 'en', og_image: null, process_steps: [],
  scheduled_at: null, seo_description: null, seo_title: null, slug: '', sort_order: 0, suitable_for: [], tags: [],
  title: '', updated_by: null,
};

const lines = (value: string) => value.split('\n').map(item => item.trim()).filter(Boolean);

export default function TreatmentsAdmin() {
  const [items, setItems] = useState<Treatment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<TreatmentDraft | null>(null);

  async function load() {
    const [treatments, categoryResult] = await Promise.all([
      supabase.from('treatments').select('*').is('deleted_at', null).order('sort_order').order('created_at'),
      supabase.from('treatment_categories').select('*').order('sort_order'),
    ]);
    if (treatments.error) toast.error(treatments.error.message);
    if (categoryResult.error) toast.error(categoryResult.error.message);
    setItems(treatments.data ?? []);
    setCategories(categoryResult.data ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function remove(id: string) {
    if (!window.confirm('Remove this treatment from the public site? Existing links will stop working.')) return;
    const { error } = await supabase.from('treatments').update({ deleted_at: new Date().toISOString(), active: false, content_status: 'archived' }).eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Treatment archived'); void load(); }
  }

  return <div>
    <div className="flex items-center justify-between mb-6 gap-3"><div><h1 className="font-display text-2xl font-bold">Treatments</h1><p className="text-sm text-muted-foreground mt-1">Manage the treatment listing, detail content, imagery, tags, price and SEO.</p></div><Button onClick={() => setEditing({ ...emptyTreatment, sort_order: (items.at(-1)?.sort_order ?? 0) + 10 })}><Plus className="w-4 h-4 mr-2" />New treatment</Button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map(item => <Card key={item.id} className="overflow-hidden">{item.featured_image ? <img src={item.featured_image} alt={item.title} className="w-full h-40 object-cover" /> : <div className="h-40 bg-secondary grid place-items-center text-xs text-muted-foreground">No featured image</div>}<div className="p-4"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{item.title}</h2><p className="text-xs text-muted-foreground">/en/{item.slug}</p></div><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${item.content_status === 'published' && item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-secondary text-muted-foreground'}`}>{item.content_status}</span></div><div className="flex flex-wrap gap-1 mt-3">{item.tags.slice(0, 4).map(tag => <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-secondary">{tag}</span>)}</div><div className="flex justify-end mt-3"><Button asChild variant="ghost" size="icon"><a href={`/en/${item.slug}`} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4" /></a></Button><Button variant="ghost" size="icon" onClick={() => setEditing(item)}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => void remove(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button></div></div></Card>)}</div>
    <Dialog open={Boolean(editing)} onOpenChange={open => { if (!open) setEditing(null); }}><DialogContent className="max-w-4xl max-h-[94vh] overflow-y-auto"><DialogHeader><DialogTitle>{editing?.id ? 'Edit treatment' : 'New treatment'}</DialogTitle></DialogHeader>{editing && <TreatmentForm initial={editing} categories={categories} onSaved={() => { setEditing(null); void load(); }} />}</DialogContent></Dialog>
  </div>;
}

function TreatmentForm({ initial, categories, onSaved }: { initial: TreatmentDraft; categories: Category[]; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof TreatmentDraft>(key: K, value: TreatmentDraft[K]) => setForm(current => ({ ...current, [key]: value }));

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    try { const { url } = await uploadToBucket('media', file, 'treatments'); set('featured_image', url); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'Upload failed'); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    const slug = form.slug || slugify(form.title);
    setSaving(true);
    const { id, ...payload } = { ...form, slug };
    const query = id ? supabase.from('treatments').update(payload).eq('id', id) : supabase.from('treatments').insert(payload);
    const { error } = await query;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success('Treatment saved'); onSaved(); }
  }

  return <form onSubmit={save} className="space-y-5">
    <div className="grid md:grid-cols-2 gap-4"><div><Label>Title</Label><Input required value={form.title} onChange={e => { set('title', e.target.value); if (!form.id) set('slug', slugify(e.target.value)); }} /></div><div><Label>URL slug</Label><Input required value={form.slug} onChange={e => set('slug', slugify(e.target.value))} /></div></div>
    <div className="grid md:grid-cols-3 gap-4"><div><Label>Category</Label><Select value={form.category_slug ?? ''} onValueChange={value => { const category = categories.find(item => item.slug === value); setForm(current => ({ ...current, category_slug: value, category: category?.name ?? value })); }}><SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger><SelectContent>{categories.map(category => <SelectItem key={category.id} value={category.slug}>{category.name}</SelectItem>)}</SelectContent></Select></div><div><Label>Sort order</Label><Input type="number" value={form.sort_order ?? 0} onChange={e => set('sort_order', Number(e.target.value))} /></div><div><Label>Status</Label><Select value={form.content_status} onValueChange={value => set('content_status', value as Treatment['content_status'])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="in_review">In review</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select></div></div>
    <div><Label>Short description</Label><Textarea rows={3} value={form.description ?? ''} onChange={e => set('description', e.target.value || null)} /></div>
    <div><Label>Full introduction</Label><TipTapEditor value={form.content ?? ''} onChange={value => set('content', value)} /></div>
    <div><Label>Featured image</Label>{form.featured_image && <img src={form.featured_image} alt="" className="w-full h-48 object-cover rounded-xl mt-1" />}<label className="mt-2 inline-flex items-center gap-2 px-3 py-2 border border-dashed rounded-lg text-sm cursor-pointer hover:bg-secondary"><Upload className="w-4 h-4" />Upload or replace<input type="file" accept="image/*" className="hidden" onChange={upload} /></label></div>
    <div className="grid md:grid-cols-2 gap-4"><ListField label="Benefits — one per line" value={form.benefits} onChange={value => set('benefits', value)} /><ListField label="Suitable for — one per line" value={form.suitable_for} onChange={value => set('suitable_for', value)} /><ListField label="Process steps — one per line" value={form.process_steps} onChange={value => set('process_steps', value)} /><ListField label="Expected results — one per line" value={form.expected_results} onChange={value => set('expected_results', value)} /></div>
    <div><Label>Tags (comma separated)</Label><Input value={form.tags.join(', ')} onChange={e => set('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))} placeholder="implants, dental tourism, fixed teeth" /></div>
    <div className="grid md:grid-cols-2 gap-4"><div><Label>Guide price</Label><Input type="number" min={0} step="0.01" value={form.default_price ?? ''} onChange={e => set('default_price', e.target.value ? Number(e.target.value) : null)} /></div><div><Label>Currency</Label><Select value={form.currency ?? 'EUR'} onValueChange={value => set('currency', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['EUR','GBP','USD','TRY'].map(currency => <SelectItem key={currency} value={currency}>{currency}</SelectItem>)}</SelectContent></Select></div></div>
    <Card className="p-4 space-y-3 bg-secondary/20"><h3 className="font-semibold">SEO & AI discovery</h3><div><Label>SEO title</Label><Input value={form.seo_title ?? ''} onChange={e => set('seo_title', e.target.value || null)} maxLength={70} /></div><div><Label>Meta description</Label><Textarea rows={3} value={form.seo_description ?? ''} onChange={e => set('seo_description', e.target.value || null)} maxLength={180} /></div><div><Label>Focus topic</Label><Input value={form.focus_keyword ?? ''} onChange={e => set('focus_keyword', e.target.value || null)} /></div><SeoScore title={form.seo_title || form.title} description={form.seo_description || form.description || ''} keyword={form.focus_keyword || ''} content={form.content || ''} slug={form.slug} /></Card>
    <div className="flex items-center gap-2"><Switch checked={form.active} onCheckedChange={value => set('active', value)} /><Label>Visible on the public site</Label></div>
    <Button className="w-full" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save treatment'}</Button>
  </form>;
}

function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <div><Label>{label}</Label><Textarea rows={7} value={value.join('\n')} onChange={e => onChange(lines(e.target.value))} /></div>;
}
