"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import "./StorySections.css";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import CtaPair from "./CtaPair";
import { ProductBlock, Card, Label, ICON, type Visual } from "./Products";

/*
 * Sous le header, avant les produits : le constat (temps perdu, trois obstacles), puis
 * « Avant / Après Speakli » et les impacts pour l'établissement. Chaque bloc tient sur
 * un écran et s'enchaîne au scroll.
 */

const sv = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d}</svg>
);
const Check = () => sv(<path d="M5 12.5l4.5 4.5L19 7.5" />);
const Cross = () => sv(<path d="M6 6l12 12M18 6L6 18" />);

// Frise chronologique de la traçabilité (page Ressources), en trois vagues : la ligne se remplit de gauche à
// droite, chaque vague apparaît quand la ligne l'atteint, et le logo Speakli arrive sur la
// troisième. L'animation se rejoue à chaque retour sur la section.
export function TraceabilityTimeline() {
  const { t } = useLanguage();
  const s = t.story;
  const ref = useRef<HTMLElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.35) setPlayed(true);
      else if (!e.isIntersecting) setPlayed(false);
    }, { threshold: [0, 0.35] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} id="evolution-tracabilite" className="story story--ba story--compact">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center">
          <p className="story__eyebrow">{s.ba_eyebrow}</p>
          <h2 className="story__title">{s.ba_title} <span>{s.ba_accent}</span></h2>
        </div>

        <div ref={tlRef} className={`tl${played ? " is-played" : ""}`}>
          <div className="tl__rail" aria-hidden><i /></div>
          <ol className="tl__list">
            {s.timeline.map((w, i) => {
              const last = i === s.timeline.length - 1;
              return (
                <li key={w.era} className={`tl__wave${last ? " tl__wave--now" : ""}`} style={{ ["--i" as string]: i } as React.CSSProperties}>
                  <span className="tl__dot" aria-hidden>{last && <Check />}</span>
                  <p className="tl__when"><b>{w.era}</b><span>{w.years}</span></p>
                  <article className="tl__card">
                    <div className="tl__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.image} alt={w.alt} loading="lazy" />
                      {last && (
                        <span className="tl__logo" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/logos/elephant-speakli.svg" alt="" />
                        </span>
                      )}
                    </div>
                    <div className="tl__body">
                      <h3>{w.title}</h3>
                      <ul>{w.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                      <p className="tl__limit">{last ? <Check /> : <Cross />}{w.limit}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-7 flex flex-col items-center gap-4">
          <Link href="/blog/histoire-evolution-tracabilite-ehpad" className="tl__more">
            {s.timeline_link}
            {sv(<path d="M5 12h14M13 6l6 6-6 6" />)}
          </Link>
          <CtaPair align="center" />
        </div>
      </div>
    </section>
  );
}

/* ── « Pourquoi bien tracer est vital » : onglets + illustrations ── */
const Ok = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
const Badge = ({ children }: { children: React.ReactNode }) => <div className="pv-nogap"><Ok /> {children}</div>;

// PATHOS, du micro au macro : les soins d'une résidente passent de « non tracé » à
// « valorisé », puis la vue dézoome sur l'établissement (1 point = 1 résident). Tous les
// profils passent au vert et le PMP de l'établissement monte de 180 à 275.
// Animation CSS jouée à l'ouverture de l'onglet (9 s).
const ECO_DOTS = 80;
const ECO_COLS = 16;
const ECO_SELF = 37; // Mme Dubois dans la grille
const ECO_ALREADY = 14; // profils déjà bien valorisés avant Speakli
// Ordre pseudo-aléatoire (permutation fixe, identique serveur/client) : les points passent au vert de façon diffuse
const ECO_ORDER = (() => {
  const idx = Array.from({ length: ECO_DOTS }, (_, i) => i);
  const key = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  const sorted = [...idx].sort((a, b) => key(a) - key(b));
  const order: number[] = [];
  sorted.forEach((dot, rank) => { order[dot] = rank; });
  return order;
})();
const ecoOrder = (i: number) => ECO_ORDER[i];
const StakeEco: Visual = () => {
  const d = useLanguage().t.story.eco;
  const selfCol = ECO_SELF % ECO_COLS;
  const selfRow = Math.floor(ECO_SELF / ECO_COLS);
  const origin = `${(((selfCol + 0.5) / ECO_COLS) * 100).toFixed(1)}% ${(((selfRow + 0.5) / (ECO_DOTS / ECO_COLS)) * 100).toFixed(1)}%`;
  return (
    <div className="pv-stack stake-eco">
      <Card>
        <div className="eco-stage">
          {/* Micro : une résidente */}
          <div className="eco-micro">
            <Label>{d.title} · {d.resident}</Label>
            <div className="grid gap-2">
              {(d.rows as string[][]).map(([item, kind], i) => (
                <div key={item} className="eco-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
                  <span className="min-w-0 flex-1 leading-tight"><b className="block text-[13.5px]">{item}</b><small className="text-[11.5px] text-slate-500">{kind}</small></span>
                  <span className="eco-status">
                    <span className="eco-status__off">{d.untraced}</span>
                    <span className="eco-status__on"><Ok /> {d.traced}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Macro : tout l'établissement */}
          <div className="eco-macro">
            <div className="flex items-center justify-between gap-2">
              <Label>{d.macro}</Label>
              <span className="eco-count"><b className="eco-count__value" /> / {ECO_DOTS} {d.valued}</span>
            </div>
            <div className="eco-dots" style={{ transformOrigin: origin }} aria-hidden>
              {Array.from({ length: ECO_DOTS }, (_, i) => {
                const o = ecoOrder(i);
                const cls = i === ECO_SELF ? " is-self" : o < ECO_ALREADY ? " is-ok" : "";
                const delay = 3.9 + ((o - ECO_ALREADY) / (ECO_DOTS - ECO_ALREADY)) * 3.1;
                return <i key={i} className={`eco-dot${cls}`} style={{ ["--d" as string]: `${delay.toFixed(2)}s` } as React.CSSProperties} />;
              })}
            </div>
            <div className="eco-legend"><span><i className="eco-dot" /> {d.legend_off}</span><span><i className="eco-dot is-ok" /> {d.legend_on}</span></div>
          </div>
        </div>
        <div className="eco-pmp">
          <span className="eco-pmp__label">{d.pmp}</span>
          <span className="eco-pmp__value" aria-label="PMP 180 → 275" />
        </div>
        <div className="eco-pmp__bar" aria-hidden><i /></div>
      </Card>
      <Badge>{d.badge}</Badge>
    </div>
  );
};

// Familles : deux questions d'une famille, l'IA de Speakli retrouve la traçabilité et répond
const StakeLegal: Visual = () => {
  const d = useLanguage().t.story.legal;
  return (
    <div className="pv-stack stake-chat">
      {[[d.question, d.answer, d.source], [d.question2, d.answer2, d.source2]].map(([q, a, src], n) => (
        <Fragment key={n}>
          <div className={`chat-msg chat-msg--family chat-step${n}`}>
            <span className="chat-avatar chat-avatar--family" aria-hidden>F</span>
            <div><small>{d.family}</small><p>{q}</p></div>
          </div>
          <div className={`chat-typing chat-step${n}`}>
            <span className="chat-avatar chat-avatar--speakli" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/elephant-white.svg" alt="" />
            </span>
            <span>{d.analysing}</span><i /><i /><i />
          </div>
          <div className={`chat-msg chat-msg--speakli chat-step${n}`}>
            <div><small>{d.speakli}</small><p>{a}</p><span className="chat-source"><Ok /> {src}</span></div>
            <span className="chat-avatar chat-avatar--speakli" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/elephant-white.svg" alt="" />
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
// Équipes : le travail de Camille, invisible sans traçabilité, devient visible acte par acte,
// les compteurs montent, puis la direction la félicite et elle est mise à l'honneur (9 s).
const StakeOrga: Visual = () => {
  const d = useLanguage().t.story.orga;
  return (
    <div className="pv-stack stake-orga">
      <Card>
        <div className="flex items-center gap-3">
          <span className="pv-avatar orga-avatar" style={{ background: "#007AFF", width: 42, height: 42, fontSize: 14 }}>CL</span>
          <span className="leading-tight"><b className="block text-[15px]">{d.name}</b><small className="text-xs text-slate-500">{d.role}</small></span>
          <span className="orga-medal ml-auto" aria-hidden>🏅</span>
        </div>
        <p className="orga-caption">
          <span className="orga-caption__off">{d.hidden}</span>
          <span className="orga-caption__on"><Ok /> {d.visible}</span>
        </p>
        <div className="orga-acts">
          {d.acts.map((a, i) => (
            <span key={a} className="orga-act" style={{ ["--i" as string]: i } as React.CSSProperties}><i />{a}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {(d.stats as string[][]).map(([v, unit, l]) => (
            <div key={l} className="stake-stat">
              <b aria-label={v + unit}><span className="orga-cnt" style={{ ["--to" as string]: Number(v) } as React.CSSProperties} />{unit}</b>
              <small>{l}</small>
            </div>
          ))}
        </div>
      </Card>
      <div className="orga-kudos">
        <span className="chat-avatar orga-kudos__avatar" aria-hidden>D</span>
        <div><small>{d.from}</small><p>{d.kudos}</p><span className="orga-heart" aria-hidden>❤️</span></div>
      </div>
      <Badge>{d.badge}</Badge>
    </div>
  );
};
// Accompagnement : une information de la nuit passe à l'équipe du matin puis à celle de
// l'après-midi. Chaque relève reçoit l'info, agit et la transmet (9 s).
const SHIFT_ICONS = [
  sv(<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />),
  sv(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  sv(<><path d="M17 18a5 5 0 00-10 0M12 9V2M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M8 6l4-4 4 4" /></>),
];
const StakeOps: Visual = () => {
  const d = useLanguage().t.story.ops;
  return (
    <div className="pv-stack stake-ops">
      <Card>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/resident-w4.jpg" alt="" className="w-10 h-10 rounded-full object-cover" />
          <span className="leading-tight"><b className="block text-[15px]">{d.resident}</b><small className="text-xs text-slate-500">{d.label}</small></span>
        </div>
        <ol className="ops-thread">
          {d.shifts.map((sh, i) => (
            <li key={sh.team} className={`ops-shift ops-shift--${i}`} style={{ ["--i" as string]: i } as React.CSSProperties}>
              <span className="ops-shift__icon">{SHIFT_ICONS[i]}</span>
              <div className="ops-shift__body">
                <p className="ops-shift__head"><b>{sh.team}</b><span>{sh.time} · {sh.who}</span></p>
                <p className="ops-shift__text">{sh.text}</p>
                <span className={`ops-shift__tag${i === d.shifts.length - 1 ? " is-last" : ""}`}><Ok /> {sh.tag}</span>
              </div>
            </li>
          ))}
        </ol>
      </Card>
      <Badge>{d.badge}</Badge>
    </div>
  );
};

export function StakesSection() {
  const { t } = useLanguage();
  const s = t.story;
  return (
    <ProductBlock
      id="enjeux"
      head={{ eyebrow: s.stakes_eyebrow, title: s.stakes_title, title_accent: s.stakes_accent }}
      items={s.impacts}
      visuals={[StakeEco, StakeLegal, StakeOrga, StakeOps]}
      icons={[ICON.euro, ICON.chat, ICON.award, ICON.shieldHeart]}
      tone="light"
      fillImage
      image={{ src: "/photos/story/reunion-transmission.png", alt: s.stakes_image_alt }}
    />
  );
}

/* ── Résultats et impacts mesurés : 3 impacts + simulateur de temps + calculateur PATHOS ── */
// Hypothèses de l'étude Structures 3.0 (ANS, GCSMS Comète Bretagne)
const TRANSMISSIONS_PER_DAY = 5;
const MIN_SAVED_PER_TRANSMISSION = 2;
const DAYS_PER_ETP = 165;
const HOURS_PER_DAY = 7;
const fmt = (n: number, digits = 0) => n.toLocaleString("fr-FR", { maximumFractionDigits: digits });

export function ImpactSection() {
  const { t } = useLanguage();
  const s = t.story.impact;
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(30);
  const perDay = (n * TRANSMISSIONS_PER_DAY * MIN_SAVED_PER_TRANSMISSION) / 60;
  const perYear = perDay * DAYS_PER_ETP;
  const etp = perYear / (DAYS_PER_ETP * HOURS_PER_DAY);
  return (
    <section ref={ref} id="impact" className="story story--impact">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-3xl">
            <p className="story__eyebrow">{s.eyebrow}</p>
            <h2 className="story__title">{s.title} <span>{s.accent}</span></h2>
          </div>
          <CtaPair />
        </div>

        <div className="impact-cards">
          {s.cards.map(c => (
            <article key={c.title} className="impact-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.alt} style={{ objectPosition: c.focus }} />
              <div>
                <b>{c.title}</b><span>{c.text}</span>
                <p className="impact-card__metric">
                  <strong>{c.metric}</strong><small>{c.metric_label}</small>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={c.org} title={c.org} />
                </p>
              </div>
            </article>
          ))}
        </div>


        <div className="impact-row">
          <div className="impact-sim">
            <p className="impact-sim__label">{s.sim_label}</p>
            <p className="impact-sim__scope">{s.sim_scope}</p>
            <div className="impact-sim__input">
              <label className="impact-sim__field">
                <span>{s.sim_input}</span>
                <input
                  type="number" inputMode="numeric" min={1} max={2000} value={n === 0 ? "" : n}
                  onChange={e => setN(Math.max(0, Math.min(2000, Math.round(Number(e.target.value) || 0))))}
                  aria-describedby="impact-sim-out"
                />
                <span>{s.sim_unit}</span>
              </label>
              <input type="range" min={10} max={150} step={5} value={Math.min(150, Math.max(10, n))} onChange={e => setN(Number(e.target.value))} aria-label={`${s.sim_input} ${s.sim_unit}`} />
            </div>
            <output id="impact-sim-out" className="impact-sim__out">
              <span><b>{fmt(perDay, 1)} h</b><small>{s.per_day}</small></span>
              <span><b>{fmt(perYear)} h</b><small>{s.per_year}</small></span>
              <span className="is-main"><b>{fmt(etp, 1)}</b><small>{s.etp}</small></span>
            </output>
            <div className="impact-sim__foot">
              <p>{s.method}</p>
              <span className="impact-sim__src">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/ans.png" alt="Agence du Numérique en Santé" className="h-8" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/gcsms.png" alt="GCSMS Comète Bretagne" className="h-10" />
                <small>{s.source}</small>
              </span>
            </div>
          </div>
          <div className="impact-pathos">
            <p className="impact-pathos__tag">{s.pathos_tag}</p>
            <b>{s.pathos_title}</b>
            <span>{s.pathos_text}</span>
            <a href="/roi" className="impact-pathos__cta">
              {s.pathos_cta}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Ils en parlent : un témoignage mis en avant + 4 courts ── */
export function VoicesSection() {
  const { t } = useLanguage();
  const s = t.story.voices;
  const ref = useRef<HTMLElement>(null);
  const f = s.featured;
  // Défilement des cartes : lent en continu, en pause au survol, et chaque clic
  // donne un élan qui accélère le défilement puis retombe progressivement
  const trackRef = useRef<HTMLDivElement>(null);
  const marquee = useRef({ x: 0, boost: 0, hover: false });
  useEffect(() => {
    const el = trackRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const BASE = 38; // px par seconde
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const m = marquee.current;
      const speed = (m.hover ? 0 : BASE) + m.boost;
      m.boost *= Math.pow(0.12, dt); // l'élan retombe en ~1,5 s
      if (m.boost < 1) m.boost = 0;
      const loop = el.scrollWidth / 2 + 7;
      m.x = (m.x + speed * dt) % loop;
      el.style.transform = `translateX(${-m.x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section ref={ref} id="temoignages" className="story story--voices">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="story__eyebrow">{s.eyebrow}</p>
            <h2 className="story__title">{s.title} <span>{s.accent}</span></h2>
          </div>
          <CtaPair />
        </div>

        <figure className="voice-main">
          <div>
            <blockquote><span aria-hidden>«&nbsp;</span>{f.quote}<span aria-hidden>&nbsp;»</span></blockquote>
            <figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.logo} alt={f.name} className="voice-main__logo" />
              <span><b>{f.name}</b> · {f.role}</span>
            </figcaption>
          </div>
          <iframe
            className="voice-main__video"
            src={`https://www.youtube-nocookie.com/embed/${f.video}?rel=0&modestbranding=1`}
            title={f.video_title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </figure>

        <div
          className="voice-marquee"
          onMouseEnter={() => { marquee.current.hover = true; }}
          onMouseLeave={() => { marquee.current.hover = false; }}
          onClick={() => { marquee.current.boost = Math.min(marquee.current.boost + 900, 2400); }}
          title={s.marquee_hint}
        >
          <div ref={trackRef} className="voice-track">
            {[0, 1].map(copy => s.quotes.map(q => (
              <figure key={`${copy}-${q.name}`} className="voice-card" aria-hidden={copy === 1 || undefined}>
                {q.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={q.logo} alt={q.org} className="voice-card__logo" />
                ) : (
                  <span className="voice-card__org">{q.org}</span>
                )}
                <blockquote>« {q.quote} »</blockquote>
                <figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.photo} alt="" />
                  <span><b>{q.name}</b><small>{q.role}</small></span>
                </figcaption>
              </figure>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
}
