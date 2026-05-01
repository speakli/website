"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { useLanguage } from "@/context/LanguageContext";

function MicrophoneIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

const pressArticles = BLOG_ARTICLES.filter((a) => !a.isThematic);
const upcomingArticles = pressArticles.filter((a) => a.isUpcoming);
const regularArticles = pressArticles.filter((a) => !a.isUpcoming);

export default function AwardsBlog() {
  const { t } = useLanguage();
  const ab = t.awards_blog;

  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}
      id="blog-recompenses"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Upcoming events ── */}
        {upcomingArticles.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--sp-500)" }}>
                Événements à venir
              </p>
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--sp-500)" }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ backgroundColor: "var(--sp-500)" }} />
              </span>
            </div>

            {upcomingArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderColor: "var(--sp-100)" }}
              >
                <div className="grid sm:grid-cols-[280px_1fr]">
                  {/* Cover */}
                  <div
                    className="relative flex items-center justify-center px-10 py-10 sm:py-0 overflow-hidden"
                    style={{ backgroundColor: article.cardBg, minHeight: 180 }}
                  >
                    {/* Top stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: article.categoryColor }} />
                    {/* Upcoming badge */}
                    <div
                      className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{ background: "var(--sp-500)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      À venir
                    </div>
                    {article.coverIsPhoto ? (
                      <Image
                        src={article.coverLogo!}
                        alt={article.title}
                        fill
                        className="object-cover opacity-80"
                      />
                    ) : (
                    <Image
                      src={article.coverLogo!}
                      alt={article.title}
                      width={220}
                      height={80}
                      className="object-contain"
                      style={{ maxHeight: 80, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }}
                    />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 bg-white">
                    <div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: article.categoryBg, color: article.categoryColor }}
                        >
                          {article.category}
                        </span>
                        <span className="text-xs font-medium" style={{ color: "#A0AEC0" }}>
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg leading-snug mb-3 transition-colors group-hover:opacity-80" style={{ color: "var(--sp-900)" }}>
                        {article.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#718096" }}>
                        {article.excerpt}
                      </p>
                    </div>
                    <span className="mt-5 text-sm font-semibold flex items-center gap-1.5" style={{ color: "var(--sp-500)" }}>
                      {ab.read_article}
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--sp-500)" }}
          >
            {ab.tag}
          </p>
          <h2
            className="text-3xl font-extrabold tracking-tight leading-tight"
            style={{ color: "var(--sp-900)" }}
          >
            {ab.h2_pre}{" "}
            <span style={{ color: "var(--sp-500)" }}>{ab.h2_accent}</span>
          </h2>
          <p className="mt-3 font-medium max-w-2xl" style={{ color: "#4A5568" }}>
            {ab.subtitle}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "var(--sp-100)" }}
            >
              {/* Cover panel */}
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: 160, backgroundColor: article.cardBg }}
              >
                {/* Category color stripe at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: article.categoryColor }}
                />

                {article.coverLogo ? (
                  article.coverIsPhoto ? (
                    <Image
                      src={article.coverLogo}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-70"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full px-8">
                      <Image
                        src={article.coverLogo}
                        alt={article.title}
                        width={110}
                        height={72}
                        className="object-contain"
                        style={{
                          maxHeight: 72,
                          width: "auto",
                          filter: "brightness(0) invert(1)",
                          opacity: 0.85,
                        }}
                      />
                    </div>
                  )
                ) : (
                  <MicrophoneIcon />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 bg-white">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: article.categoryBg,
                      color: article.categoryColor,
                    }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#A0AEC0" }}>
                    {article.date}
                  </span>
                </div>

                <h3
                  className="font-bold text-base leading-snug mb-2 transition-colors group-hover:opacity-80"
                  style={{ color: "var(--sp-900)" }}
                >
                  {article.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1" style={{ color: "#718096" }}>
                  {article.excerpt}
                </p>

                <span
                  className="mt-4 text-sm font-semibold flex items-center gap-1.5"
                  style={{ color: "var(--sp-500)" }}
                >
                  {ab.read_article}
                  <svg
                    width="13"
                    height="13"
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
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
