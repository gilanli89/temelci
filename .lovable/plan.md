
# Temelci CMS/CRM — Bug Fix + Production-Ready Refactor

## 1. Kritik Bug: "Access denied" (öncelik #1)

**Kök neden:** Önceki güvenlik düzeltmesinde `has_role()` fonksiyonundan `authenticated` rolünün EXECUTE izni kaldırıldı. Ama `user_roles` tablosunun SELECT RLS politikası `has_role()` çağırıyor. Sonuç: kullanıcı login oluyor, sonra kendi rolünü sorgulayamıyor → 403 → "Access denied".

**Ek sorun:** `demo@temelci.com` kullanıcısına hem `admin` hem `doctor` rolü atanmış (trigger yanlış çalışmış).

**Çözüm (tek migration):**
- `user_roles` SELECT policy'yi `has_role()` kullanmayacak şekilde yaz: kullanıcı sadece kendi satırlarını görsün → `USING (user_id = auth.uid())`. Admin yönetimi için ayrı policy: `USING (public.has_role(auth.uid(),'admin'))` — ama bu policy'nin çalışması için `authenticated`'e `has_role` üzerinde EXECUTE ver. Bu güvenli çünkü fonksiyon SECURITY DEFINER, sadece boolean döner, kullanıcı sadece kendi id'siyle kullanışlı sorgu yapabilir.
- Duplicate role temizle: demo kullanıcıdan `doctor` rolünü sil.
- `handle_new_user` ve `assign_default_role` trigger'larından biri fazla — sadece birini tut, diğerini drop et (şu an ikisi de var mı kontrol edilecek, sadece `handle_new_user` kalsın).

## 2. Admin Panel Kararlılığı

Mevcut admin sayfaları çalışıyor ama tutarsız. Şunları düzelt:
- **AdminAuthProvider**: role yüklenirken `isRoleLoading` state ile bekleme ekranı göster; role gelmeden "denied" redirect etme (şu an race condition var).
- **RequireAdmin / RequireDoctor**: loading state'i düzgün handle et.
- **Login sonrası redirect**: `?denied=1` bayrağını sadece gerçek denial'da göster.

## 3. CMS İçerik Yönetimi (kolay kullanım)

Kullanıcının şikayeti: "makaleler kolay eklenmeli, before/after kolay girilmeli". Şu iyileştirmeler:

### Blog / Posts
- **PostEditor**: 
  - Auto-save (her 10sn taslak olarak)
  - Slug otomatik başlıktan üretilsin (TR karakter destekli, zaten var → editable toggle)
  - Featured image için drag & drop
  - Kategori/tag alanı (basit, virgülle)
  - Publish / Draft toggle net gözüksün
  - Dil sekmeleri (EN/TR öncelik, diğerleri opsiyonel)
  - SEO score paneli sağda sabit
  - Preview butonu → yeni sekmede public post açar
- **PostsList**: arama, dil filtresi, status filtresi, hızlı publish/unpublish toggle, bulk delete.

### Before/After
- Tek formda: önce foto + sonra foto (yan yana drag & drop upload), tedavi seçimi (dropdown), hasta yaşı/notlar, öne çıkar toggle.
- Grid önizleme (before/after slider component).

### Treatments
- Featured image + galeri, fiyat aralığı, süre, kısa açıklama + rich text detay, ikon seçimi.
- Dil sekmeleri.

### Doctors
- Foto, isim, unvan, uzmanlık etiketleri, bio (rich text), sıralama.

### Media Library
- Grid görünüm, arama, kopyala-URL, sil, klasör (bucket) filtresi.

## 4. CRM — Lead Management

- **LeadsAdmin** yeniden tasarım: Kanban görünümü (New → Contacted → Won/Lost) + tablo görünümü toggle.
- Her lead'de: WhatsApp'a tek tık, email'e tek tık, not ekleme timeline, source tag.
- CSV export.
- Bildirim: yeni lead geldiğinde admin dashboard'da badge sayacı.

## 5. X-Ray Quote Workflow

Mevcut çalışıyor, sadece UX iyileştir:
- Doctor listesinde "pending review" filtresi default.
- Annotator'da undo/redo butonlarını mobil için büyüt.
- Hasta shared link sayfasında WhatsApp CTA daha belirgin.

## 6. Admin Dashboard (giriş sayfası)

Şu an boş. Şunları göster:
- Bu hafta: yeni lead sayısı, yeni x-ray talebi, yayınlanan post sayısı.
- Son 5 lead (hızlı erişim).
- Bekleyen x-ray teklifleri.
- Site ayarları/GTM durumu için hızlı linkler.

## 7. Doğrulama

- Playwright ile end-to-end test: login → dashboard → yeni post oluştur → publish → public tarafta gör → yeni lead oluştur (public form) → admin'de gör.
- Console/network log kontrolü.

## Teknik Notlar (geliştirici için)

- Tek migration: RLS policy fix + duplicate role temizlik + `has_role` GRANT EXECUTE to authenticated + gereksiz trigger drop.
- Frontend: `src/lib/adminAuth.tsx` içinde loading state refactor.
- Yeni komponent: `src/components/admin/DashboardStats.tsx`.
- Post editor auto-save: `useEffect` + debounce (300ms), draft flag ile.
- Kanban için `@dnd-kit/core` (zaten yoksa kurulacak) veya basit column-based UI (dependency eklemeden).

---

**Onaylarsan** tek seferde tüm bu değişiklikleri hatasız uygularım. Kritik bug fix ilk migration olarak gider, sonra frontend refactor + yeni özellikler paralel dosyalarla yazılır.
