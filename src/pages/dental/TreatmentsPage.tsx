import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Sparkles, Shield, Star, Crown, Award, Zap, Heart, ChevronRight, Activity, Layers, AlignLeft, Scissors, Waves, Wind, CheckCircle } from 'lucide-react';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import crownsImg from '@/assets/crowns.jpg';
import hollywoodSmileImg from '@/assets/hollywood-smile.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import zirconiaCrownsImg from '@/assets/zirconia-crowns.jpg';
import smileMakeoverImg from '@/assets/smile-makeover.jpg';
import fullMouthImg from '@/assets/full-mouth-restoration.jpg';

const TreatmentsPage = () => {
  const { t, localePath, lang } = useLanguage();

  const categories = [
    {
      label: { en: 'Aesthetic & Smile Design', tr: 'Estetik & Gülüş Tasarımı' },
      treatments: [
        { name: t.hollywoodSmile, desc: t.hollywoodSmileDesc, slug: t.hollywoodSmileSlug, img: hollywoodSmileImg, icon: Sparkles },
        { name: t.veneers, desc: t.veneersDesc, slug: t.veneersSlug, img: veneersImg, icon: Star },
        { name: t.teethWhitening, desc: t.teethWhiteningDesc, slug: t.teethWhiteningSlug, img: teethWhiteningImg, icon: Zap },
        { name: t.dentalBonding, desc: t.dentalBondingDesc, slug: t.dentalBondingSlug, img: hollywoodSmileImg, icon: Layers },
        { name: t.smileMakeover, desc: t.smileMakeoverDesc, slug: t.smileMakeoverSlug, img: smileMakeoverImg, icon: Heart },
      ]
    },
    {
      label: { en: 'Implants & Restorations', tr: 'İmplant & Restorasyon' },
      treatments: [
        { name: t.dentalImplants, desc: t.dentalImplantsDesc, slug: t.implantsSlug, img: implantImg, icon: Shield },
        { name: t.allOn4, desc: t.allOn4Desc, slug: t.allOn4Slug, img: fullMouthImg, icon: Award },
        { name: t.crowns, desc: t.crownsDesc, slug: t.crownsSlug, img: crownsImg, icon: Crown },
        { name: t.zirconiaCrowns, desc: t.zirconiaCrownsDesc, slug: t.zirconiaCrownsSlug, img: zirconiaCrownsImg, icon: Award },
        { name: t.compositeFilling, desc: t.compositeFillingDesc, slug: t.compositeFillingSlug, img: hollywoodSmileImg, icon: Layers },
        { name: t.fullMouthRestoration, desc: t.fullMouthRestorationDesc, slug: t.fullMouthRestorationSlug, img: fullMouthImg, icon: Shield },
      ]
    },
    {
      label: { en: 'Specialist Treatments', tr: 'Uzman Tedaviler' },
      treatments: [
        { name: t.rootCanal, desc: t.rootCanalDesc, slug: t.rootCanalSlug, img: implantImg, icon: Activity },
        { name: t.wisdomTooth, desc: t.wisdomToothDesc, slug: t.wisdomToothSlug, img: implantImg, icon: Scissors },
        { name: t.gumDisease, desc: t.gumDiseaseDesc, slug: t.gumDiseaseSlug, img: implantImg, icon: Wind },
        { name: t.laserGum, desc: t.laserGumDesc, slug: t.laserGumSlug, img: hollywoodSmileImg, icon: Zap },
        { name: t.bruxism, desc: t.bruxismDesc, slug: t.bruxismSlug, img: crownsImg, icon: Waves },
      ]
    },
    {
      label: { en: 'Orthodontics & Prevention', tr: 'Ortodonti & Önleme' },
      treatments: [
        { name: t.clearAligners, desc: t.clearAlignersDesc, slug: t.clearAlignersSlug, img: veneersImg, icon: AlignLeft },
        { name: t.orthodontics, desc: t.orthodonticsDesc, slug: t.orthodonticsSlug, img: veneersImg, icon: AlignLeft },
        { name: t.preventiveDentistry, desc: t.preventiveDentistryDesc, slug: t.preventiveDentistrySlug, img: hollywoodSmileImg, icon: CheckCircle },
      ]
    },
  ];

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.treatmentsTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.treatmentsSubtitle}</p>
        </div>
      </section>
      {categories.map((cat, ci) => (
        <section key={ci} className={`section-padding ${ci % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
          <div className="container-dental">
            <motion.h2
              className="text-xl font-display font-bold text-foreground mb-8 pb-3 border-b border-border flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
              {lang === 'tr' ? cat.label.tr : cat.label.en}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.treatments.map((tr, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={localePath(`/${tr.slug}`)} className="card-treatment block group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={tr.img} alt={tr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <tr.icon className="h-5 w-5 text-primary" />
                        <h2 className="font-display text-lg font-semibold">{tr.name}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tr.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {t.learnMore} <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
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
