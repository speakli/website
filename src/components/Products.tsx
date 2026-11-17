"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import "./Products.css";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/lib/translations";
import { PRODUCT_EVENT, type ProductKey } from "@/lib/productSwitch";
import CtaPair from "./CtaPair";

/*
 * Les deux produits Speakli, juste sous le header, chacun dans son propre bloc plein écran :
 * l'assistant vocal IA, puis le tableau de pilotage (on y arrive au scroll suivant).
 * Inspiré de la partie produit de getgranit.ai : à gauche la liste des fonctionnalités,
 * une barre de chargement sous l'élément actif fait défiler la liste ; à droite un
 * visuel illustre la fonctionnalité en cours.
 */

const STEP_MS = 9000;
type UI = Translations["products"]["ui"];

/* ── Icônes ── */
type IP = { s?: number };
const svg = (s: number, children: React.ReactNode, extra: React.SVGProps<SVGSVGElement> = {}) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...extra}>{children}</svg>
);
const Ic = {
  check: ({ s = 14 }: IP) => svg(s, <path d="M5 12.5l4.5 4.5L19 7.5" />, { strokeWidth: 3 }),
  x: ({ s = 12 }: IP) => svg(s, <path d="M6 6l12 12M18 6L6 18" />, { strokeWidth: 3 }),
  mic: ({ s = 16 }: IP) => svg(s, <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" /></>, { strokeWidth: 2 }),
  spark: ({ s = 14 }: IP) => <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" aria-hidden><path d="M12 2.5l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2 2-6.5z" /></svg>,
  target: ({ s = 16 }: IP) => svg(s, <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></>),
  drop: ({ s = 16 }: IP) => svg(s, <path d="M12 3.5s6 6.4 6 10.5a6 6 0 01-12 0c0-4.1 6-10.5 6-10.5z" />),
  pulse: ({ s = 16 }: IP) => svg(s, <path d="M3 12h4l2.5-6 4.5 12 2.5-6H21" />),
  fork: ({ s = 16 }: IP) => svg(s, <path d="M6 3.5v6a2.5 2.5 0 005 0v-6M8.5 3.5v17M16.5 20.5V3.5c-2 1-3 3.5-3 7h3" />),
  shower: ({ s = 16 }: IP) => svg(s, <path d="M4 20V8a4 4 0 014-4h1a4 4 0 014 4M9 9h8M11 13v1M15 13v1M19 13v1M13 17v1M17 17v1" />),
  shield: ({ s = 16 }: IP) => svg(s, <path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6l7-3z" />),
  heart: ({ s = 16 }: IP) => svg(s, <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />),
  scale: ({ s = 16 }: IP) => svg(s, <><path d="M6 20h12l-1.5-11h-9L6 20z" /><path d="M9.5 9a2.5 2.5 0 015 0" /></>),
  chair: ({ s = 12 }: IP) => svg(s, <><circle cx="10" cy="17" r="4" /><path d="M10 4v8h6l2 5M10 8h5" /></>),
  eye: ({ s = 12 }: IP) => svg(s, <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>),
  cloudOff: ({ s = 16 }: IP) => svg(s, <path d="M3 3l18 18M8.5 7.6A5 5 0 0116.9 10H18a3.5 3.5 0 012.2 6.2M17 18H7a4.5 4.5 0 01-1.3-8.8" />, { strokeWidth: 2 }),
  cloud: ({ s = 16 }: IP) => svg(s, <><path d="M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 10a3.5 3.5 0 010 7H7z" /><path d="M9.5 13.5l2 2 3.5-3.5" /></>, { strokeWidth: 2 }),
  clock: ({ s = 14 }: IP) => svg(s, <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  arrow: ({ s = 14 }: IP) => svg(s, <path d="M5 12h14M13 6l6 6-6 6" />, { strokeWidth: 2.4 }),
};

/* ── Briques d'interface ── */
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`pv-card ${className}`}>{children}</div>
);
type Tone = "blue" | "violet" | "green" | "red" | "grey" | "amber";
export const Label = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: Tone }) => (
  <p className={`pv-label pv-label--${tone}`}>{children}</p>
);
export const Pill = ({ children, tone }: { children: React.ReactNode; tone: Tone }) => (
  <span className={`pv-pill pv-pill--${tone}`}>{children}</span>
);
export const Disc = ({ children, bg, color, size = 30 }: { children: React.ReactNode; bg: string; color: string; size?: number }) => (
  <span className="pv-disc" style={{ background: bg, color, width: size, height: size }}>{children}</span>
);
const Resident = ({ name, room, badge }: { name: string; room: string; badge?: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/photos/resident-w4.jpg" alt="" className="w-10 h-10 rounded-full object-cover flex-none" />
    <div className="min-w-0 leading-tight">
      <b className="block text-[15px]">{name}</b>
      <span className="text-xs text-slate-500">{room}</span>
    </div>
    {badge && <span className="ml-auto">{badge}</span>}
  </div>
);

/* Met en évidence des expressions dans une phrase */
function highlight(text: string, parts: string[], cls: string) {
  const re = new RegExp(`(${parts.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((chunk, i) =>
    parts.some(p => p.toLowerCase() === chunk.toLowerCase()) ? <span key={i} className={cls}>{chunk}</span> : <span key={i}>{chunk}</span>
  );
}

/* ── Visuels : assistant vocal IA ── */
function VisualAI({ ui }: { ui: UI }) {
  return (
    <div className="pv-stack">
      <div className="pv-bubble">
        <span className="pv-bubble__mic"><Ic.mic /></span>
        <p>« {highlight(ui.transcript, [ui.raw_abdominal, ui.raw_headache], "pv-raw")} »</p>
      </div>
      <Card>
        <Resident name="Mme Dubois" room="Chambre 101" badge={<Pill tone="green"><Ic.check /> {ui.resident_detected}</Pill>} />
      </Card>
      <Card>
        <Label><Ic.spark /> {ui.understood}</Label>
        <p className="text-[15px] leading-relaxed text-slate-800">
          {ui.output_pre} <mark className="pv-mark">{ui.abdominal}</mark> {ui.output_mid} <mark className="pv-mark">{ui.headache}</mark>.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="pv-swap"><s>{ui.raw_abdominal}</s><Ic.arrow /><b>{ui.abdominal}</b></span>
          <span className="pv-swap"><s>{ui.raw_headache}</s><Ic.arrow /><b>{ui.headache}</b></span>
        </div>
      </Card>
    </div>
  );
}

// Transmission ciblée, en direct : Speakli reconnaît la résidente, choisit la cible parmi
// plusieurs (à la place du soignant), puis rédige Données, Actions, Résultats mot à mot.
// Tout est piloté en CSS sur .products.is-live .products-visual.is-on (l'onglet dure STEP_MS).
const DAR_START = [3.6, 4.85, 6.0];
const DAR_WORD = 0.055;
function VisualDAR({ ui }: { ui: UI }) {
  const rows: [string, string, string][] = [["D", ui.data, ui.data_text], ["A", ui.action, ui.action_text], ["R", ui.result, ui.result_text]];
  const pick = ui.target_options.indexOf(ui.target_name);
  const d = (sec: number) => ({ ["--d" as string]: `${sec.toFixed(2)}s` }) as React.CSSProperties;
  return (
    <div className="pv-stack dar-live">
      <Card>
        <Resident name="Mme Dubois" room="Chambre 101" badge={<span className="dar-res-badge"><Pill tone="green"><Ic.check /> {ui.resident_detected}</Pill></span>} />
        <div className="dar-pick">
          <p className="dar-pick__label"><Ic.target /> {ui.target_pick}<em>{ui.target_detected} : <b>{ui.target_name}</b></em></p>
          <div className="dar-chips">
            {ui.target_options.map((o, i) => (
              <span key={o} className={`dar-chip${i === pick ? " is-target" : ""}`} style={d(1.5 + 0.3 * Math.min(i, pick))}>{o}</span>
            ))}
          </div>
        </div>
      </Card>
      <Card className="dar-card grid gap-3">
        {rows.map(([k, label, text], r) => (
          <div key={k} className="dar-row grid grid-cols-[34px_1fr] gap-3 items-start" style={d(DAR_START[r] - 0.2)}>
            <span className="pv-dar">{k}</span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#1A5CE0]">{label}</p>
              <p className="text-[14px] leading-snug text-slate-800">
                {text.split(" ").map((w, j) => <span key={j} className="dar-w" style={d(DAR_START[r] + j * DAR_WORD)}>{w} </span>)}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// Signature des soins en direct : le vocal est retranscrit mot à mot, puis l'IA associe
// chaque passage du discours à un soin du plan (fait, refusé, non nécessaire) et détecte
// un soin ponctuel, avec le commentaire rédigé. Animation CSS sur .products.is-live .products-visual.is-on.
const CARE_WORD = 0.12;
const CARE_GAP = 0.45;
const CARE_TONES = ["green", "red", "grey", "violet"] as const;
function careTimeline(segments: string[]) {
  let t = 0.7;
  return segments.map(seg => {
    const words = seg.split(" ");
    const start = t;
    const end = start + words.length * CARE_WORD;
    t = end + CARE_GAP;
    return { words, start, link: end + 0.15 };
  });
}
const cssTime = (k: string, sec: number) => ({ [k]: `${sec.toFixed(2)}s` }) as React.CSSProperties;
// Bandeau « vocal en direct » partagé : micro, ondes, texte retranscrit mot à mot,
// chaque passage se surligne dans la couleur du soin ou du relevé qu'il alimente.
function VoiceLive({ label, tl, tones }: { label: string; tl: ReturnType<typeof careTimeline>; tones: readonly string[] }) {
  return (
    <div className="cs-voice">
      <div className="cs-voice__head">
        <span className="cs-mic"><Ic.mic s={14} /></span>
        <span className="cs-wave" aria-hidden>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${-((i * 0.17) % 0.9).toFixed(2)}s` }} />)}</span>
        <small>{label}</small>
      </div>
      <p className="cs-text">
        {tl.map((seg, n) => (
          <span key={n} className={`cs-seg cs-seg--${tones[n]}`} style={cssTime("--a", seg.link)}>
            {seg.words.map((w, j) => <span key={j} className="cs-w" style={cssTime("--d", seg.start + j * CARE_WORD)}>{w} </span>)}
          </span>
        ))}
      </p>
    </div>
  );
}
function VisualCare({ ui }: { ui: UI }) {
  const c = ui.care_live;
  const tl = careTimeline(c.segments);
  const done = tl[tl.length - 1].link + 0.6;
  const v = cssTime;
  const status = [<Pill key="d" tone="green">{ui.done}</Pill>, <Pill key="r" tone="red">{ui.refused}</Pill>, <Pill key="n" tone="grey">{ui.unneeded}</Pill>, <Pill key="a" tone="violet"><Ic.spark s={11} /> {c.adhoc}</Pill>];
  const icons = [
    <Disc key="f" size={26} bg="#EAF7EE" color="#2F9E4F"><Ic.fork s={13} /></Disc>,
    <Disc key="s" size={26} bg="#E0F2FE" color="#0284C7"><Ic.shower s={13} /></Disc>,
    <Disc key="p" size={26} bg="#F1F2F4" color="#6B7280"><Ic.shield s={13} /></Disc>,
    <Disc key="g" size={26} bg="#EFEBFE" color="#7C5CF0"><Ic.drop s={13} /></Disc>,
  ];
  return (
    <div className="pv-stack cs" style={v("--end", tl[tl.length - 1].link)}>
      <VoiceLive label={c.live} tl={tl} tones={CARE_TONES} />
      <Card className="cs-plan">
        <div className="flex items-center justify-between gap-2">
          <Label>{c.plan}</Label>
          <span className="cs-done" style={v("--d", done)}><Pill tone="green"><Ic.check s={11} /> {ui.completed}</Pill></span>
        </div>
        <div className="grid gap-1.5">
          {(c.items as string[][]).map(([name, comment], n) => (
            <div key={name} className={`cs-item cs-item--${CARE_TONES[n]}${n === 3 ? " is-adhoc" : ""}`} style={v("--a", tl[n].link)}>
              <div className="pv-care-row cs-row">
                {icons[n]}
                <span className="flex-1 min-w-0">{name}</span>
                <span className="cs-status">
                  <span className="cs-status__off">{c.to_sign}</span>
                  <span className="cs-status__on">{status[n]}</span>
                </span>
              </div>
              <p className="cs-comment">{comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Constantes vitales dictées : le vocal est retranscrit en direct, chaque phrase remplit
// le relevé correspondant (poids au fauteuil déduit, tension convertie, hydratation cumulée).
const VITAL_TONES = ["violet", "blue", "sky"] as const;
function VisualVitals({ ui }: { ui: UI }) {
  const tl = careTimeline(ui.vitals_live.segments);
  const [w, bp, hy] = tl.map(x => x.link);
  const v = cssTime;
  return (
    <div className="pv-stack vt" style={v("--end", hy)}>
      <VoiceLive label={ui.care_live.live} tl={tl} tones={VITAL_TONES} />
      <Card className="vt-card vt-card--violet" >
        <div className="vt-card__in" style={v("--a", w)}>
          <div className="flex items-center gap-2.5">
            <Disc size={28} bg="#F1ECFE" color="#7C5CF0"><Ic.scale s={14} /></Disc>
            <b className="text-[14.5px]">{ui.weight}</b>
            <span className="vt-val text-[13px] font-bold text-[#D9534F]" style={v("--d", w + 1.1)}>(−2,5 kg)</span>
            <span className="vt-val ml-auto" style={v("--d", w + 1.3)}><Pill tone="red"><Ic.eye /> {ui.weight_watch}</Pill></span>
          </div>
          <div className="pv-weight vt-weight">
            <div className="vt-val" style={v("--d", w)}><span className="pv-weight__box pv-weight__box--violet">79,0<small>kg</small></span><small>{ui.weight_announced}</small></div>
            <span className="pv-weight__op vt-val" style={v("--d", w + 0.45)}>−</span>
            <div className="vt-val" style={v("--d", w + 0.45)}><span className="pv-weight__box">12,0<small>kg</small><i><Ic.chair /></i></span><small>{ui.weight_chair}</small></div>
            <span className="pv-weight__op vt-val" style={v("--d", w + 0.85)}>=</span>
            <div className="vt-val" style={v("--d", w + 0.85)}><span className="pv-weight__box pv-weight__box--ok">67,0<small>kg</small></span><small>{ui.weight_kept}</small></div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card className="vt-card vt-card--blue">
          <div className="vt-card__in" style={v("--a", bp)}>
            <div className="flex items-center gap-2">
              <Disc size={28} bg="#EAF1FE" color="#2F6BF0"><Ic.heart s={14} /></Disc>
              <b className="text-[14.5px]">{ui.bp}</b>
            </div>
            <svg viewBox="0 0 200 64" className="w-full mt-2" aria-hidden>
              <path d="M10 18 L60 20 L110 23 L150 25" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 46 L60 48 L110 50 L150 51" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
              {[[10, 18, 46], [60, 20, 48], [110, 23, 50], [150, 25, 51]].map(([x, y1, y2]) => <g key={x}><circle cx={x} cy={y1} r="4" fill="#fff" stroke="#3B82F6" strokeWidth="2.5" /><circle cx={x} cy={y2} r="4" fill="#fff" stroke="#3B82F6" strokeWidth="2.5" /></g>)}
              <g className="vt-new" style={v("--d", bp + 0.1)}>
                <path d="M150 25 L190 16 M150 51 L190 47" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
                <circle cx="190" cy="16" r="4.5" fill="#fff" stroke="#22C55E" strokeWidth="2.5" />
                <circle cx="190" cy="47" r="4.5" fill="#fff" stroke="#22C55E" strokeWidth="2.5" />
              </g>
            </svg>
            <p className="vt-val vt-bp" style={v("--d", bp + 0.4)}><b>123</b><span>/</span><b>80</b> <small>mmHg</small></p>
          </div>
        </Card>
        <Card className="vt-card vt-card--sky">
          <div className="vt-card__in" style={v("--a", hy)}>
            <div className="flex items-center gap-2">
              <Disc size={28} bg="#E0F2FE" color="#0284C7"><Ic.drop s={14} /></Disc>
              <b className="text-[14.5px]">{ui.hydration}</b>
              <span className="vt-pct ml-auto" />
            </div>
            <p className="mt-2"><b className="vt-hy" /> <span className="text-sm text-slate-400">/ 150 cL</span></p>
            <div className="flex gap-1 h-2.5 mt-2 rounded-full overflow-hidden bg-slate-100">
              {[18, 14, 20, 10].map((wd, i) => <span key={i} style={{ width: `${wd}%`, background: ["#A8CFFF", "#60AAFF", "#2E8EFF", "#1A5CE0"][i] }} />)}
              <span className="vt-hy-bar" />
            </div>
            <p className="vt-val vt-add" style={v("--d", hy + 0.2)}>+20 cL</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Mode hors ligne, en scène : la connexion tombe, le soignant continue de dicter, les notes
// vocales tombent dans la boîte mémoire Speakli ; une notification arrive, puis le badge
// « Connexion retrouvée » ; chaque document passe « À valider » puis « Validé » par le soignant ;
// la boîte n'est « Synchronisée » (0 oubli) qu'une fois tout validé.
const OFF = { cut: 0.9, stored: [1.9, 3.1, 4.3], notif: 6.9, back: 6.9, conv: [7.4, 7.7, 8.0], valid: [8.9, 9.7, 10.5], sync: 11.0, done: 11.6 };
function VisualOffline({ ui }: { ui: UI }) {
  const o = ui.offline_live;
  const t = (vars: Record<string, number>) => Object.fromEntries(Object.entries(vars).map(([k, x]) => [k, `${x.toFixed(2)}s`])) as React.CSSProperties;
  return (
    <div className="pv-stack of" style={t({ "--cut": OFF.cut, "--back": OFF.back, "--notif": OFF.notif, "--conv": OFF.conv[0], "--sync": OFF.sync, "--done": OFF.done, "--n1": OFF.stored[0], "--n2": OFF.stored[1], "--n3": OFF.stored[2] })}>
      {/* Notification iOS au retour du réseau */}
      <div className="of-notif" role="presentation">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="of-notif__icon"><img src="/hero/elephant-white.svg" alt="" /></span>
        <span className="min-w-0"><small>{o.notif_app}</small><b>{o.notif_title}</b><span>{o.notif_text}</span></span>
      </div>

      <div className="of-net">
        <span className="of-net__s of-net__s--on"><Ic.cloud s={14} /> {o.connected}</span>
        <span className="of-net__s of-net__s--off"><Ic.cloudOff s={14} /> {ui.offline}</span>
        <span className="of-net__s of-net__s--back"><Ic.cloud s={14} /> {ui.online}</span>
      </div>

      <div className="cs-voice of-voice">
        <div className="cs-voice__head">
          <span className="cs-mic"><Ic.mic s={14} /></span>
          <span className="cs-wave" aria-hidden>{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ animationDelay: `${-((i * 0.17) % 0.9).toFixed(2)}s` }} />)}</span>
          <small>{o.recording}</small>
        </div>
      </div>

      <Card className="of-box">
        <div className="flex items-center gap-2">
          <span className="of-box__icon"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="5" rx="1.5" /><path d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M10 13h4" /></svg></span>
          <b className="text-[14.5px]">{o.box}</b>
          <span className="of-box__state ml-auto">
            <span className="of-box__pending"><b className="of-count" /> {o.pending}</span>
            <span className="of-box__synced"><Ic.check s={11} /> {o.synced}</span>
          </span>
        </div>
        <div className="grid gap-2 mt-3">
          {ui.offline_notes.map((n, i) => (
            <div key={n} className="of-row" style={t({ "--s": OFF.stored[i], "--c": OFF.conv[i], "--ok": OFF.valid[i] })}>
              <Disc bg="#EAF3FF" color="#007AFF" size={26}><Ic.mic s={13} /></Disc>
              <span className="of-swap flex-1 min-w-0">
                <span className="of-note">{ui.voice_note} · {n}</span>
                <span className="of-doc">{ui.online_docs[i]}</span>
              </span>
              <span className="of-swap of-swap--end">
                <span className="of-p1"><Pill tone="amber"><Ic.clock /> {o.stored}</Pill></span>
                <span className="of-p2"><Pill tone="blue">{ui.to_validate}</Pill></span>
                <span className="of-p3"><Pill tone="green"><Ic.check s={11} /> {o.validated}</Pill></span>
              </span>
              <i className="of-read" aria-hidden />
            </div>
          ))}
        </div>
      </Card>
      <div className="pv-nogap of-done"><Ic.check /> {ui.no_gap}</div>
    </div>
  );
}

// Intégration au DUI : vocal → traitement Speakli (chargement sur le contour) → « À valider »
// puis « Validé » par le soignant → seulement alors injecté aux bons endroits dans NETSoins
// (transmissions, relevés, soins, activités).
const DUI = { steps: [0.3, 1.3, 3.0], load: [1.4, 1.5], ok: 4.3, mods: [5.0, 5.4, 5.8, 6.2], done: 7.1 };
function VisualDUI({ ui }: { ui: UI }) {
  const d = ui.dui_live;
  const t = (vars: Record<string, number>) => Object.fromEntries(Object.entries(vars).map(([k, x]) => [k, `${x.toFixed(2)}s`])) as React.CSSProperties;
  return (
    <div className="pv-stack dui" style={t({ "--load": DUI.load[0], "--load-dur": DUI.load[1], "--ok": DUI.ok, "--done": DUI.done })}>
      <div className="dui-steps">
        {d.steps.map((label, i) => (
          <Fragment key={label}>
            {i > 0 && <span className="dui-link" style={t({ "--a": DUI.steps[i] - 0.3 })} aria-hidden><i /></span>}
            <div className={`dui-step dui-step--${i}`} style={t({ "--a": DUI.steps[i] })}>
              <span className="dui-step__ic">
                {i === 0 && <span className="cs-wave" aria-hidden>{Array.from({ length: 5 }, (_, k) => <i key={k} style={{ animationDelay: `${-(k * 0.18).toFixed(2)}s` }} />)}</span>}
                {i === 1 && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero/elephant-white.svg" alt="" />
                    {/* Chargement qui fait le tour du contour */}
                    <svg className="dui-load" viewBox="0 0 64 64" aria-hidden><rect x="2" y="2" width="60" height="60" rx="19" pathLength={100} /></svg>
                  </>
                )}
                {i === 2 && (
                  <>
                    <span className="dui-pend"><Ic.clock s={22} /></span>
                    <span className="dui-ok"><Ic.check s={22} /></span>
                  </>
                )}
              </span>
              {i === 2 ? (
                <small className="dui-lbl"><span className="dui-lbl__a">{d.to_validate}</span><span className="dui-lbl__b">{d.validated}</span></small>
              ) : (
                <small>{label}</small>
              )}
            </div>
          </Fragment>
        ))}
      </div>

      <div className="dui-app">
        <div className="dui-app__bar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/netsoins-teranga.png" alt="NETSoins" />
          <small>{d.app}</small>
          <span className="dui-app__dots" aria-hidden><i /><i /><i /></span>
        </div>
        <div className="dui-mods">
          {(d.modules as string[][]).map(([mod, entry], i) => (
            <div key={mod} className="dui-mod" style={t({ "--a": DUI.mods[i] })}>
              <span className="dui-mod__name">{mod}</span>
              <span className="dui-mod__entry">{entry}</span>
              <span className="dui-mod__ok"><Ic.check s={11} /> {d.integrated}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pv-nogap dui-done"><Ic.check /> {d.badge}</div>
    </div>
  );
}

/* ── Visuels : tableau de pilotage (inspirés du dashboard cadre Speakli) ── */
type Person = [string, string, string, number, number, number]; // initiales, nom, fonction, transmissions, relevés, signature (%)
const PEOPLE_COLORS = ["#007AFF", "#2F9E4F", "#7C5CF0", "#F59E0B"];

const READING_COLORS = ["#007AFF", "#60AAFF", "#7C5CF0", "#22C55E", "#CBD5E1"];

// Graphiques d'activité animés, puis le classement raconté en 4 temps : je vois l'activité,
// je récompense la meilleure soignante, j'accompagne celle qui décroche, et l'équipe devient
// homogène (Nadia remonte : 9 → 38 transmissions, 58 % → 91 % de signature).
const ACT = { people: 3.6, steps: [3.9, 5.4, 7.0, 10.6], reward: 5.6, coach: 7.2, grow: 8.4, growDur: 2, done: 10.8 };
const cnt = (from: number, to: number) => ({ ["--v" as string]: from, ["--to" as string]: to }) as React.CSSProperties;
function VisualActivity({ ui }: { ui: UI }) {
  const d = ui.dash;
  const volume = [96, 118, 124, 131, 127, 136, 136];
  const w = 300, h = 64, max = 150, min = 80;
  const pts = volume.map((v, i) => [(i / (volume.length - 1)) * w, h - ((v - min) / (max - min)) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const split = d.readings_split as [string, number][];
  const ends = split.map((_, i) => split.slice(0, i + 1).reduce((sum, [, v]) => sum + v, 0));
  const donut = split.map((_, i) => `${READING_COLORS[i]} ${i ? ends[i - 1] : 0}% ${ends[i]}%`).join(", ");
  const t = (k: string, x: number) => ({ [k]: `${x.toFixed(2)}s` }) as React.CSSProperties;
  const people = d.people as Person[];
  const last = people.length - 1;
  return (
    <div className="pv-stack pv-stack--tight act" style={{ ...t("--people", ACT.people), ...t("--reward", ACT.reward), ...t("--coach", ACT.coach), ...t("--grow", ACT.grow), ...t("--done", ACT.done) }}>
      <Card>
        <div className="flex items-baseline justify-between">
          <Label>{d.volume}</Label>
          <b className="text-[13px] text-[#0D30A0]">{d.volume_total}</b>
        </div>
        <svg viewBox={`0 -6 ${w} ${h + 12}`} className="act-chart w-full h-[32px]" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="pv-vol" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#007AFF" stopOpacity=".28" /><stop offset="1" stopColor="#007AFF" stopOpacity="0" /></linearGradient></defs>
          <path d={`${line} L${w} ${h + 6} L0 ${h + 6} Z`} fill="url(#pv-vol)" />
          <path d={line} fill="none" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between text-[10.5px] text-slate-400 mt-1">{d.days.map((x, i) => <span key={i}>{x}</span>)}</div>
      </Card>
      <div className="grid grid-cols-[1.25fr_1fr_1fr] gap-2.5">
        <Card className="pv-mini">
          <p className="pv-mini__title">{d.readings}</p>
          <div className="flex items-center gap-2.5 mt-2">
            <span className="pv-donut act-donut" style={{ background: `conic-gradient(${donut})` }} />
            <span className="grid gap-0.5 text-[10.5px] text-slate-600 leading-tight">
              {split.slice(0, 4).map(([n], i) => <span key={n} className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: READING_COLORS[i] }} />{n}</span>)}
            </span>
          </div>
        </Card>
        <Card className="pv-mini">
          <p className="pv-mini__title">{d.falls}</p>
          <p className="mt-1"><b className="act-cnt text-2xl font-extrabold text-[#0D30A0]" style={cnt(14, 9)} /> <span className="pv-delta">−36 %</span></p>
          <div className="pv-bars">{[14, 13, 12, 11, 10, 9].map((v, i) => <i key={i} className="act-bar" style={{ height: `${(v / 14) * 100}%`, background: i === 5 ? "#22C55E" : "#BBF7D0", ...t("--d", 0.6 + i * 0.12) }} />)}</div>
          <p className="pv-mini__sub">{d.falls_sub}</p>
        </Card>
        <Card className="pv-mini">
          <p className="pv-mini__title">{d.adverse}</p>
          <p className="mt-1"><b className="act-cnt text-2xl font-extrabold text-[#0D30A0]" style={cnt(12, 8)} /> <span className="pv-delta">−33 %</span></p>
          <div className="pv-bars">{[12, 11, 10, 10, 9, 8].map((v, i) => <i key={i} className="act-bar" style={{ height: `${(v / 12) * 100}%`, background: i === 5 ? "#22C55E" : "#BBF7D0", ...t("--d", 0.8 + i * 0.12) }} />)}</div>
          <p className="pv-mini__sub">{d.adverse_sub}</p>
        </Card>
      </div>
      <Card className="act-people">
        <div className="act-steps">
          {d.steps.map((st, i) => <span key={st} className="act-step" style={t("--a", ACT.steps[i])}><i>{i + 1}</i>{st}</span>)}
        </div>
        <div className="pv-people-head">
          <span>{d.caregivers}</span><span>{d.col_transmissions}</span><span>{d.col_readings}</span><span>{d.col_signature}</span>
        </div>
        {people.map(([ini, name, role, tr, rel, sig], i) => {
          const isLast = i === last;
          return (
            <div key={ini} className={`pv-people-row act-row${i === 0 ? " is-top" : ""}${isLast ? " is-support" : ""}`} style={t("--a", ACT.people + i * 0.15)}>
              <span className="flex items-center gap-2 min-w-0">
                <span className="act-swap">
                  <span className={`pv-rank-badge${i === 0 ? " is-first" : ""}${isLast ? " is-support act-badge-old" : ""}`}>{isLast ? "!" : i + 1}</span>
                  {isLast && <span className="pv-rank-badge act-badge-new">{i + 1}</span>}
                </span>
                <span className="pv-avatar pv-avatar--sm" style={{ background: PEOPLE_COLORS[i] }}>{ini}</span>
                <span className="min-w-0 leading-tight">
                  <b className="block text-[13px] truncate">{name}</b>
                  <span className="act-swap act-sub">
                    {isLast ? (
                      <>
                        <small className="act-sub--a text-[#B45309] font-bold">{d.support}</small>
                        <small className="act-sub--b text-[#1A5CE0] font-bold">{d.coaching}</small>
                        <small className="act-sub--c text-[#2F9E4F] font-bold">{d.improved}</small>
                      </>
                    ) : i === 0 ? (
                      <>
                        <small className="act-sub--a text-slate-500">{role}</small>
                        <small className="act-sub--r text-[#B7791F] font-bold">🏅 {d.reward}</small>
                      </>
                    ) : <small className="text-slate-500">{role}</small>}
                  </span>
                </span>
              </span>
              {isLast ? (
                <>
                  <b className="act-cnt act-grow" style={cnt(tr, 38)} />
                  <b className="act-cnt act-grow" style={cnt(rel, 21)} />
                  <b className="act-sig"><span className="act-cnt act-grow" style={cnt(sig, 91)} /> %</b>
                </>
              ) : (
                <>
                  <b>{tr}</b>
                  <b>{rel}</b>
                  <b style={{ color: "#2F9E4F" }}>{sig} %</b>
                </>
              )}
            </div>
          );
        })}
      </Card>
      <div className="pv-nogap act-done"><Ic.check /> {d.homogeneous}</div>
    </div>
  );
}

// Enquête auprès des équipes : les réponses arrivent en direct, l'anneau et les jauges se remplissent
function VisualSurvey({ ui }: { ui: UI }) {
  const d = ui.dash;
  const colors = ["#22C55E", "#F59E0B", "#007AFF", "#7C5CF0", "#0EA5E9"];
  const t = (k: string, x: number) => ({ [k]: `${x.toFixed(2)}s` }) as React.CSSProperties;
  return (
    <div className="pv-stack sv">
      <Card>
        <div className="flex items-center gap-4">
          <span className="pv-ring sv-ring"><span><b><span className="act-cnt sv-cnt" style={cnt(0, 90)} /> %</b><small>{d.survey_rate}</small></span></span>
          <div className="leading-tight">
            <b className="block text-[15px]">{d.survey_title}</b>
            <span className="text-xs text-slate-500"><b className="act-cnt sv-cnt text-[#0D30A0]" style={cnt(0, 27)} /> {d.survey_answers}</span>
          </div>
        </div>
        <div className="grid gap-2.5 mt-4">
          {(d.survey_metrics as [string, string, number][]).map(([label, value, width], i) => (
            <div key={label} style={t("--d", 1.2 + i * 0.45)}>
              <div className="flex justify-between text-[13px]"><span className="text-slate-600">{label}</span><b className="sv-val">{value}</b></div>
              <span className="block h-2 mt-1 rounded-full bg-slate-100 overflow-hidden"><i className="sv-bar block h-full rounded-full" style={{ width: `${width}%`, background: colors[i] }} /></span>
            </div>
          ))}
        </div>
      </Card>
      <div className="sv-feed">
        <small className="sv-feed__title"><i /> {d.survey_live}</small>
        {(d.survey_feed as string[][]).map(([who, text], i) => (
          <div key={who} className="sv-answer" style={t("--d", 1.6 + i * 1.6)}><small>{who}</small><p>« {text} »</p></div>
        ))}
      </div>
    </div>
  );
}

// Indicateurs d'impact en graphiques animés : 12 mois par indicateur, la ligne pointillée
// marque l'arrivée de Speakli. Chaque courbe se trace, puis la valeur actuelle et l'écart
// apparaissent. Hausse ou baisse : le vert signale toujours une évolution favorable.
const IMPACT = { first: 0.4, gap: 0.55, draw: 1.3 };
const IMP_MONTHS = 12;
const IMP_DEPLOY = 4; // mois d'arrivée de Speakli
const num = (v: string) => parseFloat(v.replace(/\s/g, "").replace(",", "."));
// Série déterministe : stable avant Speakli, puis évolution progressive vers la valeur actuelle
function impactSeries(t0: number, t1: number, seed: number) {
  return Array.from({ length: IMP_MONTHS }, (_, m) => {
    const wobble = Math.sin((m + 1) * (seed + 1.7)) * 0.06 * Math.max(Math.abs(t0), Math.abs(t1));
    if (m <= IMP_DEPLOY) return t0 + wobble * 0.8;
    const k = (m - IMP_DEPLOY) / (IMP_MONTHS - 1 - IMP_DEPLOY);
    const ease = 1 - Math.pow(1 - k, 2.2);
    return t0 + (t1 - t0) * ease + (m === IMP_MONTHS - 1 ? 0 : wobble * 0.5);
  });
}
function ImpactChart({ t0, t1, seed }: { t0: number; t1: number; seed: number }) {
  const W = 200, H = 58, X0 = 4, X1 = 194, Y0 = 8, Y1 = 50;
  const vals = impactSeries(t0, t1, seed);
  const lo = Math.min(...vals), hi = Math.max(...vals), span = hi - lo || 1;
  const pts = vals.map((v, m) => [X0 + (m * (X1 - X0)) / (IMP_MONTHS - 1), Y1 - ((v - lo) / span) * (Y1 - Y0)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${X1} ${H} L${X0} ${H} Z`;
  const xd = X0 + (IMP_DEPLOY * (X1 - X0)) / (IMP_MONTHS - 1);
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg className="imp-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`imp-g-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#22C55E" stopOpacity=".28" /><stop offset="1" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line className="imp-deploy" x1={xd} x2={xd} y1={2} y2={H} />
      <path className="imp-area" d={area} fill={`url(#imp-g-${seed})`} />
      <path className="imp-line" d={line} pathLength={1} />
      <circle className="imp-dot" cx={ex} cy={ey} r={3.4} />
    </svg>
  );
}
function VisualImpact({ ui }: { ui: UI }) {
  const d = ui.dash;
  return (
    <div className="w-full max-w-[440px]">
      <p className="text-white/85 text-sm font-semibold mb-3 text-center">{d.impact_title} · {d.impact_sub}</p>
      <div className="grid grid-cols-2 gap-3">
        {(d.impact as string[][]).map(([label, t0, t1, delta], i) => {
          const a = IMPACT.first + i * IMPACT.gap;
          return (
            <Card key={label} className="imp-card">
              <div style={{ ["--a" as string]: `${a}s`, ["--b" as string]: `${a + IMPACT.draw}s` } as React.CSSProperties}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] text-slate-500 leading-tight min-h-[2.4em]">{label}</p>
                  <span className="pv-delta imp-delta">{delta}</span>
                </div>
                <ImpactChart t0={num(t0)} t1={num(t1)} seed={i} />
                <div className="imp-axis"><span>{t0}</span><span className="imp-axis__tag">Speakli</span><b className="imp-now">{t1}</b></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export type Visual = (props: { ui: UI }) => React.JSX.Element;
const ASSISTANT_VISUALS: Visual[] = [VisualAI, VisualDAR, VisualCare, VisualVitals, VisualOffline, VisualDUI];
const DASHBOARD_VISUALS: Visual[] = [VisualActivity, VisualSurvey, VisualImpact];

/* ── Icônes devant chaque élément de liste (style trait, 24×24) ── */
const li = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d}</svg>
);
export const ICON = {
  sparkles: li(<><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>),
  target: li(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>),
  signature: li(<><path d="M4 20h16" /><path d="M15.5 4.5l3 3L9 17l-4 1 1-4z" /></>),
  pulse: li(<path d="M3 12h4l2.5-6 4 12 2.5-6H21" />),
  wifiOff: li(<><path d="M3 3l18 18" /><path d="M8.5 16.5a5 5 0 017 0M5 12.9a10 10 0 015.2-2.7M19 12.9a10 10 0 00-2.4-1.7M2 8.8a15 15 0 014.2-2.6M22 8.8A15 15 0 0011 5" /><circle cx="12" cy="20" r="0.8" fill="currentColor" /></>),
  plug: li(<><path d="M9 7V3M15 7V3" /><path d="M6 7h12v4a6 6 0 01-12 0z" /><path d="M12 17v4" /></>),
  bars: li(<><path d="M4 20h16" /><path d="M7 16v-5M12 16V6M17 16v-8" /></>),
  heart: li(<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.2a4.3 4.3 0 017.5 2.6C19.5 15.4 12 20 12 20z" />),
  trend: li(<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  euro: li(<><path d="M18 6.5A7 7 0 007 9.5M18 17.5A7 7 0 017 14.5" /><path d="M4 10.5h9M4 13.5h9" /></>),
  chat: li(<><path d="M4 5h16v10H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>),
  award: li(<><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 21l5-3 5 3-1.5-7" /></>),
  shieldHeart: li(<><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M12 15.5l-2.8-2.7a1.8 1.8 0 012.8-2.2 1.8 1.8 0 012.8 2.2z" /></>),
};
// La signature des soins et les constantes racontent une scène dictée : on leur laisse plus de temps
const ASSISTANT_DURATIONS = [STEP_MS, STEP_MS, 15000, 11000, 13500, STEP_MS];
const ASSISTANT_ICONS = [ICON.sparkles, ICON.target, ICON.signature, ICON.pulse, ICON.wifiOff, ICON.plug];
const DASHBOARD_ICONS = [ICON.bars, ICON.heart, ICON.trend];

/* ── Bloc produit ── */
export function ProductBlock({
  id, head, items, visuals, icons, durations, note, tone, image, fillImage, switcher, anchors,
}: {
  id: string;
  switcher?: React.ReactNode; // remplace le sur-titre (bascule entre les deux produits)
  anchors?: string[]; // ancres supplémentaires pointant sur la section

  head: { eyebrow: string; title: string; title_accent: string };
  items: { title: string; text: string }[];
  visuals: Visual[];
  icons?: React.ReactNode[];
  durations?: number[]; // durée d'affichage par élément (ms), STEP_MS par défaut
  fillImage?: boolean; // la photo s'étire pour que la liste finisse au bas du visuel (liste courte)
  note?: string;
  tone: "light" | "soft";
  image?: { src: string; alt: string };
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0); // change à chaque sortie d'écran : la barre repart de zéro
  const ref = useRef<HTMLElement>(null);

  // Rien ne tourne tant que le bloc n'est pas à l'écran : le premier élément reste affiché,
  // figé au début de son animation. Dès qu'on quitte le bloc, il revient au premier
  // élément, pour que tout reparte du début au retour.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.35) setInView(true);
      else if (!e.isIntersecting) {
        setInView(false);
        setIndex(0);
        setRun(r => r + 1);
      }
    }, { threshold: [0, 0.35] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} data-items={items.length} className={`products products--${tone}${inView ? " is-live" : ""}`}>
      {anchors?.map(a => <span key={a} id={a} className="products-anchor" aria-hidden />)}
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          {switcher ? (
            <>
              {/* Sur-titre, puis le sélecteur des deux solutions et les boutons, puis le titre sur toute la largeur */}
              <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 mb-6">
                <div>{switcher}</div>
                <CtaPair placement="head" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.2rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--sp-900)" }}>
                {head.title} <span style={{ color: "var(--sp-500)" }}>{head.title_accent}</span>
              </h2>
            </>
          ) : (
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>{head.eyebrow}</p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.2rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--sp-900)" }}>
                  {head.title} <span style={{ color: "var(--sp-500)" }}>{head.title_accent}</span>
                </h2>
              </div>
              <CtaPair placement="head" />
            </div>
          )}
        </div>

        <div className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-4 lg:gap-14 ${fillImage ? "items-start lg:items-stretch" : "items-start"}`}>
          {/* Liste des fonctionnalités avec barre de chargement */}
          <div className="order-2 lg:order-1 flex flex-col gap-4">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.src} alt={image.alt} className={`products-photo${fillImage ? " products-photo--fill" : ""}`} loading="lazy" />
          )}
          <ol className={`products-list${icons ? " products-list--icons" : ""}`}>
            {items.map((it, i) => {
              const on = i === index;
              return (
                <li key={it.title} className={`products-item${on ? " is-on" : ""}`}>
                  <button type="button" onClick={() => setIndex(i)} aria-expanded={on}>
                    <b>{icons?.[i] && <span className="products-item__icon">{icons[i]}</span>}{it.title}</b>
                    <span className="products-item__text"><span>{it.text}</span></span>
                  </button>
                  <span className="products-item__track" aria-hidden>
                    {on && (
                      <i
                        key={`${i}-${run}`}
                        className="products-item__bar"
                        style={{ animationDuration: `${durations?.[i] ?? STEP_MS}ms`, animationPlayState: inView ? "running" : "paused" }}
                        onAnimationEnd={() => setIndex((i + 1) % items.length)}
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          </div>

          {/* Visuel de la fonctionnalité active */}
          <div className="products-stage order-1 lg:order-2" aria-hidden>
            {visuals.map((V, i) => (
              <div key={i} className={`products-visual${i === index ? " is-on" : ""}`}>
                <V ui={t.products.ui} />
              </div>
            ))}
            {note && <p className="products-stage__note">{note}</p>}
          </div>
        </div>
        <CtaPair placement="foot" align="center" className="mt-6" />
      </div>
    </section>
  );
}

// Les deux produits partagent une seule section : une bascule affiche l'assistant vocal IA
// ou le tableau de pilotage. Les liens /#assistant-vocal et /#tableau-de-pilotage (navbar,
// pied de page) sélectionnent le bon produit.
const HASH_TO_PRODUCT: Record<string, ProductKey> = { "#assistant-vocal": "assistant", "#tableau-de-pilotage": "dashboard" };
export default function Products() {
  const { t } = useLanguage();
  const p = t.products;
  const [which, setWhich] = useState<ProductKey>("assistant");

  useEffect(() => {
    const fromHash = () => { const k = HASH_TO_PRODUCT[window.location.hash]; if (k) setWhich(k); };
    const onEvent = (e: Event) => { const k = (e as CustomEvent<ProductKey>).detail; if (k) setWhich(k); };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(PRODUCT_EVENT, onEvent);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("hashchange", fromHash); window.removeEventListener(PRODUCT_EVENT, onEvent); };
  }, []);

  const switcher = (
    <>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--sp-500)" }}>{p.section_label}</p>
      <div className="prod-switch" role="tablist" aria-label={`${p.assistant_head.eyebrow} / ${p.dashboard_head.eyebrow}`}>
        {(["assistant", "dashboard"] as const).map(k => (
          <button key={k} type="button" role="tab" aria-selected={which === k} className={which === k ? "is-on" : ""} onClick={() => setWhich(k)}>
            {k === "assistant" ? ICON.sparkles : ICON.bars}
            {k === "assistant" ? p.assistant_head.eyebrow : p.dashboard_head.eyebrow}
          </button>
        ))}
      </div>
    </>
  );

  return which === "assistant" ? (
    <ProductBlock key="assistant" id="assistant-vocal" anchors={["tableau-de-pilotage"]} switcher={switcher} head={p.assistant_head} items={p.assistant} visuals={ASSISTANT_VISUALS} icons={ASSISTANT_ICONS} durations={ASSISTANT_DURATIONS} tone="light" image={{ src: "/products/assistant-soignant.jpg", alt: p.assistant_head.image_alt }} />
  ) : (
    <ProductBlock key="dashboard" id="assistant-vocal" anchors={["tableau-de-pilotage"]} switcher={switcher} head={p.dashboard_head} items={p.dashboard} visuals={DASHBOARD_VISUALS} icons={DASHBOARD_ICONS} durations={[14000, 10000, STEP_MS]} note={p.ui.illustration} tone="light" fillImage image={{ src: "/products/pilotage-idec.jpg", alt: p.dashboard_head.image_alt }} />
  );
}
