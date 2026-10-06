import { useRoute } from "./lib/router";
import { useSeo } from "./lib/seo";
import { ToastProvider } from "./components/ui";
import DemoBar from "./components/DemoBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileActions from "./components/MobileActions";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import ProposalPage from "./pages/ProposalPage";

/* App shell for the Hair by Parvej Kalkaji website.
   All business content lives in src/config/business.js. */
export default function SalonDemo() {
  const { page, param } = useRoute();
  useSeo(page);

  const pages = {
    home: <HomePage />,
    services: <ServicesPage category={param} />,
    gallery: <GalleryPage />,
    reviews: <ReviewsPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
    book: <BookingPage key={param} serviceId={param} />,
    proposal: <ProposalPage />,
  };

  return (
    <ToastProvider>
      {/* a button, not href="#main", because the hash is used for routing */}
      <button onClick={() => document.getElementById("main")?.focus()} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:bg-gold focus:text-ink focus:px-4 focus:py-2 focus:rounded-full">Skip to content</button>
      <DemoBar page={page} />
      <Header page={page} />
      <main id="main" tabIndex={-1} className="outline-none" key={page}>{pages[page] || pages.home}</main>
      <Footer />
      <MobileActions hideBar={page === "book"} />
    </ToastProvider>
  );
}
