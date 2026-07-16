import { supabase } from '@/integrations/supabase/client';

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export async function uploadToBucket(bucket: 'media' | 'xrays', file: File, folder = 'general'): Promise<{ url: string; path: string }> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error('Use a JPG, PNG, WebP or AVIF image.');
  if (file.size > MAX_FILE_SIZE) throw new Error('Images must be smaller than 15 MB.');

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: bucket === 'media' ? '31536000' : '3600',
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  if (bucket === 'media') {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { url: data.publicUrl, path };
  }

  // Clinical images stay private. Persist the object path, never a long-lived
  // bearer URL. Staff and token-scoped patient views resolve short-lived URLs.
  return { url: path, path };
}

export async function uploadDataUrl(bucket: 'media' | 'xrays', dataUrl: string, filename: string, folder = 'annotations') {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });
  return uploadToBucket(bucket, file, folder);
}
