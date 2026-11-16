"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import AwardsBlog from "@/components/AwardsBlog";
import { useLanguage } from "@/context/LanguageContext";
import CtaPair from "@/components/CtaPair";
import { TraceabilityTimeline } from "@/components/StorySections";

function ClockIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const BLUE = "radial-gradient(70% 60% at 30% 30%, rgba(96,170,255,0.45) 0%, rgba(96,170,255,0) 100%), linear-gradient(150deg, #1677FF 0%, #1A5CE0 50%, #0D30A0 100%)";

export default function ResourcesContent() {
  const { t } = useLanguage();
  const rp = t.resources_page;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const thematicArticles = useMemo(() => BLOG_ARTICLES.filter((a) => a.isThematic), []);
  const categories = useMemo(() => [...new Set(thematicArticles.map((a) => a.category))], [thematicArticles]);
  const filteredArticles = useMemo(
    () => (activeCategory ? thematicArticles.filter((a) => a.category === activeCategory) : thematicArticles),
    [thematicArticles, activeCategory]
  );
  // Sans filtre, le premier article est mis en avant en grand
  const featured = activeCategory ? null : filteredArticles[0];
  const grid = featured ? filteredArticles.slice(1) : filteredArticles;

  return (
    <>
      {/* ── En-tête ── */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-20 pb-10" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>{rp.tag}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.1]" style={{ color: "var(--sp-900)" }}>
                {rp.h1_pre} <span style={{ color: "var(--sp-500)" }}>{rp.h1_accent}</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "#5B6B82" }}>{rp.subtitle}</p>
            </div>
            <CtaPair />
          </div>

          {/* Article à la une */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-10 grid md:grid-cols-[1.1fr_1fr] rounded-[28px] overflow-hidden bg-white transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(0,40,120,0.08)", boxShadow: "0 30px 60px -40px rgba(13,48,160,0.6)" }}
            >
              <div className="relative flex flex-col justify-end gap-4 p-8 sm:p-10 min-h-[240px] text-white" style={{ background: BLUE }}>
                <span className="self-start text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }}>{rp.featured}</span>
                <h2 className="text-2xl sm:text-[1.7rem] font-extrabold leading-tight">{featured.title}</h2>
              </div>
              <div className="flex flex-col gap-4 p-8 sm:p-10">
                <span className="self-start text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: featured.categoryBg, color: featured.categoryColor }}>{featured.category}</span>
                <p className="text-base leading-relaxed flex-1" style={{ color: "#4A5568" }}>{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#9AA3B2" }}><ClockIcon /> {featured.readingTime ?? "5 min"}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "var(--sp-500)" }}>
                    {rp.read_article}<span className="transition-transform group-hover:translate-x-1"><ArrowRight /></span>
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── Articles ── */}
      {/* Petite histoire de la traçabilité : frise des trois vagues */}
      <TraceabilityTimeline />

      <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ background: "linear-gradient(180deg, #ffffff 0%, #F4F8FF 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--sp-900)" }}>{rp.thematic_h2}</h2>
            <span className="text-sm font-semibold" style={{ color: "#9AA3B2" }}>
              {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[null, ...categories].map((cat) => {
              const on = activeCategory === cat;
              return (
                <button
                  key={cat ?? "all"}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{
                    background: on ? "var(--sp-500)" : "#ffffff",
                    color: on ? "#fff" : "var(--sp-700)",
                    border: `1px solid ${on ? "var(--sp-500)" : "rgba(0,40,120,0.12)"}`,
                    boxShadow: on ? "0 8px 18px -10px rgba(0,122,255,0.7)" : "none",
                  }}
                >
                  {cat ?? rp.filter_all}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grid.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-3 p-6 rounded-3xl bg-white transition-all hover:-translate-y-1"
                style={{ border: "1px solid rgba(0,40,120,0.08)", boxShadow: "0 18px 40px -32px rgba(13,48,160,0.55)" }}
              >
                <span className="self-start text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: article.categoryBg, color: article.categoryColor }}>{article.category}</span>
                <h3 className="text-[17px] font-extrabold leading-snug" style={{ color: "var(--sp-900)" }}>{article.title}</h3>
                <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "#5B6B82" }}>{article.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(26,46,73,0.08)" }}>
                  <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#9AA3B2" }}><ClockIcon /> {article.readingTime ?? "5 min"}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "var(--sp-500)" }}>
                    {rp.read_article}<span className="transition-transform group-hover:translate-x-1"><ArrowRight /></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prix, presse et actualités ── */}
      <AwardsBlog />
    </>
  );
}
