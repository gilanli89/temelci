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
import BlogArticlePage from "./pages/dental/BlogArticlePage";
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
        <Route path="blog/:slug" element={<BlogArticlePage />} />
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
        <Route path="all-on-4" element={<TreatmentDetailPage />} />
        <Route path="anamorfosi-xamogelou" element={<TreatmentDetailPage />} />
        <Route path="bazsazi-kamel" element={<TreatmentDetailPage />} />
        <Route path="bruksizm-tedavisi" element={<TreatmentDetailPage />} />
        <Route path="bruxism-treatment" element={<TreatmentDetailPage />} />
        <Route path="cirkonievye-koronki" element={<TreatmentDetailPage />} />
        <Route path="clear-aligners" element={<TreatmentDetailPage />} />
        <Route path="composite-fillings" element={<TreatmentDetailPage />} />
        <Route path="crowns" element={<TreatmentDetailPage />} />
        <Route path="dental-bonding" element={<TreatmentDetailPage />} />
        <Route path="dis-beyazlatma" element={<TreatmentDetailPage />} />
        <Route path="dis-eti-hastaligi" element={<TreatmentDetailPage />} />
        <Route path="dizajn-ulybki" element={<TreatmentDetailPage />} />
        <Route path="emfyteymata" element={<TreatmentDetailPage />} />
        <Route path="finir" element={<TreatmentDetailPage />} />
        <Route path="full-mouth-restoration" element={<TreatmentDetailPage />} />
        <Route path="gollivudskaya-ulybka" element={<TreatmentDetailPage />} />
        <Route path="gulus-tasarimi" element={<TreatmentDetailPage />} />
        <Route path="gum-disease-treatment" element={<TreatmentDetailPage />} />
        <Route path="halbana" element={<TreatmentDetailPage />} />
        <Route path="hollywood-smile" element={<TreatmentDetailPage />} />
        <Route path="ibtisamat-hollywood" element={<TreatmentDetailPage />} />
        <Route path="implant" element={<TreatmentDetailPage />} />
        <Route path="implantate" element={<TreatmentDetailPage />} />
        <Route path="implantaty" element={<TreatmentDetailPage />} />
        <Route path="implants" element={<TreatmentDetailPage />} />
        <Route path="itzuv-hiyukh" element={<TreatmentDetailPage />} />
        <Route path="kanal-tedavisi" element={<TreatmentDetailPage />} />
        <Route path="kompozit-dolgu" element={<TreatmentDetailPage />} />
        <Route path="koronki" element={<TreatmentDetailPage />} />
        <Route path="kron" element={<TreatmentDetailPage />} />
        <Route path="kronen" element={<TreatmentDetailPage />} />
        <Route path="ktarim" element={<TreatmentDetailPage />} />
        <Route path="laser-gum-treatment" element={<TreatmentDetailPage />} />
        <Route path="lazer-dis-eti" element={<TreatmentDetailPage />} />
        <Route path="leykfansi" element={<TreatmentDetailPage />} />
        <Route path="onleyici-dis-hekimligi" element={<TreatmentDetailPage />} />
        <Route path="opseis" element={<TreatmentDetailPage />} />
        <Route path="orthodontics" element={<TreatmentDetailPage />} />
        <Route path="ortodonti" element={<TreatmentDetailPage />} />
        <Route path="otbelivanie" element={<TreatmentDetailPage />} />
        <Route path="pliri-apokatastasi" element={<TreatmentDetailPage />} />
        <Route path="polnaya-restavraciya" element={<TreatmentDetailPage />} />
        <Route path="preventive-dentistry" element={<TreatmentDetailPage />} />
        <Route path="root-canal-treatment" element={<TreatmentDetailPage />} />
        <Route path="rukesh" element={<TreatmentDetailPage />} />
        <Route path="seffaf-plak" element={<TreatmentDetailPage />} />
        <Route path="sefid-kardan" element={<TreatmentDetailPage />} />
        <Route path="shikum-pe-male" element={<TreatmentDetailPage />} />
        <Route path="shtalim" element={<TreatmentDetailPage />} />
        <Route path="smile-makeover" element={<TreatmentDetailPage />} />
        <Route path="stemmata" element={<TreatmentDetailPage />} />
        <Route path="tabyid-asnan" element={<TreatmentDetailPage />} />
        <Route path="tajmil-ibtisama" element={<TreatmentDetailPage />} />
        <Route path="tam-agiz-restorasyonu" element={<TreatmentDetailPage />} />
        <Route path="tarahi-labkhand" element={<TreatmentDetailPage />} />
        <Route path="tarmim-kamel" element={<TreatmentDetailPage />} />
        <Route path="teeth-whitening" element={<TreatmentDetailPage />} />
        <Route path="tijan" element={<TreatmentDetailPage />} />
        <Route path="tijan-zirkonia" element={<TreatmentDetailPage />} />
        <Route path="tsipuyim" element={<TreatmentDetailPage />} />
        <Route path="vanir" element={<TreatmentDetailPage />} />
        <Route path="veneer" element={<TreatmentDetailPage />} />
        <Route path="veneers" element={<TreatmentDetailPage />} />
        <Route path="viniry" element={<TreatmentDetailPage />} />
        <Route path="vollmund-restauration" element={<TreatmentDetailPage />} />
        <Route path="wisdom-tooth-removal" element={<TreatmentDetailPage />} />
        <Route path="yirmilik-dis-cekimi" element={<TreatmentDetailPage />} />
        <Route path="zahnaufhellung" element={<TreatmentDetailPage />} />
        <Route path="ziraat-asnan" element={<TreatmentDetailPage />} />
        <Route path="zirconia-crowns" element={<TreatmentDetailPage />} />
        <Route path="zirkonia" element={<TreatmentDetailPage />} />
        <Route path="zirkonkronen" element={<TreatmentDetailPage />} />
        <Route path="zirkonyum-kron" element={<TreatmentDetailPage />} />
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
