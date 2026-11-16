import type { Metadata } from "next";
import "./home-flow.css";
import { translations } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { StakesSection, BeforeAfterSection, ImpactSection, VoicesSection } from "@/components/StorySections";
import { SecuritySection, InteropSection } from "@/components/TrustSections";
import PartnersStrip from "@/components/PartnersStrip";
import EventsSection from "@/components/EventsSection";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.speakli.fr" },
};

// Mirrors the FAQ actually rendered by <FAQ /> (translations.fr.faq.items) so the
// structured data never drifts from what visitors — and Google — see on the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.fr.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.speakli.fr",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="home-flow">
        <Hero />
        <StakesSection />
        <Products />
        <BeforeAfterSection />
        <VoicesSection />
        <ImpactSection />
        <SecuritySection />
        <InteropSection />
        <EventsSection />
        <FAQ />
        <Contact />
        <PartnersStrip />
      </main>
      <Footer />
    </>
  );
}
