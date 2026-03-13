import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Award, GraduationCap, Globe, Heart } from 'lucide-react';
import doctorImg from '@/assets/doctor-portrait.jpg';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.aboutTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.aboutSubtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={doctorImg} alt={t.aboutDoctorName} className="rounded-2xl shadow-lg w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="heading-section mb-4">{t.aboutDoctorName}</h2>
              <p className="text-body mb-6">{t.aboutDoctorBio}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">25+ {t.yearsExperience}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Board Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">30+ {t.countriesServed}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">10,000+ {t.happyPatients}</span>
                </div>
              </div>
              <WhatsAppButton text={t.freeConsultation} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
