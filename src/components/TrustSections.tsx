"use client";
import "./TrustSections.css";
import { useLanguage } from "@/context/LanguageContext";
import { openContact } from "@/lib/contactMode";
import { useRef } from "react";
import CtaPair from "./CtaPair";

/*
 * Sections « Sécurité et conformité » et « Interopérabilité », sous les produits.
 * Reprennent l'idée de la maquette initiale, adaptées au design actuel (palette bleue,
 * cartes arrondies). Le globe est une vraie projection orthographique centrée sur
 * l'Europe (public/securite/globe-europe.svg, généré à partir de Natural Earth).
 */

const svg = (children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
// Mêmes pictos que la réassurance du header : bouclier HDS, mention RGPD, étoiles de l'UE
const ICONS = [
  // Hébergement HDS
  svg(<><path d="M12 2.8l7.5 3v5.6c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V5.8l7.5-3z" /><path d="M8.6 12.2l2.4 2.4 4.6-4.8" /></>),
  // RGPD
  null,
  // Traitements IA dans l'UE
  <svg key="eu" viewBox="0 0 24 24" width="26" height="26" aria-hidden>{Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 2 * Math.PI; return <circle key={i} cx={(12 + 8.5 * Math.cos(a)).toFixed(2)} cy={(12 + 8.5 * Math.sin(a)).toFixed(2)} r="1.35" fill="currentColor" />; })}</svg>,
  // Aucun audio conservé
  svg(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0011.2 4.5M12 17.5V21M3 3l18 18" /></>),
];

export function SecuritySection() {
  const { t } = useLanguage();
  const s = t.trust;
  // Position de Paris sur le globe (viewBox 440 × 440)
  const ref = useRef<HTMLElement>(null);
  const paris = { left: `${(202.5 / 440) * 100}%`, top: `${(195.3 / 440) * 100}%` };
  return (
    <section ref={ref} id="securite" className="trust trust--secu">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="trust__eyebrow">{s.secu_eyebrow}</p>
            <h2 className="trust__title">{s.secu_title} <span>{s.secu_accent}</span></h2>
            <p className="trust__lede">{s.secu_lede}</p>
            <CtaPair className="mt-7" />
          </div>
          <div className="secu-globe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/securite/globe-europe.svg" alt={s.globe_alt} className="secu-globe__img" />
            <span className="secu-globe__pin" style={paris} aria-hidden><i /></span>
            <span className="secu-globe__tag" style={paris}>
              <b>{s.secu_tag}</b>
              <small>{s.secu_tag_sub}</small>
            </span>
          </div>
        </div>
        <div className="trust__cols trust__cols--4">
          {s.secu_points.map((p, i) => (
            <div key={p.title}>
              <span className="trust__icon">{ICONS[i] ?? <b className="trust__mark" aria-hidden>{t.hero.rgpd_mark}</b>}</span>
              <b>{p.title}</b>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// « Comment s'intègre Speakli ? » : les 4 étapes, du smartphone au logiciel de soins
const StepVisuals = [
  // 1. Connexion à Speakli
  function StepLogin() {
    return (
      <div className="istep-ui istep-ui--brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-speakli-full.png" alt="Speakli" />
      </div>
    );
  },
  // 2. Dictée vocale
  function StepVoice({ s }: { s: Trust }) {
    return (
      <div className="istep-ui istep-ui--voice">
        <span className="istep-mic">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" /></svg>
        </span>
        <span className="istep-wave" aria-hidden>{Array.from({ length: 11 }, (_, i) => <i key={i} style={{ animationDelay: `${-(i * 0.13) % 1}s` }} />)}</span>
        <small>{s.ui_dictating}</small>
      </div>
    );
  },
  // 3. Validation par le soignant
  function StepValidate({ s }: { s: Trust }) {
    return (
      <div className="istep-ui">
        <small className="istep-label">{s.ui_to_validate}</small>
        <span className="istep-lines" aria-hidden><i /><i /><i style={{ width: "60%" }} /></span>
        <span className="istep-validate">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          {s.ui_validate}
        </span>
        <small className="istep-checked">{s.ui_checked}</small>
      </div>
    );
  },
  // 4. Synchronisation dans le logiciel de soins
  function StepSync() {
    return (
      <div className="istep-ui istep-ui--logos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/netsoins-teranga.png" alt="NETSoins" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/netvie-teranga.png" alt="NETVie" />
      </div>
    );
  },
];
type Trust = ReturnType<typeof useLanguage>["t"]["trust"];

export function InteropSection() {
  const { t } = useLanguage();
  const s = t.trust;
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="interoperabilite" className="trust trust--interop">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto">
          <p className="trust__eyebrow">{s.interop_eyebrow}</p>
          <h2 className="trust__title">{s.interop_title} <span>{s.interop_accent}</span></h2>
          <p className="trust__lede mx-auto">{s.interop_lede}</p>
          <CtaPair align="center" className="mt-6" />
        </div>

        <ol className="isteps">
          {s.steps.map((step, i) => {
            const Visual = StepVisuals[i];
            return (
              <li key={step.title} className="istep">
                <div className="istep__visual"><Visual s={s} /></div>
                <span className="istep__num">{s.step} {i + 1}</span>
                <b className="istep__title">{step.title}</b>
                <p className="istep__text">{step.text}</p>
                {i === 3 && (
                  <button type="button" className="istep__cta" onClick={() => openContact("callback")}>
                    {s.other_dui} <span>{s.lets_talk} →</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
