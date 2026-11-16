"use client";

// Ouvre le formulaire de contact en bas de page sur l'option voulue :
// « slot » (choisir un créneau de démo) ou « callback » (être rappelé).
export type ContactMode = "slot" | "callback";
export const CONTACT_MODE_EVENT = "speakli:contact-mode";

export function openContact(mode: ContactMode) {
  const el = document.getElementById("contact");
  if (!el) {
    window.location.href = `/?contact=${mode}#contact`;
    return;
  }
  window.dispatchEvent(new CustomEvent<ContactMode>(CONTACT_MODE_EVENT, { detail: mode }));
  el.scrollIntoView({ behavior: "smooth" });
}
