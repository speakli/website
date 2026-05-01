import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesContent from "@/components/ResourcesContent";

export const metadata: Metadata = {
  title: "Articles & Ressources pour EHPAD | Traçabilité, Financement, IA",
  description:
    "Articles thématiques pour les directeurs d'EHPAD et soignants : PATHOS/GMPS, fidélisation des équipes, conformité ARS, IA en EHPAD — et notre revue de presse.",
  openGraph: {
    title: "Articles & Ressources pour directeurs d'EHPAD — Speakli",
    description:
      "PATHOS, traçabilité, inspection ARS, fidélisation soignants, HDS/RGPD : tous nos guides pratiques pour les professionnels du soin.",
    url: "https://www.speakli.fr/ressources",
  },
  alternates: { canonical: "https://www.speakli.fr/ressources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <ResourcesContent />
      </main>
      <Footer />
    </>
  );
}
