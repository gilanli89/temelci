import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from './WhatsAppButton';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  const { t, localePath } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="section-padding bg-primary">
        <div className="container-dental text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">{t.footerCta}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </div>

      <div className="section-padding">
        <div className="container-dental grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Temelci Dental</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {t.heroDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.treatments}</h4>
            <div className="space-y-2">
              <Link to={localePath(`/${t.hollywoodSmileSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.hollywoodSmile}</Link>
              <Link to={localePath(`/${t.implantsSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.dentalImplants}</Link>
              <Link to={localePath(`/${t.veneersSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.veneers}</Link>
              <Link to={localePath(`/${t.crownsSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.crowns}</Link>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold mb-4">{t.home}</h4>
            <div className="space-y-2">
              <Link to={localePath(`/${t.aboutSlug}#doctors`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.ourTeam}</Link>
              <Link to={localePath(`/${t.beforeAfterSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.beforeAfter}</Link>
              <Link to={localePath(`/${t.reviewsSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.reviews}</Link>
              <Link to={localePath(`/${t.aboutSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.about}</Link>
              <Link to={localePath(`/${t.contactSlug}`)} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{t.contact}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{t.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t.contactEmail}</span>
              </div>
              <WhatsAppButton text={t.bookWhatsApp} />
            </div>
          </div>
        </div>

        <div className="container-dental mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-50">© {new Date().getFullYear()} Temelci Dental. {t.footerRights}</p>
          <p className="text-sm opacity-50">{t.privacyPolicy}</p>
        </div>
      </div>
    </footer>
  );
};
