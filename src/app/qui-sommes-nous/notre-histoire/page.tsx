import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurStory from "@/components/OurStory";

export const metadata: Metadata = {
  title: "Notre histoire | Startup IA pour soignants fondée à Paris",
  description:
    "Speakli est né d'une écoute profonde : celle du Dr Hélène Safar, de 350 professionnels de santé, et d'une conviction personnelle née au chevet des résidents. Découvrez nos origines.",
  openGraph: {
    title: "Notre histoire — Speakli",
    description:
      "Comment trois fondateurs ont transformé 350 témoignages de soignants en une solution IA qui redonne du temps au soin.",
    url: "https://www.speakli.fr/qui-sommes-nous/notre-histoire",
  },
  alternates: { canonical: "https://www.speakli.fr/qui-sommes-nous/notre-histoire" },
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main>
        <OurStory />
      </main>
      <Footer />
    </>
  );
}
