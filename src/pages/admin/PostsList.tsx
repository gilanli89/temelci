import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string; title: string; slug: string; language: string;
  published: boolean; created_at: string; excerpt: string | null;
}

const LANGS = ['all', 'en', 'tr', 'el', 'ru', 'ar', 'he', 'de'];

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [lang, setLang] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('id,title,slug,language,published,created_at,excerpt')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Deleted'); load(); }
  }

  async function togglePublish(p: Post) {
    const next = !p.published;
    const { error } = await supabase.from('posts').update({
      published: next,
      status: next ? 'published' : 'draft',
      published_at: next ? new Date().toISOString() : null,
    }).eq('id', p.id);
    if (error) toast.error(error.message);
    else {
      toast.success(next ? 'Published' : 'Unpublished');
      setPosts(ps => ps.map(x => x.id === p.id ? { ...x, published: next } : x));
    }
  }

  const filtered = posts.filter(p => {
    if (status === 'published' && !p.published) return false;
    if (status === 'draft' && p.published) return false;
    if (lang !== 'all' && p.language !== lang) return false;
    const s = q.toLowerCase();
    if (s && !p.title.toLowerCase().includes(s) && !p.slug.includes(s)) return false;
    return true;
  });

  const counts = {
    all: posts.length,
    published: posts.filter(p => p.published).length,
    draft: posts.filter(p => !p.published).length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h1 className="font-display text-2xl font-bold">Blog Posts</h1>
        <Button asChild><Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" />New post</Link></Button>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['all', 'published', 'draft'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              status === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-secondary'
            }`}
          >
            {s === 'all' ? 'All' : s === 'published' ? 'Published' : 'Drafts'}
            <span className="ml-1.5 opacity-70">{counts[s]}</span>
          </button>
        ))}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search title or slug…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
        </div>
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {LANGS.map(l => <SelectItem key={l} value={l}>{l === 'all' ? 'All languages' : l.toUpperCase()}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="divide-y divide-border">
        {loading && <div className="p-6 text-center text-muted-foreground text-sm">Loading…</div>}
        {!loading && filtered.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-muted-foreground mb-4">
              {posts.length === 0 ? 'No posts yet.' : 'No posts match these filters.'}
            </p>
            {posts.length === 0 && (
              <Button asChild><Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" />Write your first post</Link></Button>
            )}
          </div>
        )}
        {filtered.map(p => (
          <div key={p.id} className="p-4 flex items-center gap-3 hover:bg-secondary/30">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/admin/posts/${p.id}`} className="font-semibold truncate hover:underline">{p.title}</Link>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-secondary">{p.language}</span>
                {p.published
                  ? <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Live</span>
                  : <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">Draft</span>}
              </div>
              <div className="text-xs text-muted-foreground truncate">/{p.language}/blog/{p.slug} · {new Date(p.created_at).toLocaleDateString()}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePublish(p)}
              title={p.published ? 'Unpublish' : 'Publish'}
            >
              {p.published ? <><EyeOff className="w-4 h-4 mr-1" />Unpublish</> : <><Eye className="w-4 h-4 mr-1" />Publish</>}
            </Button>
            {p.published && (
              <Button variant="ghost" size="icon" asChild title="Open on site">
                <a href={`/${p.language}/blog/${p.slug}`} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4" /></a>
              </Button>
            )}
            <Button variant="ghost" size="icon" asChild title="Edit"><Link to={`/admin/posts/${p.id}`}><Edit className="w-4 h-4" /></Link></Button>
            <Button variant="ghost" size="icon" onClick={() => del(p.id, p.title)} title="Delete"><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
