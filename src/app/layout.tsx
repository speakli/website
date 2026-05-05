import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.speakli.fr");

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Speakli – Assistant vocal IA pour soignants en EHPAD | Traçabilité en temps réel",
    template: "%s — Speakli",
  },
  description:
    "Speakli redonne du temps à vos soignants grâce à la documentation vocale IA. Traçabilité en temps réel, conformité RGPD, hébergement HDS certifié (France). Utilisé dans 40+ EHPAD.",
  keywords: [
    "assistant vocal EHPAD",
    "traçabilité soins EHPAD",
    "logiciel soignants",
    "IA santé",
    "documentation vocale",
    "DUI EHPAD",
    "transmissions soignantes",
    "GMPS PATHOS",
    "HDS certifié",
    "RGPD santé",
  ],
  authors: [{ name: "Speakli", url: BASE_URL }],
  creator: "Speakli",
  publisher: "Speakli",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Speakli – L'assistant vocal IA pour soignants en EHPAD",
    description:
      "Documentez vos soins par la voix. Traçabilité en temps réel, conformité RGPD, hébergement HDS certifié. 350+ soignants nous font confiance.",
    url: BASE_URL,
    siteName: "Speakli",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 800,
        alt: "Soignante utilisant Speakli dans un couloir d'EHPAD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakli – Assistant vocal IA pour soignants en EHPAD",
    description:
      "Documentez vos soins par la voix. Traçabilité en temps réel, conformité RGPD, hébergement HDS certifié.",
    creator: "@speakli_fr",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "speakli-google-site-verification",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Speakli",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-speakli.png`,
        width: 200,
        height: 60,
      },
      description:
        "Speakli est un assistant vocal IA pour soignants en EHPAD qui automatise la documentation des soins et améliore la traçabilité en temps réel.",
      foundingDate: "2023",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
        addressLocality: "Paris",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@speakli.fr",
        url: "https://calendly.com/ruben-speakli/30min",
      },
      sameAs: [
        "https://www.linkedin.com/company/speakli",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "Speakli",
      applicationCategory: "HealthcareApplication",
      operatingSystem: "iOS, Android, Web",
      url: BASE_URL,
      description:
        "Assistant vocal IA pour la documentation des soins en EHPAD. Traçabilité en temps réel, conformité RGPD, hébergement HDS certifié en France.",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceType: "https://schema.org/InvoicePrice",
          unitText: "sur devis",
        },
      },
      featureList: [
        "Documentation vocale des soins",
        "Traçabilité en temps réel",
        "Conformité RGPD",
        "Hébergement HDS certifié (France)",
        "Interopérabilité avec les logiciels métier",
        "Tableau de bord et indicateurs qualité",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Speakli",
      description: "Site officiel de Speakli — assistant vocal IA pour soignants en EHPAD",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
