import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.contactTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.contactSubtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="heading-section mb-6">{t.contactTitle}</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.ourLocation}</h3>
                    <p className="text-sm text-muted-foreground">{t.contactAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.contactPhone}</h3>
                    <p className="text-sm text-muted-foreground">WhatsApp & Phone</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.contactEmail}</h3>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-sm text-muted-foreground">Mon - Sat: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
              <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form className="bg-card rounded-2xl border border-border p-8 space-y-5" onSubmit={e => { e.preventDefault(); window.open(`https://wa.me/905481234567?text=Contact form submission`, '_blank'); }}>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.yourName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.yourEmail}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.yourMessage}</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" required />
                </div>
                <button type="submit" className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  {t.sendMessage}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-background pb-16">
        <div className="container-dental max-w-5xl">
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.36!3d35.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDExJzI0LjAiTiAzM8KwMjEnMzYuMCJF!5e0!3m2!1sen!2s!4v1"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Maps" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
