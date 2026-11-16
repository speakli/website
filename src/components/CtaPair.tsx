"use client";
import { useLanguage } from "@/context/LanguageContext";
import { openContact } from "@/lib/contactMode";

// Boutons d'action réutilisés dans toutes les sections : démo (HubSpot) + être rappelé
export const DEMO_URL = "https://meetings-eu1.hubspot.com/ruben-weinstein";

export default function CtaPair({ align = "start", className = "", onDark = false }: { align?: "start" | "center"; className?: string; onDark?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`flex flex-wrap gap-2.5 ${align === "center" ? "justify-center" : ""} ${className}`}>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 whitespace-nowrap text-white font-bold text-sm px-5 py-3 rounded-full transition-transform duration-200 hover:-translate-y-0.5"
        style={onDark
          ? { background: "#fff", color: "var(--sp-700)", boxShadow: "0 6px 18px -8px rgba(0,0,0,0.35)" }
          : { background: "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)", boxShadow: "0 6px 18px -6px rgba(0,122,255,0.55)" }}
      >
        {t.hero.cta_demo}
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <button
        type="button"
        onClick={() => openContact("callback")}
        className="inline-flex items-center gap-2 whitespace-nowrap font-bold text-sm px-5 py-3 rounded-full transition-colors duration-200 hover:opacity-90"
        style={onDark
          ? { color: "#fff", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.45)" }
          : { color: "var(--sp-700)", background: "#fff", border: "1px solid rgba(0,122,255,0.22)" }}
      >
        {t.hero.cta_callback}
      </button>
    </div>
  );
}
