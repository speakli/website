"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const ECOSYSTEM_LOGOS = [
  { src: "/logos/BPI.jpg",                         alt: "BPI France" },
  { src: "/logos/ans.png",                          alt: "Agence du Numérique en Santé" },
  { src: "/logos/events/hec-incubator.png",         alt: "HEC Incubateur" },
  { src: "/logos/events/hec-launchpad.jpeg",        alt: "HEC Launchpad" },
  { src: "/logos/FHF.jpg",                          alt: "Fédération Hospitalière de France" },
{ src: "/logos/events/defis-autonomie-logo.png",  alt: "Défi Autonomie" },
  { src: "/logos/events/keyrus-logo.png",           alt: "Keyrus" },
  { src: "/logos/events/silvereco-innov.jpg",       alt: "SilverEco" },
  { src: "/logos/events/ieseg-logo.png",            alt: "IESEG" },
];

const TRACK = [...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS];

export default function PartnersStrip() {
  const { t } = useLanguage();
  const ps = t.partners_strip;
  return (
    <section className="py-20" id="partenaires" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--sp-500)" }}
            >
              {ps.tag}
            </p>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
              style={{ color: "var(--sp-900)" }}
            >
              {ps.h2}
            </h2>
          </div>
          <Link
            href="/qui-sommes-nous/partenaires-et-soutiens"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all flex-shrink-0 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)",
              boxShadow: "0 4px 16px rgba(0,122,255,0.30)",
            }}
          >
            {ps.learn_more}
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Logo strip - scrolling marquee */}
        <div className="border-t pt-10" style={{ borderColor: "var(--sp-100)" }}>
          <div className="marquee-wrap">
            <div className="marquee-track marquee-rtl">
              {TRACK.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center mx-6 flex-shrink-0 rounded-xl px-4 py-3"
                  style={{ height: 68, width: 148, background: "#ffffff", border: "1px solid rgba(0,40,120,0.08)", pointerEvents: "none" }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={110}
                    height={44}
                    className="object-contain"
                    style={{ maxHeight: 44, width: "auto", maxWidth: 110 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
