## Amaç

Admin panelindeki Doctors, Blog Posts, Treatments, Before/After, Reviews, Research, FAQs listeleri şu an boş. Sitedeki mevcut statik içerikleri Supabase'e **birebir** taşıyıp admin'de görünür, editlenebilir ve silinebilir hâle getireceğim. Public site aynı içeriği DB'den okuyacak (yoksa mevcut statik fallback devam eder — hiçbir noktada site boşalmaz).

## Kapsam (Bu turda)

Mevcut frontend içeriğini bire bir DB'ye seed'lemek + admin listelerinin bu kayıtları göstermesi + public sayfaların DB'den okuması.

### 1. İçerik Envanteri → Seed

Statik dosyalardan çıkarılıp `INSERT ... ON CONFLICT DO NOTHING` ile tabloya yazılacak (tekrar çalıştırılabilir, mevcut kaydı bozmaz):

| İçerik | Kaynak dosya | Hedef tablo | Adet |
|---|---|---|---|
| Doktorlar | `src/pages/dental/AboutPage.tsx` (team array) | `doctors` (+ `doctor_translations` tr/en) | 4 |
| Blog yazıları | `src/pages/dental/BlogArticleData.tsx` (ARTICLE_CONTENT) | `posts` (+ `post_translations` tr/en, gövde dahil) | 9 |
| Tedaviler | `src/pages/dental/TreatmentsPage.tsx` + `TreatmentDetailPage.tsx` | `treatments` (+ `treatment_translations`) | mevcut kaç varsa (19'a kadar) |
| Tedavi kategorileri | Yukarıdakinden türetilir | `treatment_categories` | 4 |
| Before/After vakalar | `src/pages/dental/BeforeAfterPage.tsx` | `before_after` (+ `before_after_translations`) | mevcut adet |
| Reviews | `src/pages/dental/ReviewsPage.tsx` | `reviews` (+ `review_translations`) | mevcut adet |
| Research publications | `src/pages/dental/ResearchPage.tsx` | `research_publications` | mevcut adet |
| FAQs | `translations.ts` (faq1..faq6) | `faqs` (+ translations) | 6 |

Her kayıt `status='published'`, `sort_order` orijinal sırayı korur, mevcut görsel URL'leri (asset importları) `photo`/`image_url` kolonlarına yazılır.

### 2. Admin Panelleri

Mevcut admin sayfaları (`DoctorsAdmin`, `PostsList`, `TreatmentsAdmin`, `BeforeAfterAdmin`) zaten Supabase'e bağlı — seed sonrası kayıtlar otomatik görünecek. Eksik olan sayfaları ekleyeceğim:
- `ReviewsAdmin.tsx` — liste + create/edit/delete
- `FaqsAdmin.tsx` — liste + create/edit/delete
- `ResearchAdmin.tsx` — liste + create/edit/delete
- Sidebar'a bu 3 giriş eklenir

### 3. Public Site Hibrit Bağlama

React Query hook'ları eklenecek: `useDoctors`, `usePosts`, `useTreatments`, `useBeforeAfter`, `useReviews`, `useResearch`, `useFaqs`. Her hook: DB'den `status='published'` kayıtları çeker, boş dönerse mevcut statik içerik fallback. Şu sayfalar bu hook'lara geçer: `AboutPage`, `BlogPage`, `BlogArticlePage`, `TreatmentsPage`, `TreatmentDetailPage`, `BeforeAfterPage`, `ReviewsPage`, `ResearchPage`, `HomePage` (FAQ + featured bölümleri).

## Kapsam Dışı (Sonraki turda)

- Multi-locale editör sekmeleri (şu an tr+en seed'lenecek, diğer 5 dil EN fallback ile çalışır)
- Kanban CRM, users admin, sitemap otomasyonu (Faz 4-6)
- Revision history / audit log UI

## Teknik Notlar

- Seed **tek bir `supabase--insert` çağrısı** ile — schema değişmediği için migration değil.
- Görsel URL'leri: import edilmiş assetler için hashed build path bilinemez, o yüzden `/src/assets/xxx.jpg` referansı yerine `photo` kolonuna **existing asset yolu string** yazılır; frontend hook'u DB'den gelirse `<img src={row.photo}>` doğrudan render eder (assetler `/assets/` altına build edilecek şekilde `public/` referansına gerek yok — mevcut render zaten import yoluyla çalışıyor, hybrid hook DB kaydı yokken import edilmiş fallback'i döner).
- FK yok — mevcut şema kullanılıyor; sadece INSERT.
- Idempotent: her seed satırında `ON CONFLICT (slug) DO NOTHING` veya benzeri; tekrar çalıştırılabilir.

## Doğrulama

1. Admin'de Doctors listesinde 4 doktor görünür, birini editleyip Save → yenile → değişiklik kalır.
2. Admin'de Posts listesinde 9 makale görünür, biri "Published" durumda.
3. Public `/en/about` sayfasında aynı 4 doktor DB'den render olur.
4. Public `/en/blog` listesinde 9 makale DB'den render olur.
5. Admin'de bir doktoru silince public `/en/about` sayfasından da kalkar.

Onaylarsan build mode'a geç, uygulayayım.
