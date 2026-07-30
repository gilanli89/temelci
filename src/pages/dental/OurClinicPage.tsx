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
import heroImg from '@/assets/clinic/clinic_room1.jpg';
import teamPortrait from '@/assets/doctors/nural_temelci.jpg';
import { useSEO } from '@/hooks/useSEO';

const GALLERY = [
  { src: room1, label: { en: 'Treatment Suite 1', tr: 'Muayene Odası 1', el: 'Αίθουσα Θεραπείας 1', ru: 'Кабинет 1', ar: 'غرفة العلاج 1', he: 'חדר טיפולים 1', de: 'Behandlungszimmer 1', fa: 'اتاق درمان ۱' } },
  { src: room2, label: { en: 'Treatment Suite 2', tr: 'Muayene Odası 2', el: 'Αίθουσα Θεραπείας 2', ru: 'Кабинет 2', ar: 'غرفة العلاج 2', he: 'חדר טיפולים 2', de: 'Behandlungszimmer 2', fa: 'اتاق درمان ۲' } },
  { src: room3, label: { en: 'Treatment Suite 3', tr: 'Muayene Odası 3', el: 'Αίθουσα Θεραπείας 3', ru: 'Кабинет 3', ar: 'غرفة العلاج 3', he: 'חדר טיפולים 3', de: 'Behandlungszimmer 3', fa: 'اتاق درمان ۳' } },
  { src: room4, label: { en: 'Treatment Suite 4', tr: 'Muayene Odası 4', el: 'Αίθουσα Θεραπείας 4', ru: 'Кабинет 4', ar: 'غرفة العلاج 4', he: 'חדר טיפולים 4', de: 'Behandlungszimmer 4', fa: 'اتاق درمان ۴' } },
  { src: ctScan, label: { en: 'NewTom 3G CBCT Scanner', tr: 'NewTom 3G CBCT Tarayıcı', el: 'Scanner CBCT NewTom 3G', ru: 'КТ-сканер NewTom 3G', ar: 'ماسح CBCT نيوتوم 3G', he: 'סורק CBCT NewTom 3G', de: 'NewTom 3G CBCT-Scanner', fa: 'اسکنر CBCT نیوتام ۳G' } },
];

const TECH_ICONS = [Scan, Monitor, FlaskConical, Zap, Camera, Star];

const STATS = [
  { value: '1990', label: { en: 'Founded', tr: 'Kuruluş', el: 'Ιδρύθηκε', ru: 'Основана', ar: 'تأسست', he: 'נוסדה', de: 'Gegründet', fa: 'تأسیس' } },
  { value: '5', label: { en: 'Specialists', tr: 'Uzman Hekim', el: 'Ειδικοί', ru: 'Специалистов', ar: 'متخصصون', he: 'מומחים', de: 'Spezialisten', fa: 'متخصص' } },
  { value: '4', label: { en: 'Treatment Rooms', tr: 'Muayene Odası', el: 'Αίθουσες', ru: 'Кабинетов', ar: 'غرف علاج', he: 'חדרי טיפול', de: 'Behandlungszimmer', fa: 'اتاق درمان' } },
  { value: '100+', label: { en: 'Years Experience', tr: 'Yıl Deneyim', el: 'Χρόνια Εμπειρίας', ru: 'Лет Опыта', ar: 'سنة خبرة', he: 'שנות ניסיון', de: 'Jahre Erfahrung', fa: 'سال تجربه' } },
];

type LangKey = 'en' | 'tr' | 'el' | 'ru' | 'ar' | 'he' | 'de' | 'fa';

