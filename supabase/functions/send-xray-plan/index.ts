import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://temelcidentist.com',
  'https://www.temelcidentist.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

const headersFor = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.has(origin) ? origin : 'https://temelcidentist.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  Vary: 'Origin',
});

const isUuid = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const safePhone = (phone: string) => phone.replace(/\D/g, '');

Deno.serve(async (request) => {
  const headers = headersFor(request.headers.get('origin'));
  if (request.method === 'OPTIONS') return new Response('ok', { headers });
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), { status: 401, headers });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    if (!supabaseUrl || !anonKey || !serviceRoleKey) throw new Error('Server configuration is incomplete');

    const token = authorization.slice('Bearer '.length);
    const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: userData, error: userError } = await authClient.auth.getUser(token);
    if (userError || !userData.user) return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401, headers });

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: roles, error: roleError } = await admin.from('user_roles').select('role').eq('user_id', userData.user.id);
    if (roleError) throw roleError;
    const roleNames = new Set((roles || []).map(({ role }) => role));
    if (!['super_admin', 'admin', 'doctor'].some(role => roleNames.has(role))) {
      return new Response(JSON.stringify({ error: 'Clinical permission required' }), { status: 403, headers });
    }

    const body = await request.json();
    if (!isUuid(body.requestId)) return new Response(JSON.stringify({ error: 'Invalid case' }), { status: 400, headers });

    const { data: plan, error: planError } = await admin
      .from('xray_requests')
      .select('id,patient_name,email,phone,status,doctor_id,share_token,plan_expires_at')
      .eq('id', body.requestId)
      .maybeSingle();
    if (planError) throw planError;
    if (!plan) return new Response(JSON.stringify({ error: 'Case not found' }), { status: 404, headers });
    const isAdmin = roleNames.has('admin') || roleNames.has('super_admin');
    if (!isAdmin && plan.doctor_id !== userData.user.id) {
      return new Response(JSON.stringify({ error: 'This case belongs to another dentist' }), { status: 403, headers });
    }
    if (!['ready', 'sent'].includes(plan.status)) {
      return new Response(JSON.stringify({ error: 'Save the completed plan before sending' }), { status: 409, headers });
    }

    const siteUrl = (Deno.env.get('PUBLIC_SITE_URL') || 'https://temelcidentist.com').replace(/\/$/, '');
    const shareUrl = `${siteUrl}/quote/${plan.share_token}`;
    const deliveryErrors: string[] = [];
    const delivered: string[] = [];

    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('XRAY_FROM_EMAIL');
    if (plan.email && resendKey && fromEmail) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `xray-plan-${plan.id}-${plan.share_token}` },
        body: JSON.stringify({
          from: fromEmail,
          to: [plan.email],
          subject: 'Your treatment plan is ready | Temelci Dental Clinic',
          html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#17324d"><h1 style="font-size:24px">Your treatment plan is ready</h1><p>Hello ${String(plan.patient_name).replace(/[<>&"']/g, '')},</p><p>Your dentist has completed the preliminary review of your X-ray. Use the secure link below to view the plan.</p><p><a href="${shareUrl}" style="display:inline-block;background:#0f766e;color:white;padding:12px 18px;border-radius:8px;text-decoration:none">View treatment plan</a></p><p style="font-size:12px;color:#64748b">This remote review is preliminary and does not replace an in-person clinical examination or CBCT assessment.</p></div>`,
        }),
      });
      if (emailResponse.ok) delivered.push('email');
      else deliveryErrors.push(`Email provider returned ${emailResponse.status}`);
    }

    const whatsappToken = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const whatsappPhoneId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const whatsappTemplate = Deno.env.get('WHATSAPP_XRAY_TEMPLATE');
    const whatsappGraphVersion = Deno.env.get('WHATSAPP_GRAPH_VERSION') || 'v25.0';
    if (whatsappToken && whatsappPhoneId && whatsappTemplate && safePhone(plan.phone)) {
      const whatsappResponse = await fetch(`https://graph.facebook.com/${whatsappGraphVersion}/${whatsappPhoneId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${whatsappToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: safePhone(plan.phone),
          type: 'template',
          template: {
            name: whatsappTemplate,
            language: { code: 'en_US' },
            components: [
              { type: 'body', parameters: [{ type: 'text', text: plan.patient_name }] },
              { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: plan.share_token }] },
            ],
          },
        }),
      });
      if (whatsappResponse.ok) delivered.push('whatsapp');
      else deliveryErrors.push(`WhatsApp provider returned ${whatsappResponse.status}`);
    }

    const deliveryStatus = delivered.length > 0
      ? deliveryErrors.length > 0 ? 'partial' : 'sent'
      : deliveryErrors.length > 0 ? 'failed' : 'pending';
    const channels = delivered.join(',') || null;
    const { error: updateError } = await admin.from('xray_requests').update({
      status: delivered.length > 0 ? 'sent' : 'ready',
      sent_at: delivered.length > 0 ? new Date().toISOString() : null,
      delivery_status: deliveryStatus,
      delivery_channel: channels,
      delivery_error: deliveryErrors.join('; ') || null,
    }).eq('id', plan.id);
    if (updateError) throw updateError;
    await admin.from('xray_plan_events').insert({
      request_id: plan.id,
      actor_id: userData.user.id,
      event_type: delivered.length > 0 ? 'plan_sent' : 'manual_delivery_required',
      metadata: { channels: delivered, delivery_status: deliveryStatus },
    });

    const whatsappText = encodeURIComponent(`Hello ${plan.patient_name}, your secure Temelci Dental treatment plan is ready: ${shareUrl}`);
    return new Response(JSON.stringify({
      delivered,
      deliveryStatus,
      shareUrl,
      manualWhatsAppUrl: `https://wa.me/${safePhone(plan.phone)}?text=${whatsappText}`,
      warning: delivered.length === 0 ? 'No automatic delivery provider is configured. Send the prepared WhatsApp message.' : null,
    }), { headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Plan delivery failed' }), { status: 500, headers });
  }
});
