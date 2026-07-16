import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Edit, Plus, Star, Trash2 } from 'lucide-react';

type Review = Tables<'reviews'>;
type ReviewDraft = Omit<Review, 'id' | 'created_at' | 'updated_at'> & { id?: string };

const emptyReview: ReviewDraft = { patient_name: '', country: '', country_flag: '', rating: 5, source: 'Google', source_url: null, review_date: null, featured: false, content: '', language: 'en', sort_order: 0, content_status: 'published', deleted_at: null };

export default function ReviewsAdmin() {
  const [items, setItems] = useState<Review[]>([]);
  const [editing, setEditing] = useState<ReviewDraft | null>(null);

  async function load() {
    const { data, error } = await supabase.from('reviews').select('*').is('deleted_at', null).order('sort_order');
    if (error) toast.error(error.message);
    setItems(data ?? []);
  }
  useEffect(() => { void load(); }, []);

  async function remove(id: string) {
    if (!window.confirm('Remove this review from the site?')) return;
    const { error } = await supabase.from('reviews').update({ deleted_at: new Date().toISOString(), content_status: 'archived' }).eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Review removed'); void load(); }
  }

  return <div>
    <div className="flex items-center justify-between mb-6"><div><h1 className="font-display text-2xl font-bold">Reviews</h1><p className="text-sm text-muted-foreground">Manage English patient reviews and homepage highlights.</p></div><Button onClick={() => setEditing({ ...emptyReview, sort_order: items.length * 10 })}><Plus className="w-4 h-4 mr-2" />New review</Button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map(review => <Card key={review.id} className="p-5"><div className="flex gap-0.5 mb-3">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div><p className="text-sm line-clamp-4">“{review.content}”</p><div className="mt-4 pt-3 border-t flex justify-between gap-2"><div><div className="font-semibold text-sm">{review.patient_name}</div><div className="text-xs text-muted-foreground">{review.country_flag} {review.country} {review.featured ? '· Featured' : ''}</div></div><div><Button variant="ghost" size="icon" onClick={() => setEditing(review)}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => void remove(review.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button></div></div></Card>)}</div>
    <Dialog open={Boolean(editing)} onOpenChange={open => { if (!open) setEditing(null); }}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>{editing?.id ? 'Edit review' : 'New review'}</DialogTitle></DialogHeader>{editing && <ReviewForm initial={editing} onSaved={() => { setEditing(null); void load(); }} />}</DialogContent></Dialog>
  </div>;
}
function ReviewForm({ initial, onSaved }: { initial: ReviewDraft; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof ReviewDraft>(key: K, value: ReviewDraft[K]) => setForm(current => ({ ...current, [key]: value }));
  async function save(e: React.FormEvent) { e.preventDefault(); setSaving(true); const { id, ...payload } = form; const query = id ? supabase.from('reviews').update(payload).eq('id', id) : supabase.from('reviews').insert(payload); const { error } = await query; setSaving(false); if (error) toast.error(error.message); else { toast.success('Review saved'); onSaved(); } }
  return <form onSubmit={save} className="space-y-3"><div className="grid grid-cols-2 gap-3"><div><Label>Patient name</Label><Input required value={form.patient_name} onChange={e => set('patient_name', e.target.value)} /></div><div><Label>Country</Label><Input value={form.country ?? ''} onChange={e => set('country', e.target.value || null)} /></div></div><div><Label>Review</Label><Textarea required rows={5} value={form.content} onChange={e => set('content', e.target.value)} /></div><div className="grid grid-cols-3 gap-3"><div><Label>Rating</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => set('rating', Number(e.target.value))} /></div><div><Label>Country flag</Label><Input value={form.country_flag ?? ''} onChange={e => set('country_flag', e.target.value || null)} placeholder="🇬🇧" /></div><div><Label>Sort</Label><Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} /></div></div><div className="grid grid-cols-2 gap-3"><div><Label>Source</Label><Input value={form.source ?? ''} onChange={e => set('source', e.target.value || null)} /></div><div><Label>Source URL</Label><Input type="url" value={form.source_url ?? ''} onChange={e => set('source_url', e.target.value || null)} /></div></div><div className="flex items-center gap-2"><Switch checked={form.featured} onCheckedChange={value => set('featured', value)} /><Label>Feature on homepage</Label></div><Button className="w-full" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save review'}</Button></form>;
}
