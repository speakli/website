"use client";
import Image from "next/image";
import CountUp from "./CountUp";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useEffect, useState } from "react";

const PHOTOS: Record<string, string> = {
  "Astou B.": "/photos/testimonials/astou-b.png",
  "Claire D.": "/photos/testimonials/claire-d.png",
  "Emma Biarnes": "/photos/testimonials/emma-biarnes.png",
  "Lauriane Vasnier": "/photos/testimonials/lauriane-vasnier.png",
  "Séverine Davenet": "/photos/testimonials/severine-davenet.png",
};

const BASE_SPEED = 1.4; // px/frame (~84 px/s at 60 fps)

export default function Testimonials() {
  const { t } = useLanguage();
  const tr = t.testimonials;

  const TRACK = [...tr.quotes, ...tr.quotes];

  const trackRef       = useRef<HTMLDivElement>(null);
  const wrapRef        = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const posRef         = useRef(0);
  const velRef         = useRef(BASE_SPEED);
  const rafRef         = useRef<number>(0);
  const draggingRef    = useRef(false);
  const dragStartXRef  = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastXRef       = useRef(0);
  const lastTRef       = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      const half = track.scrollWidth / 2;
      if (half > 0 && !draggingRef.current) {
        posRef.current += velRef.current;
        if (posRef.current >= half) posRef.current -= half;
        if (posRef.current < 0)    posRef.current += half;

        // Decelerate toward BASE_SPEED
        if (velRef.current > BASE_SPEED) {
          velRef.current = Math.max(BASE_SPEED, velRef.current * 0.96);
        } else if (velRef.current < BASE_SPEED) {
          velRef.current = Math.min(BASE_SPEED, velRef.current + 0.12);
        }
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Stats: animate counters only when strip enters viewport ── */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Pointer drag ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current   = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    lastXRef.current      = e.clientX;
    lastTRef.current      = performance.now();
    velRef.current        = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const dx    = dragStartXRef.current - e.clientX; // positive = dragging left (RTL)
    const track = trackRef.current;
    if (track) {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        let p = dragStartPosRef.current + dx;
        p = ((p % half) + half) % half;
        posRef.current = p;
      }
    }

    // Update velocity for momentum on release
    const now = performance.now();
    const dt  = now - lastTRef.current;
    if (dt > 4) {
      velRef.current = ((lastXRef.current - e.clientX) / dt) * 16.67;
      lastXRef.current = e.clientX;
      lastTRef.current = now;
    }
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    // Clamp and ensure forward motion
    velRef.current = Math.max(BASE_SPEED, Math.min(22, velRef.current));
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="temoignages">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            {tr.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
            {tr.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{tr.h2_accent}</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto font-medium" style={{ color: "#4A5568" }}>
            {tr.subtitle}
          </p>
        </div>

        {/* Video card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,40,120,0.08)",
            boxShadow: "0 16px 60px rgba(0,40,120,0.10), 0 4px 16px rgba(0,40,120,0.05)",
            background: "#ffffff",
          }}
        >
          <div
            className="flex items-center justify-center gap-6 sm:gap-10 px-4 sm:px-10 py-6 flex-wrap"
            style={{ borderBottom: "1px solid rgba(0,40,120,0.06)" }}
          >
            <Image
              src="/logos/pervenches-homage.png"
              alt="Résidence Les Pervenches, Groupe Hom'Age"
              width={200}
              height={60}
              className="object-contain"
              style={{ maxHeight: 52, width: "auto" }}
            />
            <div style={{ width: 1, height: 36, background: "rgba(0,40,120,0.10)", flexShrink: 0 }} />
            <Image
              src="/logos/homage-group.png"
              alt="Groupe Hom'Age"
              width={180}
              height={60}
              className="object-contain"
              style={{ maxHeight: 52, width: "auto" }}
            />
          </div>
          <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster="/photos/testimonial-poster.jpg"
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            >
              <source src="/videos/pervenches-testimonial.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Quote marquee */}
        <div
          ref={wrapRef}
          className="marquee-wrap mt-8"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ cursor: "grab" }}
        >
          <div
            ref={trackRef}
            className="marquee-track"
            style={{ gap: "1.5rem", alignItems: "stretch", userSelect: "none" }}
          >
            {TRACK.map((q, i) => (
              <div
                key={i}
                className="flex flex-col flex-shrink-0 rounded-2xl"
                style={{
                  width: 340,
                  border: "1px solid rgba(0,40,120,0.08)",
                  background: "#ffffff",
                  boxShadow: "0 2px 16px rgba(0,40,120,0.05)",
                  padding: "1.5rem",
                  pointerEvents: "none",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="13" height="13" fill="#FBBF24" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed font-medium flex-1" style={{ color: "#374151" }}>
                  &ldquo;{q.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t mt-5 pt-4 flex items-center gap-3" style={{ borderColor: "rgba(0,40,120,0.06)" }}>
                  {PHOTOS[q.name] ? (
                    <Image
                      src={PHOTOS[q.name]}
                      alt={q.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 40, height: 40, minWidth: 40 }}
                    />
                  ) : (
                    <div
                      className="rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ width: 40, height: 40, minWidth: 40, background: "var(--sp-50)", color: "var(--sp-500)" }}
                    >
                      {q.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm" style={{ color: "var(--sp-900)" }}>{q.name}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: "#6B7280" }}>{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat strip */}
        <div
          ref={statsRef}
          className="mt-10 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1242C0 0%, #007AFF 100%)",
            boxShadow: "0 8px 32px rgba(0,122,255,0.25)",
          }}
        >
          <div className="grid grid-cols-3">
            {[
              { value: <><span>+</span><CountUp from={0} to={40} duration={1.4} startWhen={statsVisible} /></>, label: tr.stat_facilities, img: "/photos/stat-facilities.jpg", imgPos: "center center" },
              { value: <><span>+</span><CountUp from={0} to={1000} duration={1.6} separator={"\u00a0"} startWhen={statsVisible} /></>, label: tr.stat_caregivers, img: "/photos/stat-caregivers.jpg", imgPos: "center 70%" },
              { value: <><span>+</span><CountUp from={0} to={3400} duration={1.8} separator={"\u00a0"} startWhen={statsVisible} /></>, label: tr.stat_residents, img: "/photos/stats/stat-resident.jpg", imgPos: "center center" },
            ].map(({ value, label, img, imgPos }, i) => (
              <div
                key={label}
                className="relative overflow-hidden py-8 sm:py-10 px-3 sm:px-5 text-center flex flex-col items-center justify-center"
                style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : undefined, minHeight: 120 }}
              >
                <Image
                  src={img}
                  alt={label}
                  fill
                  sizes="33vw"
                  className="object-cover"
                  style={{ opacity: 0.22, objectPosition: imgPos }}
                />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none mb-1.5">{value}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-center" style={{ color: "rgba(255,255,255,0.75)" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
