
# Temelci Dental — Full CMS Admin Panel

Amaç: WordPress benzeri kolay bir yönetim paneli. Blog, doktorlar, treatments, before/after, X-ray teklif sistemi, SEO ve medya kütüphanesi — tek yerden.

## 1. Backend (Lovable Cloud)

Lovable Cloud aktif edilecek. Aşağıdaki tablolar oluşturulacak (hepsi RLS + grants ile):

- `profiles` (id, email, full_name, avatar_url, created_at)
- `user_roles` (user_id, role: `admin` | `doctor`) + `has_role()` security-definer fn
- `posts` — blog: slug, status (draft/published), featured_image, published_at, author_id, category, tags[]
- `post_translations` — post_id, lang, title, excerpt, body (HTML), meta_title, meta_description, focus_keyword, og_image
- `doctors` — slug, photo, order, active, whatsapp
- `doctor_translations` — doctor_id, lang, name, title, bio, credentials
- `treatments` — slug, category, featured_image, order, active, icon
- `treatment_translations` — treatment_id, lang, name, short_desc, body, meta_title, meta_description, focus_keyword
- `before_after` — slug, before_image, after_image, treatment_id, order, published
- `before_after_translations` — id, lang, title, description
- `leads` — name, email, phone, message, source (contact/whatsapp/xray), status, notes, created_at
- `xray_requests` — patient_name, email, phone, whatsapp, xray_image_url, status (new/reviewed/quoted/sent), doctor_notes, annotations (jsonb), price_total, currency, doctor_id, share_token (uuid), created_at
- `xray_treatment_items` — request_id, treatment_key, tooth_number, note, price
- `site_settings` — key/value (whatsapp_number, gtm_id, contact_email, address, social links, default og_image)
- `media` — path, url, alt, uploaded_by, folder

Storage buckets: `media` (public), `xrays` (private, signed URLs), `doctors` (public).

## 2. Auth & Rol

Email/şifre + Google girişi. İlk kayıt olan kullanıcı otomatik `admin` (trigger). Sonrakiler default `doctor`. Rol yönetimi admin panelinde.

- **Admin**: her şeyi görür/düzenler.
- **Doctor**: sadece `/admin/xrays` ve kendi profili.

## 3. Admin Panel — `/admin`

Sidebar layout (shadcn sidebar). Sayfalar:

```text
/admin
├── /              Dashboard (lead sayısı, yeni x-ray, son postlar)
├── /posts         Liste + Yeni Post
│   └── /:id/edit  WordPress-tarzı editör
├── /doctors       Liste + Ekle/Düzenle
├── /treatments    Liste + Ekle/Düzenle (featured image dahil)
├── /before-after  Liste + Ekle (before+after upload, treatment seç)
├── /leads         Tablo, filtre, status güncelleme, not
├── /xrays         Liste + detay (annotator + fiyat)
├── /media         Kütüphane (upload, sil, alt-text)
├── /settings      GTM, WhatsApp, email, adres, sosyal, default OG
├── /seo           Site-wide SEO (robots, sitemap trigger)
└── /users         Rol yönetimi (admin only)
```

## 4. WordPress-tarzı Post/Treatment Editörü

- **Rich text**: TipTap (heading, bold, italic, list, quote, link, image, code, HR).
- **Sekmeli tab**: EN (zorunlu) | TR (zorunlu) | GR/RU/AR/HE/DE (opsiyonel, boşsa EN fallback).
- **Featured image**: upload (Lovable AI ile generate butonu da var).
- **Inline image**: editör içine görsel ekle (upload veya AI generate).
- **AI asistan** (Lovable AI Gateway, `openai/gpt-5.5`):
  - "Taslak üret" → konu ver, tam makale yazar
  - "Meta description üret" → mevcut içerikten
  - "SEO başlık öner"
  - "Bu dile çevir" (opsiyonel dillerde 1-tık çeviri)
- **SEO Skor paneli** (sağ sidebar, canlı hesaplama):
  - Focus keyword (input)
  - Meta title (goal: 50–60 char) — bar + renk
  - Meta description (140–160 char)
  - Keyword başlıkta var mı?
  - Keyword ilk paragrafta var mı?
  - Keyword yoğunluğu (%0.5–2.5 ideal)
  - İç link sayısı, görsel alt-text kontrolü, kelime sayısı (min 300)
  - Toplam skor 0–100 (yeşil/sarı/kırmızı)
- **Yayın**: Draft / Published + `published_at`; slug otomatik title'dan (düzenlenebilir).
- **OG image**: featured'ı kullan veya ayrı yükle.

