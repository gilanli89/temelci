import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Copy, Trash2 } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';
import type { Tables } from '@/integrations/supabase/types';

type Item = Tables<'media'>;

export default function MediaLibrary() {
  const [items, setItems] = useState<Item[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false }).limit(200);
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    for (const f of files) {
      try {
        const { url, path } = await uploadToBucket('media', f, 'library');
        const { error } = await supabase.from('media').insert({ url, alt: f.name, folder: 'library', size_bytes: f.size, mime_type: f.type, path });
        if (error) throw error;
      } catch (error) { toast.error(`${f.name}: ${error instanceof Error ? error.message : 'upload failed'}`); }
    }
    toast.success(`${files.length} file(s) uploaded`);
    if (fileRef.current) fileRef.current.value = '';
    load();
  }

  async function del(item: Item) {
    if (!confirm('Delete this file?')) return;
    const { error: storageError } = await supabase.storage.from('media').remove([item.path]);
    if (storageError) return toast.error(storageError.message);
    const { error } = await supabase.from('media').delete().eq('id', item.id);
    if (error) return toast.error(error.message);
    toast.success('File deleted');
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Media Library</h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:opacity-90">
          <Upload className="w-4 h-4" /> Upload files
          <input ref={fileRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={upload} />
        </label>
      </div>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map(m => (
          <Card key={m.id} className="p-2 group relative">
            {m.url.match(/\.(png|jpe?g|webp|gif|svg)/i)
              ? <img src={m.url} alt={m.alt || ''} className="w-full aspect-square object-cover rounded" />
              : <div className="w-full aspect-square rounded bg-secondary grid place-items-center text-xs text-muted-foreground p-2 text-center break-all">{m.alt}</div>}
            <p className="text-[10px] text-muted-foreground mt-1 truncate">{m.alt}</p>
            <div className="absolute inset-x-2 bottom-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <Button size="icon" variant="secondary" className="h-7 w-7"
                onClick={() => { navigator.clipboard.writeText(m.url); toast.success('URL copied'); }}>
                <Copy className="w-3 h-3" />
              </Button>
              <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => del(m)}>
                <Trash2 className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="col-span-full text-center text-muted-foreground py-10">No media yet.</p>}
      </div>
    </div>
  );
}
