import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Star, Shield, Award, Users, Globe, ChevronRight, Sparkles, Heart, Zap, Crown } from 'lucide-react';
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
  const { t, localePath } = useLanguage();

  const treatments = [
    { name: t.hollywoodSmile, desc: t.hollywoodSmileDesc, slug: t.hollywoodSmileSlug, img: veneersImg, icon: Sparkles },
    { name: t.dentalImplants, desc: t.dentalImplantsDesc, slug: t.implantsSlug, img: implantImg, icon: Shield },
    { name: t.veneers, desc: t.veneersDesc, slug: t.veneersSlug, img: veneersImg, icon: Star },
    { name: t.crowns, desc: t.crownsDesc, slug: t.crownsSlug, img: crownsImg, icon: Crown },
    { name: t.zirconiaCrowns, desc: t.zirconiaCrownsDesc, slug: t.zirconiaCrownsSlug, img: crownsImg, icon: Award },
    { name: t.teethWhitening, desc: t.teethWhiteningDesc, slug: t.teethWhiteningSlug, img: veneersImg, icon: Zap },
    { name: t.smileMakeover, desc: t.smileMakeoverDesc, slug: t.smileMakeoverSlug, img: veneersImg, icon: Heart },
    { name: t.fullMouthRestoration, desc: t.fullMouthRestorationDesc, slug: t.fullMouthRestorationSlug, img: implantImg, icon: Shield },
  ];

  const stats = [
    { value: '30+', label: t.yearsExperience },
    { value: '10,000+', label: t.happyPatients },
    { value: '15,000+', label: t.treatments_count },
    { value: '30+', label: t.countriesServed },
  ];

  const reasons = [
    { title: t.whyReason1Title, desc: t.whyReason1Desc, icon: Award },
    { title: t.whyReason2Title, desc: t.whyReason2Desc, icon: Star },
    { title: t.whyReason3Title, desc: t.whyReason3Desc, icon: Zap },
    { title: t.whyReason4Title, desc: t.whyReason4Desc, icon: Heart },
  ];

  const reviews = [
    { name: 'Sarah M.', country: '🇬🇧 UK', text: 'Dr. Temelci transformed my smile completely. The Hollywood Smile treatment was painless and the results are stunning!', rating: 5 },
    { name: 'Ahmed K.', country: '🇸🇦 Saudi Arabia', text: 'I traveled from Riyadh for dental implants. Best decision ever. Professional clinic, amazing results.', rating: 5 },
    { name: 'Hans W.', country: '🇩🇪 Germany', text: 'Incredible quality at a fraction of German prices. My zirconia crowns look perfectly natural.', rating: 5 },
    { name: 'Elena P.', country: '🇷🇺 Russia', text: 'Полностью доволна результатом. Виниры выглядят потрясающе. Рекомендую всем!', rating: 5 },
  ];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
  ];

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
            <span className="trust-badge mb-6 inline-block">{t.heroSubtitle}</span>
            <h1 className="heading-display text-background mb-6">{t.heroTitle}</h1>
            <p className="text-lg text-background/80 mb-8 leading-relaxed">{t.heroDescription}</p>
            <div className="flex flex-wrap gap-4">
              <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
              <WhatsAppButton text={t.freeConsultation} variant="outline" className="border-background/30 text-background hover:bg-background/10 hover:text-background" />
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
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <p className="text-muted-foreground mb-6">{t.followInstagram}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.instagram.com/dentaltemelci/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                @dentaltemelci
              </a>
              <Link to={localePath(`/${t.beforeAfterSlug}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                {t.viewAll} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-secondary/50">
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
      </section>

      {/* Instagram Proof */}
      <section className="section-padding bg-background">
        <div className="container-dental text-center">
          <motion.h2 className="heading-section mb-8" {...fadeInUp}>{t.socialTitle}</motion.h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href="https://www.instagram.com/dentaltemelci/" target="_blank" rel="noopener noreferrer" className="trust-badge hover:bg-primary hover:text-primary-foreground transition-colors">📸 {t.followInstagram}</a>
            <a href="https://www.facebook.com/p/Temelci-61577466848604/" target="_blank" rel="noopener noreferrer" className="trust-badge hover:bg-primary hover:text-primary-foreground transition-colors">📘 {t.followFacebook}</a>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-secondary/50">
        <div className="container-dental">
          <motion.h2 className="heading-section text-center mb-8" {...fadeInUp}>{t.ourLocation}</motion.h2>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.3417!3d35.3406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b6a6b6b6b6b%3A0x6b6b6b6b6b6b6b6b!2sKyrenia%2C%20Northern%20Cyprus!5e0!3m2!1sen!2s!4v1"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Temelci Dental Clinic Location" />
          </div>
          <p className="text-center text-muted-foreground mt-4">{t.clinicLocation}</p>
        </div>
      </section>

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
            <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
            <WhatsAppButton text={t.sendSmilePhotos} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
