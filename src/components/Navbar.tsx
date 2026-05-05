"use client";

import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import "./CardNav.css";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES, type Locale } from "@/lib/translations";

/* ─────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────── */
const DEMO_URL = "https://calendly.com/ruben-speakli/30min";
const COLLAPSED_H = 60;
const EXPANDED_H = 290;
const LEAVE_DEBOUNCE = 500; // ms — panel stays open long enough to move comfortably

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  sectionId?: string; // if provided → smooth-scroll; otherwise href is used
  href: string;
  tabId?: string; // if provided → dispatch pillar-tab event after scroll
}

interface NavCard {
  title: string;
  bgColor: string;
  image: string;
  links: NavLink[];
}

function buildNavCards(nav: { who: string; solutions: string; experience: string; who_links: string[]; solutions_links: string[]; experience_links: string[] }): NavCard[] {
  return [
    {
      title: nav.solutions,
      bgColor: "#EEF3FF",
      image: "/photos/hero-nurse.png",
      links: [
        { label: nav.solutions_links[0], sectionId: "solutions", href: "#solutions", tabId: "voice" },
        { label: nav.solutions_links[1], sectionId: "solutions", href: "#solutions", tabId: "dashboard" },
        { label: nav.solutions_links[2], sectionId: "solutions", href: "#solutions", tabId: "security" },
        { label: nav.solutions_links[3], sectionId: "solutions", href: "#solutions", tabId: "interop" },
      ],
    },
    {
      title: nav.who,
      bgColor: "#EEF3FF",
      image: "/photos/team-nav.webp",
      links: [
        { label: nav.who_links[0], href: "/qui-sommes-nous/notre-histoire" },
        { label: nav.who_links[1], href: "/qui-sommes-nous/nous-rejoindre" },
        { label: nav.who_links[2], href: "/qui-sommes-nous/partenaires-et-soutiens" },
      ],
    },
    {
      title: nav.experience,
      bgColor: "#EEF3FF",
      image: "/photos/care-moment.png",
      links: [
        { label: nav.experience_links[0], sectionId: "temoignages", href: "#temoignages" },
        { label: nav.experience_links[1], href: "/ressources" },
        { label: nav.experience_links[2], href: "/roi" },
      ],
    },
  ];
}

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

