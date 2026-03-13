import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { ChevronRight, Check } from 'lucide-react';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import crownsImg from '@/assets/crowns.jpg';

type TreatmentData = {
  titleKey: string;
  descKey: string;
  img: string;
  benefits: string[];
  forWhom: string[];
  process: string[];
  results: string[];
  faq: { q: string; a: string }[];
};

const getTreatmentData = (slug: string, t: any): TreatmentData | null => {
  const data: Record<string, TreatmentData> = {
    [t.hollywoodSmileSlug]: {
      titleKey: 'hollywoodSmile',
      descKey: 'hollywoodSmileDesc',
      img: veneersImg,
      benefits: ['Perfect celebrity-like smile', 'Natural-looking results', 'Long-lasting porcelain', 'Minimal prep required', 'Completed in 5-7 days'],
      forWhom: ['People with discolored teeth', 'Those with gaps between teeth', 'Patients with chipped or worn teeth', 'Anyone wanting a complete smile transformation'],
      process: ['Free online consultation via WhatsApp', 'Digital smile design planning', 'Tooth preparation and temporary veneers', 'Custom porcelain veneer fabrication', 'Final placement and adjustments'],
      results: ['Dramatically whiter, straighter smile', 'Results last 15-20 years with proper care', 'Immediate confidence boost', 'Natural appearance and feel'],
      faq: [
        { q: 'How long does Hollywood Smile treatment take?', a: 'Typically 5-7 days for the complete treatment, including all appointments.' },
        { q: 'Is Hollywood Smile treatment painful?', a: 'The procedure is performed under local anesthesia, so you won\'t feel any pain during treatment.' },
        { q: 'How long do Hollywood Smile veneers last?', a: 'With proper care, porcelain veneers can last 15-20 years or more.' },
      ]
    },
    [t.implantsSlug]: {
      titleKey: 'dentalImplants',
      descKey: 'dentalImplantsDesc',
      img: implantImg,
      benefits: ['Permanent tooth replacement', 'Looks and feels like natural teeth', 'Preserves jawbone health', 'No damage to adjacent teeth', '98% success rate'],
      forWhom: ['People with one or more missing teeth', 'Those with loose or failing dentures', 'Patients seeking permanent solutions', 'Anyone with sufficient jawbone density'],
      process: ['Comprehensive examination and 3D scan', 'Implant placement surgery', 'Healing period (3-6 months)', 'Abutment placement', 'Custom crown attachment'],
      results: ['Fully functional replacement teeth', 'Lifetime durability with proper care', 'Preserved facial structure', 'Improved eating and speaking ability'],
      faq: [
        { q: 'How long do dental implants last?', a: 'Dental implants can last a lifetime with proper oral hygiene and regular check-ups.' },
        { q: 'Is the implant procedure painful?', a: 'The surgery is performed under local anesthesia. Most patients report minimal discomfort.' },
        { q: 'How long is the recovery?', a: 'Initial recovery takes 1-2 weeks. Full integration with the jawbone takes 3-6 months.' },
      ]
    },
    [t.veneersSlug]: {
      titleKey: 'veneers',
      descKey: 'veneersDesc',
      img: veneersImg,
      benefits: ['Ultra-thin porcelain shells', 'Minimal tooth preparation', 'Stain-resistant surface', 'Custom color matching', 'Instant smile improvement'],
      forWhom: ['People with discolored teeth', 'Those with minor chips or cracks', 'Patients with uneven or misshapen teeth', 'Anyone wanting a natural-looking enhancement'],
      process: ['Consultation and digital planning', 'Minimal tooth preparation', 'Impression and temporary veneers', 'Custom fabrication in lab', 'Bonding and final adjustments'],
      results: ['Flawless, natural-looking smile', 'Results last 10-15 years', 'Resistant to staining', 'Custom shade matching for perfect results'],
      faq: [
        { q: 'What\'s the difference between veneers and Hollywood Smile?', a: 'Hollywood Smile typically involves a full set of veneers covering all visible teeth, while individual veneers can be placed on select teeth.' },
        { q: 'Do veneers damage natural teeth?', a: 'Minimal enamel removal is needed, but the natural tooth structure is largely preserved.' },
      ]
    },
    [t.crownsSlug]: {
      titleKey: 'crowns',
      descKey: 'crownsDesc',
      img: crownsImg,
      benefits: ['Full tooth coverage and protection', 'Restores damaged or decayed teeth', 'Natural appearance', 'Long-lasting durability', 'Improves bite function'],
      forWhom: ['Patients with severely damaged teeth', 'Those who have had root canal treatment', 'People with large fillings', 'Anyone needing tooth restoration'],
      process: ['Examination and X-rays', 'Tooth preparation and shaping', 'Impression and temporary crown', 'Custom crown fabrication', 'Permanent crown cementation'],
      results: ['Fully restored tooth function', 'Natural-looking appearance', 'Protection from further damage', 'Comfortable bite and chewing'],
      faq: [
        { q: 'How long do dental crowns last?', a: 'With proper care, dental crowns can last 10-15 years or longer.' },
        { q: 'Are crowns noticeable?', a: 'Modern porcelain crowns are virtually indistinguishable from natural teeth.' },
      ]
    },
    [t.zirconiaCrownsSlug]: {
      titleKey: 'zirconiaCrowns',
      descKey: 'zirconiaCrownsDesc',
      img: crownsImg,
      benefits: ['Superior strength and durability', 'Excellent aesthetics', 'Biocompatible material', 'Metal-free solution', 'Precise CAD/CAM fabrication'],
      forWhom: ['Patients requiring strong crowns', 'Those with metal allergies', 'People wanting premium aesthetics', 'Anyone seeking long-term solutions'],
      process: ['Digital scanning', 'CAD/CAM design', 'Precision milling', 'Staining and glazing', 'Final fitting and bonding'],
      results: ['Maximum strength and beauty', 'Seamless integration', 'Long-lasting performance', 'No dark lines at the gum line'],
      faq: [
        { q: 'Why choose zirconia over other materials?', a: 'Zirconia offers the best combination of strength, aesthetics, and biocompatibility.' },
      ]
    },
    [t.teethWhiteningSlug]: {
      titleKey: 'teethWhitening',
      descKey: 'teethWhiteningDesc',
      img: veneersImg,
      benefits: ['Up to 8 shades whiter', 'Fast in-office procedure', 'Safe and effective', 'Immediate visible results', 'Long-lasting brightness'],
      forWhom: ['People with stained or yellowed teeth', 'Those preparing for special events', 'Patients seeking quick improvements', 'Anyone wanting a brighter smile'],
      process: ['Dental cleaning', 'Gum protection application', 'Whitening gel application', 'LED light activation', 'Final rinse and evaluation'],
      results: ['Dramatically whiter teeth', 'Results visible immediately', 'Lasts 6-12 months', 'Boosted confidence'],
      faq: [
        { q: 'Is teeth whitening safe?', a: 'Yes, professional whitening is safe when performed by qualified dentists.' },
        { q: 'How long do results last?', a: 'Results typically last 6-12 months, depending on diet and oral hygiene habits.' },
      ]
    },
    [t.smileMakeoverSlug]: {
      titleKey: 'smileMakeover',
      descKey: 'smileMakeoverDesc',
      img: veneersImg,
      benefits: ['Comprehensive approach', 'Multiple issues addressed', 'Personalized treatment plan', 'Dramatic transformation', 'Customized to your goals'],
      forWhom: ['People with multiple dental concerns', 'Those wanting a complete transformation', 'Patients dissatisfied with their current smile', 'Anyone seeking comprehensive improvement'],
      process: ['Comprehensive assessment', 'Digital smile design', 'Treatment planning', 'Phased treatment execution', 'Final reveal and adjustments'],
      results: ['Complete smile transformation', 'Improved facial harmony', 'Enhanced self-confidence', 'Long-lasting beautiful results'],
      faq: [
        { q: 'What treatments are included in a smile makeover?', a: 'A smile makeover can include veneers, crowns, whitening, implants, and gum contouring.' },
      ]
    },
    [t.fullMouthRestorationSlug]: {
      titleKey: 'fullMouthRestoration',
      descKey: 'fullMouthRestorationDesc',
      img: implantImg,
      benefits: ['Complete dental rehabilitation', 'Restores full function', 'Addresses all dental issues', 'Uses latest technology', 'Life-changing results'],
      forWhom: ['Patients with extensive dental damage', 'Those with multiple missing teeth', 'People with severe wear or erosion', 'Anyone needing comprehensive reconstruction'],
      process: ['Full examination and 3D imaging', 'Comprehensive treatment plan', 'Foundation work (extractions, bone grafts)', 'Implant and restoration placement', 'Final adjustments and follow-up'],
      results: ['Fully restored dental function', 'Beautiful, natural-looking smile', 'Improved quality of life', 'Long-term oral health'],
      faq: [
        { q: 'How long does full mouth restoration take?', a: 'Depending on complexity, treatment can span from several weeks to several months.' },
      ]
    },
  };

  return data[slug] || null;
};

