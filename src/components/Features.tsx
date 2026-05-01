'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import CardSwap, { Card, CardSwapHandle } from './CardSwap';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Resident header ────────────────────────────────────── */
function ResidentHeader({ photo, name, room, age }: { photo: string; name: string; room: string; age: number }) {
  return (
    <div
      className="flex items-center gap-2.5 pb-3 mb-3 flex-shrink-0"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
    >
      <img
        src={photo}
        alt={name}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '1.5px solid rgba(255,255,255,0.20)',
          flexShrink: 0,
        }}
      />
      <div>
        <div className="text-[11px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>{name}</div>
        <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{room} · {age} ans</div>
      </div>
    </div>
  );
}

/* ─── Swipe-to-sync badge ─────────────────────────────────
   Runs exactly once per card activation.
   isActive=true  → wait 5.5 s, then slide once, then call onDone.
   isActive=false → instant idle reset (card is not visible anyway).
   ────────────────────────────────────────────────────────── */
function SwipeSyncBadge({ isActive, onDone, swipeLabel, syncedLabel }: { isActive: boolean; onDone: () => void; swipeLabel: string; syncedLabel: string }) {
  const [phase, setPhase] = useState<'idle' | 'sliding' | 'done'>('idle');
  const [dragX, setDragX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setDragX(null);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('sliding'), 5500));
    timers.push(setTimeout(() => { setPhase('done'); onDone(); }, 5500 + 1900));
    return () => timers.forEach(clearTimeout);
  }, [isActive, onDone]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (phase === 'done') return;
    dragging.current = true;
    startX.current = e.clientX;
    startLeft.current = dragX ?? 4;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [phase, dragX]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const maxLeft = containerW - 34;
    const newLeft = Math.max(4, Math.min(maxLeft, startLeft.current + (e.clientX - startX.current)));
    setDragX(newLeft);
    if (newLeft >= maxLeft * 0.85) {
      dragging.current = false;
      setDragX(null);
      setPhase('done');
      onDone();
    }
  }, [onDone]);

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setDragX(null);
  }, []);

  const isSlid = phase !== 'idle';
  const isDone = phase === 'done';

  const thumbLeft = dragX !== null
    ? dragX
    : isSlid ? 'calc(100% - 34px)' : 4;

  const thumbTransition = dragX !== null
    ? 'opacity 0.25s'
    : 'left 1.85s cubic-bezier(0.25, 0, 0.15, 1), opacity 0.25s';

  return (
    <div
      ref={containerRef}
      className="relative mt-auto overflow-hidden flex-shrink-0"
      style={{
        height: 38,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-medium select-none pointer-events-none"
        style={{
          paddingLeft: isDone ? 0 : 40,
          color: isDone ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.38)',
          transition: 'color 0.35s, padding-left 0.3s',
        }}
      >
        {isDone ? syncedLabel : swipeLabel}
      </span>

      <div
        className="absolute top-1 flex items-center justify-center"
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: 'linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)',
          left: thumbLeft,
          opacity: isDone ? 0 : 1,
          transition: thumbTransition,
          cursor: isDone ? 'default' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: '35%',
          left: isSlid ? '110%' : '-35%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
          transition: 'left 1.85s cubic-bezier(0.25, 0, 0.15, 1)',
        }}
      />
    </div>
  );
}

/* ─── Checklist item ─────────────────────────────────────── */
function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.80)" strokeWidth="2.5" viewBox="0 0 24 24" className="flex-shrink-0">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-white/80 text-sm">{text}</span>
    </div>
  );
}

