"use client";
import { useEffect, useState } from "react";
import "./HeroDocGen.css";
import { useLanguage } from "@/context/LanguageContext";

/*
 * Visuel du hero, posé sur la vidéo de fond (soignante au chevet d'une résidente).
 * Les cotes sont en unités Figma (kakemono Speakli V2) : la composition fait
 * 1982 × 2300 unités et --u vaut 1/1982 de la largeur du conteneur.
 *
 * Séquence calée sur la vidéo : retranscription live pendant qu'elle parle →
 * éléphant Speakli pendant qu'elle relit → 4 éléments de documentation qui
 * apparaissent au moment où elle valide sur son téléphone.
 */

const u = (n: number) => `calc(var(--u) * ${n})`;

// Échelle typographique des cartes (unités Figma)
const T = { title: 44, body: 37, small: 31 };

// Séquence de l'animation, calée sur la vidéo de fond et de même durée qu'elle
// (public/hero/soignante-chevet-v3.mp4, 15,1 s : elle dicte de 0,3 à 8,7 s, relit et
// valide vers 10 s, dit « Voilà, c'est documenté », range son téléphone vers 12 s) :
//   0 → 1 s       on ne voit que la soignante et la résidente (le texte du header, lui,
//                 est affiché dès l'arrivée sur la page)
//   1 s           le téléphone apparaît
//   1,3 → 7,8 s   retranscription live, mot à mot
//   7,8 → 10 s    éléphant Speakli
//   10 s          les 4 cartes apparaissent une à une, toutes les CARD_GAP secondes
//   14,5 → 15,1 s fondu de sortie : l'animation se termine pile avec la vidéo,
//                 puis les deux repartent ensemble.
const VIDEO_DURATION = 15.1;
const INTRO = 1;
const SPEAK_START = 1.3;
const SPEAK_END = 7.8;
const TAP = 10;
const CARD_GAP = 0.75;
const CYCLE = VIDEO_DURATION;
const FADE_OUT = CYCLE - 0.6;

type DocGenState = { t: number; reduced: boolean };

// Horloge de l'animation : le temps réel de la vidéo quand elle joue (l'animation reste
// ainsi calée sur la soignante même si la vidéo met du temps à charger). Si la vidéo ne
// démarre pas (autoplay bloqué), une horloge interne de même durée prend le relais.
function useDocGenClock(videoRef?: React.RefObject<HTMLVideoElement | null>): DocGenState {
  const [state, setState] = useState<DocGenState>({ t: 0, reduced: false });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mounted = performance.now();
    let start = mounted;
    let fallback = false;
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      if (mq.matches) { setState({ t: FADE_OUT - 0.1, reduced: true }); return; }
      const v = videoRef?.current;
      let t = 0;
      if (v && v.ended) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else if (v && !v.paused && v.readyState >= 2) {
        // Vidéo arrivée après coup (connexion lente) : elle rattrape l'animation déjà lancée
        // au lieu de la faire repartir de zéro
        if (fallback) { v.currentTime = ((now - start) / 1000) % CYCLE; fallback = false; }
        t = v.currentTime;
        start = now - t * 1000;
      } else if (fallback || !v || now - mounted > 1500) {
        // Vidéo absente, bloquée ou encore en chargement après 1,5 s : horloge interne
        fallback = true;
        t = ((now - start) / 1000) % CYCLE;
      }
      // ~20 mises à jour par seconde suffisent pour l'affichage mot à mot
      const q = Math.floor(t * 20) / 20;
      if (q !== last) { last = q; setState({ t: q, reduced: false }); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoRef]);
  return state;
}

