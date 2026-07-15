# Temelci Dental — Full CMS Migration Plan

Bu iş tek turda güvenli şekilde bitmez. Mevcut tasarım/içerik bozulmadan, gerçek Supabase backend'e bağlı, uçtan uca çalışan bir CMS için **fazlı** ilerleyeceğim. Her faz kendi başına test edilebilir ve deploy edilebilir olacak. Her faz sonunda sana onay için döneceğim.

## Genel Prensipler

- Mevcut public site tasarımı, route'ları, çevirileri, görselleri, slug'ları **korunacak** — sadece veri kaynağı statik dosyalardan Supabase'e taşınacak.
- Her migration **idempotent** (yeniden çalıştırılabilir), her seed mevcut kaydı `ON CONFLICT` ile korur.
- Public sayfalar önce statik fallback + Supabase okuma **hibrit** modda çalışacak; kayıt varsa DB'den, yoksa mevcut statik içerikten. Bu sayede hiçbir noktada site boşalmaz.
- Uydurma içerik yok. Eksik çeviri → EN fallback + admin'de "translation incomplete" işareti.
- Tüm tablolar RLS + explicit GRANT ile korunur. Anonymous sadece `published` içerik okur; `leads`/`xray_*` okuyamaz.

## Faz 0 — Denetim ve Temizlik (bu tur)

1. Mevcut auth bug'ının (rol yüklenmesi) tam kapandığını doğrula (Playwright ile `demo@temelci.com` login → `/admin` erişimi).
2. Mevcut statik içerik envanterini çıkar: `src/pages/dental/*`, `src/i18n/translations.ts`, `BlogArticleData.tsx`, treatment/doctor/review dizileri. Her birinin nerede tanımlı olduğunu belgele.
3. Mevcut Supabase şemasını (`treatments`, `doctors`, `posts`, `before_after`, `leads`, `xray_*`, `site_settings` + translation tabloları) mevcut kolonlarıyla listele → nelerin eksik olduğunu belirle.
4. Çıktı: kısa envanter raporu + Faz 1 için delta migration taslağı.

## Faz 1 — Şema Tamamlama + Seed Altyapısı

- Eksik tablolar: `locales`, `treatment_categories`, `blog_categories`, `research_publications` (+translations), `reviews` (+translations), `faqs` (+translations), `navigation_items`, `page_sections`, `redirects`, `content_revisions`, `audit_logs`, `lead_notes`, `lead_status_history`.
- Mevcut tablolara eksik kolonlar: `status` enum (`draft|in_review|scheduled|published|archived`), `sort_order`, `published_at`, `scheduled_at`, `deleted_at`, `created_by`, `updated_by`.
- Roles: mevcut `app_role` enum'a `super_admin`, `editor`, `translator`, `lead_manager`, `viewer` ekle. `has_role` + yeni `has_any_role` helper.
- RLS: her tablo için published-only anon SELECT, role-bazlı authenticated CRUD. Explicit GRANT'ler.
- Idempotent seed migration (mevcut statik içerikten): 19 treatment + kategoriler, 5 doctor, 9 blog post (body dahil), 10 research publication, 29 before/after, 10 review, tüm FAQ'lar, site_settings, navigation.

## Faz 2 — Public Site'i Supabase'e Bağla (Hibrit)

- Her public sayfa için React Query hook'ları (`useTreatments`, `useTreatment(slug)`, `useDoctors`, `usePosts`, `useResearch`, `useBeforeAfter`, `useReviews`, `useFaqs`, `useSiteSettings`).
- Data yoksa mevcut statik içerik fallback — site asla boş görünmez.
- Locale routing korunur; slug DB'den okunur, mevcut route yapısı bozulmaz.
- Home/Treatments/Doctors/Blog/Research/Before-After/Reviews/Our Clinic/Dental Tourism/Contact sırayla bağlanır.

## Faz 3 — Admin CMS (Content CRUD)

- Mevcut `/admin` layout üzerine kurulur (yeniden yazılmaz).
- Her entity için: List (arama, filtre, bulk action, drag-drop sort), Editor (locale sekmeleri, draft/publish/schedule, revision history, preview link, SEO paneli, media picker).
- TipTap editor mevcut; genişlet: image caption, embed, table, code, YouTube.
- Auto-save (mevcut PostEditor'daki gibi) her editöre yayılır.
- Media Library: bucket'lar arası, tag, alt text (locale), kopyala-URL, sil.
- Translation dashboard: eksik çeviriler listesi, translator rolü sadece atanan locale'i düzenler.

## Faz 4 — CRM (Leads + X-Ray Quotes)

- Leads: Kanban (`new → contacted → qualified → won → lost`), tablo görünümü toggle, timeline (notes + status history), WhatsApp/email tek tık, CSV export, source filtre, atama.
- Bildirim: yeni lead → admin dashboard badge (Supabase Realtime).
- X-Ray: mevcut annotator korunur; doctor listesinde "pending" default, mobil undo/redo büyütülür, patient shared link WhatsApp CTA güçlendirilir.

## Faz 5 — Users & Roles + Ayarlar

- Users admin: davet et, rol ata, locale ata (translator için), askıya al, sil.
- Site Settings: brand, iletişim, çalışma saatleri, sosyal, GTM/GA, WhatsApp mesajları (locale bazlı), navigation editor, redirects, JSON-LD şablonları.
- Audit log görünümü.

## Faz 6 — SEO, Sitemap, Publish

- Dinamik `sitemap.xml` (Edge Function veya build-time) — DB'deki published + slug'lardan üretilir, 8 dil × tüm entity'ler.
- Per-route `<Helmet>` head (title, description, canonical, hreflang, og, JSON-LD).
- `robots.txt` güncellenir; `redirects` tablosu 301 için (SPA router + hosting kuralları).
- Rescan → SEO findings sıfırla.

## Faz 7 — Uçtan Uca Test

- Playwright: login → post yaz → publish → 8 dilde public'te gör → lead gönder → admin'de gör → x-ray upload → doctor quote → patient accept.
- Console/network temiz. Lighthouse ≥ 90 (mobile).

## Teknik Notlar

- Migration'lar `supabase/migrations/` altında versioned. Her CREATE TABLE → GRANT → RLS → POLICY sırası.
- Public/protected ayrımı: anon = `status='published' AND deleted_at IS NULL AND (scheduled_at IS NULL OR scheduled_at <= now())`.
- Reviser/publisher trigger'ları `updated_by = auth.uid()` set eder.
- Realtime yalnızca `leads` ve `xray_requests` için.

---

## Şimdi Senden

Bu 7 fazlık plan doğru mu? Onay verirsen **Faz 0 + Faz 1** ile başlıyorum (envanter + delta migration + idempotent seed). Bu iki fazın sonunda public site hâlâ mevcut halinde çalışır olacak ama artık DB'de tüm gerçek içerik durur. Sonra faz faz ilerleriz.

Alternatif: "sadece şu faz(lar)ı yap" dersen ona göre daralttırım.
