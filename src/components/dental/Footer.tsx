import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from './WhatsAppButton';
import { MapPin, Phone, Mail, Star, Clock, Shield } from 'lucide-react';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
              <Link to={localePath(`/${t.aboutSlug}#doctors`)}   onClick={scrollToTop} className={linkClass}>{t.ourTeam}</Link>
              <Link to={localePath(`/${t.beforeAfterSlug}`)}     onClick={scrollToTop} className={linkClass}>{t.beforeAfter}</Link>
              <Link to={localePath(`/${t.reviewsSlug}`)}         onClick={scrollToTop} className={linkClass}>{t.reviews}</Link>
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
