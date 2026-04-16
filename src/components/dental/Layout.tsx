import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { useLanguage } from '@/i18n/LanguageContext';
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const Layout = () => {
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-[68px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton text="" variant="sticky" />

      {/* Back to top — sits left of WhatsApp button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-20 z-40 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
