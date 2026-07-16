import { useLocation, useNavigate } from "react-router-dom";
import { useSEO } from '@/hooks/useSEO';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({ title: 'Page Not Found | Temelci Dental', description: 'The requested page is not available.', canonical: `https://temelcidentist.com${location.pathname}`, robots: 'noindex,follow' });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-black text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
          >
            ← Go Back
          </button>
          <a
            href="/en"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
