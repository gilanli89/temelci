import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';

const BeforeAfterPage = () => {
  const { t } = useLanguage();

  const instagramPosts = [
    'https://www.instagram.com/p/dentaltemelci/',
  ];

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.beforeAfterTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.beforeAfterSubtitle}</p>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-6">
        <div className="container-dental px-4 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton text={t.sendSmilePhotos} variant="hero" />
        </div>
      </section>

      {/* Instagram Embeds */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8 text-center">{t.followInstagram}</h2>
          
          {/* Instagram Feed Embed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <iframe
                src="https://www.instagram.com/dentaltemelci/embed"
                width="100%" height="480" frameBorder="0"
                scrolling="no" allowTransparency
                className="rounded-xl"
                title="Instagram Feed" />
            </div>
            <div className="space-y-6">
              <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-display text-lg font-semibold mb-3">📸 {t.followInstagram}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow @dentaltemelci on Instagram to see daily smile transformations, behind-the-scenes content, and patient journeys.
                </p>
                <a href="https://www.instagram.com/dentaltemelci/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  @dentaltemelci
                </a>
              </motion.div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold mb-3">{t.readyToStart}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.faq5A}</p>
                <WhatsAppButton text={t.sendSmilePhotos} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default BeforeAfterPage;
