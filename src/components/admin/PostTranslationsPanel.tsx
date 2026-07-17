import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/lib/adminAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TipTapEditor } from '@/components/admin/TipTapEditor';
import { CheckCircle2, Languages, Loader2, Pencil, Sparkles, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

const TARGETS = [
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'he', label: 'Hebrew', flag: '🇮🇱' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
] as const;

type TranslationRow = {
  id: string;
  post_id: string;
  lang: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  translation_status: string;
  source_updated_at: string | null;
  translated_at: string | null;
  translation_model: string | null;
};

type TranslationDraft = Pick<TranslationRow, 'title' | 'excerpt' | 'body' | 'meta_title' | 'meta_description' | 'focus_keyword' | 'translation_status'>;

const emptyDraft: TranslationDraft = {
  title: '', excerpt: '', body: '', meta_title: '', meta_description: '', focus_keyword: '', translation_status: 'draft',
};

export function PostTranslationsPanel({ postId, sourceUpdatedAt }: { postId: string | null; sourceUpdatedAt?: string | null }) {
  const { user } = useAdminAuth();
  const [translations, setTranslations] = useState<TranslationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<string | null>(null);
  const [draft, setDraft] = useState<TranslationDraft>(emptyDraft);

  const refresh = useCallback(async () => {
    if (!postId) { setTranslations([]); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from('post_translations')
      .select('id,post_id,lang,title,excerpt,body,meta_title,meta_description,focus_keyword,translation_status,source_updated_at,translated_at,translation_model')
      .eq('post_id', postId)
      .in('lang', TARGETS.map(target => target.code));
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setTranslations((data || []) as TranslationRow[]);
  }, [postId]);

  useEffect(() => { void refresh(); }, [refresh]);

  const byLanguage = useMemo(() => new Map(translations.map(translation => [translation.lang, translation])), [translations]);

  const generate = async () => {
    if (!postId) { toast.error('Save the English post first'); return; }
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke('translate-post', {
      body: { postId, targetLanguages: TARGETS.map(target => target.code) },
    });
    setGenerating(false);
    if (error) { toast.error(error.message || 'Translation failed'); return; }
    toast.success(`${data?.translated?.length || 4} AI translations generated as drafts`);
    await refresh();
  };

  const openEditor = (language: string) => {
    const row = byLanguage.get(language);
    setDraft(row ? {
      title: row.title,
      excerpt: row.excerpt || '',
      body: row.body || '',
      meta_title: row.meta_title || '',
      meta_description: row.meta_description || '',
      focus_keyword: row.focus_keyword || '',
      translation_status: row.translation_status,
    } : emptyDraft);
    setEditingLanguage(language);
  };

  const saveTranslation = async () => {
    if (!postId || !editingLanguage || !draft.title.trim()) { toast.error('Translated title is required'); return; }
    setSaving(true);
    const publishing = draft.translation_status === 'published';
    const { error } = await supabase.from('post_translations').upsert({
      post_id: postId,
      lang: editingLanguage,
      title: draft.title,
      excerpt: draft.excerpt || null,
      body: draft.body || null,
      meta_title: draft.meta_title || draft.title,
      meta_description: draft.meta_description || null,
      focus_keyword: draft.focus_keyword || null,
      translation_status: draft.translation_status,
      source_updated_at: sourceUpdatedAt || new Date().toISOString(),
      reviewed_at: publishing ? new Date().toISOString() : null,
      reviewed_by: publishing ? user?.id || null : null,
    }, { onConflict: 'post_id,lang' });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(publishing ? 'Translation reviewed and published' : 'Translation draft saved');
    setEditingLanguage(null);
    await refresh();
  };

  return (
    <>
      <Card className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 font-semibold"><Languages className="h-4 w-4 text-primary" />Translations</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">AI drafts preserve the English source. Review medical wording before publishing.</p>
          </div>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={generate} disabled={!postId || generating}>
          {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {generating ? 'Translating…' : translations.length ? 'Refresh all with AI' : 'Generate 4 translations'}
        </Button>
        {!postId && <p className="text-xs text-amber-700">Save the English article before generating translations.</p>}

        <div className="space-y-2">
          {TARGETS.map(target => {
            const translation = byLanguage.get(target.code);
            const stale = Boolean(translation?.source_updated_at && sourceUpdatedAt && new Date(translation.source_updated_at) < new Date(sourceUpdatedAt));
            return (
              <div key={target.code} className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{target.flag} {target.label}</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px]">
                    {!translation ? <span className="text-muted-foreground">Not generated</span> : translation.translation_status === 'published'
                      ? <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-3 w-3" />Published</span>
                      : <span className="text-amber-700">Draft</span>}
                    {stale && <span className="inline-flex items-center gap-1 text-amber-700"><TriangleAlert className="h-3 w-3" />Source changed</span>}
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => openEditor(target.code)} disabled={!translation}>
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />Edit
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      <Dialog open={Boolean(editingLanguage)} onOpenChange={open => !open && setEditingLanguage(null)}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {TARGETS.find(target => target.code === editingLanguage)?.label} translation</DialogTitle>
            <DialogDescription>Review the AI translation and SEO fields before changing its status to Published.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={draft.title} onChange={event => setDraft(current => ({ ...current, title: event.target.value }))} /></div>
            <div><Label>Excerpt</Label><Textarea rows={3} value={draft.excerpt || ''} onChange={event => setDraft(current => ({ ...current, excerpt: event.target.value }))} /></div>
            <div className="overflow-hidden rounded-xl border border-border"><TipTapEditor value={draft.body || ''} onChange={body => setDraft(current => ({ ...current, body }))} /></div>
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label>SEO title</Label><Input value={draft.meta_title || ''} onChange={event => setDraft(current => ({ ...current, meta_title: event.target.value }))} /></div>
              <div><Label>Focus keyword</Label><Input value={draft.focus_keyword || ''} onChange={event => setDraft(current => ({ ...current, focus_keyword: event.target.value }))} /></div>
            </div>
            <div><Label>Meta description</Label><Textarea rows={2} value={draft.meta_description || ''} onChange={event => setDraft(current => ({ ...current, meta_description: event.target.value }))} /></div>
            <div>
              <Label>Publication status</Label>
              <select value={draft.translation_status} onChange={event => setDraft(current => ({ ...current, translation_status: event.target.value }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="draft">Draft — not visible to search engines</option>
                <option value="published">Published — reviewed and indexable</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditingLanguage(null)}>Cancel</Button>
              <Button type="button" onClick={saveTranslation} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save translation</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