// Retranscription live : les mots apparaissent pendant qu'elle parle dans la vidéo.
// Tous les mots sont posés dès le départ (masqués), donc le texte complet finit centré
// entre la pastille « Enregistrement en cours » et l'onde.
// Les mots préfixés par « * » sont les éléments repris dans les cartes générées.
function LiveTranscript({ text, progress, active }: { text: string; progress: number; active: boolean }) {
  const words = text.split(" ");
  const count = Math.ceil(progress * words.length);
  return (
    <p className={`dg-transcript${active ? " is-on" : ""}`} style={{ left: u(520), top: u(360), width: u(942), height: u(790), fontSize: u(56) }} aria-hidden>
      <span>
        {words.map((w, i) => {
          const key = w.startsWith("*");
          return (
            <span key={i} className={`dg-word${i < count ? " is-on" : ""}${key ? " is-key" : ""}`}>
              {key ? w.slice(1) : w}{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}

/* ── Icônes ── */
type IconProps = { size: string };
const Check = ({ size, color = "currentColor", width = 3 }: IconProps & { color?: string; width?: number }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const Trash = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10.5 11v5.5M13.5 11v5.5" />
  </svg>
);
const Pause = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <rect x="6.5" y="5" width="3.8" height="14" rx="1.4" /><rect x="13.7" y="5" width="3.8" height="14" rx="1.4" />
  </svg>
);
const Drop = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z" />
  </svg>
);
const Pulse = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12h4l2.5-6 4.5 12 2.5-6H21" />
  </svg>
);
const Target = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>
);
const Sparkle = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="currentColor" aria-hidden>
    <path d="M12 2.5l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2 2-6.5z" />
  </svg>
);
const Fork = ({ size }: IconProps) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 3.5v6a2.5 2.5 0 0 0 5 0v-6M8.5 3.5v17M16.5 20.5V3.5c-2 1-3 3.5-3 7h3" />
  </svg>
);
const Glass = ({ level, selected }: { level: number; selected?: boolean }) => {
  const id = `dg-glass-${Math.round(level * 100)}`;
  return (
    <svg viewBox="0 0 40 44" style={{ width: u(52), height: u(57) }} aria-hidden>
      <defs><clipPath id={id}><path d="M5 4h30l-4 36H9z" /></clipPath></defs>
      <rect x="0" y={44 - 44 * level} width="40" height={44 * level} clipPath={`url(#${id})`} fill={selected ? "#2F6BF0" : "#A9C2F8"} />
      <path d="M5 4h30l-4 36H9z" fill="none" stroke={selected ? "#2F6BF0" : "#9AA3B2"} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
};

/* ── Éléments communs ── */
const IconDisc = ({ size, bg, color, children }: { size: number; bg: string; color: string; children: React.ReactNode }) => (
  <span className="dg-ic" style={{ width: u(size), height: u(size), background: bg, color }}>{children}</span>
);
const CardHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="dg-row" style={{ gap: u(22) }}>
    {icon}
    <b style={{ fontSize: u(T.title), fontWeight: 700, letterSpacing: "-0.01em" }}>{title}</b>
  </div>
);
const Pill = ({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) => (
  <span style={{ fontSize: u(T.small), fontWeight: 700, padding: `${u(7)} ${u(18)}`, borderRadius: u(30), background: bg, color, whiteSpace: "nowrap" }}>{children}</span>
);

/* ── Cartes ── */
function HydrationCard() {
  const { t } = useLanguage();
  const d = t.hero.docgen;
  const segs: [number, string][] = [[20, "#8EAEF6"], [12, "#6C97F4"], [20, "#5A8BF3"], [8, "#4C80F2"], [10, "#22C55E"]];
  const glasses: [number, string][] = [[0.25, "5"], [0.45, "10"], [0.8, "15"], [1, "20"]];
  return (
    <div style={{ padding: u(40) }}>
      <CardHeader icon={<IconDisc size={86} bg="#EEF3FE" color="#2F6BF0"><Drop size={u(44)} /></IconDisc>} title={d.hydration} />
      <div className="dg-row" style={{ alignItems: "baseline", marginTop: u(26) }}>
        <b style={{ fontSize: u(92), fontWeight: 800, color: "#2F6BF0", letterSpacing: "-0.03em", lineHeight: 1 }}>105</b>
        <span style={{ fontSize: u(T.body), color: "#9CA3AF", marginLeft: u(14) }}>/ 150 cL</span>
        <b style={{ fontSize: u(T.body), fontWeight: 800, color: "#2F6BF0", marginLeft: "auto" }}>70%</b>
      </div>
      <div style={{ display: "flex", gap: u(6), height: u(26), marginTop: u(26), borderRadius: u(13), background: "#F1F2F4", overflow: "hidden" }}>
        {segs.map(([w, c], i) => <span key={i} style={{ width: `${w}%`, background: c }} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: u(16), marginTop: u(30) }}>
        {glasses.map(([lvl, label], i) => {
          const sel = i === 2;
          return (
            <div
              key={label}
              style={{
                height: u(150), borderRadius: u(26), display: "grid", justifyItems: "center", alignContent: "center", gap: u(10),
                border: `${u(sel ? 5 : 3)} solid ${sel ? "#3478F6" : "#EEF0F3"}`, background: sel ? "#F3F7FF" : "#fff",
              }}
            >
              <Glass level={lvl} selected={sel} />
              <span style={{ fontSize: u(T.small), fontWeight: 700, color: sel ? "#1F2937" : "#9CA3AF" }}>{label} cL</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransmissionCard() {
  const { t } = useLanguage();
  const d = t.hero.docgen;
  const rows: [string, string][] = [["D", d.data_text], ["A", d.action_text], ["R", d.result_text]];
  return (
    <div style={{ padding: u(40) }}>
      <div className="dg-row" style={{ gap: u(20) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/resident-w4.jpg" alt="" style={{ width: u(86), height: u(86), borderRadius: "50%", objectFit: "cover", flex: "none" }} />
        <div style={{ lineHeight: 1.2 }}>
          <b style={{ display: "block", fontSize: u(T.title), fontWeight: 700 }}>{d.resident}</b>
          <span style={{ fontSize: u(T.small), color: "#6B7280" }}>{d.room}</span>
        </div>
      </div>
      <div
        className="dg-row"
        style={{ gap: u(14), marginTop: u(24), padding: `${u(14)} ${u(20)}`, borderRadius: u(22), background: "#EEF4FF", color: "#1E5FD9" }}
      >
        <Target size={u(40)} />
        <span style={{ fontSize: u(T.body), fontWeight: 700 }}>{d.target}</span>
        <span style={{ fontSize: u(T.small), color: "#5B7DB8", marginLeft: "auto" }}>{d.target_detected}</span>
      </div>
      <div style={{ display: "grid", gap: u(18), marginTop: u(26) }}>
        {rows.map(([k, txt]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: `${u(54)} 1fr`, gap: u(18), alignItems: "start" }}>
            <span className="dg-ic" style={{ width: u(54), height: u(54), background: "#EEF3FE", color: "#2F6BF0", fontSize: u(T.small), fontWeight: 800 }}>{k}</span>
            <p style={{ margin: 0, fontSize: u(T.body), lineHeight: 1.35, color: "#1F2937" }}>{txt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TensionCard() {
  const { t } = useLanguage();
  const d = t.hero.docgen;
  const xs = [50, 190, 330, 470, 610];
  const top = [170, 170, 170, 140, 222];
  const bottomY = 286;
  const red = "#D9534F", green = "#3DAA5C";
  const bubble = (x: number, y: number, v: string, c: string, w = 100) => (
    <g key={`${x}-${y}`}>
      <rect x={x - w / 2} y={y - 28} width={w} height={56} rx={28} fill="#fff" stroke={c} strokeWidth={3.5} />
      <text x={x} y={y + 11} textAnchor="middle" fontSize={33} fontWeight={700} fill="#111827">{v}</text>
    </g>
  );
  return (
    <div style={{ padding: u(40) }}>
      <CardHeader icon={<IconDisc size={86} bg="#FDECEC" color={red}><Pulse size={u(44)} /></IconDisc>} title={d.bp} />
      <svg viewBox="0 0 660 420" style={{ width: "100%", display: "block", marginTop: u(16) }} aria-hidden>
        <defs>
          <linearGradient id="dg-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={red} stopOpacity=".2" /><stop offset="1" stopColor={red} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M50 170 L330 170 C 400 170 420 140 470 140 C 540 140 565 222 610 222 L610 ${bottomY} L50 ${bottomY} Z`} fill="url(#dg-area)" />
        <path d="M50 170 L330 170 C 400 170 420 140 470 140 C 540 140 565 222 610 222" fill="none" stroke={red} strokeWidth={5} />
        <path d={`M50 ${bottomY} L610 ${bottomY}`} fill="none" stroke={red} strokeWidth={5} />
        {xs.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={top[i]} r={13} fill="#fff" stroke={i === 4 ? green : red} strokeWidth={5} />
            <circle cx={x} cy={bottomY} r={13} fill="#fff" stroke={i === 4 ? green : red} strokeWidth={5} />
          </g>
        ))}
        {bubble(50, 112, "125", red)}{bubble(190, 112, "125", red)}{bubble(330, 112, "125", red)}
        {bubble(470, 82, "126", red)}{bubble(600, 164, "123", green)}{bubble(604, 346, "80", green, 84)}
        {["16/10", "18/10", "20/10", "22/10"].map((l, i) => (
          <text key={l} x={xs[i]} y={410} textAnchor="middle" fontSize={30} fill="#6B7280">{l}</text>
        ))}
      </svg>
    </div>
  );
}

function CareCard() {
  const { t } = useLanguage();
  const d = t.hero.docgen;
  const row: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: u(16), background: "#fff", borderRadius: u(22),
    border: `${u(2)} solid #ECEEF1`, padding: `${u(14)} ${u(18)}`,
  };
  const section = (bg: string, border: string): React.CSSProperties => ({
    background: bg, border: `${u(3)} solid ${border}`, borderRadius: u(28), padding: u(20), display: "grid", gap: u(14), marginTop: u(24),
  });
  const label: React.CSSProperties = { fontSize: u(T.body), flex: 1, minWidth: 0 };
  return (
    <div style={{ padding: u(40) }}>
      <b style={{ fontSize: u(T.title), fontWeight: 800, letterSpacing: "-0.01em" }}>{d.completed}</b>
      <div style={{ height: u(16), borderRadius: u(8), background: "#22C55E", marginTop: u(20) }} />
      <div style={section("#F6F4FF", "#D9D1FB")}>
        <div className="dg-row" style={{ gap: u(12), fontSize: u(T.small), fontWeight: 700, color: "#5B3FD6" }}>
          <Sparkle size={u(34)} />{d.punctual}
        </div>
        <div style={row}>
          <IconDisc size={62} bg="#EFEBFE" color="#7C5CF0"><Drop size={u(32)} /></IconDisc>
          <span style={label}>{d.glycemia}</span>
          <Pill bg="#EFEBFE" color="#5B3FD6">1,05 g/L</Pill>
        </div>
      </div>
      <div style={section("#F2FBF4", "#C5EBCD")}>
        <div className="dg-row" style={{ gap: u(12), fontSize: u(T.small), fontWeight: 700, color: "#2F9E4F" }}>
          <Check size={u(34)} />{d.signed}
        </div>
        <div style={row}>
          <IconDisc size={62} bg="#FDECEC" color="#D9534F"><Pulse size={u(32)} /></IconDisc>
          <span style={label}>{d.bp_short}</span><Pill bg="#E3F5E7" color="#2F9E4F">{d.done}</Pill>
        </div>
        <div style={row}>
          <IconDisc size={62} bg="#EAF1FE" color="#2F6BF0"><Drop size={u(32)} /></IconDisc>
          <span style={label}>{d.hydration}</span><Pill bg="#E3F5E7" color="#2F9E4F">{d.done}</Pill>
        </div>
        <div style={row}>
          <IconDisc size={62} bg="#EAF7EE" color="#2F9E4F"><Fork size={u(32)} /></IconDisc>
          <span style={label}>{d.breakfast}</span><Pill bg="#E3F5E7" color="#2F9E4F">{d.done}</Pill>
        </div>
      </div>
    </div>
  );
}

/* ── Composition ── */
const CARD_W = 760;
type Card = { key: string; Comp: () => React.JSX.Element; tag: "tag_reading" | "tag_transmission" | "tag_care"; from: [number, number] };
const LEFT: Card[] = [
  { key: "hydration", Comp: HydrationCard, tag: "tag_reading", from: [160, 140] },
  { key: "tension", Comp: TensionCard, tag: "tag_reading", from: [160, -140] },
];
const RIGHT: Card[] = [
  { key: "transmission", Comp: TransmissionCard, tag: "tag_transmission", from: [-160, 160] },
  { key: "care", Comp: CareCard, tag: "tag_care", from: [-160, -160] },
];
// Ordre d'apparition : transmission, hydratation, tension, soins
const ORDER: Record<string, number> = { transmission: 0, hydration: 1, tension: 2, care: 3 };

export default function HeroDocGen({ videoRef }: { videoRef?: React.RefObject<HTMLVideoElement | null> }) {
  const { t } = useLanguage();
  const d = t.hero.docgen;
  const { t: time, reduced } = useDocGenClock(videoRef);
  const voice = !reduced && time < SPEAK_END;
  const transcriptOn = !reduced && time < TAP;
  const elephant = reduced || (time >= SPEAK_END && time < FADE_OUT);
  const visible = reduced ? 4 : time >= FADE_OUT ? 0 : time >= TAP ? Math.min(4, Math.floor((time - TAP) / CARD_GAP + 1e-6) + 1) : 0;
  const progress = Math.max(0, Math.min(1, (time - SPEAK_START) / (SPEAK_END - SPEAK_START)));

  const stack = (cards: Card[], side: "left" | "right", top: number) => (
    <div className="dg-stack" style={{ [side]: 0, top: u(top), width: u(CARD_W), gap: u(120) }}>
      {cards.map(c => {
        const on = ORDER[c.key] < visible;
        return (
          <div key={c.key} style={{ position: "relative" }}>
            <div
              className={`dg-tag${on ? " is-on" : ""}`}
              style={{ left: u(34), top: u(-74), height: u(96), borderRadius: u(48), padding: `0 ${u(36)} 0 ${u(14)}`, gap: u(18) }}
            >
              <span className="dg-tag__check" style={{ width: u(66), height: u(66) }}><Check size={u(36)} color="#fff" width={3.2} /></span>
              <span style={{ fontSize: u(T.body) }}>{d[c.tag]}</span>
            </div>
            <div
              className={`dg-card${on ? " is-on" : ""}`}
              style={{ borderRadius: u(44), ["--fx" as string]: u(c.from[0]), ["--fy" as string]: u(c.from[1]) } as React.CSSProperties}
            >
              <c.Comp />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`dg${reduced || (time >= INTRO && time < FADE_OUT) ? " is-on" : ""}`} role="img" aria-label={d.aria}>
      {/* Panneau vocal (verre dépoli posé sur la vidéo) */}
      <div className="dg-phone" style={{ left: u(376), top: 0, width: u(1230), height: u(2300), borderRadius: u(170), padding: u(26) }}>
        <div className="dg-screen" style={{ borderRadius: u(146) }}>
          {/* Barre d'état + Dynamic Island */}
          <div className="dg-status" style={{ top: u(52), left: u(110), right: u(110), fontSize: u(44) }}>
            <b>9:41</b>
            <span className="dg-status__icons" style={{ gap: u(14) }}>
              <svg viewBox="0 0 18 12" style={{ width: u(52), height: u(36) }} fill="#fff" aria-hidden>
                <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 27 13" style={{ width: u(78), height: u(38) }} fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#fff" strokeOpacity=".5" /><rect x="2" y="2" width="18" height="9" rx="2" fill="#fff" /><rect x="25" y="4.5" width="1.6" height="4" rx=".8" fill="#fff" fillOpacity=".5" />
              </svg>
            </span>
          </div>
          <div className="dg-island" style={{ top: u(34), width: u(330), height: u(96), borderRadius: u(48) }} />

          {/* Visible pendant l'enregistrement uniquement, masquée dès que la documentation se génère */}
          <div className={`dg-pill${transcriptOn ? "" : " is-off"}`} style={{ top: u(190), height: u(147), padding: `0 ${u(61)}`, borderRadius: u(28), fontSize: u(46) }}>
            {d.recording}
          </div>

          {/* Commandes d'enregistrement */}
          <div className="dg-buttons" style={{ left: u(149), top: u(1900), width: u(881), height: u(245) }}>
            <span className="dg-btn dg-btn--ghost" style={{ width: u(196), height: u(196), top: u(24) }}><Trash size={u(86)} /></span>
            <span className={`dg-btn dg-btn--ok${visible > 0 ? " is-pressed" : ""}`} style={{ width: u(245), height: u(245), left: u(318) }}><Check size={u(122)} width={2.6} /></span>
            <span className="dg-btn dg-btn--white" style={{ width: u(196), height: u(196), left: u(685), top: u(24) }}><Pause size={u(88)} /></span>
          </div>
          <div className="dg-home" style={{ bottom: u(26), width: u(400), height: u(14), borderRadius: u(7) }} />
        </div>
      </div>

      {/* Halo autour du centre */}
      <div className="dg-halo" style={{ left: u(647), top: u(1047), width: u(629), height: u(481) }} />

      {/* Retranscription live au-dessus de l'onde */}
      <LiveTranscript text={d.transcript} progress={progress} active={transcriptOn} />

      {/* Onde vocale, puis éléphant Speakli */}
      <div className={`dg-wave${voice ? " is-on" : ""}`} style={{ left: u(782), top: u(1161), width: u(420), height: u(254), gap: u(16) }} aria-hidden>
        {Array.from({ length: 13 }, (_, i) => (
          <i key={i} style={{ width: u(16), borderRadius: u(8), animationDelay: `${-(i * 0.17) % 1.1}s` }} />
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero/elephant-white.svg" alt="" className={`dg-elephant${elephant ? " is-on" : ""}`} style={{ left: u(782), top: u(1161), width: u(420) }} />
      {visible > 0 && !reduced && (
        <span key={`emit-${visible}`} className="dg-emit" style={{ left: u(672), top: u(1048), width: u(640), height: u(480) }} aria-hidden />
      )}

      {/* 4 éléments de documentation */}
      {stack(LEFT, "left", 560)}
      {stack(RIGHT, "right", 330)}
    </div>
  );
}
