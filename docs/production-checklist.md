# Production launch checklist

## Required before launch

- Link this repository to the Supabase project that actually serves the live domain, review every pending migration, run `supabase db push`, and deploy the `xray-plan` Edge Function.
- Create a named owner account, grant `super_admin`, verify login, then disable/delete the old shared demo account in Supabase Authentication. Rotate any password that has ever appeared in source control or chat.
- Confirm `media` is public and `xrays` is private. Test a CMS image upload, an anonymous X-ray request, staff annotation, token-based plan view, accept/reject, and deletion.
- Replace or verify clinic name, legal business name, address, email, phone, WhatsApp, working hours, social profiles, Google Maps embed and analytics IDs in CMS → Site Settings.
- Add only source-verifiable patient reviews. Record the source URL/date and publication permission. Do not seed invented testimonials or aggregate ratings.
- Publish before/after cases only when a signed patient release exists. Check both alt texts and ensure images contain no identifying data beyond the agreed release.
- Have a licensed clinician review all treatment benefits, risks, timelines, success rates, guarantees and price claims. Remove any statement that cannot be documented.
- Add Privacy, Cookie, Terms, Medical Disclaimer and Patient Image Consent pages appropriate to the clinic's legal entities and target markets. Configure a consent platform before loading non-essential analytics/advertising tags.
- Configure transactional email/notifications for new leads and X-ray requests; the database alone is not an operational alerting system.
- Configure automated Supabase backups, retention/deletion rules for leads and clinical images, and a tested restore procedure.

## Search and AI discovery

- Verify `https://temelcidentist.com/robots.txt`, `/sitemap.xml` and `/llms.txt` after the production build.
- Add and verify the domain in Google Search Console and Bing Webmaster Tools; submit the sitemap once and monitor coverage, canonical and structured-data reports.
- Check every published page has one H1, unique title/description, canonical, useful image alt text and no unsupported structured-data claims.
- Add redirects before changing a published slug. Keep retired content archived and redirect the old URL to the closest relevant page.
- Monitor Core Web Vitals and real-user errors after launch. Re-run Lighthouse on representative mobile pages after every major design change.

## Operations

- Use least-privilege roles: `super_admin`/`admin` for ownership and settings, `editor` for content, `doctor` for X-rays, `lead_manager` for enquiries and `viewer` for read-only access.
- Review access monthly and immediately remove former staff.
- Set uptime/error monitoring, dependency update automation and a monthly `npm audit`/migration review.
- Test mobile and desktop journeys: navigation, all forms, empty states, 404/noindex, media uploads and CMS CRUD.
