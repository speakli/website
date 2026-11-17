"use client";
import "./TrustSections.css";
import { useLanguage } from "@/context/LanguageContext";
import { openContact } from "@/lib/contactMode";
import { useEffect, useRef, useState } from "react";
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
            <CtaPair placement="head" className="mt-7" />
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
        <CtaPair placement="foot" align="center" className="mt-8" />
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
  // 3. Validation par le soignant : les éléments de documentation générés (comme dans le
  // header) apparaissent un à un, puis le soignant valide.
  function StepValidate({ s }: { s: Trust }) {
    const d = s.ui_docs;
    return (
      <div className="ival">
        <div className="ival__grid">
          <div className="ival__doc" style={{ "--i": 0 } as React.CSSProperties}>
            <small><i className="ival__dot ival__dot--blue" />{d.target}</small>
            <b>{d.target_tag}</b>
            <span className="ival__dar">{d.dar.map(x => <em key={x}>{x}</em>)}</span>
          </div>
          <div className="ival__doc" style={{ "--i": 1 } as React.CSSProperties}>
            <small><i className="ival__dot ival__dot--sky" />{d.vitals}</small>
            <span className="ival__vital"><span>{d.hydration}</span><b>105 cL</b></span>
            <span className="ival__bar" aria-hidden><i /></span>
            <span className="ival__vital"><span>{d.bp}</span><b>13/8</b></span>
            <svg className="ival__spark" viewBox="0 0 100 22" preserveAspectRatio="none" aria-hidden><path d="M2 16 L20 12 L38 14 L56 7 L74 10 L98 5" /></svg>
          </div>
          <div className="ival__doc" style={{ "--i": 2 } as React.CSSProperties}>
            <small><i className="ival__dot ival__dot--green" />{d.care}</small>
            {d.care_items.map(c => (
              <span key={c} className="ival__care">{c}<em><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></em></span>
            ))}
          </div>
          <div className="ival__doc" style={{ "--i": 3 } as React.CSSProperties}>
            <small><i className="ival__dot ival__dot--violet" />{d.comment}</small>
            <p>« {d.comment_text} »</p>
          </div>
        </div>
        <div className="ival__foot">
          <span className="istep-validate">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            {s.ui_validate}
          </span>
          <small className="ival__checked">{s.ui_checked}</small>
        </div>
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

// Comment s'intègre Speakli ? Frise verticale qui avance au défilement (inspirée de Vocca) :
// la ligne se remplit, chaque étape s'allume quand on l'atteint, de « je me connecte » à
// « c'est synchronisé au DUI ».
export function InteropSection() {
  const { t } = useLanguage();
  const s = t.trust;
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  // Ordinateur : ligne courbe qui relie les pastilles (calculée sur leur position réelle)
  const [curve, setCurve] = useState<{ d: string; w: number; h: number } | null>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const centers = () => {
      const r = list.getBoundingClientRect();
      return [...list.querySelectorAll<HTMLElement>(".itl__pill")].map(p => {
        const b = p.getBoundingClientRect();
        return { x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top };
      });
    };
    const layout = () => {
      const c = centers();
      if (c.length < 2) return;
      const d = c.reduce((acc, p, i) => {
        if (i === 0) return `M${p.x} ${p.y}`;
        const q = c[i - 1], my = (q.y + p.y) / 2;
        return `${acc} C${q.x} ${my} ${p.x} ${my} ${p.x} ${p.y}`;
      }, "");
      setCurve({ d, w: list.offsetWidth, h: list.offsetHeight });
    };
    const update = () => {
      raf = 0;
      const anchor = window.innerHeight * 0.55;
      const r = list.getBoundingClientRect();
      // Mobile : ligne droite qui se remplit
      list.style.setProperty("--fill", `${Math.max(0, Math.min(r.height, anchor - r.top))}px`);
      const c = centers();
      if (c.length) {
        // Ordinateur : la courbe se trace de la première à la dernière pastille
        const first = c[0].y + r.top, last = c[c.length - 1].y + r.top;
        const prog = Math.max(0, Math.min(1, (anchor - first) / Math.max(1, last - first)));
        pathRef.current?.style.setProperty("stroke-dashoffset", String(1 - prog));
      }
      let n = -1;
      c.forEach((p, k) => { if (p.y + r.top <= anchor) n = k; });
      setActive(n);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { layout(); onScroll(); };
    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} id="interoperabilite" className="trust trust--interop">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto">
          <p className="trust__eyebrow">{s.interop_eyebrow}</p>
          <h2 className="trust__title">{s.interop_title} <span>{s.interop_accent}</span></h2>
          <p className="trust__lede mx-auto">{s.interop_lede}</p>
          <CtaPair placement="head" align="center" className="mt-6" />
        </div>

        <ol ref={listRef} className="itl">
          <span className="itl__rail" aria-hidden><i /></span>
          {curve && (
            <svg className="itl__curve" width={curve.w} height={curve.h} viewBox={`0 0 ${curve.w} ${curve.h}`} aria-hidden>
              <path d={curve.d} className="itl__curve-bg" />
              <path ref={pathRef} d={curve.d} className="itl__curve-fg" pathLength={1} />
            </svg>
          )}
          {s.steps.map((step, i) => {
            const Visual = StepVisuals[i];
            const on = i <= active;
            return (
              <li key={step.title} className={`itl__step${on ? " is-on" : ""}${i === active ? " is-current" : ""}`}>
                <span className="itl__pill">{s.step} {i + 1}</span>
                <article className="itl__card">
                  <div className="itl__text">
                    <b className="itl__title">{step.title}</b>
                    <p className="itl__desc">{step.text}</p>
                    {i === 3 && (
                      <button type="button" className="istep__cta" onClick={() => openContact("callback")}>
                        {s.other_dui} <span>{s.lets_talk} →</span>
                      </button>
                    )}
                  </div>
                  <div className={`istep__visual itl__visual${i === 2 ? " itl__visual--docs" : ""}`}><Visual s={s} /></div>
                </article>
              </li>
            );
          })}
        </ol>
        <CtaPair placement="foot" align="center" className="mt-8" />
      </div>
    </section>
  );
}
