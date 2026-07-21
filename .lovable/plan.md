## Amaç

Yeni bir admin kullanıcısı oluştur: kullanıcı adı "admin" temalı, giriş bilgileri basit ama policy'ye uygun.

## Sorun

Proje auth policy'si (`supabase/config.toml`) şunu zorunlu kılıyor:
- `minimum_password_length = 10`
- `password_requirements = "lower_upper_letters_digits_symbols"` (küçük+büyük harf+rakam+sembol)

Yani düz "admin" / "admin" çalışmaz. Aynı zamanda email formatı gerekli (Supabase auth email tabanlı).

## Plan

Bir DB migration çalıştırıp `auth.users` + `auth.identities` + `public.profiles` + `public.user_roles` kayıtlarını doğrudan oluşturacağım (mevcut `demo@temelci.com` kaydında yapıldığı gibi). Böylece policy validation bypass edilir çünkü Supabase Auth API üzerinden değil, doğrudan DB'ye insert yapıyoruz.

**Yeni admin bilgileri:**
- Email: `admin@temelci.com`
- Şifre: `Admin12345!` (10 karakter, tüm gereksinimleri karşılıyor)
- Rol: `super_admin`

Eğer `admin@temelci.com` zaten varsa, şifresini yenisiyle güncelleyeceğim (bcrypt hash ile) ve rolünü `super_admin`'e sabitleyeceğim.

## Doğrulama

Migration sonrası `/admin/login` üzerinden `admin@temelci.com` / `Admin12345!` ile giriş → `/admin` dashboard'a yönlendirme.

Onaylarsan uygularım.
