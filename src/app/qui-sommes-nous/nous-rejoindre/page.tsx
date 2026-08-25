import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinUs from "@/components/JoinUs";

export const metadata: Metadata = {
  title: "Nous rejoindre",
  description:
    "Rejoindre Speakli, c'est choisir l'impact. Nous cherchons des talents tournés vers le sens, capables d'allier excellence technologique et empathie du terrain médico-social.",
  alternates: { canonical: "https://www.speakli.fr/qui-sommes-nous/nous-rejoindre" },
};

export default function JoinUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <JoinUs />
      </main>
      <Footer />
    </>
  );
}
