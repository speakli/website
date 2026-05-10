"use client";
import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import ShinyText from "./ShinyText";
import { useLanguage } from "@/context/LanguageContext";

function BadgeSpinner() {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const r = h / 2 - 1;
  const perimeter = w > 0 ? 2 * (w - h) + 2 * Math.PI * (h / 2 - 1) : 0;
  const segLen = 48;

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden>
      {w > 0 && (
        <svg width={w} height={h} style={{ overflow: "visible" }}>
          <rect
            x={1} y={1}
            width={w - 2} height={h - 2}
            rx={r}
            fill="none"
            stroke="#007AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${segLen} ${perimeter - segLen}`}
            style={{
              animation: "badgeSpin 4s linear infinite",
              ["--p" as string]: `${-perimeter}`,
            } as React.CSSProperties}
          />
        </svg>
      )}
    </div>
  );
}

const DEMO_URL = "https://calendly.com/ruben-speakli/30min";

const PHASE_DURATIONS = [900, 680, 680, 680, 520, 1800, 2200, 3400];

function prand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: `${6 + i * 5.2}%`,
  dx: `${((prand(i * 7) - 0.5) * 52).toFixed(1)}px`,
  dy: `${(-(30 + prand(i * 3) * 60)).toFixed(1)}px`,
  dr: `${((prand(i * 11) - 0.5) * 400).toFixed(0)}deg`,
  color: ["#007AFF", "#34D399", "#FBBF24", "#F472B6", "#60A5FA", "#A78BFA"][i % 6],
  dur: (0.45 + prand(i * 5) * 0.35).toFixed(2),
  delay: (prand(i * 13) * 0.28).toFixed(2),
  size: Math.round(4 + prand(i * 17) * 3),
}));

// All rings start near the phone centre and expand outward — true "vocal capture" wave effect
const RING_BASES = [0.15, 0.15, 0.15, 0.15, 0.15, 0.15];
const RING_COLORS = ["#007AFF", "#1a8fff", "#3399ff", "#4da3ff", "#6bb3ff", "#93C5FD"];
const RING_PEAK_OPACITY = [0.90, 0.88, 0.86, 0.84, 0.82, 0.80];
const RING_CYCLE = 3.8;

