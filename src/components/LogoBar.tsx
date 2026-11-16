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
  { src: "/logos/clients/emera.png",         alt: "Emera" },
];

const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

// Version hero : logos en blanc, posés directement sur la vidéo (sans carte).
// h = hauteur d'affichage, plus grande pour les logos carrés afin d'équilibrer.
const HERO_LOGOS = [
  { src: "/logos/hero/maepa.png",            alt: "EHPAD MAEPA Camille Claudel", h: 54 },
  { src: "/logos/hero/casip.png",            alt: "CASIP-COJASOR",              h: 34 },
  { src: "/logos/hero/gcsms.png",            alt: "GCSMS Comète Bretagne",      h: 54 },
  { src: "/logos/hero/solila.png",           alt: "Groupe Solila",              h: 36 },
  { src: "/logos/clients/saint-charles.svg", alt: "Fondation Saint Charles",    h: 44, filter: true },
  { src: "/logos/hero/residence-marais.png", alt: "Résidence du Marais",        h: 44 },
  { src: "/logos/hero/fleurs-bleues.png",    alt: "Les Fleurs Bleues",          h: 50 },
  { src: "/logos/hero/homage.png",           alt: "Groupe Hom'Age",             h: 36 },
  { src: "/logos/hero/pervenches.png",       alt: "Résidence les Pervenches",   h: 34 },
  { src: "/logos/hero/mdf.png",              alt: "Maisons de Famille",         h: 38 },
  { src: "/logos/hero/emera.png",            alt: "Emera",                      h: 26 },
  { src: "/logos/hero/emeis.png",            alt: "emeis",                      h: 50 },
];
const HERO_TRACK = [...HERO_LOGOS, ...HERO_LOGOS];

// variant "hero" : bandeau posé en bas du header vidéo, visible sans scroller
export default function LogoBar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const { t } = useLanguage();
  if (variant === "hero") {
    return (
      <section className="relative z-10 w-full pb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-5 text-center" style={{ color: "rgba(255,255,255,0.75)" }}>
          {t.logobar.label}
        </p>
        <div className="max-w-6xl mx-auto px-6">
          <div className="marquee-wrap">
            <div className="marquee-track marquee-rtl items-center" style={{ height: 56 }}>
              {HERO_TRACK.map((logo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={logo.src}
                  alt={i < HERO_LOGOS.length ? logo.alt : ""}
                  className="flex-shrink-0 mx-8 sm:mx-10"
                  style={{
                    height: logo.h, width: "auto", maxWidth: 170, objectFit: "contain", opacity: 0.9,
                    filter: logo.filter ? "brightness(0) invert(1)" : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12" style={{ background: "#ffffff" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-7" style={{ color: "var(--sp-500)", textAlign: "center" }}>
        {t.logobar.label}
      </p>
      <div className="max-w-6xl mx-auto px-6">
        <div className="marquee-wrap">
          <div className="marquee-track marquee-rtl">
            {TRACK.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-4 flex-shrink-0 rounded-2xl px-5 py-3.5"
                style={{ height: 72, width: 156, background: "#ffffff", border: "1px solid rgba(0,40,120,0.08)", pointerEvents: "none" }}
              >
                <Image src={logo.src} alt={logo.alt} width={110} height={44} unoptimized className="object-contain" style={{ maxHeight: 44, width: "auto", maxWidth: 110 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
