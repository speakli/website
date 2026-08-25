import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";

const BASE_URL = "https://www.speakli.fr";

export const metadata: Metadata = {
  title: "Calculateur ROI EHPAD : gain de temps soignant et dotation GMPS",
  description:
    "Estimez le retour sur investissement d'un logiciel de traçabilité vocale pour votre EHPAD : temps soignant libéré, réduction de la charge administrative et impact sur votre dotation GMPS.",
  openGraph: {
    title: "Calculateur ROI EHPAD — Speakli",
    description:
      "Estimez en 30 secondes le gain de temps soignant et l'impact sur votre dotation GMPS grâce à la traçabilité vocale.",
    url: `${BASE_URL}/roi`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur ROI EHPAD — Speakli",
    description:
      "Estimez le gain de temps soignant et l'impact sur votre dotation GMPS grâce à la traçabilité vocale.",
  },
  alternates: { canonical: `${BASE_URL}/roi` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Calculateur ROI", item: `${BASE_URL}/roi` },
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
