import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://temelcidentist.com',
  'https://www.temelcidentist.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

const targetLanguageNames = {
  de: 'German',
  tr: 'Turkish',
  he: 'Hebrew',
  ru: 'Russian',
} as const;

type TargetLanguage = keyof typeof targetLanguageNames;

const jsonHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.has(origin) ? origin : 'https://temelcidentist.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  Vary: 'Origin',
});

const responseText = (payload: Record<string, unknown>) => {
  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    if (!item || typeof item !== 'object') continue;
    const content = Array.isArray((item as { content?: unknown[] }).content) ? (item as { content: unknown[] }).content : [];
    for (const part of content) {
      if (part && typeof part === 'object' && (part as { type?: string }).type === 'output_text') {
        return String((part as { text?: string }).text || '');
      }
    }
  }
  return '';
};

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  const headers = jsonHeaders(origin);
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
    const openAiKey = Deno.env.get('OPENAI_API_KEY') ?? '';
    if (!supabaseUrl || !anonKey || !serviceRoleKey || !openAiKey) throw new Error('Server configuration is incomplete');

    const token = authorization.slice('Bearer '.length);
    const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: userData, error: userError } = await authClient.auth.getUser(token);
    if (userError || !userData.user) return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401, headers });

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: roles, error: roleError } = await admin.from('user_roles').select('role').eq('user_id', userData.user.id);
    if (roleError) throw roleError;
    const allowedRoles = new Set(['super_admin', 'admin', 'editor', 'translator']);
    if (!(roles || []).some(({ role }) => allowedRoles.has(role))) {
      return new Response(JSON.stringify({ error: 'Editorial permission required' }), { status: 403, headers });
    }

    const body = await request.json();
    const postId = typeof body.postId === 'string' ? body.postId : '';
    const requested = Array.isArray(body.targetLanguages) ? body.targetLanguages : Object.keys(targetLanguageNames);
    const targetLanguages = [...new Set(requested.filter((language): language is TargetLanguage => language in targetLanguageNames))];
    if (!/^[0-9a-f-]{36}$/i.test(postId) || targetLanguages.length === 0) {
      return new Response(JSON.stringify({ error: 'A valid post and target language are required' }), { status: 400, headers });
    }

    const { data: post, error: postError } = await admin
      .from('posts')
      .select('id,title,excerpt,content,seo_title,seo_description,focus_keyword,updated_at')
      .eq('id', postId)
      .eq('language', 'en')
      .is('deleted_at', null)
      .maybeSingle();
    if (postError) throw postError;
    if (!post) return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404, headers });

    const model = Deno.env.get('OPENAI_TRANSLATION_MODEL') || 'gpt-5.4-mini';
    const schema = {
      type: 'object',
      additionalProperties: false,
      required: ['translations'],
      properties: {
        translations: {
          type: 'array',
          minItems: targetLanguages.length,
          maxItems: targetLanguages.length,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['language', 'title', 'excerpt', 'body', 'meta_title', 'meta_description', 'focus_keyword'],
            properties: {
              language: { type: 'string', enum: targetLanguages },
              title: { type: 'string' },
              excerpt: { type: 'string' },
              body: { type: 'string' },
              meta_title: { type: 'string' },
              meta_description: { type: 'string' },
              focus_keyword: { type: 'string' },
            },
          },
        },
      },
    };

    const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        reasoning: { effort: 'low' },
        instructions: [
          'You are a professional dental and medical content translator for Temelci Dental Clinic.',
          'Translate from English into every requested language. Do not add, remove, soften, or strengthen medical claims.',
          'Preserve all numbers, prices, durations, warnings, names, brand terms, URLs, and HTML tags/attributes exactly.',
          'Translate only human-readable text inside the HTML body. Keep the tone clear, natural, factual, and patient-friendly.',
          'Localize SEO title, meta description, and focus keyword for real search intent without keyword stuffing.',
          'Return exactly one translation for each requested language and no commentary.',
        ].join(' '),
        input: JSON.stringify({
          target_languages: targetLanguages.map(code => ({ code, name: targetLanguageNames[code] })),
          source: {
            title: post.title,
            excerpt: post.excerpt || '',
            body: post.content || '',
            meta_title: post.seo_title || post.title,
            meta_description: post.seo_description || post.excerpt || '',
            focus_keyword: post.focus_keyword || '',
          },
        }),
        text: { format: { type: 'json_schema', name: 'post_translations', strict: true, schema } },
      }),
    });

    const openAiPayload = await openAiResponse.json();
    if (!openAiResponse.ok) {
      console.error('OpenAI translation failed', openAiResponse.status, openAiPayload?.error?.code);
      throw new Error('Translation provider failed');
    }
    const output = responseText(openAiPayload);
    if (!output) throw new Error('Translation provider returned no text');
    const parsed = JSON.parse(output) as { translations: Array<Record<string, string>> };
    const received = new Set(parsed.translations.map(translation => translation.language));
    if (targetLanguages.some(language => !received.has(language))) throw new Error('Translation response was incomplete');

    const translatedAt = new Date().toISOString();
    const rows = parsed.translations.map(translation => ({
      post_id: post.id,
      lang: translation.language,
      title: translation.title,
      excerpt: translation.excerpt,
      body: translation.body,
      meta_title: translation.meta_title,
      meta_description: translation.meta_description,
      focus_keyword: translation.focus_keyword,
      translation_status: 'draft',
      source_updated_at: post.updated_at,
      translated_at: translatedAt,
      translation_model: model,
      reviewed_at: null,
      reviewed_by: null,
    }));
    const { error: upsertError } = await admin.from('post_translations').upsert(rows, { onConflict: 'post_id,lang' });
    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ translated: targetLanguages, status: 'draft', model }), { headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Translation failed' }), { status: 500, headers });
  }
});
