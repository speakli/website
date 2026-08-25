import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransmissionEhpadContent, { FAQ_ITEMS } from "@/components/TransmissionEhpadContent";

const BASE_URL = "https://www.speakli.fr";
const PAGE_URL = `${BASE_URL}/logiciel-transmission-ehpad`;

export const metadata: Metadata = {
  title: "Logiciel de transmission EHPAD : traçabilité vocale par IA",
  description:
    "Speakli est le logiciel de transmission EHPAD qui transforme la voix des soignants en transmissions ciblées structurées, intégrées à votre DUI en temps réel. Découvrez comment il fonctionne.",
  openGraph: {
    title: "Logiciel de transmission EHPAD — Speakli",
    description:
      "Transmissions ciblées, méthode DAR, intégration DUI : découvrez comment l'IA vocale de Speakli simplifie les transmissions soignantes en EHPAD.",
    url: PAGE_URL,
    siteName: "Speakli",
    locale: "fr_FR",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 800, alt: "Logiciel de transmission EHPAD Speakli" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logiciel de transmission EHPAD — Speakli",
    description:
      "Transmissions ciblées, méthode DAR, intégration DUI : l'IA vocale de Speakli simplifie les transmissions soignantes en EHPAD.",
  },
  alternates: { canonical: PAGE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Logiciel de transmission EHPAD", item: PAGE_URL },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function TransmissionEhpadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <TransmissionEhpadContent />
      </main>
      <Footer />
    </>
  );
}
