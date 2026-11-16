"use client";
import "./EventsSection.css";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import CtaPair from "./CtaPair";
import { BLOG_ARTICLES } from "@/lib/blog-articles";

// « Où nous retrouver » : les prochains salons et colloques où Speakli est présent
export default function EventsSection() {
  const { t } = useLanguage();
  const e = t.events;
  return (
    <section id="evenements" className="events">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="events__eyebrow">{e.eyebrow}</p>
            <h2 className="events__title">{e.title} <span>{e.accent}</span></h2>
            <p className="events__lede">{e.lede}</p>
          </div>
          <CtaPair />
        </div>

        <div className="events__layout">
        <ol className="events__list">
          {e.items.map(ev => (
            <li key={ev.name} className="event">
              <div className={`event__logo${ev.dark ? " is-dark" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ev.logo} alt={ev.name} />
              </div>
              <div className="event__body">
                <p className="event__date"><b>{ev.day}</b><span>{ev.month}</span></p>
                <h3 className="event__name">{ev.name}</h3>
                <p className="event__sub">{ev.sub}</p>
                <p className="event__place">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                  {ev.place}
                </p>
                {ev.stand && <span className="event__stand">{ev.stand}</span>}
                {ev.url && (
                  <a href={ev.url} target="_blank" rel="noopener noreferrer" className="event__link">
                    {e.more}
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Quelques ressources, à côté des évènements */}
        <aside className="events__res">
          <div className="events__res-head">
            <h3>{e.res_title}</h3>
            <Link href="/ressources">{e.res_all}</Link>
          </div>
          <ul>
            {e.res_items.map(r => {
              const a = BLOG_ARTICLES.find(x => x.slug === r.slug);
              if (!a) return null;
              return (
                <li key={r.slug}>
                  <Link href={`/blog/${a.slug}`} className="events__res-item">
                    <span>
                      <small>{r.tag}</small>
                      <b>{a.title}</b>
                    </span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        </div>
      </div>
    </section>
  );
}