/** Arrow-up-right icon (14 × 14) */
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5L8.5 2.5M8.5 2.5H3.5M8.5 2.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron-down icon (12 × 12) */
function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="cardnav-pill-chevron"
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguagePicker() {
  const { locale, setLocale } = useLanguage();
  const next = LOCALES.find((l) => l.code !== locale) ?? LOCALES[0];

  return (
    <button
      type="button"
      aria-label="Changer de langue"
      onClick={() => setLocale(next.code)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.3rem 0.6rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(0,40,120,0.12)",
        background: "transparent",
        cursor: "pointer",
        color: "#4b5563",
        fontSize: "0.75rem",
        fontWeight: 600,
        flexShrink: 0,
        transition: "background 0.15s ease",
        lineHeight: 1,
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{locale === "fr" ? "🇫🇷" : "🇬🇧"}</span>
      <span>{locale === "fr" ? "FR" : "EN"}</span>
    </button>
  );
}

/** Hamburger / close icon */
function HamburgerIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Single dropdown card
───────────────────────────────────────────────────────── */
interface CardProps {
  card: NavCard;
  cardRef: (el: HTMLDivElement | null) => void;
  onLinkClick: (link: NavLink) => void;
  onHover?: () => void;
  onLeave?: () => void;
  isMobile?: boolean;
}

function NavCard({ card, cardRef, onLinkClick, onHover, onLeave, isMobile = false }: CardProps) {
  return (
    <div
      ref={cardRef}
      className={`cardnav-card${isMobile ? " cardnav-mobile-card" : ""}`}
      style={{ background: "linear-gradient(135deg, #ddeeff 0%, #eef5ff 50%, #f0f6ff 100%)", border: "1px solid rgba(0,100,255,0.10)" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Inner content */}
      <div className="cardnav-card-inner">
        <button
            type="button"
            className="cardnav-card-title"
            onClick={() => onLinkClick(card.links[0])}
          >
            {card.title}
          </button>

        <div className="cardnav-card-links">
          {card.links.map((link) => (
            <button
              key={link.label}
              className="cardnav-card-link"
              onClick={() => onLinkClick(link)}
              type="button"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Navbar component
───────────────────────────────────────────────────────── */
export default function Navbar() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const NAV_CARDS = buildNavCards(t.nav);
  const SECTION_LABELS = [t.nav.solutions, t.nav.who, t.nav.experience];
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Refs for GSAP
  const shellRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cancel token: incremented on every mouse-enter so stale collapse .then() callbacks abort
  const collapseIdRef = useRef(0);

  /* ── Build / rebuild the GSAP timeline ── */
  const buildTimeline = useCallback(() => {
    // Kill previous timeline if it exists
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const shell = shellRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!shell || cards.length === 0) return;

    // Only run the height animation on desktop
    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline({ paused: true });

    if (!isMobile) {
      // Phase 1: expand the shell height
      tl.to(shell, {
        height: EXPANDED_H,
        duration: 0.32,
        ease: "power2.out",
      });

      // Phase 2: stagger cards in
      tl.to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.06,
        },
        "-=0.1" // overlap slightly with height animation
      );
    }

    tlRef.current = tl;
  }, []);

  /* ── Build timeline after mount + on resize ── */
  useLayoutEffect(() => {
    buildTimeline();

    const onResize = () => buildTimeline();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [buildTimeline]);

  /* ── Reset card positions on mount and on locale change ── */
  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // After locale change, card DOM nodes are remounted, rebuild timeline and reset positions
    buildTimeline();

    // Small defer so React has committed the new DOM nodes to cardsRef
    const id = setTimeout(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card) => {
        gsap.set(card, { y: 40, opacity: 0 });
      });
      buildTimeline();
      // Collapse shell back to correct height after language switch
      if (shellRef.current) gsap.set(shellRef.current, { height: COLLAPSED_H });
    }, 0);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  /* ── Highlight active card, dim others ── */
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      const targetOpacity = activeIndex === null ? 1 : i === activeIndex ? 1 : 0.35;
      gsap.to(card, { opacity: targetOpacity, duration: 0.18, overwrite: "auto" });
    });
  }, [activeIndex, isExpanded]);

  /* ── Collapse helper ── */
  const collapse = useCallback(() => {
    const tl = tlRef.current;
    const shell = shellRef.current;
    if (!tl || !shell) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // Snapshot the current token — if mouse re-enters before .then() fires, token will differ
    const myId = ++collapseIdRef.current;

    tl.reverse().then(() => {
      if (collapseIdRef.current !== myId) return; // mouse re-entered: abort collapse
      setIsExpanded(false);
      setActiveIndex(null);
      gsap.set(shell, { height: COLLAPSED_H });
    });
  }, []);

  /* ── Mouse enter (desktop) ── */
  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth <= 768) return;

    // Invalidate any in-flight collapse .then() callback
    collapseIdRef.current++;

    // Cancel any pending leave timer
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    setIsExpanded(true);
    tlRef.current?.play();
  }, []);

  /* ── Mouse leave (desktop), debounced ── */
  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth <= 768) return;

    leaveTimerRef.current = setTimeout(() => {
      collapse();
    }, LEAVE_DEBOUNCE);
  }, [collapse]);

  /* ── Link click handler ── */
  const handleLinkClick = useCallback(
    (link: NavLink) => {
      if (link.sectionId) {
        const el = document.getElementById(link.sectionId);
        if (el) {
          // Same page — smooth scroll
          el.scrollIntoView({ behavior: "smooth" });
          if (link.tabId) {
            window.dispatchEvent(new CustomEvent("speakli:pillar-tab", { detail: link.tabId }));
          }
        } else {
          // Different page — navigate home with hash; store pending tab if any
          if (link.tabId) {
            sessionStorage.setItem("speakli:pending-tab", link.tabId);
          }
          window.location.href = `/${link.href}`;
        }
      } else if (link.href && link.href !== "#") {
        if (link.href.startsWith("http")) {
          window.open(link.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(link.href);
        }
      }
      collapse();
      setMobileOpen(false);
    },
    [collapse]
  );

  return (
    <div
      className="cardnav-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav
        ref={shellRef}
        className="cardnav-shell"
        aria-expanded={isExpanded}
        aria-label="Navigation principale"
      >
        {/* ── Top bar ── */}
        <div className="cardnav-topbar">
          {/* Logo */}
          <a href="/" className="cardnav-logo" aria-label="Speakli, accueil">
            <Image
              src="/logo-speakli-navbar.svg"
              alt="Speakli"
              width={88}
              height={25}
              className="object-contain"
            />
          </a>

          {/* Center pill labels (desktop only) */}
          <div className="cardnav-center" aria-hidden="true">
            {SECTION_LABELS.map((label, idx) => {
              const defaultLinks: NavLink[] = [
                { label, sectionId: "solutions", href: "#solutions", tabId: "voice" },
                { label, href: "/qui-sommes-nous/notre-histoire" },
                { label, sectionId: "temoignages", href: "#temoignages" },
              ];
              return (
                <button
                  key={label}
                  className="cardnav-pill-btn"
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleLinkClick(defaultLinks[idx])}
                  style={{
                    background: isExpanded && idx === activeIndex ? "linear-gradient(135deg, #ddeeff 0%, #eef5ff 50%, #f0f6ff 100%)" : "transparent",
                  }}
                >
                  {label}
                  <ChevronDown />
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Language picker */}
            <LanguagePicker />

            {/* CTA, visible on desktop always, on mobile too */}
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cardnav-cta"
            >
              {t.nav.demo}
            </a>

            {/* Hamburger, mobile only */}
            <button
              className="cardnav-hamburger"
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* ── Desktop card grid ── */}
        <div className="cardnav-cards" aria-hidden={!isExpanded}>
          {NAV_CARDS.map((card, idx) => (
            <NavCard
              key={card.title}
              card={card}
              cardRef={(el) => {
                cardsRef.current[idx] = el;
              }}
              onLinkClick={handleLinkClick}
              onHover={() => setActiveIndex(idx)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="cardnav-mobile-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {NAV_CARDS.map((card, idx) => (
                <NavCard
                  key={card.title}
                  card={card}
                  cardRef={(el) => {
                    void (el && idx);
                  }}
                  onLinkClick={handleLinkClick}
                  isMobile
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