const CLINIC_COPY = {
  en: {
    seoTitle: 'Our Dental Clinic in Kyrenia | Temelci Dental', seoDescription: 'Explore Temelci Dental Clinic, its treatment rooms, digital imaging and in-house clinical facilities in Kyrenia.', location: 'Kyrenia, North Cyprus', hero: 'A family dental clinic in Kyrenia since 1990',
    gallery: 'Clinic Gallery', galleryText: 'Modern equipment and comfortable surroundings', about: 'About the Clinic', portraitAlt: 'Dt. Nural Temelci at Temelci Dental',
    bullets: ['4 fully equipped treatment rooms', 'In-house ceramic dental laboratory', 'NewTom 3G CBCT imaging', 'Personal visit coordination'], consult: 'Book a Consultation',
    technology: 'Technology & Equipment', technologyText: 'Clinical technology supporting diagnosis and treatment planning',
    tech: [['NewTom 3G CBCT', '3D cone-beam CT imaging'], ['CAD/CAM Design', 'Digital restorative planning'], ['In-House Lab', 'On-site ceramic workflow'], ['Digital X-Ray', 'Low-dose digital imaging'], ['Intraoral Camera', 'Detailed chairside imaging'], ['Straumann Implants', 'Established implant system']],
    visit: 'Visit Us in Kyrenia', whatsapp: 'Contact on WhatsApp', map: 'View on Map', close: 'Close gallery', previous: 'Previous image', next: 'Next image',
  },
  de: {
    seoTitle: 'Unsere Zahnklinik in Kyrenia | Temelci Dental', seoDescription: 'Entdecken Sie die Behandlungsräume, digitale Bildgebung und klinischen Einrichtungen der Temelci Dental Clinic in Kyrenia.', location: 'Kyrenia, Nordzypern', hero: 'Familiengeführte Zahnklinik in Kyrenia seit 1990',
    gallery: 'Klinikgalerie', galleryText: 'Moderne Ausstattung und angenehme Umgebung', about: 'Über die Klinik', portraitAlt: 'Dt. Nural Temelci bei Temelci Dental',
    bullets: ['4 voll ausgestattete Behandlungszimmer', 'Hauseigenes Keramiklabor', 'NewTom 3G CBCT-Bildgebung', 'Persönliche Besuchskoordination'], consult: 'Beratung vereinbaren',
    technology: 'Technologie & Ausstattung', technologyText: 'Klinische Technologie für Diagnostik und Behandlungsplanung',
    tech: [['NewTom 3G CBCT', '3D-DVT-Bildgebung'], ['CAD/CAM-Design', 'Digitale restaurative Planung'], ['Hauseigenes Labor', 'Keramik-Workflow vor Ort'], ['Digitales Röntgen', 'Digitale Bildgebung mit niedriger Dosis'], ['Intraoralkamera', 'Detaillierte Aufnahmen am Behandlungsstuhl'], ['Straumann Implantate', 'Etabliertes Implantatsystem']],
    visit: 'Besuchen Sie uns in Kyrenia', whatsapp: 'Über WhatsApp kontaktieren', map: 'Auf Karte anzeigen', close: 'Galerie schließen', previous: 'Vorheriges Bild', next: 'Nächstes Bild',
  },
  tr: {
    seoTitle: 'Girne Diş Kliniğimiz | Temelci Dental', seoDescription: 'Temelci Dental Clinic’in Girne’deki muayene odalarını, dijital görüntüleme sistemlerini ve klinik olanaklarını inceleyin.', location: 'Girne, Kuzey Kıbrıs', hero: '1990’dan beri Girne’de hizmet veren aile diş kliniği',
    gallery: 'Klinik Galeri', galleryText: 'Modern donanım ve konforlu klinik ortamı', about: 'Klinik Hakkında', portraitAlt: 'Temelci Dental’de Dt. Nural Temelci',
    bullets: ['4 tam donanımlı muayene odası', 'Klinik içi seramik diş laboratuvarı', 'NewTom 3G CBCT görüntüleme', 'Kişisel ziyaret koordinasyonu'], consult: 'Randevu Al',
    technology: 'Teknoloji & Ekipman', technologyText: 'Tanı ve tedavi planlamasını destekleyen klinik teknoloji',
    tech: [['NewTom 3G CBCT', '3B konik ışın BT görüntüleme'], ['CAD/CAM Tasarım', 'Dijital restoratif planlama'], ['Klinik İçi Laboratuvar', 'Yerinde seramik iş akışı'], ['Dijital Röntgen', 'Düşük dozlu dijital görüntüleme'], ['İntraoral Kamera', 'Detaylı koltuk başı görüntüleme'], ['Straumann İmplant', 'Yerleşik implant sistemi']],
    visit: 'Girne’de Bizi Ziyaret Edin', whatsapp: 'WhatsApp ile Ulaşın', map: 'Haritada Gör', close: 'Galeriyi kapat', previous: 'Önceki görsel', next: 'Sonraki görsel',
  },
  he: {
    seoTitle: 'מרפאת השיניים שלנו בקירניה | Temelci Dental', seoDescription: 'הכירו את חדרי הטיפול, מערכות הדימות הדיגיטליות והמתקנים הקליניים של Temelci Dental בקירניה.', location: 'קירניה, צפון קפריסין', hero: 'מרפאת שיניים משפחתית בקירניה מאז 1990',
    gallery: 'גלריית המרפאה', galleryText: 'ציוד מודרני וסביבה נוחה', about: 'על המרפאה', portraitAlt: 'ד״ר נוראל טמלג׳י ב-Temelci Dental',
    bullets: ['4 חדרי טיפול מאובזרים', 'מעבדת קרמיקה פנימית', 'דימות NewTom 3G CBCT', 'תיאום אישי לביקור'], consult: 'קביעת ייעוץ',
    technology: 'טכנולוגיה וציוד', technologyText: 'טכנולוגיה קלינית התומכת באבחון ובתכנון הטיפול',
    tech: [['NewTom 3G CBCT', 'דימות CT תלת-ממדי'], ['תכנון CAD/CAM', 'תכנון שיקומי דיגיטלי'], ['מעבדה פנימית', 'תהליך קרמיקה במרפאה'], ['רנטגן דיגיטלי', 'דימות דיגיטלי במינון נמוך'], ['מצלמה תוך-פומית', 'דימות מפורט ליד כיסא הטיפול'], ['שתלי Straumann', 'מערכת שתלים מבוססת']],
    visit: 'בקרו אותנו בקירניה', whatsapp: 'יצירת קשר ב-WhatsApp', map: 'הצגה במפה', close: 'סגירת הגלריה', previous: 'תמונה קודמת', next: 'תמונה הבאה',
  },
  ru: {
    seoTitle: 'Наша стоматологическая клиника в Кирении | Temelci Dental', seoDescription: 'Познакомьтесь с кабинетами, цифровой диагностикой и клиническими возможностями Temelci Dental Clinic в Кирении.', location: 'Кирения, Северный Кипр', hero: 'Семейная стоматологическая клиника в Кирении с 1990 года',
    gallery: 'Галерея клиники', galleryText: 'Современное оборудование и комфортная обстановка', about: 'О клинике', portraitAlt: 'Дт. Нурал Темельджи в Temelci Dental',
    bullets: ['4 полностью оборудованных кабинета', 'Собственная керамическая лаборатория', 'Диагностика NewTom 3G CBCT', 'Персональная координация визита'], consult: 'Записаться на консультацию',
    technology: 'Технологии и оборудование', technologyText: 'Клинические технологии для диагностики и планирования лечения',
    tech: [['NewTom 3G CBCT', 'Трёхмерная конусно-лучевая КТ'], ['CAD/CAM-дизайн', 'Цифровое планирование реставраций'], ['Собственная лаборатория', 'Керамический процесс на месте'], ['Цифровой рентген', 'Цифровая диагностика с низкой дозой'], ['Внутриротовая камера', 'Детальная визуализация у кресла'], ['Импланты Straumann', 'Проверенная имплантационная система']],
    visit: 'Посетите нас в Кирении', whatsapp: 'Связаться в WhatsApp', map: 'Посмотреть на карте', close: 'Закрыть галерею', previous: 'Предыдущее изображение', next: 'Следующее изображение',
  },
} as const;

