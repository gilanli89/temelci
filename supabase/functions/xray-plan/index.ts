import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://temelcidentist.com',
  'https://www.temelcidentist.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.has(origin) ? origin : 'https://temelcidentist.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  Vary: 'Origin',
});

const isUuid = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

Deno.serve(async (request) => {
  const headers = corsHeaders(request.headers.get('origin'));
  if (request.method === 'OPTIONS') return new Response('ok', { headers });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers });

  try {
    const { token } = await request.json();
    if (!isUuid(token)) return new Response(JSON.stringify({ error: 'Invalid link' }), { status: 400, headers });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { data: plan, error } = await supabase
      .from('xray_requests')
      .select('id,patient_name,status,currency,price_total,doctor_notes,annotated_image_url,xray_image_url,plan_version,plan_expires_at')
      .eq('share_token', token)
      .in('status', ['ready', 'sent', 'accepted', 'rejected'])
      .maybeSingle();
    if (error) throw error;
    if (!plan || (plan.plan_expires_at && new Date(plan.plan_expires_at) <= new Date())) {
      return new Response(JSON.stringify(null), { status: 404, headers });
    }

    const { data: items, error: itemError } = await supabase
      .from('xray_treatment_items')
      .select('id,treatment_key,tooth_number,note,price,sort_order')
      .eq('request_id', plan.id)
      .order('sort_order');
    if (itemError) throw itemError;

    const { data: firstView } = await supabase
      .from('xray_requests')
      .update({ patient_viewed_at: new Date().toISOString() })
      .eq('id', plan.id)
      .is('patient_viewed_at', null)
      .select('id');
    if (firstView?.length) await supabase.from('xray_plan_events').insert({ request_id: plan.id, event_type: 'patient_viewed' });

    const sign = async (path: string | null) => {
      if (!path || /^https?:\/\//.test(path)) return path;
      const { data, error: signError } = await supabase.storage.from('xrays').createSignedUrl(path, 3600);
      if (signError) throw signError;
      return data.signedUrl;
    };

    const [xrayImage, annotatedImage] = await Promise.all([sign(plan.xray_image_url), sign(plan.annotated_image_url)]);
    return new Response(JSON.stringify({ ...plan, xray_image_url: xrayImage, annotated_image_url: annotatedImage, items: items ?? [] }), {
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Plan unavailable' }), { status: 500, headers });
  }
});
