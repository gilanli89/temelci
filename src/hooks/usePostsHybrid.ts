import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';

type PostTranslation = {
  title: string;
  excerpt: string | null;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  lang: string;
};

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
  focus_keyword: string | null;
  keywords: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  updated_at: string;
  language: string;
};

type PostWithTranslations = PostRow & { post_translations?: PostTranslation[] };

const selectFields = 'id,slug,title,excerpt,content,category,cover_image,featured_image,seo_title,seo_description,focus_keyword,keywords,tags,published_at,updated_at,language,post_translations(title,excerpt,body,meta_title,meta_description,focus_keyword,lang)';

const localizePost = (post: PostWithTranslations, lang: string): PostRow | null => {
  if (lang === 'en') {
    const { post_translations: _translations, ...base } = post;
    return base;
  }
  const translation = post.post_translations?.find(item => item.lang === lang);
  if (!translation) return null;
  const { post_translations: _translations, ...base } = post;
  return {
    ...base,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.body,
    seo_title: translation.meta_title,
    seo_description: translation.meta_description,
    focus_keyword: translation.focus_keyword,
    language: lang,
  };
};

export function usePostsFromDb() {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['posts-public', lang],
    queryFn: async (): Promise<PostRow[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select(selectFields)
        .eq('language', 'en')
        .eq('status', 'published')
        .eq('published', true)
        .is('deleted_at', null)
        .order('published_at', { ascending: false });
      if (error) throw error;
      return ((data || []) as unknown as PostWithTranslations[])
        .map(post => localizePost(post, lang))
        .filter((post): post is PostRow => Boolean(post));
    },
    staleTime: 60_000,
  });
}

export function usePostFromDb(slug: string | undefined) {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['post-public', lang, slug],
    enabled: !!slug,
    queryFn: async (): Promise<PostRow | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('posts')
        .select(selectFields)
        .eq('slug', slug)
        .eq('language', 'en')
        .eq('status', 'published')
        .eq('published', true)
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      return data ? localizePost(data as unknown as PostWithTranslations, lang) : null;
    },
    staleTime: 60_000,
  });
}
