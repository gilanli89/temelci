import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuoteModal } from './QuoteModal';

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const Navbar = () => {
  const { t, lang, setLang, languages, localePath } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const currentLang = languages.find(l => l.code === lang);
  const isTr = lang === 'tr';

  const navLinks = [
    { label: t.home, path: '' },
    { label: t.treatments, path: `/${t.treatmentsSlug}` },
    { label: t.dentalTourism, path: `/${t.dentalTourismSlug}` },
    { label: t.ourClinic, path: `/${t.ourClinicSlug}` },
    { label: t.ourTeam, path: `/${t.aboutSlug}#doctors` },
    { label: t.beforeAfter, path: `/${t.beforeAfterSlug}` },
    { label: t.reviews, path: `/${t.reviewsSlug}` },
    { label: t.about, path: `/${t.aboutSlug}` },
    { label: t.contact, path: `/${t.contactSlug}` },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container-dental flex items-center justify-between h-16 md:h-20 px-4">
          <Link to={localePath('')} onClick={scrollToTop} className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-display font-bold text-primary">Temelci</span>
            <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">Dental</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.path} to={localePath(link.path)} onClick={scrollToTop}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                <span>{currentLang?.flag}</span>
                <span>{currentLang?.code.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-xl py-2 min-w-[160px] z-50">
                  {languages.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-secondary transition-colors ${l.code === lang ? 'text-primary font-semibold' : 'text-foreground'}`}>
                      <span>{l.flag}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA button */}
            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-base leading-none">✦</span>
              {isTr ? 'Ücretsiz Teklif Al' : 'Get Free Quote'}
            </button>
          </div>

          {/* Mobile: quote + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setQuoteOpen(true)}
              className="px-3 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold"
            >
              {isTr ? 'Teklif Al' : 'Get Quote'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-card border-b border-border">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.path} to={localePath(link.path)}
                  onClick={() => { setIsOpen(false); scrollToTop(); }}
                  className="block py-3 text-sm font-medium text-foreground/80 hover:text-primary border-b border-border/50">
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-wrap gap-2 py-3">
                {languages.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setIsOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${l.code === lang ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <button onClick={() => { setIsOpen(false); setQuoteOpen(true); }}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
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
