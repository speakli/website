"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SOLUTION_LINKS = [
  { label: "Calculateur ROI",   href: "/roi",          tabId: null },
  { label: "Assistant vocal",   href: "/#solutions",   tabId: "voice" },
  { label: "Tableau de bord",   href: "/#solutions",   tabId: "dashboard" },
  { label: "Intégrations",      href: "/#solutions",   tabId: "interop" },
  { label: "Sécurité",          href: "/#solutions",   tabId: "security" },
];

const COMPANY_LINKS = [
  { label: "Partenaires et soutiens", href: "/qui-sommes-nous/partenaires-et-soutiens" },
  { label: "Nous rejoindre",          href: "/qui-sommes-nous/nous-rejoindre" },
  { label: "Notre histoire",          href: "/qui-sommes-nous/notre-histoire" },
  { label: "Témoignages",             href: "/#temoignages" },
  { label: "Contact",                 href: "/#contact" },
  { label: "Blog",                    href: "/ressources" },
];

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
      {/* Gradient top border */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,122,255,0.4) 30%, rgba(0,122,255,0.6) 50%, rgba(0,122,255,0.4) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-14">
          {/* Brand · wider column */}
          <div className="col-span-2 md:col-span-5">
            <a href="/" className="inline-flex items-center mb-5 group">
              <Image
                src="/logo-speakli-footer.svg"
                alt="Speakli"
                width={120}
                height={47}
                className="object-contain"
              />
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "rgba(255,255,255,0.40)" }}>
              {f.tagline}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {[f.badge_hds, f.badge_rgpd].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#007AFF" }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="https://fr.linkedin.com/company/speakli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Speakli sur LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Speakli-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Speakli sur YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Solution */}
          <div className="col-span-1 md:col-span-3 text-center md:text-left">
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {f.col_solution}
            </h4>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map(({ label, href, tabId }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => tabId && sessionStorage.setItem("speakli:pending-tab", tabId)}
                    className="text-sm font-medium transition-colors duration-150 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="col-span-1 md:col-span-3 text-center md:text-left">
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {f.col_company}
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-medium transition-colors duration-150 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} SAS CTSUR (Speakli) · {f.copyright}
          </p>
          <div className="flex gap-6">
            <Link
              href="/politique-de-confidentialite"
              className="text-xs font-medium transition-colors duration-150 hover:text-white"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {f.privacy}
            </Link>
            <Link
              href="/mentions-legales"
              className="text-xs font-medium transition-colors duration-150 hover:text-white"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {f.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
