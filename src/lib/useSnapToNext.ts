"use client";

// Défile en douceur jusqu'au bloc qui suit `el`
export function scrollToNext(el: HTMLElement | null) {
  const next = el?.nextElementSibling as HTMLElement | null;
  if (!el || !next) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY, behavior: reduced ? "auto" : "smooth" });
}
