import type { Metadata } from "next";
import { translations } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import Pillars from "@/components/Pillars";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import PartnersStrip from "@/components/PartnersStrip";
import Onboarding from "@/components/Onboarding";
import FAQ from "@/components/FAQ";
import ROITeaser from "@/components/ROITeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CareSection from "@/components/CareSection";

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
      <main>
        <Hero />
        <LogoBar />
        <Pillars />
        <div style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
          <Testimonials />
          <Stats />
          <CareSection />
        </div>
        <div style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
          <Features />
        </div>
        <div style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
          <ROITeaser />
          <Onboarding />
          <PartnersStrip />
        </div>
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
