# SaaS roadmap: from pilot to multi-clinic product

The current release is intentionally a single-clinic pilot. Do not onboard a second dentist by copying rows into the same schema: tenant isolation must be designed first.

## Foundation before tenant two

1. Add `organizations`, `clinics`, `domains`, `memberships` and invitation tables. Every tenant-owned row and storage path must carry `organization_id`; enforce it with database constraints and RLS, not only frontend filters.
2. Replace global roles with membership-scoped roles. A user may be an owner in one clinic and a clinician or viewer in another.
3. Resolve the tenant from a verified custom domain/subdomain on the server. Cache branding and public content by tenant plus locale; prevent host-header spoofing.
4. Add immutable audit events and content revisions with author, timestamp, before/after values and restore support.
5. Separate public CMS media from private clinical files. Add per-tenant quotas, malware scanning, EXIF removal, retention and signed access logs.
6. Introduce reusable page/section templates and theme tokens without allowing arbitrary scripts. Keep clinical content structured enough to produce valid schema, sitemaps and accessible pages.
7. Build subscription plans, trials, billing state, feature entitlements, usage metering and a safe offboarding/export/deletion workflow.

## Product capabilities

- Guided clinic onboarding: domain, brand, contact details, clinicians, treatments, compliance pages, analytics consent and search verification.
- Content approval workflow: draft → clinical review → scheduled/published, with expiry/review dates for medical claims.
- Lead pipeline with assignment, notes, reminders, source attribution, consent history and integrations.
- Optional multilingual publishing only after English content is complete; each locale needs independent workflow, canonical/hreflang and translation QA.
- White-label themes, reusable treatment libraries, per-clinic overrides and centrally managed safe defaults.
- Reliability dashboard covering domains, certificates, sitemap freshness, broken links, form delivery, backups and storage usage.

## Non-negotiable tests

- Automated cross-tenant isolation tests for every table, RPC, function and storage policy.
- Authorization tests for every role and direct URL/API access, not only hidden navigation.
- Migration tests against a production-like database and rollback/restore drills.
- Accessibility, structured-data, canonical, sitemap, form abuse/rate-limit and mobile end-to-end tests.
