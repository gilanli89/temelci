import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from './WhatsAppButton';
import { MapPin, Phone, Mail, Star, Clock, Shield } from 'lucide-react';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

export const Footer = () => {
  const { t, lang, localePath } = useLanguage();

  const linkClass = "block text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200 py-0.5";
  const headingClass = "text-xs font-bold uppercase tracking-widest opacity-40 mb-4";

  return (
    <footer className="bg-foreground text-background">

      {/* ── Trust bar ── */}
      <div className="border-b border-background/10">
        <div className="container-dental px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs opacity-60">
            <span className="flex items-center gap-2"><Star className="h-3.5 w-3.5 fill-current text-amber-400 opacity-100" /> 4.9/5 · 150+ Reviews</span>
            <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> Written Treatment Guarantee</span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Est. 1990 · 180 Yrs Combined Exp.</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Kyrenia, North Cyprus</span>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="px-4 py-16 md:px-8 lg:px-16">
        <div className="container-dental grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to={localePath('')} onClick={scrollToTop} className="inline-flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-display font-black text-background">Temelci</span>
              <span className="text-xs font-body opacity-40 uppercase tracking-widest">Dental</span>
            </Link>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs mb-6">
              {t.heroDescription}
            </p>
            {/* Contact block — semantic for SEO */}
            <address className="not-italic space-y-2.5 mb-6">
              <a
                href="https://maps.google.com/?q=Temelci+Dental+Girne"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t.contactAddress}</span>
              </a>
              <a href={`tel:${t.contactPhone.replace(/\s/g,'')}`}
                className="flex items-center gap-2.5 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{t.contactPhone}</span>
              </a>
              <a href={`mailto:${t.contactEmail}`}
                className="flex items-center gap-2.5 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t.contactEmail}</span>
              </a>
            </address>
            <WhatsAppButton text={t.bookWhatsApp} />

            {/* Social media icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/dentaltemelci/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Temelci Dental Instagram"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-pink-500 flex items-center justify-center transition-colors group"
              >
                {/* Instagram SVG */}
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/p/Temelci-61577466848604/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Temelci Dental Facebook"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-blue-600 flex items-center justify-center transition-colors group"
              >
                {/* Facebook SVG */}
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <span className="text-xs opacity-40 ml-1">@dentaltemelci</span>
            </div>
          </div>

          {/* Treatments col */}
          <div>
            <p className={headingClass}>{t.treatments}</p>
            <nav aria-label="Treatments">
              <Link to={localePath(`/${t.hollywoodSmileSlug}`)}     onClick={scrollToTop} className={linkClass}>{t.hollywoodSmile}</Link>
              <Link to={localePath(`/${t.implantsSlug}`)}            onClick={scrollToTop} className={linkClass}>{t.dentalImplants}</Link>
              <Link to={localePath(`/${t.veneersSlug}`)}             onClick={scrollToTop} className={linkClass}>{t.veneers}</Link>
              <Link to={localePath(`/${t.crownsSlug}`)}              onClick={scrollToTop} className={linkClass}>{t.crowns}</Link>
              <Link to={localePath(`/${t.zirconiaCrownsSlug}`)}      onClick={scrollToTop} className={linkClass}>{t.zirconiaCrowns}</Link>
              <Link to={localePath(`/${t.teethWhiteningSlug}`)}      onClick={scrollToTop} className={linkClass}>{t.teethWhitening}</Link>
              <Link to={localePath(`/${t.smileMakeoverSlug}`)}       onClick={scrollToTop} className={linkClass}>{t.smileMakeover}</Link>
              <Link to={localePath(`/${t.fullMouthRestorationSlug}`)} onClick={scrollToTop} className={linkClass}>{t.fullMouthRestoration}</Link>
              <Link to={localePath(`/${t.treatmentsSlug}`)}          onClick={scrollToTop} className="block text-xs text-primary opacity-80 hover:opacity-100 transition-opacity mt-2 pt-2 border-t border-background/10">
                {lang === 'tr' ? 'Tüm Tedaviler →' : 'All Treatments →'}
              </Link>
            </nav>
          </div>

          {/* Clinic col */}
          <div>
            <p className={headingClass}>{lang === 'tr' ? 'Klinik' : 'Clinic'}</p>
            <nav aria-label="Clinic pages">
              <Link to={localePath(`/${t.ourClinicSlug}`)}       onClick={scrollToTop} className={linkClass}>{t.ourClinic}</Link>
              <Link to={localePath(`/${t.aboutSlug}#doctors`)}   className={linkClass}>{t.ourTeam}</Link>
              <Link to={localePath(`/${t.beforeAfterSlug}`)}     onClick={scrollToTop} className={linkClass}>{t.beforeAfter}</Link>
              <Link to={localePath(`/${t.reviewsSlug}`)}         onClick={scrollToTop} className={linkClass}>{t.reviews}</Link>
              <Link to={localePath(`/${t.blogSlug}`)}             onClick={scrollToTop} className={linkClass}>{t.blog}</Link>
              <Link to={localePath(`/${t.aboutSlug}`)}           onClick={scrollToTop} className={linkClass}>{t.about}</Link>
              <Link to={localePath(`/${t.contactSlug}`)}         onClick={scrollToTop} className={linkClass}>{t.contact}</Link>
            </nav>

            <p className={`${headingClass} mt-8`}>{lang === 'tr' ? 'Diş Turizmi' : 'Tourism'}</p>
            <nav aria-label="Dental tourism">
              <Link to={localePath(`/${t.dentalTourismSlug}`)}   onClick={scrollToTop} className={linkClass}>{t.dentalTourism}</Link>
              <Link to={localePath('/landing')}                  onClick={scrollToTop} className={linkClass}>
                {lang === 'tr' ? 'Ücretsiz Teklif Al' : 'Free Quote'}
              </Link>
              <Link to={localePath('/landing/hollywood-smile')}  onClick={scrollToTop} className={linkClass}>
                {lang === 'tr' ? 'Hollywood Smile Paketi' : 'Hollywood Smile Package'}
              </Link>
              <Link to={localePath('/landing/allon4')}           onClick={scrollToTop} className={linkClass}>
                {lang === 'tr' ? 'All-on-4 Paketi' : 'All-on-4 Package'}
              </Link>
            </nav>
          </div>

          {/* Doctors col */}
          <div>
            <p className={headingClass}>{lang === 'tr' ? 'Hekimlerimiz' : 'Our Doctors'}</p>
            <nav aria-label="Our doctors">
              {[
                { name: 'DT. Nural Temelci',          anchor: 'nural-temelci' },
                { name: 'DR. Ali Temelci',             anchor: 'ali-temelci' },
                { name: 'DT. Rasih Denktaş Çelebi',   anchor: 'rasih' },
                { name: 'DT. Yaşkan Uğurlu',          anchor: 'yaskan' },
                { name: 'DR. DT. Şerife Köle',        anchor: 'serife' },
                { name: 'DT. Anna Zubtcovskaia',       anchor: 'anna' },
              ].map(doc => (
                <Link
                  key={doc.anchor}
                  to={localePath(`/${t.aboutSlug}#doctors`)}
                  onClick={scrollToTop}
                  className={linkClass}
                >
                  {doc.name}
                </Link>
              ))}
              <Link to="/en/dr-serife-kole" onClick={scrollToTop}
                className="block text-xs text-primary opacity-80 hover:opacity-100 transition-opacity mt-2 pt-2 border-t border-background/10">
                Dr. Şerife Köle Profile →
              </Link>
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="container-dental mt-14 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-40">
            <p>© {new Date().getFullYear()} Temelci Dental Clinic. {t.footerRights}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span>Kyrenia (Girne), North Cyprus</span>
              <span>·</span>
              <a href="mailto:info@temelcidentist.com" className="hover:opacity-80 transition-opacity">info@temelcidentist.com</a>
              <span>·</span>
              <span>{t.privacyPolicy}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