const TreatmentDetailPage = () => {
  const { t, localePath } = useLanguage();
  const { treatmentSlug } = useParams<{ treatmentSlug: string }>();
  
  const treatment = getTreatmentData(treatmentSlug || '', t);

  if (!treatment) {
    return (
      <div className="section-padding container-dental text-center">
        <h1 className="heading-display">Treatment Not Found</h1>
      </div>
    );
  }

  const title = (t as any)[treatment.titleKey] || treatment.titleKey;
  const desc = (t as any)[treatment.descKey] || treatment.descKey;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] max-h-[400px] overflow-hidden">
          <img src={treatment.img} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-8">
          <div className="container-dental">
            <h1 className="heading-display text-background">{title}</h1>
            <p className="text-background/80 mt-2 max-w-2xl">{desc}</p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-6">
        <div className="container-dental px-4 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
          <WhatsAppButton text={t.sendSmilePhotos} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.benefits}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treatment.benefits.map((b, i) => (
              <motion.div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Check className="h-5 w-5 text-trust mt-0.5 shrink-0" />
                <span className="text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.whoIsItFor}</h2>
          <div className="space-y-3">
            {treatment.forWhom.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.treatmentProcess}</h2>
          <div className="space-y-4">
            {treatment.process.map((step, i) => (
              <motion.div key={i} className="flex items-start gap-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                <div className="pt-2 text-sm">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.expectedResults}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treatment.results.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-3xl">
          <h2 className="heading-section text-center mb-8">{t.faqTitle}</h2>
          <div className="space-y-4">
            {treatment.faq.map((faq, i) => (
              <details key={i} className="bg-card rounded-xl border border-border group">
                <summary className="p-5 cursor-pointer font-medium text-foreground flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.readyToStart}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default TreatmentDetailPage;
