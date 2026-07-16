import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuoteModal } from './QuoteModal';

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

export const Navbar = () => {
  const { t, lang, localePath } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const location = useLocation();

  // Check if a path is active
  const isActive = (path: string) => {
    if (!path) return location.pathname === `/${lang}`;
    return location.pathname.includes(path.replace('#', '').split('#')[0]);
  };

  const handleNav = (path: string) => {
    if (!path.includes('#')) scrollToTop();
    setIsOpen(false);
  };

  const isTr = lang === 'tr';

  const primaryLinks = [
    { label: isTr ? 'Tedaviler' : 'Treatments', path: `/${t.treatmentsSlug}` },
    { label: isTr ? 'Klinik' : 'Clinic', path: `/${t.ourClinicSlug}` },
    { label: isTr ? 'Laboratuvar' : 'Lab', path: '/lab' },
    { label: t.beforeAfter, path: `/${t.beforeAfterSlug}` },
    { label: t.dentalTourism, path: `/${t.dentalTourismSlug}` },
    { label: t.contact, path: `/${t.contactSlug}` },
  ];

  return (
    <>
      <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container-dental flex items-center justify-between h-16 md:h-[68px] px-4 md:px-6">

          {/* Logo */}
          <Link to={localePath('')} onClick={scrollToTop} className="flex items-center gap-2 shrink-0 mr-4">
            <span className="text-xl md:text-2xl font-display font-black text-primary">Temelci</span>
            <span className="text-[10px] font-body text-muted-foreground uppercase tracking-[0.2em] mt-0.5">Dental</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {primaryLinks.map(link => (
              <Link key={link.path} to={localePath(link.path)} onClick={() => handleNav(link.path)}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/8'
                    : 'text-foreground/80 hover:text-primary hover:bg-secondary/50'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right: CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 ml-2">
            <button onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap">
              <span className="leading-none">✦</span>
              {isTr ? 'Ücretsiz Teklif Al' : 'Free Quote'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-card border-b border-border max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              <div aria-label="Primary navigation links">
                {primaryLinks.map(link => (
                  <Link key={link.path} to={localePath(link.path)}
                    onClick={() => handleNav(link.path)}
                    className="block py-3 px-3 text-sm font-semibold text-foreground/80 hover:text-primary rounded-xl hover:bg-secondary/60 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 pb-1">
                <button onClick={() => { setIsOpen(false); setQuoteOpen(true); }}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                  ✦ {isTr ? 'Ücretsiz Teklif Al' : 'Get Free Quote'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};
