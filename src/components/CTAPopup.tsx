'use client';
import { useEffect, useState } from 'react';

const DEMO_URL = 'https://calendly.com/ruben-speakli/30min';
const DELAY_MS = 10000;

export default function CTAPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('speakli:popup_shown')) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem('speakli:popup_shown', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(11,28,56,0.55)' }}
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,40,120,0.10)',
          boxShadow: '0 32px 80px rgba(0,20,80,0.22), 0 4px 16px rgba(0,20,80,0.08)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
          style={{ color: '#94a3b8' }}
          aria-label="Fermer"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
          style={{ background: 'rgba(0,122,255,0.08)', border: '1px solid rgba(0,122,255,0.18)', color: 'var(--sp-600)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--sp-500)' }} />
          #1 des assistants IA en EHPAD
        </div>

        <h2
          className="text-2xl font-extrabold leading-tight mb-3"
          style={{ color: 'var(--sp-900)' }}
        >
          Voyez Speakli en action<br />
          <span style={{ color: 'var(--sp-500)' }}>en 20 minutes</span>
        </h2>

        <p className="text-sm leading-relaxed mb-6" style={{ color: '#4A5568' }}>
          Une démo personnalisée, adaptée à votre établissement. Aucun engagement requis.
        </p>

        <div className="flex flex-col gap-3">
          {/* Proof points */}
          {[
            '98 % de satisfaction terrain',
            'Démo sur un cas concret EHPAD',
            'Réponse en moins de 24h',
          ].map(point => (
            <div key={point} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,122,255,0.10)', border: '1px solid rgba(0,122,255,0.20)' }}
              >
                <svg width="9" height="9" fill="none" stroke="var(--sp-500)" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-medium" style={{ color: '#374151' }}>{point}</span>
            </div>
          ))}
        </div>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 w-full font-bold py-4 rounded-xl text-white text-base transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)',
            boxShadow: '0 4px 24px rgba(0,122,255,0.38), 0 1px 0 rgba(255,255,255,0.15) inset',
          }}
          onClick={dismiss}
        >
          Réserver ma démo gratuite
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          onClick={dismiss}
          className="mt-3 w-full text-xs text-center py-2 rounded-lg transition-colors hover:bg-gray-50"
          style={{ color: '#94a3b8' }}
        >
          Non merci, continuer la visite
        </button>
      </div>
    </div>
  );
}