/* ─── Card 1 — Transmissions ─────────────────────────────── */
function TransmissionsCard({ isActive, onSyncDone, label, title, desc, checks, listening, swipeLabel, syncedLabel }: { isActive: boolean; onSyncDone: () => void; label: string; title: string; desc: string; checks: string[]; listening: string; swipeLabel: string; syncedLabel: string }) {
  const [waveH, setWaveH] = useState([3, 6, 4, 9, 5, 11, 7, 4, 10, 6, 3, 8, 5, 7, 4]);
  const [elapsed, setElapsed] = useState(0);
  const [darVisible, setDarVisible] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWaveH(h => h.map(v => Math.max(2, Math.min(13, v + (Math.random() - 0.5) * 4.5))));
    }, 140);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const DAR = [
    { label: 'D', text: 'Nuit calme, légère agitation à 3h' },
    { label: 'A', text: 'Traitement administré à 6h00' },
    { label: 'R', text: 'Retour au calme, douleur 2/10' },
  ];

  useEffect(() => {
    if (darVisible < DAR.length) {
      const t = setTimeout(() => setDarVisible(c => c + 1), 900);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDarVisible(0), 3000);
      return () => clearTimeout(t);
    }
  }, [darVisible]);

  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const secs = String(elapsed % 60).padStart(2, '0');

  return (
    <div className="flex h-full">
      <div className="flex-1 p-5 sm:p-9 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">{label}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70 mb-4">
            {desc}
          </p>
          <div className="flex flex-col gap-2">
            {checks.map((c) => <CheckItem key={c} text={c} />)}
          </div>
        </div>
        <SwipeSyncBadge isActive={isActive} onDone={onSyncDone} swipeLabel={swipeLabel} syncedLabel={syncedLabel} />
      </div>

      <div className="flex flex-col flex-shrink-0 p-5" style={{ width: 220, background: 'rgba(0,0,0,0.15)' }}>
        <ResidentHeader photo="/photos/resident-h11.jpg" name="Jean Noël" room="Ch. 23" age={91} />
        <div className="flex flex-col gap-3 flex-1 justify-center">
          <div className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#f87171' }} />
              <span className="text-white/70 text-[11px] font-medium">{listening} · {mins}:{secs}</span>
            </div>
            <div className="flex items-end gap-0.5 h-6 overflow-hidden">
              {waveH.map((h, i) => (
                <div key={i} className="bg-white/50 rounded-full flex-1" style={{ height: `${Math.round(h) * 1.5}px`, transition: 'height 0.12s ease' }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl p-3.5 space-y-2.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
            {DAR.map(({ label, text }, i) => (
              <div
                key={label}
                className="flex gap-2 items-start"
                style={{
                  opacity: i < darVisible ? 1 : 0,
                  transform: i < darVisible ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <span className="text-[10px] font-bold rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5 bg-white/20 text-white">{label}</span>
                <span className="text-white/65 text-[11px] leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card 2 — Plan de soin ──────────────────────────────── */
function PlanDeSoinCard({ isActive, onSyncDone, label, title, desc, checks, swipeLabel, syncedLabel }: { isActive: boolean; onSyncDone: () => void; label: string; title: string; desc: string; checks: string[]; swipeLabel: string; syncedLabel: string }) {
  const actes = [
    { d: 'M5 13l4 4L19 7',                               color: '#4ade80', label: 'Toilette complète',  status: 'Fait',    comment: null },
    { d: 'M5 13l4 4L19 7',                               color: '#4ade80', label: 'Hydratation 250ml',  status: 'Fait',    comment: null },
    { d: 'M18 6L6 18M6 6l12 12',                         color: '#f87171', label: 'Kinésithérapie',     status: 'Refusé',  comment: 'Patient opposant — douleurs dorsales signalées' },
    { d: 'M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10',     color: '#fb923c', label: 'Pansement jambe G',  status: 'Reporté', comment: 'Reporté à 16h30 — attente IDE disponible' },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < actes.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisibleCount(0), 2800);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-5 sm:p-9 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">{label}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70 mb-4">
            {desc}
          </p>
          <div className="flex flex-col gap-2">
            {checks.map((c) => <CheckItem key={c} text={c} />)}
          </div>
        </div>
        <SwipeSyncBadge isActive={isActive} onDone={onSyncDone} swipeLabel={swipeLabel} syncedLabel={syncedLabel} />
      </div>

      <div className="flex flex-col flex-shrink-0 p-5" style={{ width: 220, background: 'rgba(0,0,0,0.15)' }}>
        <ResidentHeader photo="/photos/resident-w4.jpg" name="Suzanne Pichon" room="Ch. 7" age={87} />
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {actes.map(({ d, color, label, status, comment }, i) => (
            <div
              key={label}
              style={{
                opacity: i < visibleCount ? 1 : 0,
                transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <div className="flex items-center gap-2.5 rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <svg width="13" height="13" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-white/75 text-[11px] truncate">{label}</div>
                  <div className="text-[10px] font-semibold" style={{ color }}>{status}</div>
                </div>
              </div>
              {comment && (
                <div className="flex items-start gap-1.5 mt-1 px-2">
                  <svg width="10" height="10" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1.8" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/40 text-[10px] leading-tight italic">{comment}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Relevés constants ──────────────────────────────────── */
const RELEVE_SEGS = [
  { text: 'Tension ', color: 'rgba(255,255,255,0.55)' },
  { text: '120/80', color: '#f87171' },
  { text: ', temp. ', color: 'rgba(255,255,255,0.55)' },
  { text: '37,2', color: '#fb923c' },
  { text: ', sat. ', color: 'rgba(255,255,255,0.55)' },
  { text: '97 %', color: '#93c5fd' },
  { text: '…', color: 'rgba(255,255,255,0.55)' },
];
const RELEVE_CHARS = RELEVE_SEGS.flatMap(({ text, color }) =>
  text.split('').map(char => ({ char, color }))
);

/* ─── Card 3 — Relevés de constantes ────────────────────── */
function RelevesCard({ isActive, onSyncDone, label, title, desc, checks, listening, swipeLabel, syncedLabel }: { isActive: boolean; onSyncDone: () => void; label: string; title: string; desc: string; checks: string[]; listening: string; swipeLabel: string; syncedLabel: string }) {
  const constantes = [
    {
      label: 'Tension', value: '120/80 mmHg', color: '#f87171',
      anim: 'spkHb 1.1s ease-in-out infinite',
      svgFill: '#f87171', svgStroke: '#f87171', svgStrokeWidth: '1.2',
      d: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
    },
    {
      label: 'Température', value: '37,2 °C', color: '#fb923c',
      anim: 'spkTemp 2.2s ease-in-out infinite',
      svgFill: 'none', svgStroke: '#fb923c', svgStrokeWidth: '1.8',
      d: 'M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z',
    },
    {
      label: 'SpO₂', value: '97 %', color: '#93c5fd',
      anim: 'spkSpo 1.6s ease-in-out infinite',
      svgFill: 'none', svgStroke: '#93c5fd', svgStrokeWidth: '1.8',
      d: 'M22 12h-4l-3 9L9 3l-3 9H2',
    },
    {
      label: 'Poids', value: '68 kg', color: '#a78bfa',
      anim: 'spkBalance 3s ease-in-out infinite',
      svgFill: 'none', svgStroke: '#a78bfa', svgStrokeWidth: '1.8',
      d: 'M12 3v18M3 7h18M5 7v1a3 3 0 0 1 6 0V7M13 7v1a3 3 0 0 1 6 0V7M4 21h16',
    },
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (visibleCount < constantes.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 750);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisibleCount(0), 3000);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  useEffect(() => {
    if (charCount < RELEVE_CHARS.length) {
      const t = setTimeout(() => setCharCount(c => c + 1), 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setCharCount(0), 2200);
      return () => clearTimeout(t);
    }
  }, [charCount]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex h-full">
      <style>{`
        @keyframes spkHb {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.35); }
          28% { transform: scale(1); }
          42% { transform: scale(1.22); }
          56% { transform: scale(1); }
        }
        @keyframes spkTemp {
          0%,100% { transform: scaleY(1); }
          45% { transform: scaleY(1.12); }
        }
        @keyframes spkSpo {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spkBalance {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>

      <div className="flex-1 p-5 sm:p-9 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">{label}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70 mb-4">
            {desc}
          </p>
          <div className="flex flex-col gap-2">
            {checks.map((c) => <CheckItem key={c} text={c} />)}
          </div>
        </div>
        <SwipeSyncBadge isActive={isActive} onDone={onSyncDone} swipeLabel={swipeLabel} syncedLabel={syncedLabel} />
      </div>

      <div className="flex flex-col flex-shrink-0 p-5" style={{ width: 220, background: 'rgba(0,0,0,0.15)' }}>
        <ResidentHeader photo="/photos/resident-h20.jpg" name="Carlos Maier" room="Ch. 15" age={89} />
        <div className="flex flex-col gap-2 flex-1 justify-center">
          <div className="rounded-xl px-3.5 py-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#007AFF' }} />
              <span className="text-white/60 text-[10px]">{listening}</span>
            </div>
            <p className="text-[11px] leading-snug min-h-[2.5rem]">
              {RELEVE_CHARS.slice(0, charCount).map(({ char, color }, i) => (
                <span key={i} style={{ color }}>{char}</span>
              ))}
              <span style={{ opacity: cursorOn ? 1 : 0, color: 'rgba(255,255,255,0.7)' }}>|</span>
            </p>
          </div>
          {constantes.map(({ d, label, value, color, anim, svgFill, svgStroke, svgStrokeWidth }, i) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{
                background: 'rgba(255,255,255,0.10)',
                opacity: i < visibleCount ? 1 : 0,
                transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0" style={{ display: 'inline-block', width: 13, height: 13, animation: anim }}>
                  <svg width="13" height="13" fill={svgFill} stroke={svgStroke} strokeWidth={svgStrokeWidth} viewBox="0 0 24 24">
                    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.60)' }}>{label}</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CARD_COUNT = 3;

/* ─── Section ────────────────────────────────────────────── */
export default function Features() {
  const { t } = useLanguage();
  const f = t.features;
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [revealStep, setRevealStep] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reveal descriptions sequentially as cards advance, but only after section is visible.
  // activeIdx is always 0 at first visibility (no auto-swap on mount), so order is guaranteed.
  useEffect(() => {
    if (!sectionVisible) return;
    setRevealStep(prev => Math.max(prev, activeIdx));
  }, [sectionVisible, activeIdx]);

  const handleSyncDone = useCallback(() => {
    setTimeout(() => cardSwapRef.current?.next(), 900);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{ background: "transparent" }}
      className="py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--sp-500)' }}>
            {f.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: '#ffffff' }}>
            <span style={{ color: 'var(--sp-500)' }}>{f.h2_accent}</span> {f.h2}
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.60)' }}>
            {f.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
          {/* Left — feature descriptions (hidden on mobile) */}
          <div className="hidden lg:flex flex-col justify-center gap-6 lg:gap-8 lg:w-80 flex-shrink-0">
            {[
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: f.items[0].title,
                desc: f.items[0].desc,
                color: '#2e8bff',
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: f.items[1].title,
                desc: f.items[1].desc,
                color: '#fb923c',
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: f.items[2].title,
                desc: f.items[2].desc,
                color: '#8b5cf6',
              },
            ].map(({ icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="flex gap-4 items-start"
                style={{
                  opacity: revealStep >= idx ? 1 : 0,
                  transform: revealStep >= idx ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'opacity 0.55s ease, transform 0.55s ease',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}22`, border: `1px solid ${color}60`, color: color }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-extrabold mb-1" style={{ color: '#ffffff' }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — CardSwap + navigation */}
          <div className="flex-1 flex flex-col items-center gap-8 min-w-0">
            <div className="relative w-full overflow-hidden" style={{ minHeight: "clamp(400px, 80vw, 620px)" }}>
              <CardSwap
                ref={cardSwapRef}
                width={580}
                height={460}
                cardDistance={60}
                verticalDistance={54}
                delay={99999999}
                pauseOnHover={false}
                skewAmount={4}
                easing="linear"
                onActiveChange={setActiveIdx}
              >
                <Card style={{ background: 'linear-gradient(135deg, #1e56d0 0%, #2e8bff 100%)' }}>
                  <TransmissionsCard isActive={sectionVisible && activeIdx === 0} onSyncDone={handleSyncDone} label={f.card1.label} title={f.card1.title} desc={f.card1.desc} checks={f.card1.checks} listening={f.card1.listening} swipeLabel={f.swipe} syncedLabel={f.synced} />
                </Card>
                <Card style={{ background: 'linear-gradient(135deg, #c2410c 0%, #fb923c 100%)' }}>
                  <PlanDeSoinCard isActive={sectionVisible && activeIdx === 1} onSyncDone={handleSyncDone} label={f.card2.label} title={f.card2.title} desc={f.card2.desc} checks={f.card2.checks} swipeLabel={f.swipe} syncedLabel={f.synced} />
                </Card>
                <Card style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                  <RelevesCard isActive={sectionVisible && activeIdx === 2} onSyncDone={handleSyncDone} label={f.card3.label} title={f.card3.title} desc={f.card3.desc} checks={f.card3.checks} listening={f.card3.listening} swipeLabel={f.swipe} syncedLabel={f.synced} />
                </Card>
              </CardSwap>
            </div>

            <div className="flex items-center gap-4">
              {Array.from({ length: CARD_COUNT }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIdx ? 24 : 8,
                    height: 8,
                    background: i === activeIdx ? 'var(--sp-500)' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
              <button
                onClick={() => cardSwapRef.current?.next()}
                className="ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'var(--sp-500)', color: '#fff' }}
                aria-label={f.next_card}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
