"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const FOUNDERS = [
  { name: "Ugo Benazra" },
  { name: "Samuel Mesguiche" },
  { name: "Ruben Weinstein" },
];

export default function OurStory() {
  const { t } = useLanguage();
  const s = t.our_story;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <Image
          src="/photos/story/story-ecoute.png"
          alt="Speakli est né d'une écoute"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(7,20,40,0.92) 30%, rgba(7,20,40,0.55) 70%, rgba(7,20,40,0.3) 100%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto w-full">
          <nav
            className="flex items-center gap-2 text-xs font-medium mb-8 flex-wrap"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="transition-opacity hover:opacity-75" style={{ color: "rgba(255,255,255,0.6)" }}>
              {s.breadcrumb_home}
            </Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{s.breadcrumb_page}</span>
          </nav>

          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--sp-500)" }}
          >
            {s.tag}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6"
          >
            {s.h1_line1}<br />
            {s.h1_pre_accent} <span style={{ color: "var(--sp-500)" }}>{s.h1_accent}</span>.
          </h1>
          <p
            className="text-lg font-medium max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            {s.h1_subtitle}
          </p>
        </div>
      </section>

      {/* ── Chapter 1 : La rencontre ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: photo (shown below text on mobile) */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/photos/human/8.png"
                alt="Soignante accompagnant tendrement un résident vers la lumière"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-10">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--sp-500)" }}
                >
                  {s.ch1_num}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--sp-100)" }} />
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-8"
                style={{ color: "var(--sp-900)", whiteSpace: "pre-line" }}
              >
                {s.ch1_h2}
              </h2>

              <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A5568" }}>
                <p>{s.ch1_p1}</p>
                <p>{s.ch1_p2}</p>
                <p>{s.ch1_p3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 2 : 350 voix ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--sp-500)" }}>{s.ch2_num}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-8"
                style={{ color: "#ffffff", whiteSpace: "pre-line" }}
              >
                {s.ch2_h2}
              </h2>

              <div className="flex flex-col gap-5 text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
                <p>{s.ch2_p1}</p>
                <p>{s.ch2_p2}</p>
                <p>{s.ch2_p3}</p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {s.stakeholders.map((stakeholder: string) => (
                  <li key={stakeholder} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--sp-500)" }}
                    />
                    {stakeholder}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: field photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/photos/story/story-moment.jpg"
                alt="L'équipe Speakli avec des soignants"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{
                  background: "linear-gradient(to top, rgba(7,20,40,0.85) 0%, transparent 100%)",
                }}
              >
                <p className="text-white text-sm font-medium opacity-90">
                  {s.ch2_photo_caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 3 : Une histoire personnelle ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--sp-500)" }}>{s.ch3_num}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--sp-100)" }} />
              </div>

              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-8"
                style={{ color: "var(--sp-900)", whiteSpace: "pre-line" }}
              >
                {s.ch3_h2}
              </h2>

              <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A5568" }}>
                <p>{s.ch3_p1}</p>
                <p>{s.ch3_p2}</p>
                <p>{s.ch3_p3}</p>
                <p>{s.ch3_p4}</p>
              </div>
            </div>

            {/* Right: photo */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/photos/human/4.png"
                alt="Soignante accompagnant deux résidentes dans leur salon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 4 : Notre mission ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text + stats */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--sp-500)" }}>{s.ch4_num}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-8"
                style={{ color: "#ffffff", whiteSpace: "pre-line" }}
              >
                {s.ch4_h2}
              </h2>

              <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                <p>{s.ch4_p1}</p>
                <p>{s.ch4_p2}</p>
                <p>{s.ch4_p3}</p>
              </div>
            </div>

            {/* Right: photo */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/photos/human/3.png"
                alt="Soignante accompagnant un résident dans sa marche"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--sp-500)" }}
            >
              {s.founders_tag}
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: "var(--sp-900)", whiteSpace: "pre-line" }}
            >
              {s.founders_h2}
            </h2>
          </div>

          {/* Founders photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg mb-10" style={{ aspectRatio: "16/7" }}>
            <Image
              src="/photos/story/founders.png"
              alt="Ugo Benazra, Samuel Mesguiche et Ruben Weinstein, Cofondateurs de Speakli"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-center"
            />
          </div>

          {/* Name labels */}
          <div className="grid grid-cols-3 gap-4">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="text-center">
                <p className="font-bold text-base" style={{ color: "var(--sp-900)" }}>
                  {founder.name}
                </p>
                <p className="text-sm font-medium mt-0.5" style={{ color: "var(--sp-500)" }}>
                  {s.founder_role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
        <div className="max-w-xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--sp-500)" }}
          >
            {s.cta_tag}
          </p>
          <h2
            className="text-2xl font-extrabold tracking-tight mb-4"
            style={{ color: "#ffffff" }}
          >
            {s.cta_h2}
          </h2>
          <p className="font-medium mb-8" style={{ color: "rgba(255,255,255,0.65)", whiteSpace: "pre-line" }}>
            {s.cta_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/ruben-speakli/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", boxShadow: "0 4px 18px rgba(0,122,255,0.35)" }}
            >
              {s.cta_demo}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/qui-sommes-nous/partenaires-et-soutiens"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl border transition-all text-base hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.85)" }}
            >
              {s.cta_awards}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
