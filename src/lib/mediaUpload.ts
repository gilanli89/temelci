import { supabase } from '@/integrations/supabase/client';

export async function uploadToBucket(bucket: 'media' | 'xrays', file: File, folder = 'general'): Promise<{ url: string; path: string }> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  // Signed URL with 10-year expiry (buckets are private but policies allow read).
  const { data, error: sErr } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (sErr) throw sErr;
  return { url: data.signedUrl, path };
}

export async function uploadDataUrl(bucket: 'media' | 'xrays', dataUrl: string, filename: string, folder = 'annotations') {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });
  return uploadToBucket(bucket, file, folder);
}
