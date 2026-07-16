import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type DoctorRow = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo: string | null;
  specialties: string[] | null;
  sort_order: number | null;
};

export function useDoctorsFromDb() {
  return useQuery({
    queryKey: ['doctors-public'],
    queryFn: async (): Promise<DoctorRow[]> => {
      const { data, error } = await supabase
        .from('doctors')
        .select('id,slug,name,title,bio,photo,specialties,sort_order')
        .eq('active', true)
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data || []) as DoctorRow[];
    },
    staleTime: 60_000,
  });
}
