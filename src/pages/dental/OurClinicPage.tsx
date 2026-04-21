import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { X, ChevronLeft, ChevronRight, MapPin, Phone, Scan, FlaskConical, Monitor, Camera, Zap, Star, Building2 } from 'lucide-react';

import room1 from '@/assets/clinic/clinic_room1.jpg';
import room2 from '@/assets/clinic/clinic_room2.jpg';
import room3 from '@/assets/clinic/clinic_room3.jpg';
import room4 from '@/assets/clinic/clinic_room4.jpg';
import ctScan from '@/assets/clinic/clinic_ct.jpg';
import heroImg from '@/assets/hero-clinic.jpg';
import doctorPortrait from '@/assets/doctor-portrait.jpg';

const GALLERY = [
  { src: room1, label: { en: 'Treatment Suite 1', tr: 'Muayene Odası 1', el: 'Αίθουσα Θεραπείας 1', ru: 'Кабинет 1', ar: 'غرفة العلاج 1', he: 'חדר טיפולים 1', de: 'Behandlungszimmer 1', fa: 'اتاق درمان ۱' } },
  { src: room2, label: { en: 'Treatment Suite 2', tr: 'Muayene Odası 2', el: 'Αίθουσα Θεραπείας 2', ru: 'Кабинет 2', ar: 'غرفة العلاج 2', he: 'חדר טיפולים 2', de: 'Behandlungszimmer 2', fa: 'اتاق درمان ۲' } },
  { src: room3, label: { en: 'Treatment Suite 3', tr: 'Muayene Odası 3', el: 'Αίθουσα Θεραπείας 3', ru: 'Кабинет 3', ar: 'غرفة العلاج 3', he: 'חדר טיפולים 3', de: 'Behandlungszimmer 3', fa: 'اتاق درمان ۳' } },
  { src: room4, label: { en: 'Treatment Suite 4', tr: 'Muayene Odası 4', el: 'Αίθουσα Θεραπείας 4', ru: 'Кабинет 4', ar: 'غرفة العلاج 4', he: 'חדר טיפולים 4', de: 'Behandlungszimmer 4', fa: 'اتاق درمان ۴' } },
  { src: ctScan, label: { en: 'NewTom 3G CBCT Scanner', tr: 'NewTom 3G CBCT Tarayıcı', el: 'Scanner CBCT NewTom 3G', ru: 'КТ-сканер NewTom 3G', ar: 'ماسح CBCT نيوتوم 3G', he: 'סורק CBCT NewTom 3G', de: 'NewTom 3G CBCT-Scanner', fa: 'اسکنر CBCT نیوتام ۳G' } },
];

const TECH = [
  { icon: Scan,        en: 'NewTom 3G CBCT', tr: 'NewTom 3G CBCT',        note: { en: '3D cone-beam CT imaging', tr: '3B konik ışın BT görüntüleme' } },
  { icon: Monitor,     en: 'CAD/CAM Design', tr: 'CAD/CAM Tasarım',       note: { en: 'Digital smile planning', tr: 'Dijital gülüş planlaması' } },
  { icon: FlaskConical,en: 'In-House Lab',   tr: 'Bünyemizde Laboratuvar',note: { en: 'Full ceramic lab on-site', tr: 'Yerinde seramik laboratuvar' } },
  { icon: Zap,         en: 'Digital X-Ray',  tr: 'Dijital Röntgen',       note: { en: 'Low-dose instant imaging', tr: 'Düşük doz anlık görüntü' } },
  { icon: Camera,      en: 'Intraoral Camera',tr: 'İntraoral Kamera',     note: { en: 'Live tooth-by-tooth preview', tr: 'Canlı diş önizlemesi' } },
  { icon: Star,        en: 'Straumann Implants', tr: 'Straumann İmplant', note: { en: 'Swiss precision, global benchmark', tr: 'İsviçre hassasiyeti' } },
];

const STATS = [
  { value: '1990', label: { en: 'Founded', tr: 'Kuruluş', el: 'Ιδρύθηκε', ru: 'Основана', ar: 'تأسست', he: 'נוסדה', de: 'Gegründet', fa: 'تأسیس' } },
  { value: '6', label: { en: 'Specialists', tr: 'Uzman Hekim', el: 'Ειδικοί', ru: 'Специалистов', ar: 'متخصصون', he: 'מומחים', de: 'Spezialisten', fa: 'متخصص' } },
  { value: '4', label: { en: 'Treatment Rooms', tr: 'Muayene Odası', el: 'Αίθουσες', ru: 'Кабинетов', ar: 'غرف علاج', he: 'חדרי טיפול', de: 'Behandlungszimmer', fa: 'اتاق درمان' } },
  { value: '127+', label: { en: 'Years Experience', tr: 'Yıl Deneyim', el: 'Χρόνια Εμπειρίας', ru: 'Лет Опыта', ar: 'سنة خبرة', he: 'שנות ניסיון', de: 'Jahre Erfahrung', fa: 'سال تجربه' } },
];

type LangKey = 'en' | 'tr' | 'el' | 'ru' | 'ar' | 'he' | 'de' | 'fa';

