import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSEO } from '@/hooks/useSEO';
import { useBeforeAfterCases, useFaqs, useReviews, useSitePage, useSiteSettings, useTreatments } from '@/hooks/useCmsContent';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { Star, Shield, Award, Users, Globe, ChevronRight, Sparkles, Heart, Zap, Crown, Building2, FlaskConical, Images, Plane, Mail } from 'lucide-react';
import heroImg from '@/assets/hero-clinic.jpg';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import crownsImg from '@/assets/crowns.jpg';

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
  const { data: dbBeforeAfter } = useBeforeAfterCases(3);
  const { data: dbFaqs, isError: faqsError } = useFaqs('global');
  const { data: settings } = useSiteSettings();

  useSEO({
    title: page?.seo_title || `${t.heroTitle} | Temelci Dental`,
    description: page?.seo_description || t.heroDescription,
    canonical: "https://temelcidentist.com/en",
    ogImage: page?.og_image || page?.hero_image || undefined,
  });

  const fallbackTreatments = [
    { name: t.hollywoodSmile, desc: t.hollywoodSmileDesc, slug: t.hollywoodSmileSlug, img: veneersImg, icon: Sparkles },
    { name: t.dentalImplants, desc: t.dentalImplantsDesc, slug: t.implantsSlug, img: implantImg, icon: Shield },
    { name: t.veneers, desc: t.veneersDesc, slug: t.veneersSlug, img: veneersImg, icon: Star },
    { name: t.crowns, desc: t.crownsDesc, slug: t.crownsSlug, img: crownsImg, icon: Crown },
    { name: t.zirconiaCrowns, desc: t.zirconiaCrownsDesc, slug: t.zirconiaCrownsSlug, img: crownsImg, icon: Award },
    { name: t.teethWhitening, desc: t.teethWhiteningDesc, slug: t.teethWhiteningSlug, img: veneersImg, icon: Zap },
    { name: t.smileMakeover, desc: t.smileMakeoverDesc, slug: t.smileMakeoverSlug, img: veneersImg, icon: Heart },
    { name: t.fullMouthRestoration, desc: t.fullMouthRestorationDesc, slug: t.fullMouthRestorationSlug, img: implantImg, icon: Shield },
  ];
  const treatments = dbTreatments && !treatmentsError ? dbTreatments.slice(0, 8).map(treatment => ({ name: treatment.title, desc: treatment.description || '', slug: treatment.slug, img: treatment.featured_image || implantImg, icon: Sparkles })) : fallbackTreatments;
  const beforeAfterCases = dbBeforeAfter || [];

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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Temelci Dental Clinic" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative container-dental section-padding">
          <motion.div className="max-w-2xl" {...fadeInUp}>
            <span className="trust-badge mb-6 inline-block">{page?.eyebrow || t.heroSubtitle}</span>
            <h1 className="heading-display text-background mb-6">{page?.hero_title || t.heroTitle}</h1>
            <p className="text-lg text-background/80 mb-8 leading-relaxed">{page?.hero_description || t.heroDescription}</p>
            <div className="flex flex-wrap gap-4">
              <QuoteButton text={t.freeConsultation || 'Get Free Quote'} variant="hero" />
              <WhatsAppButton text={t.bookWhatsApp} variant="outline" className="border-background/30 text-background hover:bg-background/10 hover:text-background" />
            </div>
          </motion.div>
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
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={tr.img} alt={tr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <tr.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{tr.name}</h3>
                    </div>
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
                <div className="grid aspect-[4/3] grid-cols-2 overflow-hidden">
                  <div className="relative overflow-hidden"><img src={item.before_image} alt={item.before_alt || `Before ${item.title || 'dental treatment'}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="640" height="480" /><span className="absolute bottom-2 left-2 rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">Before</span></div>
                  <div className="relative overflow-hidden"><img src={item.after_image} alt={item.after_alt || `After ${item.title || 'dental treatment'}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="640" height="480" /><span className="absolute bottom-2 right-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">After</span></div>
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
