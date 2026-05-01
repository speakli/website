"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const NOTION_URL =
  "https://dorian-opinion-85e.notion.site/Work-Speakli-29597d4da4398073b861f00b9c38d24a";

const VALUE_STYLES = [
  {
    accent: "#3B4FCF",
    bg: "#EEF2FF",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    accent: "#C2410C",
    bg: "#FFF7ED",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18h8a2 2 0 002-2V9a2 2 0 00-2-2h-8a2 2 0 00-2 2v7a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    accent: "#BE123C",
    bg: "#FFF1F2",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    accent: "#0369A1",
    bg: "#F0F9FF",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6H8.3A7 7 0 0112 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    accent: "#059669",
    bg: "#ECFDF5",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function JoinUs() {
  const { t } = useLanguage();
  const j = t.join_us;

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-28 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-medium mb-10 flex-wrap" aria-label="Fil d'Ariane">
            <Link href="/" className="transition-opacity hover:opacity-75" style={{ color: "rgba(255,255,255,0.5)" }}>
              {j.breadcrumb_home}
            </Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "rgba(255,255,255,0.25)" }}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{j.breadcrumb_page}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--sp-500)" }}>
            {j.tag}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-8 max-w-3xl">
            {j.h1_line1}<br />
            {j.h1_pre_accent}{" "}
            <span style={{ color: "var(--sp-500)" }}>{j.h1_accent}</span>.
          </h1>

          <p className="text-lg font-medium max-w-2xl leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
            {j.subtitle}
          </p>

          <a
            href={NOTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", color: "#fff", boxShadow: "0 4px 18px rgba(0,122,255,0.35)" }}
          >
            {j.cta_jobs}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── Why section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: CEO narrative */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--sp-500)" }}>
              {j.why_tag}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight leading-snug mb-8" style={{ color: "var(--sp-900)" }}>
              {j.why_h2}
            </h2>
            <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: "#4A5568" }}>
              <p>{j.why_p1}</p>
              <p>{j.why_p2}</p>
              <p>{j.why_p3}</p>
            </div>
          </div>

          {/* Right: conviction block */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)", color: "#fff" }}
            >
              <p className="text-lg font-bold leading-relaxed mb-4">
                {j.conviction1}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                {j.conviction1_body}
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "var(--sp-50)", border: "1px solid var(--sp-100)" }}
            >
              <p className="text-lg font-bold leading-relaxed mb-4" style={{ color: "var(--sp-900)" }}>
                {j.conviction2}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#4A5568" }}>
                {j.conviction2_body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
              {j.values_tag}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: "#ffffff", whiteSpace: "pre-line" }}>
              {j.values_h2}
            </h2>
            <p className="mt-4 font-medium max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
              {j.values_subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {j.values.map((v, i) => {
              const style = VALUE_STYLES[i];
              return (
                <div
                  key={v.title}
                  className="flex flex-col rounded-2xl p-7 border bg-white"
                  style={{ borderColor: "var(--sp-100)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ backgroundColor: "var(--sp-50)", color: "var(--sp-500)" }}
                  >
                    {style.icon}
                  </div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: "var(--sp-900)" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: "var(--sp-500)" }}>
                    {v.description}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#718096" }}>
                    {v.detail}
                  </p>
                </div>
              );
            })}

            {/* 6th cell: CTA */}
            <div
              className="flex flex-col justify-between rounded-2xl p-7"
              style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", border: "none" }}
            >
              <div>
                <p className="text-base font-bold text-white mb-3">
                  {j.values_cta_title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {j.values_cta_body}
                </p>
              </div>
              <a
                href={NOTION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: "#fff", color: "var(--sp-500)" }}
              >
                {j.values_cta_btn}
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
              {j.mission_tag}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--sp-900)", whiteSpace: "pre-line" }}>
              {j.mission_h2}
            </h2>
          </div>

          <div
            className="overflow-hidden rounded-3xl shadow-xl"
            style={{ backgroundColor: "#000" }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/videos/speakli-presentation.mp4"
              controls
              playsInline
              className="w-full"
              style={{ display: "block", maxHeight: 520 }}
            />
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}
      >
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--sp-500)" }}>
              {j.team_tag}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight leading-snug mb-6" style={{ color: "var(--sp-900)" }}>
              {j.team_h2}
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
              <p>{j.team_p1}</p>
              <p>{j.team_p2}</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/photos/story/team.jpg"
              alt="L'équipe Speakli"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 text-center border-t"
        style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--sp-500)" }}>
            {j.cta_tag}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-white" style={{ whiteSpace: "pre-line" }}>
            {j.cta_h2}
          </h2>
          <p className="font-medium mb-10 text-lg" style={{ color: "rgba(255,255,255,0.65)", whiteSpace: "pre-line" }}>
            {j.cta_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={NOTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", color: "#fff", boxShadow: "0 4px 18px rgba(0,122,255,0.35)" }}
            >
              {j.cta_jobs2}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link
              href="/qui-sommes-nous/notre-histoire"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl border text-base transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)" }}
            >
              {j.cta_story}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
