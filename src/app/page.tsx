import type { Metadata } from "next";
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
import CTAPopup from "@/components/CTAPopup";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.speakli.fr" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment fonctionne l'assistant vocal Speakli en EHPAD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les soignants dictent leurs observations vocalement via l'application Speakli. L'IA transcrit, structure et enregistre automatiquement les transmissions dans le dossier résident. Aucune saisie manuelle n'est nécessaire.",
      },
    },
    {
      "@type": "Question",
      name: "Speakli est-il conforme au RGPD et à la certification HDS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Speakli est hébergé sur une infrastructure HDS (Hébergement Données de Santé) certifiée en France. Les données sont chiffrées de bout en bout, aucune voix n'est conservée après traitement, et l'accès est strictement limité aux équipes autorisées.",
      },
    },
    {
      "@type": "Question",
      name: "Speakli s'intègre-t-il avec mon logiciel métier DUI existant ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speakli s'intègre par API sécurisée avec les principaux logiciels de soins utilisés en EHPAD. Le transfert de données est instantané et ne nécessite aucune double saisie.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est l'impact de Speakli sur la dotation GMPS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une meilleure documentation quotidienne améliore la précision du codage PATHOS lors de la coupe annuelle. Des établissements utilisateurs ont constaté des gains significatifs sur leur PMP — jusqu'à plusieurs dizaines de milliers d'euros de dotation annuelle supplémentaire.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps prend la mise en place de Speakli ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le déploiement est conçu pour être rapide : formation des équipes en moins de 2 heures, intégration technique en quelques jours. La plupart des établissements sont opérationnels en moins d'une semaine.",
      },
    },
  ],
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
      <CTAPopup />
    </>
  );
}
