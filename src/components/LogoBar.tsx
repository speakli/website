"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const CLIENT_LOGOS = [
  { src: "/logos/gcsms.png", alt: "GCSMS Comète Bretagne" },
  { src: "/logos/clients/solila.png",       alt: "Groupe Solila" },
  { src: "/logos/clients/saint-charles.svg", alt: "Fondation Saint Charles" },
  { src: "/logos/clients/residence-marais.png", alt: "Résidence du Marais" },
  { src: "/logos/clients/fleurs-bleues.jpg", alt: "Les Pâtes des Fleurs Bleues" },
  { src: "/logos/homage-group.png",          alt: "Groupe Hom'Age" },
  { src: "/logos/pervenches-homage.png",     alt: "Résidence les Pervenches" },
  { src: "/logos/clients/mdf.png",           alt: "Maisons de Famille" },
];

const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function LogoBar() {
  const { t } = useLanguage();
  return (
    <section
      className="py-12"
      style={{ background: "#ffffff" }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-7"
        style={{ color: "var(--sp-500)", textAlign: "center" }}
      >
        {t.logobar.label}
      </p>
      <div className="max-w-6xl mx-auto px-6">
        <div className="marquee-wrap">
          <div className="marquee-track marquee-rtl">
            {TRACK.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-4 flex-shrink-0 rounded-2xl px-5 py-3.5"
                style={{
                  height: 72,
                  width: 156,
                  background: "#ffffff",
                  border: "1px solid rgba(0,40,120,0.08)",
                  pointerEvents: "none",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={110}
                  height={44}
                  unoptimized
                  className="object-contain"
                  style={{ maxHeight: 44, width: "auto", maxWidth: 110 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
