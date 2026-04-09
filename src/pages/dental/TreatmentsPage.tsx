import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Sparkles, Shield, Star, Crown, Award, Zap, Heart, ChevronRight } from 'lucide-react';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import crownsImg from '@/assets/crowns.jpg';
import hollywoodSmileImg from '@/assets/hollywood-smile.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import zirconiaCrownsImg from '@/assets/zirconia-crowns.jpg';
import smileMakeoverImg from '@/assets/smile-makeover.jpg';
import fullMouthImg from '@/assets/full-mouth-restoration.jpg';

const TreatmentsPage = () => {
  const { t, localePath } = useLanguage();

  const treatments = [
    { name: t.hollywoodSmile, desc: t.hollywoodSmileDesc, slug: t.hollywoodSmileSlug, img: hollywoodSmileImg, icon: Sparkles },
    { name: t.dentalImplants, desc: t.dentalImplantsDesc, slug: t.implantsSlug, img: implantImg, icon: Shield },
    { name: t.veneers, desc: t.veneersDesc, slug: t.veneersSlug, img: veneersImg, icon: Star },
    { name: t.crowns, desc: t.crownsDesc, slug: t.crownsSlug, img: crownsImg, icon: Crown },
    { name: t.zirconiaCrowns, desc: t.zirconiaCrownsDesc, slug: t.zirconiaCrownsSlug, img: zirconiaCrownsImg, icon: Award },
    { name: t.teethWhitening, desc: t.teethWhiteningDesc, slug: t.teethWhiteningSlug, img: teethWhiteningImg, icon: Zap },
    { name: t.smileMakeover, desc: t.smileMakeoverDesc, slug: t.smileMakeoverSlug, img: smileMakeoverImg, icon: Heart },
    { name: t.fullMouthRestoration, desc: t.fullMouthRestorationDesc, slug: t.fullMouthRestorationSlug, img: fullMouthImg, icon: Shield },
  ];

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.treatmentsTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.treatmentsSubtitle}</p>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-dental grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((tr, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={localePath(`/${tr.slug}`)} className="card-treatment block group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={tr.img} alt={tr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <tr.icon className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold">{tr.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{tr.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {t.learnMore} <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default TreatmentsPage;
