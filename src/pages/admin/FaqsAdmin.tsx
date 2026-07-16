import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Edit, Plus, Trash2 } from 'lucide-react';

type Faq = Tables<'faqs'>;
type FaqDraft = Omit<Faq, 'id' | 'created_at' | 'updated_at'> & { id?: string };
const emptyFaq: FaqDraft = { scope: 'global', scope_ref: null, question: '', answer: '', language: 'en', sort_order: 0, content_status: 'published', deleted_at: null };

export default function FaqsAdmin() {
  const [items, setItems] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<FaqDraft | null>(null);
  async function load() { const { data, error } = await supabase.from('faqs').select('*').is('deleted_at', null).order('scope').order('sort_order'); if (error) toast.error(error.message); setItems(data ?? []); }
  useEffect(() => { void load(); }, []);
  async function remove(id: string) { if (!window.confirm('Remove this FAQ?')) return; const { error } = await supabase.from('faqs').update({ deleted_at: new Date().toISOString(), content_status: 'archived' }).eq('id', id); if (error) toast.error(error.message); else { toast.success('FAQ removed'); void load(); } }
  return <div><div className="flex items-center justify-between mb-6"><div><h1 className="font-display text-2xl font-bold">FAQs</h1><p className="text-sm text-muted-foreground">Global and treatment-specific questions used on the site and in structured data.</p></div><Button onClick={() => setEditing({ ...emptyFaq, sort_order: items.length * 10 })}><Plus className="w-4 h-4 mr-2" />New FAQ</Button></div><div className="space-y-3">{items.map(faq => <Card key={faq.id} className="p-4 flex items-start justify-between gap-4"><div><div className="text-[10px] uppercase font-bold text-primary">{faq.scope}{faq.scope_ref ? ` · ${faq.scope_ref}` : ''}</div><h2 className="font-semibold mt-1">{faq.question}</h2><p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p></div><div className="shrink-0"><Button variant="ghost" size="icon" onClick={() => setEditing(faq)}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => void remove(faq.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button></div></Card>)}</div><Dialog open={Boolean(editing)} onOpenChange={open => { if (!open) setEditing(null); }}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>{editing?.id ? 'Edit FAQ' : 'New FAQ'}</DialogTitle></DialogHeader>{editing && <FaqForm initial={editing} onSaved={() => { setEditing(null); void load(); }} />}</DialogContent></Dialog></div>;
}
function FaqForm({ initial, onSaved }: { initial: FaqDraft; onSaved: () => void }) {
  const [form, setForm] = useState(initial); const [saving, setSaving] = useState(false); const set = <K extends keyof FaqDraft>(key: K, value: FaqDraft[K]) => setForm(current => ({ ...current, [key]: value }));
  async function save(e: React.FormEvent) { e.preventDefault(); setSaving(true); const { id, ...payload } = form; const query = id ? supabase.from('faqs').update(payload).eq('id', id) : supabase.from('faqs').insert(payload); const { error } = await query; setSaving(false); if (error) toast.error(error.message); else { toast.success('FAQ saved'); onSaved(); } }
  return <form onSubmit={save} className="space-y-3"><div className="grid grid-cols-2 gap-3"><div><Label>Scope</Label><Select value={form.scope} onValueChange={value => set('scope', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="global">Global</SelectItem><SelectItem value="treatment">Treatment</SelectItem><SelectItem value="dental-tourism">Dental tourism</SelectItem><SelectItem value="landing">Landing page</SelectItem></SelectContent></Select></div><div><Label>Related slug</Label><Input value={form.scope_ref ?? ''} onChange={e => set('scope_ref', e.target.value || null)} placeholder="implants" /></div></div><div><Label>Question</Label><Input required value={form.question} onChange={e => set('question', e.target.value)} /></div><div><Label>Answer</Label><Textarea required rows={6} value={form.answer} onChange={e => set('answer', e.target.value)} /></div><div><Label>Sort order</Label><Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} /></div><Button className="w-full" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save FAQ'}</Button></form>;
}
