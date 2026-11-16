"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToNext } from "@/lib/useSnapToNext";
import { openContact } from "@/lib/contactMode";
import "./Hero.css";
import ShinyText from "./ShinyText";
import HeroDocGen from "./HeroDocGen";
import LogoBar from "./LogoBar";
import { useLanguage } from "@/context/LanguageContext";

function TrustIcon({ kind, mark }: { kind: "shield" | "eu" | "rgpd"; mark: string }) {
  if (kind === "rgpd") {
    return <span className="text-lg font-extrabold tracking-tight" style={{ color: "#fff" }} aria-hidden>{mark}</span>;
  }
  if (kind === "eu") {
    // Cercle de 12 étoiles (points) façon drapeau européen
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * 2 * Math.PI;
          return <circle key={i} cx={(16 + 12 * Math.cos(a)).toFixed(2)} cy={(16 + 12 * Math.sin(a)).toFixed(2)} r="1.9" fill="currentColor" />;
        })}
      </svg>
    );
  }
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.8l7.5 3v5.6c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V5.8l7.5-3z" strokeLinejoin="round" />
      <path d="M8.6 12.2l2.4 2.4 4.6-4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DEMO_URL = "https://meetings-eu1.hubspot.com/ruben-weinstein";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  // Intro : pendant les 3 premières secondes de la vidéo, on ne voit que la soignante et la
  // résidente ; le texte, les boutons, les logos et le voile apparaissent ensuite (une fois).
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);
  const sectionRef = useRef<HTMLElement>(null);

  // Quand on quitte le hero, la vidéo s'arrête et revient au début : en remontant, la
  // vidéo et la génération de documentation (calée sur son temps) repartent de zéro.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      const v = videoRef.current;
      if (!v) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else { v.pause(); v.currentTime = 0; }
    }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`hero-video${revealed ? " is-revealed" : ""} relative min-h-screen flex flex-col overflow-x-hidden pt-16`}>
      {/* Vidéo de fond muette, lue une fois ; HeroDocGen la relance à chaque cycle d'animation */}
      <video
        ref={videoRef}
        className="hero-video__media"
        autoPlay muted playsInline preload="auto"
        poster="/hero/soignante-chevet-v3-poster.jpg"
        aria-hidden
      >
        <source src="/hero/soignante-chevet-v3-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/hero/soignante-chevet-v3.mp4" type="video/mp4" />
      </video>
      <div className="hero-video__shade hero-reveal" aria-hidden />

      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center w-full">

          {/* ── Left: copy ── */}
          <div className="hero-reveal">
            <h1 className="text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight mb-6">
              {h.h1.map((line, li) => (
                <span key={li} className="block">
                  {line.map(([text, accent], si) => (
                    <span key={si}>
                      <ShinyText
                        className="shiny-text--wrap"
                        text={text}
                        color={accent ? "#5EB0FF" : "#ffffff"}
                        shineColor={accent ? "#ffffff" : "rgba(160,205,255,0.9)"}
                        speed={4} delay={1.5} spread={100}
                      />
                      {si < line.length - 1 && " "}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg font-medium"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {h.subtitle.split("\n").map((line, i) => (
                <span key={i}>{line}{i < h.subtitle.split("\n").length - 1 && <br />}</span>
              ))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 sm:max-w-[30rem]">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-white font-bold px-5 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)",
                  boxShadow: "0 4px 24px rgba(0,122,255,0.40), 0 1px 0 rgba(255,255,255,0.15) inset",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, var(--sp-700) 0%, var(--sp-600) 100%)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,122,255,0.50), 0 1px 0 rgba(255,255,255,0.15) inset"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,122,255,0.40), 0 1px 0 rgba(255,255,255,0.15) inset"; }}
              >
                {h.cta_demo}
                <svg className="flex-none" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold px-5 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25"
                style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
                onClick={() => openContact("callback")}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {h.cta_callback}
              </button>
            </div>

            {/* Réassurance : HDS, données dans l'UE, RGPD */}
            <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
              {h.trust.map(({ icon, label }) => (
                <li key={icon} className="flex items-center gap-3" style={{ color: "#fff" }}>
                  <TrustIcon kind={icon} mark={h.rgpd_mark} />
                  <span className="text-sm font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {label.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: un vocal → toute la documentation (kakemono Speakli V2) ── */}
          <div className="relative flex justify-center lg:justify-end">
            <HeroDocGen videoRef={videoRef} onIntroDone={reveal} />
          </div>

        </div>
      </div>

      {/* Logos clients, visibles sans scroller */}
      <div className="hero-reveal hero-reveal--late relative z-10"><LogoBar variant="hero" /></div>

      {/* Flèche vers le bloc suivant */}
      <button
        type="button"
        className="hero-scroll hero-reveal hero-reveal--late"
        aria-label={h.scroll_next}
        onClick={() => scrollToNext(sectionRef.current)}
      >
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
