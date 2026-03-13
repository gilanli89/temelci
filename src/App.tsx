import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Layout } from "@/components/dental/Layout";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/dental/HomePage"));
const TreatmentsPage = lazy(() => import("./pages/dental/TreatmentsPage"));
const TreatmentDetailPage = lazy(() => import("./pages/dental/TreatmentDetailPage"));
const BeforeAfterPage = lazy(() => import("./pages/dental/BeforeAfterPage"));
const ReviewsPage = lazy(() => import("./pages/dental/ReviewsPage"));
const SocialPage = lazy(() => import("./pages/dental/SocialPage"));
const AboutPage = lazy(() => import("./pages/dental/AboutPage"));
const ContactPage = lazy(() => import("./pages/dental/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const LangRoutes = () => (
  <LanguageProvider>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="treatments" element={<TreatmentsPage />} />
          <Route path="tedaviler" element={<TreatmentsPage />} />
          <Route path="therapies" element={<TreatmentsPage />} />
          <Route path="lechenie" element={<TreatmentsPage />} />
          <Route path="al-ilajat" element={<TreatmentsPage />} />
          <Route path="tipulim" element={<TreatmentsPage />} />
          <Route path="behandlungen" element={<TreatmentsPage />} />
          <Route path="before-after" element={<BeforeAfterPage />} />
          <Route path="once-sonra" element={<BeforeAfterPage />} />
          <Route path="prin-meta" element={<BeforeAfterPage />} />
          <Route path="do-posle" element={<BeforeAfterPage />} />
          <Route path="qabl-baad" element={<BeforeAfterPage />} />
          <Route path="lifnei-acharei" element={<BeforeAfterPage />} />
          <Route path="vorher-nachher" element={<BeforeAfterPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="yorumlar" element={<ReviewsPage />} />
          <Route path="kritikes" element={<ReviewsPage />} />
          <Route path="otzyvy" element={<ReviewsPage />} />
          <Route path="taqyimat" element={<ReviewsPage />} />
          <Route path="bikorot" element={<ReviewsPage />} />
          <Route path="bewertungen" element={<ReviewsPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="sosyal" element={<SocialPage />} />
          <Route path="koinonika" element={<SocialPage />} />
          <Route path="socseti" element={<SocialPage />} />
          <Route path="tawasol" element={<SocialPage />} />
          <Route path="hevrati" element={<SocialPage />} />
          <Route path="soziales" element={<SocialPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="hakkimizda" element={<AboutPage />} />
          <Route path="sxetika" element={<AboutPage />} />
          <Route path="o-nas" element={<AboutPage />} />
          <Route path="an-na" element={<AboutPage />} />
          <Route path="odot" element={<AboutPage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="iletisim" element={<ContactPage />} />
          <Route path="epikoinonia" element={<ContactPage />} />
          <Route path="kontakty" element={<ContactPage />} />
          <Route path="ittisal" element={<ContactPage />} />
          <Route path="tsorkesher" element={<ContactPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path=":treatmentSlug" element={<TreatmentDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  </LanguageProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename={import.meta.env.PROD ? "/clinics/temelci" : ""}>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/:lang/*" element={<LangRoutes />} />
          <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
