import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const isUuid = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  try {
    const { token } = await request.json();
    if (!isUuid(token)) return new Response(JSON.stringify({ error: 'Invalid link' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { data: plan, error } = await supabase
      .from('xray_requests')
      .select('id,patient_name,status,currency,price_total,doctor_notes,annotated_image_url,xray_image_url')
      .eq('share_token', token)
      .in('status', ['quoted', 'sent', 'converted', 'accepted', 'rejected'])
      .maybeSingle();
    if (error) throw error;
    if (!plan) return new Response(JSON.stringify(null), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const { data: items, error: itemError } = await supabase
      .from('xray_treatment_items')
      .select('id,treatment_key,tooth_number,note,price,sort_order')
      .eq('request_id', plan.id)
      .order('sort_order');
    if (itemError) throw itemError;

    const sign = async (path: string | null) => {
      if (!path || /^https?:\/\//.test(path)) return path;
      const { data, error: signError } = await supabase.storage.from('xrays').createSignedUrl(path, 3600);
      if (signError) throw signError;
      return data.signedUrl;
    };

    const [xrayImage, annotatedImage] = await Promise.all([sign(plan.xray_image_url), sign(plan.annotated_image_url)]);
    return new Response(JSON.stringify({ ...plan, xray_image_url: xrayImage, annotated_image_url: annotatedImage, items: items ?? [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Plan unavailable' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