## 5. X-Ray Teklif Sistemi

### Hasta akışı (public)
`/xray-quote` sayfası — 7 dilde. Form: ad, telefon (WhatsApp), email opsiyonel, x-ray upload (jpg/png/pdf), şikayet notu. Submit → `xray_requests` (status=new), teşekkür mesajı + WhatsApp'a yönlendirme opsiyonu.

### Doktor akışı (admin)
`/admin/xrays/:id` — canvas tabanlı annotator:

- **Canvas**: `react-konva` üzerine kurulu. X-ray arka plan; üstüne pin/işaretler.
- **Tools**: 
  - Marker (pin) — diş no + treatment seç (implant, çekim, kanal, kron, veneer…) + fiyat
  - Serbest çizim (kalem) — açıklama için
  - Ok / Daire / Text
  - Renk seçici, kalınlık
- **Undo/Redo**: history stack (Ctrl+Z / Ctrl+Y ve buton).
- **Mobil UX**: touch-friendly, pinch-zoom, büyük toolbar butonları, alt tab-bar.
- **Treatment listesi paneli** (sağ): her marker bir satır → treatment, diş no, fiyat, not, sil.
- **Otomatik toplam** + currency (EUR/GBP/USD/TRY, ayarlardan).
- **Kaydet & Gönder**:
  - Annotasyonlu görseli export (Konva `toDataURL`) → storage'a yükle
  - `share_token` üret → public link `/xray-plan/:token` (login gerektirmez)
  - "WhatsApp gönder" butonu → hastanın numarasına önceden dolu mesaj (link + toplam)
  - "Email gönder" opsiyonu (Lovable Emails, email domain kuruluysa)
- Status: new → reviewed → quoted → sent.

### Public teklif sayfası `/xray-plan/:token`
Hasta linke tıklar: annotasyonlu x-ray, treatment tablosu, toplam fiyat, "WhatsApp ile onayla" butonu.

## 6. Frontend Entegrasyonu

Mevcut sayfalar CMS'e bağlanacak:
- `BlogPage`, `BlogArticlePage` → `posts` tablosundan (bugünkü statik data yerine).
- `TreatmentsPage`, `TreatmentDetailPage` → `treatments`.
- `BeforeAfterPage` → `before_after`.
- `AboutPage` team → `doctors`.
- WhatsApp / GTM / contact bilgileri → `site_settings` (build-time yerine runtime).

Fallback: DB boşsa mevcut statik içerik gösterilir (kesinti olmaz).

## 7. SEO Otomasyonu

- Her post/treatment publish edildiğinde `sitemap.xml` regenerate (edge function nightly + on-publish).
- JSON-LD `Article`, `MedicalProcedure`, `Dentist` şemaları otomatik enjekte.
- Meta tags react-helmet-async ile per-route (canonical, og, twitter).
- robots.txt admin'den düzenlenebilir.

## 8. Teknik detaylar

- **Editör**: `@tiptap/react` + extensions (starter-kit, image, link, placeholder).
- **Canvas**: `react-konva` + `konva`.
- **Forms**: react-hook-form + zod validation (mevcut).
- **Query**: tanstack-query (mevcut).
- **AI**: Supabase edge function `ai-writer` → Lovable AI Gateway.
- **File upload**: Supabase storage, resim thumbnail için client-side resize.
- **Realtime**: leads ve xray_requests için toast notification (Supabase realtime).

## 9. Teslim sırası

1. Cloud enable + tüm tablolar + storage + roller + ilk-admin trigger
2. Auth sayfaları (`/admin/login`) + `AdminLayout` + sidebar
3. `/admin/settings` + `site_settings` migration'a seed (mevcut WhatsApp/GTM)
4. `/admin/media` kütüphane
5. `/admin/posts` + TipTap editör + AI asistan + SEO skor
6. `/admin/doctors`, `/admin/treatments`, `/admin/before-after`
7. `/admin/leads` + contact form'ları `leads` tablosuna bağla
8. X-ray public form + `/admin/xrays` liste
9. X-ray annotator (Konva, undo/redo, mobil)
10. Public `/xray-plan/:token` + WhatsApp/email gönderim
11. Frontend'i DB'ye bağla (posts, treatments, doctors, before-after)
12. Sitemap otomasyonu + JSON-LD
13. `/admin/users` rol yönetimi
14. E2E test (Playwright) — admin login, post create, x-ray annotate

Kapsam büyük; sırayla ilerleyeceğim, her adımda çalışan bir şey göreceksin.
