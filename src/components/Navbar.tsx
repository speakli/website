"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Navbar.css";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES } from "@/lib/translations";
import { PRODUCT_EVENT } from "@/lib/productSwitch";
import { openContact } from "@/lib/contactMode";

/*
 * Barre de navigation au format de la maquette initiale (refonte 2026) :
 * barre pleine largeur translucide, logo à gauche, menus déroulants avec description,
 * « Être rappelé » et « Réserver une démo » à droite. Menu repliable sous 1080 px.
 */

const DEMO_URL = "https://meetings-eu1.hubspot.com/ruben-weinstein";

type Target = { section?: string; href?: string };
type Item = { title: string; desc?: string; target: Target; image?: string; visual?: "secu" | "interop" };

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden className="snav-chev">
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LanguagePicker() {
  const { locale, setLocale } = useLanguage();
  const next = LOCALES.find(l => l.code !== locale) ?? LOCALES[0];
  return (
    <button type="button" className="snav-lang" aria-label="Changer de langue" onClick={() => setLocale(next.code)}>
      <span aria-hidden>{locale === "fr" ? "🇫🇷" : "🇬🇧"}</span>
      {locale === "fr" ? "FR" : "EN"}
    </button>
  );
}

// Visuel « Sécurité et conformité » : la planète centrée sur la France et les trois garanties
function SecuVisual({ on }: { on: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`snav-secu${on ? " is-on" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/securite/globe-europe.svg" alt="" />
      <ul>{t.nav.secu_badges.map(b => <li key={b}>{b}</li>)}</ul>
    </div>
  );
}

// Visuel « Interopérabilité » : Speakli échange avec les logiciels de soins
function InteropVisual({ on }: { on: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`snav-interop${on ? " is-on" : ""}`}>
      <span className="snav-interop__card snav-interop__card--speakli">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-speakli-full.png" alt="" />
      </span>
      <span className="snav-interop__link" aria-hidden>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4L3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7" /></svg>
      </span>
      <span className="snav-interop__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/netsoins-teranga.png" alt="" />
      </span>
      <span className="snav-interop__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/netvie-teranga.png" alt="" />
      </span>
      <small>{t.nav.interop_caption}</small>
    </div>
  );
}

// Menu déroulant : photo à gauche (celle de l'élément survolé), liste à droite,
// l'élément actif est mis en avant par le dégradé bleu Speakli
function Dropdown({ label, items, go }: { label: string; items: Item[]; go: (t: Target) => void }) {
  const [active, setActive] = useState(0);
  return (
    <div className="snav-dd" onMouseLeave={() => setActive(0)}>
      <button type="button" aria-haspopup="true" onClick={() => go(items[0].target)}>
        {label} <Chevron />
      </button>
      <div className="snav-dd__panel">
        <div className="snav-dd__media" aria-hidden>
          {items.map((it, i) => it.visual === "secu" ? (
            <SecuVisual key={it.title} on={i === active} />
          ) : it.visual === "interop" ? (
            <InteropVisual key={it.title} on={i === active} />
          ) : it.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={it.title} src={it.image} alt="" className={i === active ? "is-on" : ""} loading="lazy" />
          ))}
        </div>
        <div className="snav-dd__list">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              className={i === active ? "is-on" : ""}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => go(it.target)}
            >
              <strong>{it.title}</strong>
              {it.desc && <span>{it.desc}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { t } = useLanguage();
  const n = t.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<"products" | "experience" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) { const t = setTimeout(() => setGroup(null), 350); return () => clearTimeout(t); }
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const products: Item[] = [
    { ...n.products_links[0], target: { section: "assistant-vocal" }, image: "/products/assistant-soignante-chevet.jpg" },
    { ...n.products_links[1], target: { section: "tableau-de-pilotage" }, image: "/products/pilotage-idec.jpg" },
    { ...n.products_links[2], target: { section: "securite" }, visual: "secu" },
    { ...n.products_links[3], target: { section: "interoperabilite" }, visual: "interop" },
  ];
  const experience: Item[] = [
    { ...n.experience_links[0], target: { section: "temoignages" }, image: "/photos/nav/temoignages-equipe.jpg" },
    { ...n.experience_links[1], target: { href: "/ressources" }, image: "/photos/nav/ressources-equipe.jpg" },
    { ...n.experience_links[2], target: { section: "evenements" }, image: "/photos/nav/evenements-silvereco.jpg" },
    { ...n.experience_links[3], target: { href: "/roi" }, image: "/photos/nav/calculateur-pathos.jpg" },
  ];

  // Section de la page d'accueil : défilement si on y est, sinon navigation vers /#section
  const go = (target: Target) => {
    setOpen(false);
    if (target.href) { router.push(target.href); return; }
    if (!target.section) return;
    // L'assistant vocal et le tableau de pilotage partagent la même section : on sélectionne le bon
    const product = target.section === "assistant-vocal" ? "assistant" : target.section === "tableau-de-pilotage" ? "dashboard" : null;
    if (product) window.dispatchEvent(new CustomEvent(PRODUCT_EVENT, { detail: product }));
    const el = document.getElementById(target.section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else router.push(`/#${target.section}`);
  };

  return (
    <header className={`snav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="snav__in">
        <Link className="snav__brand" href="/" aria-label="Speakli, accueil">
          <Image src="/logo-speakli-navbar.png" alt="Speakli" width={152} height={30} priority />
        </Link>

        <nav className="snav__links" aria-label="Navigation principale">
          <Dropdown label={n.products} items={products} go={go} />
          <Dropdown label={n.experience} items={experience} go={go} />
        </nav>

        <div className="snav__cta">
          <LanguagePicker />
          <button type="button" className="snav-btn snav-btn--ghost" onClick={() => { setOpen(false); openContact("callback"); }}>{n.callback}</button>
          <a className="snav-btn" href={DEMO_URL} target="_blank" rel="noopener noreferrer">{n.demo}</a>
          <button
            type="button"
            className="snav__burger"
            aria-label={open ? n.menu_close : n.menu_open}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              {open ? <path d="M15 5L5 15M5 5l10 10" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran, en accordéon (inspiré de Vocca) */}
      {/* Toujours présents pour pouvoir animer l'ouverture et la fermeture */}
      <div className={`snav__backdrop${open ? " is-on" : ""}`} aria-hidden onClick={() => setOpen(false)} />
      {(
        <div className={`snav__drawer${open ? " is-on" : ""}`} aria-hidden={!open} inert={!open}>
          {([["products", n.products, products], ["experience", n.experience, experience]] as const).map(([key, label, list]) => (
            <div key={key} className={`snav-acc${group === key ? " is-open" : ""}`}>
              <button type="button" className="snav-acc__head" aria-expanded={group === key} onClick={() => setGroup(g => (g === key ? null : key))}>
                {label}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="snav-acc__body" inert={group !== key}>
                <div className="snav-acc__list">
                  {list.map(it => <button key={it.title} type="button" onClick={() => go(it.target)}><strong>{it.title}</strong><span>{it.desc}</span></button>)}
                </div>
              </div>
            </div>
          ))}
          <div className="snav-acc snav-acc--lang"><LanguagePicker /></div>
          <div className="snav__drawer-ctas">
            <a className="snav-btn" href={DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{n.demo}</a>
            <button type="button" className="snav-btn snav-btn--ghost" onClick={() => { setOpen(false); openContact("callback"); }}>{n.callback}</button>
          </div>
        </div>
      )}
    </header>
  );
}
