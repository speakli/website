import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersContent from "@/components/PartnersContent";

export const metadata: Metadata = {
  title: "Partenaires & Soutiens — Speakli",
  description:
    "Découvrez les partenaires institutionnels, les financeurs et les reconnaissances qui accompagnent Speakli dans sa mission de transformation numérique des soins.",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PartnersContent />
      </main>
      <Footer />
    </>
  );
}
