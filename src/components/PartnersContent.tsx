"use client";

import Image from "next/image";
import Link from "next/link";
import AwardsBlog from "@/components/AwardsBlog";
import { useLanguage } from "@/context/LanguageContext";

const ECOSYSTEM_LOGOS = [
  { src: "/logos/BPI.jpg",                   alt: "BPI France" },
  { src: "/logos/ans.png",                   alt: "Agence du Numérique en Santé" },
  { src: "/logos/events/hec-incubator.png",  alt: "HEC Incubateur" },
  { src: "/logos/events/hec-launchpad.jpeg", alt: "HEC Launchpad" },
  { src: "/logos/FHF.jpg",                   alt: "Fédération Hospitalière de France" },
  { src: "/logos/silvereco-festival.png",    alt: "SilverEco International Festival" },
  { src: "/logos/events/defis-autonomie-logo.png", alt: "Défi Autonomie" },
  { src: "/logos/events/keyrus-logo.png",    alt: "Keyrus" },
  { src: "/logos/events/silver-valley.png", alt: "Silver Valley" },
];
const ECOSYSTEM_TRACK = [...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS];

/* ─────────────────────────────────────────────────────────
   Timeline data
───────────────────────────────────────────────────────── */

type TimelineType = "Competition" | "Financement" | "Appel à projet" | "Incubateur";
type TimelineStatus = "Remporté" | "Finaliste" | "En cours";

interface TimelineImage {
  src: string;
  alt: string;
}

interface TimelineItem {
  month_fr: string;
  month_en: string;
  year: string;
  title_fr: string;
  title_en: string;
  type: TimelineType;
  status: TimelineStatus;
  description_fr: string;
  description_en: string;
  logo?: string;
  logoAlt?: string;
  images?: TimelineImage[];
}

