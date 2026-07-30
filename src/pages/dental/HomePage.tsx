import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSEO } from '@/hooks/useSEO';
import { useFaqs, useReviews, useSitePage, useSiteSettings, useTreatments } from '@/hooks/useCmsContent';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { Star, Shield, Award, ChevronRight, Sparkles, Heart, Zap, Building2, FlaskConical, Images, Plane, Mail } from 'lucide-react';
import { TreatmentIconPanel } from '@/components/dental/TreatmentIcon';
import { clinicalCases } from '@/data/clinicalCases';
import clinicRoom from '@/assets/clinic/clinic_room2.jpg';
import photoNural from '@/assets/doctors/nural_temelci.jpg';
import photoAli from '@/assets/doctors/ali_temelci.jpg';
import photoRasih from '@/assets/doctors/rasih_denktash.jpg';
import photoSerife from '@/assets/doctors/serife_kole.jpg';
import photoAnna from '@/assets/doctors/anna_zubtcovskaia.jpg';

// Photo: Michael Dam / Unsplash — https://unsplash.com/photos/mEZ3PoFGs_k
const heroImg = '/hero-smiling-patient.webp';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const HomePage = () => {
  const { t, lang, localePath } = useLanguage();
  const { data: page } = useSitePage('home');
  const { data: dbTreatments, isError: treatmentsError } = useTreatments();
  const { data: dbReviews } = useReviews(4, true);
  const { data: dbFaqs, isError: faqsError } = useFaqs('global');
  const { data: settings } = useSiteSettings();

  useSEO({
    title: page?.seo_title || `${t.heroTitle} | Temelci Dental`,
    description: page?.seo_description || t.heroDescription,
    canonical: "https://temelcidentist.com/en",
    ogImage: page?.og_image || page?.hero_image || undefined,
  });

  const fallbackTreatments = [
    { name: t.hollywoodSmile, desc: t.hollywoodSmileDesc, slug: t.hollywoodSmileSlug },
    { name: t.dentalImplants, desc: t.dentalImplantsDesc, slug: t.implantsSlug },
    { name: t.veneers, desc: t.veneersDesc, slug: t.veneersSlug },
    { name: t.crowns, desc: t.crownsDesc, slug: t.crownsSlug },
    { name: t.zirconiaCrowns, desc: t.zirconiaCrownsDesc, slug: t.zirconiaCrownsSlug },
    { name: t.teethWhitening, desc: t.teethWhiteningDesc, slug: t.teethWhiteningSlug },
    { name: t.smileMakeover, desc: t.smileMakeoverDesc, slug: t.smileMakeoverSlug },
    { name: t.fullMouthRestoration, desc: t.fullMouthRestorationDesc, slug: t.fullMouthRestorationSlug },
  ];
  const treatments = dbTreatments?.length && !treatmentsError ? dbTreatments.slice(0, 8).map(treatment => ({ name: treatment.title, desc: treatment.description || '', slug: treatment.slug })) : fallbackTreatments;
  const beforeAfterCases = clinicalCases.slice(0, 3);
  const team = [
    { name: 'Dt. Nural Temelci', photo: photoNural },
    { name: 'Dr. Ali Temelci', photo: photoAli },
    { name: 'Dt. Rasih Denktaş Çelebi', photo: photoRasih },
    { name: 'Dr. Dt. Şerife Köle', photo: photoSerife },
    { name: 'Dt. Anna Zubtcovskaia', photo: photoAnna },
  ];

  const stats = [
    { value: '1990', label: t.yearsExperience },
    { value: '5', label: t.countriesServed },
    { value: 'Digital', label: t.treatmentProcess },
    { value: 'Kyrenia', label: t.clinicLocation },
  ];

  const labLabels = { en: 'Dental Lab', de: 'Dentallabor', tr: 'Diş Laboratuvarı', he: 'מעבדת שיניים', ru: 'Зуботехническая лаборатория' } as const;
  const labDescriptions = {
    en: 'See how our in-house restorative workflow supports patient care.',
    de: 'Erfahren Sie, wie unser hauseigenes Labor die Patientenversorgung unterstützt.',
    tr: 'Klinik içi restoratif iş akışımızın hasta bakımını nasıl desteklediğini görün.',
    he: 'גלו כיצד תהליך העבודה במעבדה הפנימית תומך בטיפול במטופלים.',
    ru: 'Узнайте, как собственная лаборатория помогает обеспечивать качественное лечение.',
  } as const;
  const primaryDestinations = [
    { title: t.treatments, description: t.treatmentsSubtitle, path: `/${t.treatmentsSlug}`, icon: Sparkles },
    { title: t.ourClinic, description: t.aboutSubtitle, path: `/${t.ourClinicSlug}`, icon: Building2 },
    { title: labLabels[lang], description: labDescriptions[lang], path: '/lab', icon: FlaskConical },
    { title: t.beforeAfter, description: t.beforeAfterSubtitle, path: `/${t.beforeAfterSlug}`, icon: Images },
    { title: t.dentalTourism, description: t.dentalTourism, path: `/${t.dentalTourismSlug}`, icon: Plane },
    { title: t.contact, description: t.contactSubtitle, path: `/${t.contactSlug}`, icon: Mail },
  ];

  const reasons = [
    { title: t.whyReason1Title, desc: t.whyReason1Desc, icon: Award },
    { title: t.whyReason2Title, desc: t.whyReason2Desc, icon: Star },
    { title: t.whyReason3Title, desc: t.whyReason3Desc, icon: Zap },
    { title: t.whyReason4Title, desc: t.whyReason4Desc, icon: Heart },
  ];

  const reviews = (dbReviews || []).map(review => ({ name: review.patient_name, country: `${review.country_flag || ''} ${review.country || ''}`.trim(), text: review.content, rating: review.rating }));

  const fallbackFaqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
  ];
  const faqs = dbFaqs && !faqsError ? dbFaqs.map(faq => ({ q: faq.question, a: faq.answer })) : fallbackFaqs;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-foreground">
        <div className="grid min-h-[calc(100vh-68px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 flex items-center px-6 py-10 md:px-10 lg:order-1 lg:px-14 lg:py-12 xl:pl-24">
            <motion.div className="max-w-xl" {...fadeInUp}>
            <span className="trust-badge mb-4 inline-block lg:mb-6">{page?.eyebrow || t.heroSubtitle}</span>
            <h1 className="heading-display mb-4 text-background lg:mb-6">{page?.hero_title || t.heroTitle}</h1>
            <p className="mb-6 text-base leading-relaxed text-background/80 md:text-lg lg:mb-8">{page?.hero_description || t.heroDescription}</p>
            <div className="flex flex-wrap gap-4">
              <QuoteButton text={t.freeConsultation || 'Get Free Quote'} variant="hero" />
              <WhatsAppButton text={t.bookWhatsApp} variant="outline" className="border-background/30 text-background hover:bg-background/10 hover:text-background" />
            </div>
            </motion.div>
          </div>
          <div className="relative order-1 min-h-[40vh] overflow-hidden lg:order-2 lg:min-h-full">
            <img src={heroImg} alt="Confident smiling woman" className="absolute inset-0 h-full w-full object-cover object-[center_24%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-foreground/25 lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-primary">
        <div className="container-dental py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">{s.value}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Primary destination links support clear navigation and search sitelinks. */}
      <section className="border-b bg-card py-8" aria-labelledby="primary-destinations-title">
        <div className="container-dental px-4">
          <h2 id="primary-destinations-title" className="sr-only">Explore Temelci Dental</h2>
          <nav aria-label="Explore Temelci Dental" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {primaryDestinations.map(item => {
              const Icon = item.icon;
              return <Link key={item.path} to={localePath(item.path)} className="group flex items-start gap-4 rounded-2xl border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></span>
                <span><span className="flex items-center gap-1 font-display text-lg font-semibold group-hover:text-primary">{item.title}<ChevronRight className="h-4 w-4" /></span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.description}</span></span>
              </Link>;
            })}
          </nav>
        </div>
      </section>

      {/* Real clinic and team */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm" {...fadeInUp}>
            <img src={clinicRoom} alt="A real treatment room at Temelci Dental Clinic" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
            <span className="absolute bottom-4 left-4 rounded-full bg-foreground/80 px-4 py-2 text-xs font-semibold text-background backdrop-blur-sm">Our clinic in Kyrenia</span>
          </motion.div>
          <motion.div {...fadeInUp}>
            <span className="trust-badge mb-4 inline-block">Real clinic · Real team</span>
            <h2 className="heading-section mb-3">{t.ourDoctors}</h2>
            <p className="text-body mb-7">{t.ourDoctorsSubtitle.replace(/\b6\b/, '5').replace('127+', '100+')}</p>
            <div className="grid grid-cols-3 gap-3">
              {team.map(member => <Link key={member.name} to={localePath(`/${t.aboutSlug}#doctors`)} className="group overflow-hidden rounded-2xl border bg-card">
                <img src={member.photo} alt={member.name} className="aspect-square w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="block truncate px-2 py-2 text-center text-[11px] font-semibold">{member.name}</span>
              </Link>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={localePath(`/${t.aboutSlug}#doctors`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">{t.ourDoctors} <ChevronRight className="h-4 w-4" /></Link>
              <Link to={localePath(`/${t.ourClinicSlug}`)} className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:border-primary/40 hover:text-primary">{t.ourClinic} <ChevronRight className="h-4 w-4" /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div className="text-center mb-14" {...fadeInUp}>
            <h2 className="heading-section mb-3">{t.treatmentsTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{t.treatmentsSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.map((tr, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={localePath(`/${tr.slug}`)} className="card-treatment block group">
                  <TreatmentIconPanel slug={tr.slug} title={tr.name} compact />
                  <div className="p-5">
                    <h3 className="mb-2 font-semibold text-foreground">{tr.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tr.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                      {t.learnMore} <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/50">
        <div className="container-dental">
          <motion.h2 className="heading-section text-center mb-14" {...fadeInUp}>{t.whyChooseUs}</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                  <r.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before After Preview */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <h2 className="heading-section mb-3">{t.beforeAfterTitle}</h2>
            <p className="text-body">{t.beforeAfterSubtitle}</p>
          </motion.div>
          {beforeAfterCases.length > 0 && <div className="grid gap-6 md:grid-cols-3">
            {beforeAfterCases.map((item, index) => <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Link to={localePath(`/${t.beforeAfterSlug}`)} className="group block overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                  {item.after_image ? <div className="grid h-full grid-cols-2"><div className="relative overflow-hidden"><img src={item.before_image} alt={item.before_alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /><span className="absolute bottom-2 left-2 rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">Before</span></div><div className="relative overflow-hidden"><img src={item.after_image} alt={item.after_alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /><span className="absolute bottom-2 right-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">After</span></div></div> : <div className="relative h-full"><img src={item.before_image} alt={item.before_alt} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" /><span className="absolute bottom-2 left-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Clinical case</span></div>}
                </div>
                <div className="flex items-center justify-between gap-3 p-4"><h3 className="font-display font-semibold">{item.title || 'Patient transformation'}</h3><ChevronRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" /></div>
              </Link>
            </motion.div>)}
          </div>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={localePath(`/${t.beforeAfterSlug}`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              {t.viewAll} <ChevronRight className="h-4 w-4" />
            </Link>
            <a href="https://www.instagram.com/dentaltemelci/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary">@dentaltemelci</a>
          </div>
        </div>
      </section>

      {/* Reviews are shown only when verified content exists in the CMS. */}
      {reviews.length > 0 && <section className="section-padding bg-secondary/50">
        <div className="container-dental">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <h2 className="heading-section mb-3">{t.reviewsTitle}</h2>
            <p className="text-body">{t.reviewsSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-4 italic">"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={localePath(`/${t.reviewsSlug}`)} className="inline-flex items-center gap-2 text-primary font-medium">
              {t.viewAll} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>}

      {/* Instagram Proof */}
      <section className="section-padding bg-background">
        <div className="container-dental text-center">
          <motion.h2 className="heading-section mb-8" {...fadeInUp}>{t.socialTitle}</motion.h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href={settings?.instagram || 'https://www.instagram.com/dentaltemelci/'} target="_blank" rel="noopener noreferrer" className="trust-badge hover:bg-primary hover:text-primary-foreground transition-colors">📸 {t.followInstagram}</a>
            <a href={settings?.facebook || 'https://www.facebook.com/p/Temelci-61577466848604/'} target="_blank" rel="noopener noreferrer" className="trust-badge hover:bg-primary hover:text-primary-foreground transition-colors">📘 {t.followFacebook}</a>
          </div>
        </div>
      </section>

      {/* Location */}
      {settings?.maps_embed_url && <section className="section-padding bg-secondary/50">
        <div className="container-dental">
          <motion.h2 className="heading-section text-center mb-8" {...fadeInUp}>{t.ourLocation}</motion.h2>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src={settings.maps_embed_url}
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Temelci Dental Clinic Location" />
          </div>
          <p className="text-center text-muted-foreground mt-4">{t.clinicLocation}</p>
        </div>
      </section>}

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-3xl">
          <motion.h2 className="heading-section text-center mb-10" {...fadeInUp}>{t.faqTitle}</motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details key={i} className="bg-card rounded-xl border border-border group" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <summary className="p-5 cursor-pointer font-medium text-foreground flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <QuoteButton text={t.freeConsultation || 'Get Free Quote'} variant="hero" />
            <WhatsAppButton text={t.sendSmilePhotos} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
      }) }} />
    </>
  );
};

export default HomePage;