function SonarRings() {
  return (
    <div
      className="hidden sm:block"
      style={{
        position: "absolute",
        width: 520,
        height: 520,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {RING_BASES.map((base, i) => (
        <div
          key={i}
          style={
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 520,
              height: 520,
              borderRadius: "50%",
              border: `${i % 2 === 0 ? 2.5 : 2.0}px solid ${RING_COLORS[i]}`,
              boxShadow: `0 0 8px ${RING_COLORS[i]}`,
              opacity: 0,
              "--start-scale": base,
              "--end-scale": 0.95,
              "--peak-opacity": RING_PEAK_OPACITY[i],
              animationName: "sonarPulse",
              animationDuration: `${RING_CYCLE}s`,
              animationTimingFunction: "ease-out",
              animationDelay: `${(i * RING_CYCLE) / RING_BASES.length}s`,
              animationIterationCount: "infinite",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function AppMockup() {
  const { t } = useLanguage();
  const h = t.hero;
  const [phase, setPhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [waveH, setWaveH] = useState([4, 8, 5, 10, 6, 9, 4, 7]);
  const [syncTime, setSyncTime] = useState("");

  // Slider state
  const [sliderProgress, setSliderProgress] = useState(0); // 0–1 (source of truth for done/reset)
  const [sliderTransition, setSliderTransition] = useState(false);
  const [thumbDragX, setThumbDragX] = useState<number | null>(null);
  const [manualSync, setManualSync] = useState(false);
  const sliderDraggingRef = useRef(false);
  const sliderStartXRef   = useRef(0);
  const sliderStartPRef   = useRef(0);
  const sliderTrackRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === 7) {
      const now = new Date();
      setSyncTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    }
    const t = setTimeout(
      () => setPhase(p => (p + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase],
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => (e + 1) % 180), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setWaveH(h => h.map(v => Math.max(2.5, Math.min(13.5, v + (Math.random() - 0.5) * 4.5))));
    }, 150);
    return () => clearInterval(t);
  }, []);

  // Auto-animate slider at phase 6, reset at phase 0
  useEffect(() => {
    if (phase === 6) {
      setThumbDragX(null);
      setSliderTransition(true);           // thumb part en animation
      const t = setTimeout(() => setSliderProgress(1), 1900); // thumb fade après animation
      return () => clearTimeout(t);
    } else if (phase === 0) {
      setSliderTransition(false);
      setSliderProgress(0);
      setThumbDragX(null);
      setManualSync(false);
    }
  }, [phase]);

  const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");
  const showSync    = phase >= 7 || manualSync;
  const sliderDone  = sliderProgress >= 1;
  const sliderVisible = phase >= 5;

  // Thumb position & transition — mirrors SwipeSyncBadge
  const thumbLeft = thumbDragX !== null
    ? thumbDragX
    : sliderTransition ? "calc(100% - 34px)" : 4;
  const thumbTransition = thumbDragX !== null
    ? "opacity 0.25s"
    : sliderTransition
      ? "left 1.85s cubic-bezier(0.25, 0, 0.15, 1), opacity 0.25s"
      : "opacity 0.25s";

  // Slider pointer handlers — same logic as SwipeSyncBadge in Features
  const onSliderDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sliderDone) return;
    sliderDraggingRef.current = true;
    sliderStartXRef.current   = e.clientX;
    sliderStartPRef.current   = thumbDragX ?? 4;
    setSliderTransition(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onSliderMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderDraggingRef.current || !sliderTrackRef.current) return;
    const maxLeft = sliderTrackRef.current.offsetWidth - 34;
    const newLeft = Math.max(4, Math.min(maxLeft, sliderStartPRef.current + (e.clientX - sliderStartXRef.current)));
    setThumbDragX(newLeft);
    if (newLeft >= maxLeft * 0.85) {
      sliderDraggingRef.current = false;
      setThumbDragX(null);
      setSliderTransition(true);
      setSliderProgress(1);
      setTimeout(() => setManualSync(true), 380);
    }
  };

  const onSliderUp = () => {
    if (!sliderDraggingRef.current) return;
    sliderDraggingRef.current = false;
    setThumbDragX(null); // snap back to left
  };

  const sections = h.phone_sections;
  const constantes = h.phone_constantes;

  const fadeStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transition: "opacity 0.45s ease",
  });

  return (
    <div
      style={{
        width: "min(292px, 88vw)",
        borderRadius: 28,
        background: "#ffffff",
        boxShadow: "0 20px 60px rgba(0,40,120,0.10), 0 4px 12px rgba(0,0,0,0.06)",
        border: "1.5px solid rgba(0,40,120,0.08)",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: "16px 18px 12px",
          borderBottom: "1px solid rgba(0,40,120,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <img
            src="/logo-speakli-navbar.svg"
            alt="Speakli"
            style={{ height: 22, width: "auto", flexShrink: 0 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/photos/resident-h11.jpg"
            alt="Jean Noël"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid rgba(0,40,120,0.10)",
              flexShrink: 0,
            }}
          />
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--sp-900)", fontSize: 11, fontWeight: 600 }}>Jean Noël</div>
            <div style={{ color: "#64748b", fontSize: 10 }}>Ch. 23</div>
          </div>
        </div>
      </div>

      {/* Recording indicator */}
      <div
        style={{
          padding: "9px 18px",
          background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="animate-pulse"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#007AFF",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span style={{ color: "#ffffff", fontSize: 11, fontWeight: 600 }}>
          {h.phone_dictee} · {mins}:{secs}
        </span>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginLeft: "auto", height: 21, overflow: "hidden" }}>
          {waveH.map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: Math.round(h) * 1.5,
                background: "#007AFF",
                borderRadius: 2,
                transition: "height 0.12s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Sliding body — Screen 1 (content) ↔ Screen 2 (DUI sync) */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            width: "200%",
            transform: showSync ? "translateX(-50%)" : "translateX(0)",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* ── Screen 1 : recording content ── */}
          <div style={{ width: "50%" }}>
            {/* Transmission sections */}
            <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
              {sections.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    background: "var(--sp-50)",
                    borderRadius: 10,
                    padding: "7px 10px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    ...fadeStyle(phase >= i + 1),
                  }}
                >
                  <svg width="12" height="12" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <div style={{ color: "rgba(0,40,120,0.45)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ color: "var(--sp-900)", fontSize: 11 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constantes vitales */}
            <div style={{ padding: "0 14px 6px" }}>
              <div style={{ background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.15)", borderRadius: 12, padding: "8px 12px", ...fadeStyle(phase >= 4) }}>
                <div style={{ color: "rgba(0,40,120,0.5)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  {h.phone_vitals}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {constantes.map(({ label, value }, i) => (
                    <div key={label} style={{ textAlign: "center", opacity: phase >= i + 4 ? 1 : 0, transition: "opacity 0.4s ease" }}>
                      <div style={{ color: "var(--sp-900)", fontWeight: 800, fontSize: 14 }}>{value}</div>
                      <div style={{ color: "#64748b", fontSize: 9, marginTop: 1 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Slider : même logique que SwipeSyncBadge (Features) ── */}
            <div style={{ padding: "6px 14px 12px", opacity: sliderVisible ? 1 : 0, transition: "opacity 0.45s ease" }}>
              <div
                ref={sliderTrackRef}
                onPointerDown={onSliderDown}
                onPointerMove={onSliderMove}
                onPointerUp={onSliderUp}
                onPointerCancel={onSliderUp}
                style={{
                  position: "relative",
                  height: 38,
                  borderRadius: 12,
                  background: "rgba(0,122,255,0.06)",
                  border: "1px solid rgba(0,122,255,0.14)",
                  overflow: "hidden",
                  cursor: sliderDone ? "default" : "grab",
                  userSelect: "none",
                  touchAction: "none",
                }}
              >
                {/* Label centré */}
                <span style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  paddingLeft: sliderDone ? 0 : 40,
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: sliderDone ? "#16a34a" : "rgba(0,40,120,0.38)",
                  transition: "color 0.35s, padding-left 0.3s",
                  pointerEvents: "none",
                }}>
                  {sliderDone ? h.phone_confirmed : h.phone_slide}
                </span>

                {/* Shimmer qui accompagne le thumb */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0,
                  width: "35%",
                  left: sliderTransition ? "110%" : "-35%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(0,122,255,0.10) 50%, transparent 100%)",
                  transition: "left 1.85s cubic-bezier(0.25, 0, 0.15, 1)",
                  pointerEvents: "none",
                }} />

                {/* Thumb */}
                {phase === 5 && (
                  <div
                    className="slider-hint-ring"
                    style={{
                      position: "absolute", left: 4, top: 4,
                      width: 30, height: 30, borderRadius: 9,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div style={{
                  position: "absolute",
                  left: thumbLeft,
                  top: 4,
                  width: 30, height: 30,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(0,122,255,0.40)",
                  opacity: sliderDone ? 0 : 1,
                  cursor: "grab",
                  transition: thumbTransition,
                  touchAction: "none",
                  pointerEvents: sliderDone ? "none" : "auto",
                }}>
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Screen 2 : DUI sync confirmation ── */}
          <div
            style={{
              width: "50%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px 18px 24px",
              background: "linear-gradient(160deg, rgba(34,197,94,0.06) 0%, rgba(0,122,255,0.04) 100%)",
              overflow: "hidden",
            }}
          >
            {/* Confetti */}
            {showSync && CONFETTI.map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  backgroundColor: p.color,
                  left: p.x,
                  top: "40%",
                  pointerEvents: "none",
                  "--cdx": p.dx,
                  "--cdy": p.dy,
                  "--cdr": p.dr,
                  animation: `confettiPop ${p.dur}s ease-out ${p.delay}s forwards`,
                } as React.CSSProperties}
              />
            ))}

            {/* Checkmark circle */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(34,197,94,0.40), 0 0 0 6px rgba(34,197,94,0.12)",
                marginBottom: 12,
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div style={{ color: "var(--sp-900)", fontWeight: 800, fontSize: 13, textAlign: "center", marginBottom: 4 }}>
              {h.phone_synced}
            </div>
            <div style={{ color: "#64748b", fontSize: 10, textAlign: "center", marginBottom: 14 }}>
              {h.phone_sent_at}{syncTime ? `${h.phone_at}${syncTime}` : ""}
            </div>

            {/* Resident recap */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,122,255,0.06)",
                border: "1px solid rgba(0,122,255,0.12)",
                borderRadius: 10,
                padding: "8px 12px",
                width: "100%",
              }}
            >
              <img
                src="/photos/resident-h11.jpg"
                alt="Jean Noël"
                style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sp-900)" }}>Jean Noël</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>Ch. 23 · 3 transmissions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  return (
    <section
      className="relative min-h-screen flex items-center overflow-x-hidden pt-16"
      style={{
        background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)",
      }}
    >

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>

            {/* ── Santexpo event chip ── */}
            <a
              href="/blog/fhf-trophees-innovation-2026"
              className="inline-flex items-center gap-3 mb-5 rounded-2xl px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
              style={{
                background: '#0c1d50',
                border: '1px solid rgba(147,197,253,0.15)',
                boxShadow: '0 4px 20px rgba(12,29,80,0.18)',
                textDecoration: 'none',
              }}
            >
              {/* Calendar icon */}
              <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,122,255,0.25)' }}>
                <svg width="16" height="16" fill="none" stroke="#93c5fd" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                </svg>
              </div>
              {/* Text */}
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold tracking-wide" style={{ color: '#93c5fd' }}>SANTEXPO 2026</span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(0,122,255,0.3)', color: '#bfdbfe' }}>Stand W692</span>
                </div>
                <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  19–21 mai · Espace Innovation FHF · Paris Expo
                </div>
              </div>
              {/* Arrow */}
              <svg width="14" height="14" fill="none" stroke="#93c5fd" strokeWidth="2.5" viewBox="0 0 24 24" className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="badge-spin-wrapper">
              <BadgeSpinner />
              <div
                className="inline-flex items-center gap-2.5 text-xs font-semibold px-4 py-2 rounded-full"
                style={{
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "#ffffff",
                  color: "var(--sp-600)",
                  boxShadow: "0 0 24px rgba(0,122,255,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--sp-500)", boxShadow: "0 0 6px rgba(0,122,255,0.8)" }}
                />
                {h.badge}
              </div>
            </div>

            <h1
              className="text-4xl sm:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6"
            >
              <span className="whitespace-nowrap">
                <ShinyText text={h.h1[0]} color="var(--sp-900)" shineColor="rgba(255,255,255,0.55)" speed={4} delay={1.5} spread={100} />{" "}
                <ShinyText text={h.h1[1]} color="var(--sp-500)" shineColor="#ffffff" speed={4} delay={1.5} spread={100} />
              </span>
              <br />
              <span className="whitespace-nowrap">
                <ShinyText text={h.h1[2]} color="var(--sp-900)" shineColor="rgba(255,255,255,0.55)" speed={4} delay={1.5} spread={100} />{" "}
                <ShinyText text={h.h1[3]} color="var(--sp-500)" shineColor="#ffffff" speed={4} delay={1.5} spread={100} />
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg font-medium"
              style={{ color: "#4A5568" }}
            >
              {h.subtitle.split("\n").map((line, i) => (
                <span key={i}>{line}{i < h.subtitle.split("\n").length - 1 && <br />}</span>
              ))}
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-10">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)",
                  boxShadow: "0 4px 24px rgba(0,122,255,0.40), 0 1px 0 rgba(255,255,255,0.15) inset",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, var(--sp-700) 0%, var(--sp-600) 100%)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,122,255,0.50), 0 1px 0 rgba(255,255,255,0.15) inset"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,122,255,0.40), 0 1px 0 rgba(255,255,255,0.15) inset"; }}
              >
                {h.cta_demo}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:bg-blue-50/60"
                style={{ color: "var(--sp-700)", border: "1px solid rgba(0,122,255,0.18)", background: "rgba(255,255,255,0.7)" }}
                onClick={() => document.getElementById("temoignages")?.scrollIntoView({ behavior: "smooth" })}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {h.cta_testimonials}
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {/* Social proof row — hidden on mobile */}
              <div
                className="hidden sm:flex items-center gap-4 py-3 px-4 rounded-2xl"
                style={{ background: "#ffffff", border: "1px solid rgba(0,122,255,0.10)" }}
              >
                <div className="flex -space-x-2.5 flex-shrink-0">
                  {["#60A5FA", "#34D399", "#F472B6", "#FBBF24"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color, borderColor: "rgba(255,255,255,0.9)" }}
                    >
                      {["A", "I", "C", "M"][i]}
                    </div>
                  ))}
                </div>
                <div className="w-px h-8 flex-shrink-0" style={{ background: "rgba(0,122,255,0.15)" }} />
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg key={s} width="11" height="11" fill="#FBBF24" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{h.social_proof}</p>
                </div>
              </div>

              {/* Compliance badges */}
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                {[
                  { color: "#22c55e", label: h.badge_hds },
                  { color: "#007AFF", label: h.badge_rgpd },
                ].map(({ color, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(0,40,120,0.10)",
                      color: "var(--sp-800)",
                      backdropFilter: "blur(4px)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: AppMockup with CSS sonar rings — hidden on mobile ── */}
          <div className="relative flex justify-center lg:justify-end">
            <div style={{ position: "relative", flexShrink: 0, maxWidth: "100%" }}>
              <SonarRings />
              <div style={{ position: "relative", zIndex: 2 }}>
                <AppMockup />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
