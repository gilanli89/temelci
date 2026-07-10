import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface KV { key: string; label: string; type?: 'text' | 'textarea'; hint?: string; }

const GROUPS: { title: string; items: KV[] }[] = [
  { title: 'Brand', items: [
    { key: 'brand_name', label: 'Clinic name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'address', label: 'Address', type: 'textarea' },
    { key: 'primary_language', label: 'Primary language' },
  ]},
  { title: 'Contact', items: [
    { key: 'phone', label: 'Phone (E.164)', hint: '+905391104212' },
    { key: 'whatsapp', label: 'WhatsApp (E.164)' },
    { key: 'email', label: 'Email' },
    { key: 'maps_embed_url', label: 'Google Maps embed URL', type: 'textarea' },
  ]},
  { title: 'Social', items: [
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'youtube', label: 'YouTube URL' },
    { key: 'tiktok', label: 'TikTok URL' },
    { key: 'google_maps', label: 'Google Maps profile URL' },
  ]},
  { title: 'Analytics & Tracking', items: [
    { key: 'gtm_id', label: 'Google Tag Manager ID', hint: 'GTM-XXXXXXX' },
    { key: 'ga4_id', label: 'GA4 measurement ID', hint: 'G-XXXXXXX' },
    { key: 'meta_pixel_id', label: 'Meta Pixel ID' },
    { key: 'custom_head', label: 'Custom <head> scripts', type: 'textarea', hint: 'Advanced — inserted verbatim in <head>' },
    { key: 'custom_body_end', label: 'Custom before </body>', type: 'textarea' },
  ]},
  { title: 'SEO defaults', items: [
    { key: 'default_seo_title', label: 'Default site title' },
    { key: 'default_seo_description', label: 'Default meta description', type: 'textarea' },
    { key: 'og_image', label: 'Default OG image URL' },
  ]},
];

export default function SettingsAdmin() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('key,value').then(({ data }) => {
      const v: Record<string, string> = {};
      (data || []).forEach((r: any) => {
        v[r.key] = typeof r.value === 'string' ? r.value : (r.value?.value ?? JSON.stringify(r.value ?? ''));
      });
      setValues(v);
    });
  }, []);

  async function save() {
    setSaving(true);
    const rows = Object.entries(values).map(([key, value]) => ({ key, value: value as any }));
    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    if (error) toast.error(error.message); else toast.success('Settings saved');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Site Settings</h1>
        <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save all changes'}</Button>
      </div>
      <div className="space-y-6">
        {GROUPS.map(g => (
          <Card key={g.title} className="p-5">
            <h2 className="font-semibold mb-4">{g.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.items.map(item => (
                <div key={item.key} className={item.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <Label>{item.label}</Label>
                  {item.type === 'textarea'
                    ? <Textarea rows={3} value={values[item.key] || ''} onChange={e => setValues(v => ({ ...v, [item.key]: e.target.value }))} />
                    : <Input value={values[item.key] || ''} onChange={e => setValues(v => ({ ...v, [item.key]: e.target.value }))} placeholder={item.hint} />}
                  {item.hint && <p className="text-[11px] text-muted-foreground mt-1">{item.hint}</p>}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
