import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Calculateur de ROI — Speakli",
  description:
    "Estimez les gains financiers de Speakli pour votre établissement : temps libéré, valeur monétisée et optimisation de la dotation GMPS.",
};

export default function ROIPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <ROICalculator />
      </main>
      <Footer />
    </>
  );
}
