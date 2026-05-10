'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'speakli:banner-santexpo-2026';

export default function TopBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 flex items-center justify-center gap-3 px-4 py-2 text-xs font-medium"
      style={{
        top: 88,
        background: '#0c1d50',
        color: '#e8effe',
        zIndex: 9998,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <span className="relative flex-shrink-0 flex w-2 h-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-400" />
      </span>

      {/* Mobile: 2 lignes condensées */}
      <Link href="/blog/santexpo-2026-stand-w692" className="sm:hidden text-center leading-snug hover:underline decoration-white/40">
        <span className="font-bold text-white block">Santexpo 2026 &nbsp;·&nbsp; 19–21 mai</span>
        <span>Retrouvez-nous au stand <span className="font-bold" style={{ color: '#93c5fd' }}>W692</span></span>
      </Link>

      {/* Desktop: une ligne complète */}
      <Link href="/blog/santexpo-2026-stand-w692" className="hidden sm:inline text-center leading-snug hover:underline decoration-white/40">
        <span className="font-bold text-white">Santexpo 2026 &nbsp;·&nbsp; 19–21 mai &nbsp;·&nbsp;</span>
        Retrouvez-nous au stand{' '}
        <span className="inline-block font-bold px-1.5 py-0.5 rounded text-xs" style={{ background: '#1a3a8f', color: '#93c5fd' }}>
          W692
        </span>
        <span className="mx-1 opacity-40">·</span>
        Espace Innovation FHF — Parc des Expositions, Porte de Versailles
      </Link>

      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
