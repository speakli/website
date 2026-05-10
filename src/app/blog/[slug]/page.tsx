import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES, getArticleBySlug } from "@/lib/blog-articles";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const BASE_URL = "https://www.speakli.fr";
  return {
    title: `${article.title} | Speakli`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: article.date,
      authors: ["Speakli"],
    },
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const BASE_URL = "https://www.speakli.fr";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": article.isThematic ? "Article" : "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Speakli", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Speakli",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-speakli.png` },
    },
    url: `${BASE_URL}/blog/${slug}`,
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-xs font-medium mb-8 flex-wrap"
              aria-label="Fil d'Ariane"
            >
              <Link
                href="/"
                className="transition-opacity hover:opacity-75"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Accueil
              </Link>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Link
                href={article.isThematic ? "/ressources" : "/qui-sommes-nous/partenaires-et-soutiens"}
                className="transition-opacity hover:opacity-75"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {article.isThematic ? "Ressources" : "Partenaires & Soutiens"}
              </Link>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>{article.category}</span>
            </nav>

            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5"
              style={{ backgroundColor: article.categoryBg, color: article.categoryColor }}
            >
              {article.category}
            </span>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: "#fff" }}
            >
              {article.title}
            </h1>

            <p className="text-base font-medium mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              {article.date}
            </p>

            {/* Non-photo logo shown in hero */}
            {article.coverLogo && !article.coverIsPhoto && (
              <div
                className="inline-flex items-center justify-center rounded-xl p-4 mt-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Image
                  src={article.coverLogo}
                  alt={article.title}
                  width={140}
                  height={88}
                  className="object-contain"
                  style={{
                    maxHeight: 88,
                    width: "auto",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.85,
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Light zone (article body + other articles + CTA) ── */}
        <div style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>

        {/* ── Article body ── */}
        <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: "transparent" }}>
          <div className="max-w-3xl mx-auto">
            {/* Lead excerpt */}
            <p
              className="text-lg font-medium leading-relaxed mb-10"
              style={{ color: "#2D3748" }}
            >
              {article.excerpt}
            </p>

            {/* Hero CTA (e.g. SantéExpo demo booking) */}
            {article.heroCta && (
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl p-6 mb-10 border"
                style={{ background: "linear-gradient(135deg, #0c1d50 0%, #1a3a8f 100%)", borderColor: "transparent" }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {article.heroCta.subtitle}
                  </p>
                </div>
                <a
                  href={article.heroCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #1a5ce0 0%, #007aff 100%)", color: "#fff" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {article.heroCta.label}
                </a>
              </div>
            )}

            {/* External link (e.g. IESEG blog) */}
            {article.externalLink && (
              <a
                href={article.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl border mb-10 transition-all hover:bg-[var(--sp-50)]"
                style={{ borderColor: "var(--sp-200)", color: "var(--sp-500)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {article.externalLink.label}
              </a>
            )}

            {/* Photo gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <div
                className={`grid gap-3 mb-12 ${
                  article.gallery.length === 1
                    ? "grid-cols-1"
                    : article.gallery.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {article.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl ${
                      article.gallery!.length === 1 ? "aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* YouTube embed */}
            {article.youtubeUrl && (
              <div className="relative mb-12 rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={article.youtubeUrl}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
            )}

            {/* Separator */}
            <div className="border-t mb-10" style={{ borderColor: "var(--sp-100)" }} />

            {/* Content sections */}
            <div className="article-body flex flex-col gap-10">
              {article.content.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2
                      className="text-xl font-bold mb-4 tracking-tight"
                      style={{ color: "var(--sp-900)" }}
                    >
                      {section.heading}
                    </h2>
                  )}
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed" style={{ color: "#4A5568" }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--sp-100)" }}>
              <Link
                href={article.isThematic ? "/ressources" : "/qui-sommes-nous/partenaires-et-soutiens#blog-recompenses"}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "var(--sp-500)" }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {article.isThematic ? "Retour aux articles" : "Retour aux prix & récompenses"}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Other articles ── */}
        {otherArticles.length > 0 && (
          <section
            className="py-12 sm:py-16 px-4 sm:px-6"
            style={{ background: "transparent" }}
          >
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-xl font-bold mb-8 tracking-tight"
                style={{ color: "var(--sp-900)" }}
              >
                Autres articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group flex flex-col rounded-xl overflow-hidden border bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: "rgba(0,40,120,0.08)" }}
                  >
                    <div
                      className="relative flex items-center justify-center"
                      style={{ height: 100, backgroundColor: other.cardBg }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: other.categoryColor }}
                      />
                      {other.coverLogo && !other.coverIsPhoto && (
                        <Image
                          src={other.coverLogo}
                          alt={other.title}
                          width={80}
                          height={52}
                          className="object-contain"
                          style={{
                            maxHeight: 52,
                            width: "auto",
                            filter: "brightness(0) invert(1)",
                            opacity: 0.8,
                          }}
                        />
                      )}
                      {other.coverLogo && other.coverIsPhoto && (
                        <Image
                          src={other.coverLogo}
                          alt={other.title}
                          fill
                          sizes="(max-width: 1024px) 33vw, 300px"
                          className="object-cover opacity-60"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold" style={{ color: other.categoryColor }}>
                        {other.category}
                      </span>
                      <p
                        className="mt-1.5 text-sm font-bold leading-snug"
                        style={{ color: "var(--sp-900)" }}
                      >
                        {other.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section
          className="py-12 sm:py-16 px-4 sm:px-6 text-center border-t"
          style={{ background: "transparent", borderColor: "var(--sp-100)" }}
        >
          <div className="max-w-xl mx-auto">
            <p className="font-bold text-xl mb-2" style={{ color: "var(--sp-900)" }}>
              Vous souhaitez en savoir plus&nbsp;?
            </p>
            <p className="font-medium mb-6" style={{ color: "#4A5568" }}>
              Contactez-nous pour en apprendre davantage sur notre parcours et nos partenariats.
            </p>
            <a
              href="https://calendly.com/ruben-speakli/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-base"
              style={{ backgroundColor: "var(--sp-500)" }}
            >
              Contactez-nous
            </a>
          </div>
        </section>
        </div>{/* end light zone */}
      </main>
      <Footer />
    </>
  );
}
