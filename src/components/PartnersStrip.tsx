"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const ECOSYSTEM_LOGOS = [
  { src: "/logos/BPI.jpg",                         alt: "BPI France" },
  { src: "/logos/ans.png",                          alt: "Agence du Numérique en Santé" },
  { src: "/logos/fnadepa-national.png",             alt: "FNADEPA" },
  { src: "/logos/events/hec-incubator.png",         alt: "HEC Incubateur" },
  { src: "/logos/events/hec-launchpad.jpeg",        alt: "HEC Launchpad" },
  { src: "/logos/FHF.jpg",                          alt: "Fédération Hospitalière de France" },
{ src: "/logos/events/defis-autonomie-logo.png",  alt: "Défi Autonomie" },
  { src: "/logos/events/keyrus-logo.png",           alt: "Keyrus" },
  { src: "/logos/events/silvereco-innov.jpg",       alt: "SilverEco" },
  { src: "/logos/events/ieseg-logo.png",            alt: "IESEG" },
  { src: "/logos/events/silver-valley.png",         alt: "Silver Valley" },
];

const TRACK = [...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS];

// Bandeau de logos partenaires, placé juste sous « Résultats et impacts mesurés »
export default function PartnersStrip() {
  const { t } = useLanguage();
  const ps = t.partners_strip;
  return (
    <section className="py-10 sm:py-12" id="partenaires" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--sp-500)" }}>
          {ps.tag}
        </p>
        <div className="marquee-wrap">
          <div className="marquee-track marquee-rtl">
            {TRACK.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-5 flex-shrink-0 rounded-2xl px-4 py-3"
                style={{ height: 72, width: 156, background: "#ffffff", border: "1px solid rgba(0,40,120,0.08)", boxShadow: "0 10px 24px -20px rgba(13,48,160,0.5)", pointerEvents: "none" }}
                aria-hidden={i >= ECOSYSTEM_LOGOS.length || undefined}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={116}
                  height={46}
                  className="object-contain"
                  style={{ maxHeight: 46, width: "auto", maxWidth: 116 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
