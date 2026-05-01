"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import AwardsBlog from "@/components/AwardsBlog";
import { useLanguage } from "@/context/LanguageContext";

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

export default function ResourcesContent() {
  const { t } = useLanguage();
  const rp = t.resources_page;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const thematicArticles = useMemo(() => BLOG_ARTICLES.filter((a) => a.isThematic), []);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const a of thematicArticles) {
      if (!seen.has(a.category)) {
        seen.add(a.category);
        result.push(a.category);
      }
    }
    return result;
  }, [thematicArticles]);

  const filteredArticles = useMemo(
    () => activeCategory ? thematicArticles.filter((a) => a.category === activeCategory) : thematicArticles,
    [thematicArticles, activeCategory]
  );

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-20 pb-16 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(147,197,253,0.85)" }}>
            {rp.tag}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "#ffffff" }}>
            {rp.h1_pre}{" "}
            <span style={{ color: "var(--sp-500)" }}>{rp.h1_accent}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            {rp.subtitle}
          </p>
        </div>
      </section>

      {/* ── Thematic articles ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--sp-900)" }}>
              {rp.thematic_h2}
            </h2>
          </div>

          {/* ── Category filter chips ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all"
              style={{
                background: activeCategory === null ? "var(--sp-500)" : "transparent",
                color: activeCategory === null ? "#fff" : "var(--sp-700)",
                borderColor: activeCategory === null ? "var(--sp-500)" : "rgba(0,40,120,0.18)",
              }}
            >
              {rp.filter_all ?? "Tous les sujets"}
            </button>
            {categories.map((cat) => {
              const article = thematicArticles.find((a) => a.category === cat)!;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all"
                  style={{
                    background: isActive ? article.categoryColor : article.categoryBg,
                    color: isActive ? "#fff" : article.categoryColor,
                    borderColor: isActive ? article.categoryColor : "transparent",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Article count */}
          <p className="text-xs font-medium mb-6" style={{ color: "#9CA3AF" }}>
            {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(0,40,120,0.08)",
                  boxShadow: "0 2px 16px rgba(0,40,120,0.08)",
                }}
              >
                {/* Card header */}
                <div
                  className="relative flex items-end p-6 overflow-hidden"
                  style={{ background: article.cardBg, minHeight: 120 }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at 20% 50%, ${article.categoryColor} 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <span
                      className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                      style={{ background: article.categoryBg, color: article.categoryColor }}
                    >
                      {article.category}
                    </span>
                    <h3 className="text-base font-extrabold leading-snug text-white max-w-sm">
                      {article.title}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 bg-white">
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#6b7280" }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5" style={{ color: "#9ca3af" }}>
                      <ClockIcon />
                      <span className="text-xs font-medium">{article.readingTime ?? "5 min"}</span>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-gap"
                      style={{ color: "var(--sp-500)" }}
                    >
                      {rp.read_article}
                      <span className="transition-transform group-hover:translate-x-1">
                        <ArrowRight />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6">
        <div className="max-w-5xl mx-auto border-t" style={{ borderColor: "rgba(0,40,120,0.08)" }} />
      </div>

      {/* ── Awards & Press + CTA ── */}
      <AwardsBlog />
    </>
  );
}
