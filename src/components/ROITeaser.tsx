"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ROITeaser() {
  const { t } = useLanguage();
  const r = t.roi;

  return (
    <section
      id="roi"
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "transparent" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--sp-500)" }}
          >
            {r.tag}
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
            style={{ color: "var(--sp-900)" }}
          >
            {r.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{r.h2_accent}</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#4A5568" }}>
            {r.subtitle}
          </p>
        </div>

        {/* Dark CTA card */}
        <div
          className="rounded-3xl px-10 py-14 flex flex-col items-center text-center"
          style={{
            background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.40)",
            border: "1px solid rgba(100,160,255,0.18)",
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(147,197,253,0.75)" }}
          >
            {r.calculator_tag}
          </p>
          <h3 className="text-3xl font-extrabold text-white mb-3">
            {r.calculator_h3}
          </h3>
          <p className="text-sm mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.50)" }}>
            {r.calculator_desc}
          </p>
          <Link
            href="/roi"
            className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold transition-transform hover:scale-[1.03]"
            style={{ background: "var(--sp-500)", color: "#fff" }}
          >
            {r.calculator_cta}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
