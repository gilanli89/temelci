import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  cover_image: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  keywords: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  language: string;
};

export function usePostsFromDb() {
  return useQuery({
    queryKey: ['posts-public'],
    queryFn: async (): Promise<PostRow[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select('id,slug,title,excerpt,content,category,cover_image,featured_image,seo_title,seo_description,keywords,tags,published_at,language')
        .eq('language', 'en')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('published_at', { ascending: false });
      if (error) throw error;
      return (data || []) as PostRow[];
    },
    staleTime: 60_000,
  });
}

export function usePostFromDb(slug: string | undefined) {
  return useQuery({
    queryKey: ['post-public', slug],
    enabled: !!slug,
    queryFn: async (): Promise<PostRow | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('posts')
        .select('id,slug,title,excerpt,content,category,cover_image,featured_image,seo_title,seo_description,keywords,tags,published_at,language')
        .eq('slug', slug)
        .eq('language', 'en')
        .eq('status', 'published')
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      return (data || null) as PostRow | null;
    },
    staleTime: 60_000,
  });
}
