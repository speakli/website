'use client';
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const STEP_ICONS = [
  <svg key="0" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="1" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="3" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const STEP_IMAGES = [
  "/photos/onboarding-consultation.png",
  "/photos/onboarding-deploiement.png",
  "/photos/onboarding-integration.png",
  "/photos/onboarding-formation.png",
];

const STEP_NUMBERS = ["01", "02", "03", "04"];

export default function Onboarding() {
  const { t } = useLanguage();
  const o = t.onboarding;
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          o.steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "transparent" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>{o.tag}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
            {o.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{o.h2_accent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {o.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="deploiement">
          {o.steps.map((step, i) => {
            const isVisible = visibleCards[i];
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={STEP_NUMBERS[i]}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: "1px solid var(--sp-100)",
                  boxShadow: isHovered
                    ? "0 12px 40px rgba(0,40,120,0.13)"
                    : "0 2px 16px rgba(0,40,120,0.06)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? isHovered ? "translateY(-6px)" : "translateY(0)"
                    : "translateY(36px)",
                  transition: isVisible
                    ? "opacity 0.55s ease, transform 0.35s ease, box-shadow 0.25s ease"
                    : `opacity 0.55s ease ${i * 0.15}s, transform 0.55s ease ${i * 0.15}s`,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
                  <Image
                    src={STEP_IMAGES[i]}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 280px"
                    className="object-cover"
                    style={{
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.45s ease",
                    }}
                  />
                  {/* Step number badge */}
                  <div
                    className="absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      color: "var(--sp-500)",
                      border: "1px solid var(--sp-100)",
                    }}
                  >
                    {STEP_NUMBERS[i]}
                  </div>
                  {/* Connector arrow */}
                  {i < o.steps.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
                      style={{ background: "var(--sp-500)" }}
                    >
                      <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                    style={{ background: "var(--sp-50)", border: "1px solid var(--sp-100)", color: "var(--sp-500)" }}
                  >
                    {STEP_ICONS[i]}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "var(--sp-900)" }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below Déploiement */}
        <div
          className="mt-12 flex flex-col items-center gap-4"
          style={{
            opacity: visibleCards[3] ? 1 : 0,
            transform: visibleCards[3] ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.55s ease 0.65s, transform 0.55s ease 0.65s',
          }}
        >
          <p className="text-sm font-medium text-center" style={{ color: '#6B7280' }}>
            Prêt à démarrer ? Un échange de 30 minutes suffit.
          </p>
          <a
            href="https://calendly.com/ruben-speakli/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-white text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)',
              boxShadow: '0 4px 24px rgba(0,122,255,0.36), 0 1px 0 rgba(255,255,255,0.15) inset',
            }}
          >
            Réserver une démo
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
