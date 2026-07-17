import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TipTapEditor } from '@/components/admin/TipTapEditor';
import { PostTranslationsPanel } from '@/components/admin/PostTranslationsPanel';
import { SeoScore, slugify } from '@/components/admin/SeoScore';
import { useAdminAuth } from '@/lib/adminAuth';
import { uploadToBucket } from '@/lib/mediaUpload';
import { toast } from 'sonner';
import { Save, ArrowLeft, Upload, ExternalLink, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';

export default function PostEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const nav = useNavigate();
  const { user } = useAdminAuth();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);
  const currentId = useRef<string | null>(isNew ? null : (id ?? null));
  const [persistedId, setPersistedId] = useState<string | null>(isNew ? null : (id ?? null));
  const [sourceUpdatedAt, setSourceUpdatedAt] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const language = 'en';
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [keywordsText, setKeywordsText] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase.from('posts').select('*').eq('id', id!).maybeSingle().then(({ data, error }) => {
      if (error || !data) { toast.error('Post not found'); nav('/admin/posts'); return; }
      setTitle(data.title); setSlug(data.slug); setSlugTouched(true);
      setExcerpt(data.excerpt || '');
      setContent(data.content || ''); setCoverImage(data.cover_image || '');
      setSeoTitle(data.seo_title || ''); setSeoDescription(data.seo_description || '');
      setFocusKeyword(data.focus_keyword || '');
      setKeywordsText((data.keywords || []).join(', '));
      setPublished(data.published);
      setSourceUpdatedAt(data.updated_at);
      setLoading(false);
    });
  }, [id, isNew, nav]);

  useEffect(() => {
    if (!slugTouched && title) setSlug(slugify(title));
  }, [title, slugTouched]);

  async function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToBucket('media', file, 'covers');
      setCoverImage(url);
      toast.success('Cover uploaded');
    } catch { toast.error('Upload failed'); }
  }

  // Track dirty state on any field change (after initial load)
  useEffect(() => {
    if (loading) return;
    setDirty(true);
  }, [title, slug, language, excerpt, content, coverImage, seoTitle, seoDescription, focusKeyword, keywordsText]);

  async function save(opts?: { publish?: boolean; silent?: boolean }) {
    const publish = opts?.publish;
    const silent = opts?.silent;
    if (!title.trim()) {
      if (!silent) toast.error('Title is required');
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
    setSaving(true);
    const nextPublished = publish ?? published;
    const payload = {
      title, slug: finalSlug, language: 'en', excerpt, content,
      cover_image: coverImage || null,
      seo_title: seoTitle || title, seo_description: seoDescription, focus_keyword: focusKeyword,
      keywords: keywordsText.split(',').map(k => k.trim()).filter(Boolean),
      published: nextPublished,
      status: nextPublished ? 'published' : 'draft',
      content_status: nextPublished ? 'published' : 'draft',
      published_at: nextPublished ? new Date().toISOString() : null,
      author_id: user?.id,
    };
    const activeId = currentId.current;
    const q = !activeId
      ? supabase.from('posts').insert(payload).select('id,updated_at').single()
      : supabase.from('posts').update(payload).eq('id', activeId).select('id,updated_at').single();
    const { data, error } = await q;
    setSaving(false);
    if (error) { if (!silent) toast.error(error.message); return; }
    if (!activeId && data) {
      currentId.current = data.id;
      setPersistedId(data.id);
      window.history.replaceState(null, '', `/admin/posts/${data.id}`);
    }
    if (data?.updated_at) setSourceUpdatedAt(data.updated_at);
    if (publish !== undefined) setPublished(nextPublished);
    setLastSavedAt(new Date());
    setDirty(false);
    if (!silent) toast.success(publish === true ? 'Published!' : publish === false ? 'Unpublished' : 'Saved');
  }

  // Auto-save drafts every 8s when there are unsaved changes and we have a title
  useEffect(() => {
    if (!dirty || saving || !title.trim()) return;
    const t = setTimeout(() => { save({ silent: true }); }, 8000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, saving, title, slug, content, excerpt, coverImage, seoTitle, seoDescription, focusKeyword, keywordsText]);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const savedLabel = saving
    ? 'Saving…'
    : dirty
      ? 'Unsaved changes'
      : lastSavedAt
        ? `Saved ${lastSavedAt.toLocaleTimeString()}`
        : '';

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => nav('/admin/posts')}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="font-display text-2xl font-bold">{isNew ? 'New Post' : 'Edit Post'}</h1>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : dirty ? null : lastSavedAt ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : null}
              {savedLabel}
              {published && !dirty && (
                <a href={`/${language}/blog/${slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 ml-2 text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" /> View live
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => save()} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />Save draft
          </Button>
          {published ? (
            <Button variant="outline" onClick={() => save({ publish: false })} disabled={saving}>
              <EyeOff className="w-4 h-4 mr-2" />Unpublish
            </Button>
          ) : null}
          <Button onClick={() => save({ publish: true })} disabled={saving}>
            <Eye className="w-4 h-4 mr-2" />{published ? 'Update & Publish' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" className="text-lg" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Slug</Label>
                <Input value={slug} onChange={e => { setSlug(slugify(e.target.value)); setSlugTouched(true); }} />
              </div>
              <div>
                <Label>Language</Label>
                <Input value="English" disabled />
              </div>
            </div>
            <div>
              <Label>Excerpt (short summary)</Label>
              <Textarea rows={2} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
            </div>
            <div>
              <Label>Cover image</Label>
              <div className="flex items-center gap-3 mt-1">
                {coverImage && <img src={coverImage} alt="" className="w-24 h-16 object-cover rounded" />}
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg text-sm cursor-pointer hover:bg-secondary">
                  <Upload className="w-4 h-4" /> {coverImage ? 'Replace' : 'Upload'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
                </label>
                {coverImage && <Button variant="ghost" size="sm" onClick={() => setCoverImage('')}>Remove</Button>}
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden">
            <TipTapEditor value={content} onChange={setContent} />
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">SEO settings</h3>
            <div>
              <Label>Focus keyword</Label>
              <Input value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} placeholder="e.g. hollywood smile cyprus" />
            </div>
            <div>
              <Label>SEO title <span className="text-muted-foreground">({seoTitle.length}/60)</span></Label>
              <Input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title} />
            </div>
            <div>
              <Label>Meta description <span className="text-muted-foreground">({seoDescription.length}/160)</span></Label>
              <Textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
            </div>
            <div>
              <Label>Keywords (comma separated)</Label>
              <Input value={keywordsText} onChange={e => setKeywordsText(e.target.value)} placeholder="dental, cyprus, veneers" />
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-border text-sm">
              <span className="text-muted-foreground">Status:</span>
              {published
                ? <span className="font-semibold text-emerald-700">Published</span>
                : <span className="font-semibold text-amber-700">Draft</span>}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <SeoScore title={seoTitle || title} description={seoDescription} content={content} keyword={focusKeyword} slug={slug} />
          <PostTranslationsPanel postId={persistedId} sourceUpdatedAt={sourceUpdatedAt} />
        </div>
      </div>
    </div>
  );
}