const TIMELINE: TimelineItem[] = [
  {
    month_fr: "Juin",
    month_en: "Jun.",
    year: "2026",
    title_fr: "Lauréat : Prix Silver Valley 2026 — Sanitaire & Médico-social",
    title_en: "Winner : Silver Valley Prize 2026 — Healthcare & Medico-social",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Speakli est désigné lauréat du Prix Silver Valley 2026 dans la catégorie Sanitaire & Médico-social. Silver Valley est le premier cluster dédié à la Silver Économie en France, fédérant plus de 300 acteurs autour de l'innovation pour le grand âge.",
    description_en:
      "Speakli is named winner of the Silver Valley Prize 2026 in the Healthcare & Medico-social category. Silver Valley is France's leading Silver Economy cluster, bringing together over 300 stakeholders around innovation for ageing.",
    logo: "/logos/events/silver-valley.png",
    logoAlt: "Silver Valley",
  },
  {
    month_fr: "Mai",
    month_en: "May",
    year: "2026",
    title_fr: "Finaliste : Trophées de l'Innovation FHF",
    title_en: "Finalist : FHF Innovation Trophy",
    type: "Competition",
    status: "En cours",
    description_fr:
      "Sélectionné parmi les finalistes des Trophées de l'Innovation de la Fédération Hospitalière de France. Un espace d'exposition nous sera offert lors du salon Santexpo 2026, le plus grand rendez-vous hospitalier français.",
    description_en:
      "Selected as a finalist for the Innovation Trophy of the Fédération Hospitalière de France. We will be given exhibition space at Santexpo 2026, the largest French hospital trade show.",
    logo: "/logos/events/fhf-logo.jpg",
    logoAlt: "Fédération Hospitalière de France",
  },
  {
    month_fr: "Avr.",
    month_en: "Apr.",
    year: "2026",
    title_fr: "Lauréat : Prix Fondation Keyrus, Révélation Entrepreneurs",
    title_en: "Winner : Keyrus Foundation Prize, Startup Revelation",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Récompensés par la Fondation Keyrus pour notre impact sociétal et notre potentiel de croissance. Ce prix distingue les jeunes entreprises innovantes portées par des entrepreneurs engagés.",
    description_en:
      "Recognised by the Keyrus Foundation for our social impact and growth potential. This prize distinguishes innovative young companies led by committed entrepreneurs.",
    logo: "/logos/events/keyrus-logo.png",
    logoAlt: "Keyrus Fondation",
  },
  {
    month_fr: "Fév.",
    month_en: "Feb.",
    year: "2026",
    title_fr: "Lauréat : IESEG Entrepreneur of the Year 2026",
    title_en: "Winner : IESEG Entrepreneur of the Year 2026",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Prix du jury et coup de cœur du public au Prix Entrepreneur 2026 de l'IESEG School of Management. Une reconnaissance de l'excellence entrepreneuriale par l'une des grandes écoles de commerce françaises.",
    description_en:
      "Jury prize and audience favourite at the IESEG School of Management Entrepreneur Prize 2026. Recognition of entrepreneurial excellence by one of France's top business schools.",
    logo: "/logos/events/ieseg-logo.png",
    logoAlt: "IESEG School of Management",
  },
  {
    month_fr: "Fév.",
    month_en: "Feb.",
    year: "2026",
    title_fr: "Lauréat : Bourse French Tech (BPI France)",
    title_en: "Winner : French Tech Grant (BPI France)",
    type: "Financement",
    status: "Remporté",
    description_fr:
      "Sélectionnés par BPI France dans le cadre de la Bourse French Tech, programme de soutien aux startups françaises à fort potentiel. Une validation nationale de notre modèle et de notre trajectoire de croissance.",
    description_en:
      "Selected by BPI France for the French Tech Grant, a support programme for high-potential French startups. National validation of our model and growth trajectory.",
    logo: "/logos/events/bpi-logo.jpg",
    logoAlt: "La French Tech : BPI France",
  },
  {
    month_fr: "Jan.",
    month_en: "Jan.",
    year: "2026",
    title_fr: "Lauréat : ANS Structure 3.0",
    title_en: "Winner : ANS Structure 3.0",
    type: "Appel à projet",
    status: "Remporté",
    description_fr:
      "Lauréats de l'appel à projet national porté par l'Agence du Numérique en Santé (ANS). Ce programme permet à Speakli de déployer et d'expérimenter sa technologie au sein de 18 établissements publics du GCSMS Comet Bretagne.",
    description_en:
      "Winners of the national call for projects run by the Agence du Numérique en Santé (ANS). This programme allows Speakli to deploy and pilot its technology across 18 public facilities in the GCSMS Comet Bretagne network.",
    logo: "/logos/events/ans-logo.png",
    logoAlt: "Agence du Numérique en Santé",
  },
  {
    month_fr: "Déc.",
    month_en: "Dec.",
    year: "2025",
    title_fr: "Finaliste : Défi Autonomie 2025",
    title_en: "Finalist : Défi Autonomie 2025",
    type: "Competition",
    status: "Finaliste",
    description_fr:
      "Sélectionné finaliste du programme Défi Autonomie, dédié aux solutions les plus innovantes pour améliorer la qualité de vie et l'autonomie des personnes âgées en établissement médicalisé.",
    description_en:
      "Selected as a finalist of the Défi Autonomie programme, dedicated to the most innovative solutions for improving quality of life and independence for elderly people in medicalised facilities.",
    logo: "/logos/events/defis-autonomie-logo.png",
    logoAlt: "Défi Autonomie",
  },
  {
    month_fr: "Nov.",
    month_en: "Nov.",
    year: "2025",
    title_fr: "Co-lauréat : JEM Ta Startup 2025",
    title_en: "Co-winner : JEM Ta Startup 2025",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Co-lauréat de l'édition 2025 du concours national JEM Ta Startup, porté par le réseau Jeunes Entreprises de France. Ce prix valorise l'entrepreneuriat à impact et l'innovation au service des territoires.",
    description_en:
      "Co-winner of the 2025 edition of the national JEM Ta Startup competition, run by the Jeunes Entreprises de France network. This prize celebrates impact-driven entrepreneurship and innovation serving local communities.",
    logo: "/logos/events/jem-logo.jpeg",
    logoAlt: "JEM Ta Startup",
  },
  {
    month_fr: "Sept.",
    month_en: "Sep.",
    year: "2025",
    title_fr: "Lauréat : Festival International SilverEco 2025",
    title_en: "Winner : International SilverEco Festival 2025",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Prix de la meilleure innovation dans les catégories QVT, Formation et RSE, et coup de cœur du public, décernés lors du festival international de référence dédié à l'économie du grand âge.",
    description_en:
      "Best innovation prize in the QWL, Training and CSR categories, plus audience favourite, awarded at the international reference festival dedicated to the silver economy.",
    images: [
      {
        src: "/logos/events/silvereco-innov.jpg",
        alt: "Lauréat SilverEco 2025 : Meilleure Innovation QVT / RSE",
      },
      {
        src: "/logos/events/silvereco-public.jpg",
        alt: "Lauréat SilverEco 2025 : Prix du Public",
      },
    ],
  },
  {
    month_fr: "Avr.",
    month_en: "Apr.",
    year: "2025",
    title_fr: "Intégration : HEC Incubateur at Station F",
    title_en: "Joining : HEC Incubator at Station F",
    type: "Incubateur",
    status: "Remporté",
    description_fr:
      "Sélectionné pour intégrer le programme HEC Startup Launchpad à Station F, le plus grand campus de startups au monde. Quatre mois d'accompagnement intensif avec les équipes pédagogiques de HEC Paris.",
    description_en:
      "Selected to join the HEC Startup Launchpad programme at Station F, the world's largest startup campus. Four months of intensive mentoring with HEC Paris faculty teams.",
    logo: "/logos/events/hec-incubator.png",
    logoAlt: "HEC Paris : Incubateur",
  },
  {
    month_fr: "Avr.",
    month_en: "Apr.",
    year: "2025",
    title_fr: "Lauréat : HEC Launchpad, Winner 2025",
    title_en: "Winner : HEC Launchpad 2025",
    type: "Competition",
    status: "Remporté",
    description_fr:
      "Prix du jury et coup de cœur du public à la finale du HEC Launchpad à Station F. L'un des concours entrepreneuriaux les plus sélectifs de l'écosystème startup français.",
    description_en:
      "Jury prize and audience favourite at the HEC Launchpad final at Station F. One of the most selective entrepreneurship competitions in the French startup ecosystem.",
    logo: "/logos/events/hec-launchpad.jpeg",
    logoAlt: "HEC Paris : Launchpad",
  },
];

