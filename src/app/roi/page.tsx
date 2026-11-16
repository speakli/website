import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";

const BASE_URL = "https://www.speakli.fr";

export const metadata: Metadata = {
  title: "Calculateur PATHOS EHPAD : estimez votre gain de dotation soins (GMPS)",
  description:
    "Calculateur PATHOS gratuit : estimez le gain de dotation soins (GMPS) de votre EHPAD grâce à une traçabilité complète des soins, à partir de votre nombre de lits et de votre PMP. Rapport PDF envoyé par e-mail.",
  openGraph: {
    title: "Calculateur PATHOS EHPAD — Speakli",
    description:
      "Estimez en 30 secondes le gain de dotation soins (GMPS) de votre EHPAD grâce à une traçabilité complète des soins.",
    url: `${BASE_URL}/roi`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur PATHOS EHPAD — Speakli",
    description:
      "Estimez le gain de dotation soins (GMPS) de votre EHPAD grâce à une traçabilité complète des soins.",
  },
  alternates: { canonical: `${BASE_URL}/roi` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Calculateur PATHOS", item: `${BASE_URL}/roi` },
  ],
};

export default function ROIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main style={{ paddingTop: "80px", background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <ROICalculator />
      </main>
      <Footer />
    </>
  );
}
