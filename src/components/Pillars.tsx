"use client";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── Tab icons ─────────────────────────────────────────────── */
const TAB_ICONS: Record<string, ReactNode> = {
  voice: (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dashboard: (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  security: (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  interop: (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const TAB_IDS = ["voice", "dashboard", "security", "interop"] as const;

const CONTENT_STATIC = [
  { id: "voice",     accent: "#007AFF",  titleClass: "text-xl sm:text-2xl lg:text-3xl", image: "/pillars/pillar-voice-v3.png",      imageAlt: "Soignante utilisant l'assistant vocal Speakli" },
  { id: "dashboard", accent: "#34d399",  titleClass: "text-xl sm:text-2xl lg:text-3xl", image: "/pillars/pillar-dashboard-v2.png",  imageAlt: "Tableau de bord Speakli" },
  { id: "security",  accent: "#a78bfa",  titleClass: "text-xl sm:text-2xl lg:text-3xl", image: "/pillars/pillar-security.png",      imageAlt: "Sécurité Speakli" },
  { id: "interop",   accent: "#fb923c",  titleClass: "text-xl sm:text-2xl lg:text-3xl", image: "/pillars/pillar-interop-v2.png",    imageAlt: "Interopérabilité Speakli" },
];

/* ─── Waveform bar configs (random-feel heights + durations) ── */
const BAR_CONFIGS: { h: number[]; dur: number; delay: number }[] = [
  { h: [4, 16,  6, 20,  4], dur: 2.1, delay: 0.00 },
  { h: [6, 10, 22,  5, 14], dur: 1.85, delay: 0.38 },
  { h: [4, 24,  8, 18,  4], dur: 2.65, delay: 0.18 },
  { h: [8, 14,  4, 22,  6], dur: 1.95, delay: 0.52 },
  { h: [4, 18, 10,  8, 20], dur: 2.40, delay: 0.10 },
  { h: [12, 4, 20, 10,  4], dur: 2.05, delay: 0.44 },
  { h: [4, 22,  6, 16,  4], dur: 2.80, delay: 0.27 },
  { h: [6, 12, 24,  4, 18], dur: 1.70, delay: 0.58 },
  { h: [4,  8, 18, 22,  4], dur: 2.55, delay: 0.14 },
  { h: [14, 4, 12,  6, 24], dur: 2.20, delay: 0.46 },
];

function WaveBar({ cfg }: { cfg: typeof BAR_CONFIGS[0] }) {
  return (
    <motion.div
      className="rounded-full"
      style={{ width: 3, height: cfg.h[0], background: "rgba(255,255,255,0.9)" }}
      animate={{ height: cfg.h }}
      transition={{ duration: cfg.dur, repeat: Infinity, delay: cfg.delay, ease: "easeInOut" }}
    />
  );
}

/* ─── Phone UI overlay ─────────────────────────────────────── */
function PhoneUI({ recording, validate, inView }: { recording: string; validate: string; inView: boolean }) {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="absolute top-6 right-6 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: 196,
        background: "linear-gradient(145deg, #0d1f3c 0%, #0f2d5a 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <Image src="/logo-speakli-icon.svg" alt="" width={18} height={13} className="opacity-90" />
          <span className="text-white text-xs font-bold">Speakli</span>
        </div>
        <div className="text-right">
          <div className="text-white text-[10px] font-semibold leading-none">Jean Noël</div>
          <div className="text-blue-300 text-[9px] leading-none mt-0.5">Ch. 23</div>
        </div>
      </div>

      {/* Recording bar */}
      <div
        className="mx-3 mb-3 rounded-xl px-3 py-3"
        style={{ background: "rgba(0,122,255,0.18)", border: "1px solid rgba(0,122,255,0.30)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-white text-[10px] font-medium">{recording}</span>
          </div>
          <span className="text-blue-300 text-[10px] font-mono tabular-nums">{fmt(secs)}</span>
        </div>
        {/* Waveform */}
        <div className="flex items-end gap-[3px] h-6">
          {BAR_CONFIGS.map((cfg, i) => (
            <WaveBar key={i} cfg={cfg} />
          ))}
        </div>
      </div>

      {/* Valider button */}
      <div className="flex justify-center pb-4">
        <button
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[11px] font-semibold"
          style={{
            background: "rgba(52,211,153,0.20)",
            color: "#34d399",
            border: "1px solid rgba(52,211,153,0.40)",
          }}
        >
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {validate}
        </button>
      </div>
    </motion.div>
  );
}

/* ─── DAR cards ────────────────────────────────────────────── */
const DAR_ICONS = [
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="#007AFF" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#007AFF",
  },
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="#34d399" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#34d399",
  },
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="#a78bfa" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#a78bfa",
  },
];

type DARItem = typeof DAR_ICONS[0] & { label: string; text: string };

function DARCard({ item, delay, inView }: { item: DARItem; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="rounded-xl px-3 py-2.5 flex items-start gap-2.5 shadow-xl"
      style={{
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(0,0,0,0.07)",
        width: 252,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${item.color}18` }}
      >
        {item.icon}
      </div>
      <div className="min-w-0">
        <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: item.color }}>
          {item.label}
        </div>
        <div className="text-[11px] leading-snug text-gray-600 line-clamp-2">
          {item.text}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── DUI flow overlay ─────────────────────────────────────── */
const FLOW_STEP_ICONS = [
  {
    color: "#007AFF",
    Icon: () => (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#fb923c",
    Icon: () => (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#a78bfa",
    Icon: () => (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#a78bfa",
    Icon: () => (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function DUIConnectionCard() {
  const { t } = useLanguage();
  const flowSteps = FLOW_STEP_ICONS.map((icon, i) => ({ ...icon, ...t.pillars.flow[i] }));

  const [phase, setPhase] = useState(-1);
  const [slidingStarted, setSlidingStarted] = useState(false);
  const [validationSlid, setValidationSlid] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const advance = (p: number) => {
      if (cancelled) return;
      setPhase(p);
      if (p === 2) {
        // 2 s violet normal → slide (1.2 s) → vert → 2 s lapse → DUI
        setTimeout(() => { if (!cancelled) setSlidingStarted(true); }, 2000);
        setTimeout(() => { if (!cancelled) setValidationSlid(true); }, 3200);
        setTimeout(() => advance(3), 5200);
      } else if (p < flowSteps.length) {
        setTimeout(() => advance(p + 1), 2000);
      } else {
        setTimeout(() => {
          if (!cancelled) {
            setPhase(-1);
            setSlidingStarted(false);
            setValidationSlid(false);
            setTimeout(() => { if (!cancelled) advance(0); }, 800);
          }
        }, 3500);
      }
    };
    setTimeout(() => advance(0), 500);
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="absolute top-5 right-5 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: 232,
        background: "linear-gradient(145deg, #0d1f3c 0%, #0f2d5a 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,146,60,0.2)", border: "1px solid rgba(251,146,60,0.35)" }}>
            <svg width="11" height="11" fill="none" stroke="#fb923c" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white text-xs font-bold">DUI Métier</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.3)" }}>
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#fb923c" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span className="text-[9px] font-semibold" style={{ color: "#fb923c" }}>Live</span>
        </div>
      </div>

      {/* Flow steps */}
      <div className="px-3 pb-4">
        {flowSteps.map((step, i) => {
          // Step 3 skips "active" — appears directly green when phase reaches it
          const isValidating = i === 2 && phase === 2 && slidingStarted && !validationSlid;
          const isDone = i === 3 ? phase >= 3 : (phase > i || (i === 2 && validationSlid));
          const isActive = !isDone && phase === i && i !== 3 && !isValidating;
          const StepIcon = step.Icon;

          return (
            <div key={step.label}>
              {/* ── Validation step: slide track replaces normal row ── */}
              {isValidating ? (
                <div className="py-1.5">
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{ height: 26, background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.22)" }}
                  >
                    {/* Fill sweeping right */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "rgba(167,139,250,0.20)" }}
                      animate={{ width: ["26px", "100%"] }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                    />
                    {/* Sliding handle with checkmark */}
                    <motion.div
                      className="absolute top-[3px] left-[3px] w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(167,139,250,0.45)", border: "1px solid rgba(167,139,250,0.70)", color: "#a78bfa", zIndex: 1 }}
                      animate={{ x: [0, 185] }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <svg width="9" height="9" fill="none" stroke="#a78bfa" strokeWidth="2.4" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    {/* Label centered */}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[8px] font-bold tracking-wide pointer-events-none"
                      style={{ color: "rgba(167,139,250,0.50)" }}
                    >
                      {t.pillars.flow[2].label}
                    </span>
                  </div>
                </div>
              ) : (
                /* ── Normal row ── */
                <div className="flex items-center gap-2.5 py-1.5">
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDone ? "rgba(52,211,153,0.18)" : isActive ? `${step.color}22` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isDone ? "rgba(52,211,153,0.45)" : isActive ? `${step.color}60` : "rgba(255,255,255,0.10)"}`,
                      color: isDone ? "#34d399" : isActive ? step.color : "rgba(255,255,255,0.22)",
                    }}
                    animate={isActive ? { scale: [1, 1.13, 1] } : { scale: 1 }}
                    transition={{ duration: 0.9, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <StepIcon />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold leading-tight" style={{ color: isDone ? "rgba(255,255,255,0.75)" : isActive ? "#ffffff" : "rgba(255,255,255,0.28)" }}>
                      {step.label}
                    </div>
                    <div className="text-[9px] leading-snug mt-0.5" style={{ color: isDone ? "rgba(255,255,255,0.35)" : isActive ? `${step.color}dd` : "rgba(255,255,255,0.18)" }}>
                      {step.sublabel}
                    </div>
                  </div>

                </div>
              )}

              {/* Connector */}
              {i < flowSteps.length - 1 && (
                <div
                  className="ml-[11px] w-[2px] h-3 rounded-full"
                  style={{ background: isDone ? "rgba(52,211,153,0.28)" : "rgba(255,255,255,0.07)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Interop right panel ──────────────────────────────────── */
function InteropPanel() {
  return (
    <div className="relative w-full h-full" style={{ minHeight: 300 }}>
      <Image
        src="/pillars/pillar-interop-photo.png"
        alt="Soignante utilisant la tablette Speakli connectée au DUI"
        fill
        className="object-cover"
        style={{ objectPosition: "28% center" }}
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
      />
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0b1c38, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(11,28,56,0.55), transparent)" }}
      />


<div className="hidden sm:block">
        <DUIConnectionCard />
      </div>
    </div>
  );
}

/* ─── Voice right panel ────────────────────────────────────── */
function VoicePanel({ recording, validate }: { recording: string; validate: string }) {
  const { t } = useLanguage();
  const darItems: DARItem[] = DAR_ICONS.map((icon, i) => ({ ...icon, ...t.pillars.dar[i] }));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative w-full h-full" style={{ minHeight: 300 }}>
      <Image
        src="/pillars/pillar-voice-v3.png"
        alt="Soignante utilisant l'assistant vocal Speakli"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
      />
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0b1c38, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(11,28,56,0.55), transparent)" }}
      />
      <div className="hidden sm:block">
        <PhoneUI recording={recording} validate={validate} inView={inView} />
      </div>
      <div className="hidden sm:flex absolute bottom-5 right-5 flex-col gap-2">
        {darItems.map((item, i) => (
          <DARCard key={item.label} item={item} delay={0.8 + i * 1.5} inView={inView} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────── */
export default function Pillars() {
  const { t } = useLanguage();
  const p = t.pillars;

  const TABS = TAB_IDS.map((id, i) => ({ id, label: p.tabs[i] }));
  const CONTENT = CONTENT_STATIC.map((s, i) => ({
    ...s,
    titleLines: p.panels[i].titleLines,
    subtitle: p.panels[i].subtitle,
    bullets: p.panels[i].bullets,
  }));

  const [activeId, setActiveId] = useState("voice");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = CONTENT.find((c) => c.id === activeId)!;

  useEffect(() => {
    const pending = sessionStorage.getItem("speakli:pending-tab");
    if (pending && TAB_IDS.includes(pending as typeof TAB_IDS[number])) {
      sessionStorage.removeItem("speakli:pending-tab");
      setActiveId(pending as typeof TAB_IDS[number]);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const tabId = (e as CustomEvent<string>).detail;
      if (TAB_IDS.includes(tabId as typeof TAB_IDS[number])) setActiveId(tabId);
    };
    window.addEventListener("speakli:pillar-tab", handler);
    return () => window.removeEventListener("speakli:pillar-tab", handler);
  }, []);

  return (
    <section id="solutions" className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            {p.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "#ffffff" }}>
            {p.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{p.h2_accent}</span>
          </h2>
          <p className="text-lg font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
            {p.subtitle}
          </p>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex justify-center mb-8 px-1 -mx-1">
          <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1.5 rounded-2xl w-full sm:w-auto" style={{ background: "rgba(255,255,255,0.18)" }}>
            {TABS.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  onMouseEnter={() => setHoveredId(tab.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-150"
                  style={{
                    color: isActive ? "#fff" : hoveredId === tab.id ? "#ffffff" : "rgba(255,255,255,0.65)",
                    background: !isActive && hoveredId === tab.id ? "rgba(255,255,255,0.12)" : "transparent",
                    isolation: "isolate",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)", zIndex: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative" style={{ zIndex: 1, color: isActive ? "#1a3388" : "inherit" }}>
                    {TAB_ICONS[tab.id]}
                  </span>
                  <span className="relative" style={{ zIndex: 1, color: isActive ? "#1a3388" : "inherit" }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 24px 80px rgba(0,0,0,0.40), 0 4px 16px rgba(0,0,0,0.20)",
              border: "1px solid rgba(255,255,255,0.12)",
              background: activeId === "security" ? "linear-gradient(145deg, #12336b 0%, #1a448a 60%, #1e4fa3 100%)" : undefined,
            }}
          >
            <div className="flex flex-col lg:flex-row" style={{ minHeight: "clamp(400px, 60vw, 520px)" }}>

              {/* ── Left: dark text panel ── */}
              <div
                className="flex flex-col justify-center flex-shrink-0 p-6 sm:p-10 lg:p-14 w-full lg:w-[42%]"
                style={{
                  background: activeId === "security" ? "transparent" : "linear-gradient(145deg, #12336b 0%, #1a448a 60%, #1e4fa3 100%)",
                }}
              >
                <div className="lg:max-w-[400px]">
                  {/* Accent label */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: active.accent }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: active.accent }}>
                      {TABS.find((t) => t.id === activeId)?.label}
                    </span>
                  </div>

                  {/* Title — forced 2 lines */}
                  <h3 className={`${active.titleClass} font-extrabold leading-tight mb-4`} style={{ color: "#ffffff" }}>
                    {active.titleLines[0]}
                    <br />
                    {active.titleLines[1]}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.50)", maxWidth: "38ch" }}>
                    {active.subtitle}
                  </p>

                  {/* Bullets — staggered */}
                  <ul className="flex flex-col gap-3">
                    {active.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.32, delay: 0.10 + i * 0.07, ease: "easeOut" }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${active.accent}22`, border: `1px solid ${active.accent}55` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke={active.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium text-left" style={{ color: "rgba(255,255,255,0.75)" }}>
                          {b}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.38, ease: "easeOut" }}
                    className="mt-8"
                  >
                    <a
                      href="https://calendly.com/ruben-speakli/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: active.accent,
                        color: '#ffffff',
                        boxShadow: `0 4px 18px ${active.accent}55`,
                      }}
                    >
                      Réserver une démo
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* ── Right: image panel ── */}
              <div
                className="relative flex-1"
                style={{
                  minHeight: 300,
                }}
              >
                {activeId === "voice" ? (
                  <VoicePanel recording={p.phone_recording} validate={p.phone_validate} />
                ) : activeId === "interop" ? (
                  <InteropPanel />
                ) : (
                  <>
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      className={activeId === "security" ? "object-contain p-8" : "object-cover"}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                    />
                    {activeId !== "security" && (
                      <div
                        className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #0b1c38, transparent)" }}
                      />
                    )}
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