/* ─────────────────────────────────────────────────────────
   Badge helpers
───────────────────────────────────────────────────────── */

const TYPE_STYLES: Record<TimelineType, { bg: string; text: string }> = {
  Competition:        { bg: "#EEF2FF", text: "#3B4FCF" },
  Financement:        { bg: "#ECFDF5", text: "#059669" },
  "Appel à projet":   { bg: "#FFF7ED", text: "#C2410C" },
  Incubateur:         { bg: "#F5F3FF", text: "#7C3AED" },
};

const STATUS_STYLES: Record<TimelineStatus, { bg: string; text: string; pulse?: boolean }> = {
  Remporté:   { bg: "#ECFDF5", text: "#059669" },
  Finaliste:  { bg: "#FFF7ED", text: "#EA580C" },
  "En cours": { bg: "#EFF6FF", text: "#007AFF", pulse: true },
};

function TypeBadge({ type, label }: { type: TimelineType; label: string }) {
  const s = TYPE_STYLES[type];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status, label }: { status: TimelineStatus; label: string }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.pulse ? (
        <span className="relative flex w-2 h-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: s.text }}
          />
          <span
            className="relative inline-flex rounded-full w-2 h-2"
            style={{ backgroundColor: s.text }}
          />
        </span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.text }} />
      )}
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */

