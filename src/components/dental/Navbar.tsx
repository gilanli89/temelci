import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuoteModal } from './QuoteModal';

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

export const Navbar = () => {
  const { t, lang, localePath } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Check if a path is active
  const isActive = (path: string) => {
    if (!path) return location.pathname === `/${lang}`;
    return location.pathname.includes(path.replace('#', '').split('#')[0]);
  };

  const handleNav = (path: string) => {
    if (!path.includes('#')) scrollToTop();
    setOpenDropdown(null);
    setIsOpen(false);
  };

  const isTr = lang === 'tr';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const navGroups = [
    {
      id: 'treatments',
      label: isTr ? 'Tedaviler' : 'Treatments',
      dropdown: [
        { label: t.hollywoodSmile,       path: `/${t.hollywoodSmileSlug}` },
        { label: t.dentalImplants,       path: `/${t.implantsSlug}` },
        { label: t.allOn4,               path: `/${t.allOn4Slug}` },
        { label: t.veneers,              path: `/${t.veneersSlug}` },
        { label: t.zirconiaCrowns,       path: `/${t.zirconiaCrownsSlug}` },
        { label: t.teethWhitening,       path: `/${t.teethWhiteningSlug}` },
        { label: t.rootCanal,            path: `/${t.rootCanalSlug}` },
        { label: t.smileMakeover,        path: `/${t.smileMakeoverSlug}` },
        { label: t.fullMouthRestoration, path: `/${t.fullMouthRestorationSlug}` },
      ],
    },
    {
      id: 'clinic',
      label: isTr ? 'Klinik' : 'Clinic',
      dropdown: [
        { label: t.ourClinic,   path: `/${t.ourClinicSlug}` },
        { label: t.ourTeam,     path: `/${t.aboutSlug}#doctors` },
        { label: t.beforeAfter, path: `/${t.beforeAfterSlug}` },
        { label: t.reviews,     path: `/${t.reviewsSlug}` },
        { label: t.about,       path: `/${t.aboutSlug}` },
      ],
    },
  ];

  const directLinks = [
    { label: t.dentalTourism, path: `/${t.dentalTourismSlug}` },
    { label: t.blog,          path: `/${t.blogSlug}` },
    { label: t.contact,       path: `/${t.contactSlug}` },
  ];

  const dropLinkClass = "block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/60 rounded-lg transition-colors";

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container-dental flex items-center justify-between h-16 md:h-[68px] px-4 md:px-6">

          {/* Logo */}
          <Link to={localePath('')} onClick={scrollToTop} className="flex items-center gap-2 shrink-0 mr-4">
            <span className="text-xl md:text-2xl font-display font-black text-primary">Temelci</span>
            <span className="text-[10px] font-body text-muted-foreground uppercase tracking-[0.2em] mt-0.5">Dental</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">

            {/* Dropdown groups */}
            {navGroups.map(group => (
              <div key={group.id} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === group.id ? null : group.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    openDropdown === group.id
                      ? 'bg-secondary text-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-secondary/50'
                  }`}
                >
                  {group.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === group.id ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === group.id && (
                  <div className={`absolute top-full left-0 mt-2 bg-card border border-border rounded-2xl shadow-2xl py-2 z-50 ${
                    group.id === 'treatments' ? 'min-w-[200px]' : 'min-w-[180px]'
                  }`}>
                    {group.dropdown.map(item => (
                      <Link key={item.path} to={localePath(item.path)}
                        onClick={() => handleNav(item.path)}
                        className={dropLinkClass}>
                        {item.label}
                      </Link>
                    ))}
                    {group.id === 'treatments' && (
                      <>
                        <div className="my-1 mx-3 border-t border-border" />
                        <Link to={localePath(`/${t.treatmentsSlug}`)}
                          onClick={() => handleNav(`/${t.treatmentsSlug}`)}
                          className="block px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          {isTr ? 'Tüm Tedaviler →' : 'All Treatments →'}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Direct links */}
            {directLinks.map(link => (
              <Link key={link.path} to={localePath(link.path)} onClick={() => handleNav(link.path)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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

              {/* Treatments */}
              <div className="pb-2">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 py-2">
                  {isTr ? 'Tedaviler' : 'Treatments'}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {navGroups[0].dropdown.map(item => (
                    <Link key={item.path} to={localePath(item.path)}
                      onClick={() => handleNav(item.path)}
                      className="text-sm text-foreground/80 hover:text-primary py-2 px-3 rounded-xl hover:bg-secondary/60 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link to={localePath(`/${t.treatmentsSlug}`)}
                  onClick={() => handleNav(`/${t.treatmentsSlug}`)}
                  className="block text-sm font-bold text-primary px-3 pt-2 hover:underline">
                  {isTr ? 'Tüm Tedaviler →' : 'All Treatments →'}
                </Link>
              </div>

              <div className="border-t border-border/50 pt-2">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 py-2">
                  {isTr ? 'Klinik' : 'Clinic'}
                </p>
                {navGroups[1].dropdown.map(item => (
                  <Link key={item.path} to={localePath(item.path)}
                    onClick={() => handleNav(item.path)}
                    className="block py-2.5 px-3 text-sm font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-secondary/60 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border/50 pt-2">
                {directLinks.map(link => (
                  <Link key={link.path} to={localePath(link.path)}
                    onClick={() => handleNav(link.path)}
                    className="block py-2.5 px-3 text-sm font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-secondary/60 transition-colors">
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
