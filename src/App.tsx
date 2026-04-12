import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Layout } from "@/components/dental/Layout";
import { ScrollToTop } from "@/components/dental/ScrollToTop";
import HomePage from "./pages/dental/HomePage";
import TreatmentsPage from "./pages/dental/TreatmentsPage";
import TreatmentDetailPage from "./pages/dental/TreatmentDetailPage";
import BeforeAfterPage from "./pages/dental/BeforeAfterPage";
import ReviewsPage from "./pages/dental/ReviewsPage";
import SocialPage from "./pages/dental/SocialPage";
import AboutPage from "./pages/dental/AboutPage";
import ContactPage from "./pages/dental/ContactPage";
import LandingPage from "./pages/dental/LandingPage";
import HollywoodSmileLanding from "./pages/dental/HollywoodSmileLanding";
import AllOn4Landing from "./pages/dental/AllOn4Landing";
import DrSerifePage from "./pages/dental/DrSerifePage";
import OurClinicPage from "./pages/dental/OurClinicPage";
import BlogPage from "./pages/dental/BlogPage";
import DentalTourismPage from "./pages/dental/DentalTourismPage";
import ResearchPage from "./pages/dental/ResearchPage";
import ResearchDetailPage from "./pages/dental/ResearchDetailPage";
import ImplantPackageLanding from "./pages/dental/ImplantPackageLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LangRoutes = () => (
  <LanguageProvider>
      <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="landing" element={<LandingPage />} />
        <Route path="landing/hollywood-smile" element={<HollywoodSmileLanding />} />
        <Route path="landing/allon4" element={<AllOn4Landing />} />
        <Route path="landing/implant-packages" element={<ImplantPackageLanding />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="treatments" element={<TreatmentsPage />} />
        <Route path="tedaviler" element={<TreatmentsPage />} />
        <Route path="therapies" element={<TreatmentsPage />} />
        <Route path="lechenie" element={<TreatmentsPage />} />
        <Route path="al-ilajat" element={<TreatmentsPage />} />
        <Route path="tipulim" element={<TreatmentsPage />} />
        <Route path="behandlungen" element={<TreatmentsPage />} />
        <Route path="darman-ha" element={<TreatmentsPage />} />
        <Route path="before-after" element={<BeforeAfterPage />} />
        <Route path="once-sonra" element={<BeforeAfterPage />} />
        <Route path="prin-meta" element={<BeforeAfterPage />} />
        <Route path="do-posle" element={<BeforeAfterPage />} />
        <Route path="qabl-baad" element={<BeforeAfterPage />} />
        <Route path="lifnei-acharei" element={<BeforeAfterPage />} />
        <Route path="vorher-nachher" element={<BeforeAfterPage />} />
        <Route path="pish-pas" element={<BeforeAfterPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="yorumlar" element={<ReviewsPage />} />
        <Route path="kritikes" element={<ReviewsPage />} />
        <Route path="otzyvy" element={<ReviewsPage />} />
        <Route path="taqyimat" element={<ReviewsPage />} />
        <Route path="bikorot" element={<ReviewsPage />} />
        <Route path="bewertungen" element={<ReviewsPage />} />
        <Route path="nazar" element={<ReviewsPage />} />
        <Route path="social" element={<SocialPage />} />
        <Route path="sosyal" element={<SocialPage />} />
        <Route path="koinonika" element={<SocialPage />} />
        <Route path="socseti" element={<SocialPage />} />
        <Route path="tawasol" element={<SocialPage />} />
        <Route path="hevrati" element={<SocialPage />} />
        <Route path="soziales" element={<SocialPage />} />
        <Route path="ejtemai" element={<SocialPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="hakkimizda" element={<AboutPage />} />
        <Route path="sxetika" element={<AboutPage />} />
        <Route path="o-nas" element={<AboutPage />} />
        <Route path="an-na" element={<AboutPage />} />
        <Route path="odot" element={<AboutPage />} />
        <Route path="ueber-uns" element={<AboutPage />} />
        <Route path="darbare" element={<AboutPage />} />
        <Route path="our-clinic" element={<OurClinicPage />} />
        <Route path="kliniğimiz" element={<OurClinicPage />} />
        <Route path="i-kliniki-mas" element={<OurClinicPage />} />
        <Route path="nasha-klinika" element={<OurClinicPage />} />
        <Route path="iyadetouna" element={<OurClinicPage />} />
        <Route path="hamirpa-shelanu" element={<OurClinicPage />} />
        <Route path="unsere-klinik" element={<OurClinicPage />} />
        <Route path="klinik-ma" element={<OurClinicPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="dental-tourism" element={<DentalTourismPage />} />
        <Route path="dis-turizmi" element={<DentalTourismPage />} />
        <Route path="odontiatrikos-tourismos" element={<DentalTourismPage />} />
        <Route path="stom-turizm" element={<DentalTourismPage />} />
        <Route path="siyaha-ilajiya" element={<DentalTourismPage />} />
        <Route path="tayarut-refuit" element={<DentalTourismPage />} />
        <Route path="zahntourismus" element={<DentalTourismPage />} />
        <Route path="gardeshgari-dandan" element={<DentalTourismPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="dr-serife-kole" element={<DrSerifePage />} />
        <Route path="dr-serife-kole-kocadal" element={<DrSerifePage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="research/:slug" element={<ResearchDetailPage />} />
        <Route path="iletisim" element={<ContactPage />} />
        <Route path="epikoinonia" element={<ContactPage />} />
        <Route path="kontakty" element={<ContactPage />} />
        <Route path="ittisal" element={<ContactPage />} />
        <Route path="tsorkesher" element={<ContactPage />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="tamas" element={<ContactPage />} />
        <Route path=":treatmentSlug" element={<TreatmentDetailPage />} />
      </Route>
    </Routes>
  </LanguageProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename="">
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/:lang/*" element={<LangRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
