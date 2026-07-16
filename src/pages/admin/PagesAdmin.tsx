import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { uploadToBucket } from '@/lib/mediaUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Edit, ExternalLink, Upload } from 'lucide-react';

type SitePage = Tables<'site_pages'>;

export default function PagesAdmin() {
  const [items, setItems] = useState<SitePage[]>([]);
  const [editing, setEditing] = useState<SitePage | null>(null);

  async function load() {
    const { data, error } = await supabase.from('site_pages').select('*').is('deleted_at', null).order('title');
    if (error) toast.error(error.message);
    setItems(data ?? []);
  }

  useEffect(() => { void load(); }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Pages</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit page headings, hero copy and search metadata. English is the only public language in this pilot.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map(page => (
          <Card key={page.id} className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">{page.page_type}</div>
            <h2 className="font-semibold">{page.title}</h2>
            <p className="text-xs text-muted-foreground mt-1 truncate">/en/{page.slug === 'home' ? '' : page.slug}</p>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{page.hero_description || page.seo_description || 'No description yet.'}</p>
            <div className="flex justify-end gap-1 mt-4">
              <Button asChild variant="ghost" size="icon"><a href={`/en/${page.slug === 'home' ? '' : page.slug}`} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4" /></a></Button>
              <Button variant="ghost" size="icon" onClick={() => setEditing(page)}><Edit className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={Boolean(editing)} onOpenChange={open => { if (!open) setEditing(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit {editing?.title}</DialogTitle></DialogHeader>
          {editing && <PageForm page={editing} onSaved={() => { setEditing(null); void load(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
function PageForm({ page, onSaved }: { page: SitePage; onSaved: () => void }) {
  const [form, setForm] = useState(page);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof SitePage>(key: K, value: SitePage[K]) => setForm(current => ({ ...current, [key]: value }));

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToBucket('media', file, 'pages');
      set('hero_image', url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { id, created_at: _createdAt, updated_at: _updatedAt, ...payload } = form;
    const { error } = await supabase.from('site_pages').update(payload).eq('id', id);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success('Page saved'); onSaved(); }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div><Label>Internal page name</Label><Input required value={form.title} onChange={e => set('title', e.target.value)} /></div>
      <div><Label>Eyebrow</Label><Input value={form.eyebrow ?? ''} onChange={e => set('eyebrow', e.target.value || null)} /></div>
      <div><Label>Hero title</Label><Input value={form.hero_title ?? ''} onChange={e => set('hero_title', e.target.value || null)} /></div>
      <div><Label>Hero description</Label><Textarea rows={3} value={form.hero_description ?? ''} onChange={e => set('hero_description', e.target.value || null)} /></div>
      <div>
        <Label>Hero image</Label>
        {form.hero_image && <img src={form.hero_image} alt="" className="w-full h-40 object-cover rounded-xl mt-1" />}
        <label className="mt-2 inline-flex items-center gap-2 border border-dashed rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-secondary"><Upload className="w-4 h-4" />Upload image<input className="hidden" type="file" accept="image/*" onChange={upload} /></label>
      </div>
      <Card className="p-4 space-y-3 bg-secondary/20">
        <h3 className="font-semibold">SEO & AI discovery</h3>
        <div><Label>SEO title</Label><Input value={form.seo_title ?? ''} onChange={e => set('seo_title', e.target.value || null)} maxLength={70} /></div>
        <div><Label>Meta description</Label><Textarea rows={3} value={form.seo_description ?? ''} onChange={e => set('seo_description', e.target.value || null)} maxLength={180} /></div>
        <div><Label>Focus topic</Label><Input value={form.focus_keyword ?? ''} onChange={e => set('focus_keyword', e.target.value || null)} /></div>
        <div><Label>Social image URL</Label><Input value={form.og_image ?? ''} onChange={e => set('og_image', e.target.value || null)} /></div>
      </Card>
      <Button className="w-full" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save page'}</Button>
    </form>
  );
}