const OurClinicPage = () => {
  const { t, lang, localePath } = useLanguage();
  const l = (lang as LangKey) in GALLERY[0].label ? (lang as LangKey) : 'en';
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => { setLightbox(i); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { setLightbox(null); document.body.style.overflow = ''; };
  const prev = () => lightbox !== null && setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length);
  const next = () => lightbox !== null && setLightbox((lightbox + 1) % GALLERY.length);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img src={heroImg} alt="Temelci Dental Clinic" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-5 uppercase tracking-wider backdrop-blur-sm">
              <Building2 className="h-3.5 w-3.5" />
              Kyrenia, Northern Cyprus
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
              {t.ourClinic}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {lang === 'tr'
                ? '1990\'dan bu yana Girne\'nin köklü diş kliniği'
                : 'Kyrenia\'s most established dental clinic since 1990'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary">
        <div className="container-dental px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className="py-6 px-4 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-display font-bold text-primary-foreground">{s.value}</div>
                <div className="text-primary-foreground/70 text-xs mt-1 uppercase tracking-wide">{s.label[l]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-3">
              {lang === 'tr' ? 'Klinik Galeri' : 'Clinic Gallery'}
            </h2>
            <p className="text-body max-w-xl mx-auto">
              {lang === 'tr'
                ? 'Modern donanımımız ve konforlu ortamımız'
                : 'Modern equipment and comfortable surroundings'}
            </p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Large featured: room1 */}
            <motion.div
              className="col-span-2 md:col-span-2 row-span-1 relative cursor-pointer group overflow-hidden rounded-2xl aspect-[16/9]"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(0)}
            >
              <img src={GALLERY[0].src} alt={GALLERY[0].label[l]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  {GALLERY[0].label[l]}
                </span>
              </div>
            </motion.div>

            {/* CT scanner — tall right column */}
            <motion.div
              className="col-span-1 row-span-2 relative cursor-pointer group overflow-hidden rounded-2xl"
              style={{ minHeight: '280px' }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => openLightbox(4)}
            >
              <img src={GALLERY[4].src} alt={GALLERY[4].label[l]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
              <div className="absolute top-3 right-3">
                <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-lg">
                  NewTom 3G CBCT
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  {GALLERY[4].label[l]}
                </span>
              </div>
            </motion.div>

            {/* rooms 2 & 3 */}
            {[1, 2, 3].map((idx, i) => (
              <motion.div
                key={idx}
                className="col-span-1 relative cursor-pointer group overflow-hidden rounded-2xl aspect-square"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (i + 2) }}
                onClick={() => openLightbox(idx)}
              >
                <img src={GALLERY[idx].src} alt={GALLERY[idx].label[l]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                    {GALLERY[idx].label[l]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE CLINIC */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={doctorPortrait}
                alt="Temelci Dental Team"
                className="rounded-2xl shadow-xl w-full object-cover max-h-[480px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-5 uppercase tracking-wider">
                ✦ {lang === 'tr' ? 'Hakkımızda' : 'About The Clinic'}
              </div>
              <h2 className="heading-section mb-5">{t.aboutDoctorName}</h2>
              <p className="text-body mb-6 leading-relaxed">{t.aboutDoctorBio}</p>
              <div className="space-y-3">
                {[
                  { en: '4 fully-equipped treatment rooms', tr: '4 tam donanımlı muayene odası' },
                  { en: 'In-house ceramic dental laboratory', tr: 'Bünyemizde seramik diş laboratuvarı' },
                  { en: 'NewTom 3G CBCT 3D imaging', tr: 'NewTom 3G CBCT 3B görüntüleme' },
                  { en: 'VIP airport transfer & hotel assistance', tr: 'VIP havalimanı transferi ve otel yardımı' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-foreground">{lang === 'tr' ? item.tr : item.en}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <WhatsAppButton text={lang === 'tr' ? 'Randevu Al' : 'Book a Consultation'} variant="primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-3">
              {lang === 'tr' ? 'Teknoloji & Ekipman' : 'Technology & Equipment'}
            </h2>
            <p className="text-body max-w-xl mx-auto">
              {lang === 'tr'
                ? 'En son teknolojiyle en yüksek kalitede tedavi'
                : 'The latest technology for the highest quality treatment'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {TECH.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow hover:border-primary/30"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                    {lang === 'tr' ? item.tr : item.en}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {lang === 'tr' ? item.note.tr : item.note.en}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION CTA */}
      <section className="section-padding bg-primary">
        <div className="container-dental px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
                {lang === 'tr' ? 'Bizi Ziyaret Edin' : 'Visit Us in Kyrenia'}
              </h2>
              <div className="flex items-center gap-2 justify-center md:justify-start text-primary-foreground/80 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t.contactAddress}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                text={lang === 'tr' ? 'WhatsApp ile Ulaşın' : 'Contact on WhatsApp'}
                variant="hero"
              />
              <a
                href="https://maps.google.com/?q=Temelci+Dental+Girne"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                {lang === 'tr' ? 'Haritada Gör' : 'View on Map'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              className="absolute right-16 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[lightbox].src}
                alt={GALLERY[lightbox].label[l]}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white/70 text-center text-sm mt-3">
                {GALLERY[lightbox].label[l]} · {lightbox + 1} / {GALLERY.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OurClinicPage;
