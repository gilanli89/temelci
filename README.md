# Temelci Dental

English-first dental website and content management pilot for Temelci Dental Clinic. The public site is a React/Vite application backed by Supabase; the private CMS manages pages, blog posts, treatments, doctors, reviews, FAQs, before/after cases, media, leads and X-ray quote workflows.

## Local development

Requirements: Node.js 20.19 or newer and npm.

```sh
cp .env.example .env
npm ci
npm run dev
```

Required environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SITE_URL` for sitemap and `llms.txt` generation

Never put a service-role key in a `VITE_` variable or commit it to the repository.

## Quality checks

```sh
npm run build
npm run test
npm run lint
npm audit
```

The production build regenerates `public/sitemap.xml` and `public/llms.txt` from published English content before bundling. Route-level code splitting keeps the public bundle separate from the rich text editor and X-ray annotation tools.

## Supabase deployment

Link the correct project before applying any remote change:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy xray-plan --no-verify-jwt
```

Create named staff accounts in Supabase Authentication, then assign the minimum role in CMS → Users & Roles. Public self-registration and shared demo credentials are intentionally disabled.

See `docs/production-checklist.md` before launch and `docs/saas-roadmap.md` before introducing a second clinic.
