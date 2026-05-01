import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinUs from "@/components/JoinUs";

export const metadata: Metadata = {
  title: "Nous rejoindre — Speakli",
  description:
    "Rejoindre Speakli, c'est choisir l'impact. Nous cherchons des talents tournés vers le sens, capables d'allier excellence technologique et empathie du terrain médico-social.",
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