const OurClinicPage = () => {
  const { t, lang, localePath } = useLanguage();
  const copy = CLINIC_COPY[lang as keyof typeof CLINIC_COPY] || CLINIC_COPY.en;
  useSEO({ title: copy.seoTitle, description: copy.seoDescription, canonical: `https://temelcidentist.com${localePath('/our-clinic')}`, ogImage: heroImg });
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
              {copy.location}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
              {t.ourClinic}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {copy.hero}
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
              {copy.gallery}
            </h2>
            <p className="text-body max-w-xl mx-auto">
              {copy.galleryText}
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
      <section className="section-padding overflow-hidden bg-secondary/30">
        <div className="container-dental">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={teamPortrait}
                alt={copy.portraitAlt}
                className="rounded-2xl shadow-xl w-full object-cover max-h-[480px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-5 uppercase tracking-wider">
                ✦ {copy.about}
              </div>
              <h2 className="heading-section mb-5">{t.aboutDoctorName}</h2>
              <p className="text-body mb-6 leading-relaxed">{t.aboutDoctorBio}</p>
              <div className="space-y-3">
                {copy.bullets.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <WhatsAppButton text={copy.consult} variant="hero" />
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
              {copy.technology}
            </h2>
            <p className="text-body max-w-xl mx-auto">
              {copy.technologyText}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {copy.tech.map((item, i) => {
              const Icon = TECH_ICONS[i];
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
                    {item[0]}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item[1]}
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
                {copy.visit}
              </h2>
              <div className="flex items-center gap-2 justify-center md:justify-start text-primary-foreground/80 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t.contactAddress}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                text={copy.whatsapp}
                variant="hero"
              />
              <a
                href="https://maps.google.com/?q=Temelci+Dental+Girne"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                {copy.map}
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
              aria-label={copy.close}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              aria-label={copy.previous}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              aria-label={copy.next}
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