export default function PartnersContent() {
  const { t, locale } = useLanguage();
  const pp = t.partners_page;
  const isEN = locale === "en";

  const years = Array.from(new Set(TIMELINE.map((item) => item.year)));

  function getTypeLabel(type: TimelineType): string {
    switch (type) {
      case "Competition":      return pp.type_competition;
      case "Financement":      return pp.type_financement;
      case "Appel à projet":   return pp.type_aap;
      case "Incubateur":       return pp.type_incubateur;
    }
  }

  function getStatusLabel(status: TimelineStatus): string {
    switch (status) {
      case "Remporté":   return pp.status_won;
      case "Finaliste":  return pp.status_finalist;
      case "En cours":   return pp.status_ongoing;
    }
  }

  return (
    <>
      {/* ── Page hero ── */}
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs font-medium mb-8"
            aria-label="Fil d'Ariane"
          >
            <Link
              href="/"
              style={{ color: "var(--sp-500)" }}
              className="transition-colors hover:opacity-75"
            >
              {pp.breadcrumb_home}
            </Link>
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#718096" }}>{pp.breadcrumb_who}</span>
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "var(--sp-900)" }}>{pp.breadcrumb_page}</span>
          </nav>

          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--sp-500)" }}
          >
            {pp.tag}
          </p>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6"
            style={{ color: "var(--sp-900)" }}
          >
            {pp.h1_pre}{" "}
            <span style={{ color: "var(--sp-500)" }}>{pp.h1_accent}</span>
          </h1>
          <p
            className="text-lg font-medium leading-relaxed"
            style={{ color: "#4A5568" }}
          >
            {pp.intro}
          </p>

          {/* Logo strip : right to left */}
          <div className="mt-12 marquee-wrap">
            <div className="marquee-track marquee-rtl">
              {ECOSYSTEM_TRACK.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center mx-10 flex-shrink-0"
                  style={{ height: 52, width: 130 }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={48}
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ maxHeight: 48, width: "auto", maxWidth: 120 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Event photo */}
          <div
            className="mt-12 relative rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: "16/9", border: "1px solid var(--sp-100)" }}
          >
            <Image
              src="/photos/ecosystem-screenshot.png"
              alt="Speakli : présentation au HEC Launchpad, Station F"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--sp-500)" }}
            >
              {pp.timeline_tag}
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: "#ffffff" }}
            >
              {pp.timeline_h2}
            </h2>
            <p className="mt-3 font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
              {pp.timeline_subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {years.map((year, yi) => {
              const items = TIMELINE.filter((item) => item.year === year);
              return (
                <div key={year}>
                  {/* Year marker */}
                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <span
                      className="text-sm font-extrabold px-3 py-1 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {year}
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-4 mb-10 pl-2">
                    {items.map((item, ii) => {
                      const isLast =
                        yi === years.length - 1 && ii === items.length - 1;
                      const hasVisual = item.logo || (item.images && item.images.length > 0);
                      const month = isEN ? item.month_en : item.month_fr;
                      const title = isEN ? item.title_en : item.title_fr;
                      const description = isEN ? item.description_en : item.description_fr;

                      return (
                        <div key={`${item.month_fr}-${item.title_fr}`} className="flex gap-5">
                          {/* Timeline spine */}
                          <div className="flex flex-col items-center flex-shrink-0 w-10">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                              style={{ backgroundColor: "var(--sp-500)" }}
                            />
                            {!isLast && (
                              <div
                                className="w-px flex-1 mt-1.5"
                                style={{ minHeight: 24, backgroundColor: "rgba(255,255,255,0.15)" }}
                              />
                            )}
                          </div>

                          {/* Card */}
                          <div
                            className="flex-1 rounded-2xl border mb-2 transition-shadow hover:shadow-sm"
                            style={{ borderColor: "rgba(255,255,255,0.08)", background: "#ffffff" }}
                          >
                            <div className="flex gap-4 p-5">
                              {/* Left: text content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: "var(--sp-500)" }}
                                  >
                                    {month} {item.year}
                                  </span>
                                  <span style={{ color: "rgba(0,40,120,0.25)" }}>·</span>
                                  <TypeBadge type={item.type} label={getTypeLabel(item.type)} />
                                  <StatusBadge status={item.status} label={getStatusLabel(item.status)} />
                                </div>
                                <p
                                  className="font-bold text-base mb-2 leading-snug"
                                  style={{ color: "var(--sp-900)" }}
                                >
                                  {title}
                                </p>
                                <p
                                  className="text-sm leading-relaxed"
                                  style={{ color: "#4A5568" }}
                                >
                                  {description}
                                </p>
                              </div>

                              {/* Right: logo or grouped images */}
                              {hasVisual && (
                                <div className="hidden sm:flex flex-shrink-0 self-start items-start gap-2">
                                  {item.logo && (
                                    <div
                                      className="flex items-center justify-center rounded-xl p-2.5"
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid var(--sp-100)",
                                        width: 96,
                                        minHeight: 60,
                                      }}
                                    >
                                      <Image
                                        src={item.logo}
                                        alt={item.logoAlt ?? ""}
                                        width={84}
                                        height={52}
                                        className="object-contain"
                                        style={{ maxHeight: 52, width: "auto", maxWidth: 84 }}
                                      />
                                    </div>
                                  )}
                                  {item.images?.map((img) => (
                                    <div
                                      key={img.src}
                                      className="rounded-xl overflow-hidden"
                                      style={{
                                        border: "1px solid var(--sp-100)",
                                        background: "#fff",
                                        width: 60,
                                      }}
                                    >
                                      <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={60}
                                        height={78}
                                        className="object-contain"
                                        style={{ maxHeight: 78, width: "auto" }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Awards blog ── */}
      <AwardsBlog />

      {/* ── CTA ── */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6 text-center"
        style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}
      >
        <div className="max-w-xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--sp-500)" }}
          >
            {pp.cta_tag}
          </p>
          <h2
            className="text-2xl font-extrabold tracking-tight mb-4"
            style={{ color: "var(--sp-900)" }}
          >
            {pp.cta_h2}
          </h2>
          <p className="font-medium mb-8" style={{ color: "#4A5568" }}>
            {pp.cta_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/ruben-speakli/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: "var(--sp-500)" }}
            >
              {pp.cta_demo}
              <svg
                width="16"
                height="16"
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
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl border transition-all text-base hover:bg-white"
              style={{ borderColor: "var(--sp-100)", color: "var(--sp-900)" }}
            >
              {pp.cta_back}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
