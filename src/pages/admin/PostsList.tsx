import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string; title: string; slug: string; language: string;
  published: boolean; created_at: string; excerpt: string | null;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('id,title,slug,language,published,created_at,excerpt').order('created_at', { ascending: false });
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

  const filtered = posts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.slug.includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h1 className="font-display text-2xl font-bold">Blog Posts</h1>
        <Button asChild><Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" />New post</Link></Button>
      </div>
      <div className="relative mb-4 max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
      </div>
      <Card className="divide-y divide-border">
        {loading && <div className="p-6 text-center text-muted-foreground text-sm">Loading…</div>}
        {!loading && filtered.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-muted-foreground mb-4">No posts yet.</p>
            <Button asChild><Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" />Write your first post</Link></Button>
          </div>
        )}
        {filtered.map(p => (
          <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-secondary/30">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{p.title}</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-secondary">{p.language}</span>
                {p.published
                  ? <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Live</span>
                  : <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">Draft</span>}
              </div>
              <div className="text-xs text-muted-foreground truncate">/{p.language}/blog/{p.slug} · {new Date(p.created_at).toLocaleDateString()}</div>
            </div>
            {p.published && (
              <Button variant="ghost" size="icon" asChild><a href={`/${p.language}/blog/${p.slug}`} target="_blank"><ExternalLink className="w-4 h-4" /></a></Button>
            )}
            <Button variant="ghost" size="icon" asChild><Link to={`/admin/posts/${p.id}`}><Edit className="w-4 h-4" /></Link></Button>
            <Button variant="ghost" size="icon" onClick={() => del(p.id, p.title)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
