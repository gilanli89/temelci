import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';

const SocialPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.socialTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.socialSubtitle}</p>
        </div>
      </section>

      {/* Instagram */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section mb-6">📸 Instagram</h2>
            <div className="bg-card rounded-2xl border border-border p-6">
              <iframe
                src="https://www.instagram.com/dentaltemelci/embed"
                width="100%" height="500" frameBorder="0"
                scrolling="no" allowTransparency
                className="rounded-xl"
                title="Instagram Feed" />
              <div className="mt-4 text-center">
                <a href="https://www.instagram.com/dentaltemelci/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  {t.followInstagram} → @dentaltemelci
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facebook */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section mb-6">📘 Facebook</h2>
            <div className="bg-card rounded-2xl border border-border p-6">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2FTemelci-61577466848604%2F&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="100%" height="500" style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no" frameBorder="0" allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Page" className="rounded-xl" />
              <div className="mt-4 text-center">
                <a href="https://www.facebook.com/p/Temelci-61577466848604/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  {t.followFacebook}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section mb-6">📍 {t.findOnMaps}</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.36!3d35.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDExJzI0LjAiTiAzM8KwMjEnMzYuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Maps" />
            </div>
            <p className="text-center text-muted-foreground mt-4">{t.clinicLocation}</p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl text-center">
          <h2 className="heading-section mb-8">Social Proof</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="text-3xl font-display font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Instagram Followers</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="text-3xl font-display font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground mt-1">Google Rating</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="text-3xl font-display font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">{t.happyPatients}</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="text-3xl font-display font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground mt-1">{t.countriesServed}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default SocialPage;
