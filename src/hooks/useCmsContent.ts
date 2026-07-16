import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Treatment = Tables<'treatments'>;
export type BeforeAfterCase = Tables<'before_after'>;
export type Review = Tables<'reviews'>;
export type Faq = Tables<'faqs'>;
export type SitePage = Tables<'site_pages'>;
export type TreatmentCategory = Tables<'treatment_categories'>;
export type SiteSettings = Record<string, string>;

const publicContentDefaults = {
  staleTime: 5 * 60_000,
  retry: 1,
} as const;

export function useTreatments() {
  return useQuery({
    queryKey: ['cms', 'treatments', 'en'],
    queryFn: async (): Promise<Treatment[]> => {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('language', 'en')
        .eq('active', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useTreatment(slug: string | undefined) {
  return useQuery({
    queryKey: ['cms', 'treatment', 'en', slug],
    enabled: Boolean(slug),
    queryFn: async (): Promise<Treatment | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', slug)
        .eq('language', 'en')
        .eq('active', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    ...publicContentDefaults,
  });
}

export function useTreatmentCategories() {
  return useQuery({
    queryKey: ['cms', 'treatment-categories'],
    queryFn: async (): Promise<TreatmentCategory[]> => {
      const { data, error } = await supabase
        .from('treatment_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useBeforeAfterCases(limit?: number) {
  return useQuery({
    queryKey: ['cms', 'before-after', 'en', limit ?? 'all'],
    queryFn: async (): Promise<BeforeAfterCase[]> => {
      let query = supabase
        .from('before_after')
        .select('*')
        .eq('language', 'en')
        .eq('published', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useReviews(limit?: number, featuredOnly = false) {
  return useQuery({
    queryKey: ['cms', 'reviews', 'en', limit ?? 'all', featuredOnly],
    queryFn: async (): Promise<Review[]> => {
      let query = supabase
        .from('reviews')
        .select('*')
        .eq('language', 'en')
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (featuredOnly) query = query.eq('featured', true);
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useFaqs(scope = 'global', scopeRef?: string) {
  return useQuery({
    queryKey: ['cms', 'faqs', 'en', scope, scopeRef ?? ''],
    queryFn: async (): Promise<Faq[]> => {
      let query = supabase
        .from('faqs')
        .select('*')
        .eq('language', 'en')
        .eq('scope', scope)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      query = scopeRef ? query.eq('scope_ref', scopeRef) : query.is('scope_ref', null);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useSitePage(slug: string) {
  return useQuery({
    queryKey: ['cms', 'site-page', 'en', slug],
    queryFn: async (): Promise<SitePage | null> => {
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .eq('language', 'en')
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    ...publicContentDefaults,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['cms', 'site-settings'],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase.from('site_settings').select('key,value');
      if (error) throw error;
      const settings: SiteSettings = {};
      // Import legacy grouped settings first.
      for (const row of data ?? []) {
        if (row.value && typeof row.value === 'object' && !Array.isArray(row.value)) {
          for (const [key, value] of Object.entries(row.value)) if (typeof value === 'string') settings[key] = value;
        }
      }
      // Flat CMS keys are authoritative and override legacy grouped values.
      for (const row of data ?? []) if (typeof row.value === 'string') settings[row.key] = row.value;
      return settings;
    },
    ...publicContentDefaults,
  });
}
