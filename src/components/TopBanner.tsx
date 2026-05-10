'use client';
import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'speakli:banner-santexpo-2026';

export default function TopBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  useEffect(() => {
    const h = visible && ref.current ? ref.current.offsetHeight : 0;
    document.documentElement.style.setProperty('--banner-height', `${h}px`);
    return () => document.documentElement.style.setProperty('--banner-height', '0px');
  }, [visible]);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="w-full fixed top-0 left-0 right-0 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
      style={{ background: '#0c1d50', color: '#e8effe', zIndex: 10000 }}
    >
      {/* Pulse dot */}
      <span className="relative flex-shrink-0 flex w-2 h-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-400" />
      </span>

      {/* Message */}
      <span className="text-center leading-snug">
        <span className="font-bold text-white">Santexpo 2026 &nbsp;·&nbsp; 19–21 mai</span>
        <span className="mx-2 opacity-40">|</span>
        Retrouvez Speakli au stand{' '}
        <span
          className="inline-block font-bold px-1.5 py-0.5 rounded text-xs tracking-wide"
          style={{ background: '#1a3a8f', color: '#93c5fd' }}
        >
          W692
        </span>
        <span className="mx-1 opacity-40">·</span>
        Espace Innovation FHF — Paris Expo, Porte de Versailles
      </span>

      {/* CTA */}
      <a
        href="/blog/fhf-trophees-innovation-2026"
        className="hidden sm:inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
        style={{ color: '#93c5fd', border: '1px solid rgba(147,197,253,0.3)' }}
      >
        En savoir plus
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
