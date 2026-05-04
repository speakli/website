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
            <a href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image
                src="/logo-speakli.svg"
                alt="Speakli"
                width={36}
                height={26}
                className="object-contain brightness-0 invert"
              />
              <span className="font-extrabold text-2xl tracking-tight text-white leading-none">
                Speak<span style={{ color: "#007AFF" }}>li</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "rgba(255,255,255,0.40)" }}>
              {f.tagline}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
