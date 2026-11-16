"use client";

import { useEffect, useState, FormEvent } from "react";
import { CONTACT_MODE_EVENT, type ContactMode } from "@/lib/contactMode";
import { useLanguage } from "@/context/LanguageContext";

const DEMO_URL = "https://meetings-eu1.hubspot.com/ruben-weinstein";

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  etablissement: string;
  message: string;
}

const INITIAL: FormState = { prenom: "", nom: "", email: "", telephone: "", etablissement: "", message: "" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>{label} <span style={{ color: "#ef4444" }}>*</span></span>
      {children}
    </label>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Deux façons d'échanger : choisir un créneau de démo, ou être rappelé
  const [mode, setMode] = useState<ContactMode>("slot");
  const [time, setTime] = useState(0);

  useEffect(() => {
    const onMode = (e: Event) => setMode((e as CustomEvent<ContactMode>).detail);
    window.addEventListener(CONTACT_MODE_EVENT, onMode);
    const fromUrl = new URLSearchParams(window.location.search).get("contact");
    if (fromUrl === "callback" || fromUrl === "slot") onMode(new CustomEvent(CONTACT_MODE_EVENT, { detail: fromUrl }));
    return () => window.removeEventListener(CONTACT_MODE_EVENT, onMode);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `${c.callback_message} · ${c.callback_times[time]}${form.message ? ` · ${form.message}` : ""}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--sp-900)",
    background: "#fff",
    border: "1px solid rgba(0,40,120,0.12)",
    borderRadius: "0.625rem",
    transition: "border-color 0.15s ease",
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="contact" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 24px 80px rgba(0,40,120,0.12), 0 4px 16px rgba(0,40,120,0.06)",
            border: "1px solid rgba(0,40,120,0.08)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left — dark CTA panel */}
            <div
              className="p-6 sm:p-10 md:p-14 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "radial-gradient(70% 55% at 50% 35%, rgba(96, 170, 255, 0.45) 0%, rgba(96, 170, 255, 0) 100%), linear-gradient(160deg, #1677FF 0%, #1A5CE0 50%, #0D30A0 100%)" }}
            >
              <div
                className="absolute pointer-events-none"
                style={{
                  top: -80, right: -80, width: 280, height: 280,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,122,255,0.18) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: -60, left: -60, width: 200, height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(17,66,192,0.20) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-5 inline-flex items-center gap-2"
                  style={{ color: "#BFDBFF" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#BFDBFF" }} />
                  {c.tag}
                </p>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5 tracking-tight leading-tight"
                  style={{ color: "#ffffff" }}
                >
                  {mode === "callback" ? c.cb_title : c.title}<br />
                  <span style={{ color: "#BFDBFF" }}>{mode === "callback" ? c.cb_title_accent : c.title_accent}</span>
                </h2>
                <p className="mb-8 leading-relaxed font-medium text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {mode === "callback" ? c.cb_description : c.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {(mode === "callback" ? c.cb_bullets : c.bullets).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#ffffff", border: "1px solid rgba(255,255,255,0.6)" }}
                      >
                        <svg width="10" height="10" fill="none" stroke="#007AFF" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — « Comment préférez-vous échanger ? » */}
            <div className="p-6 sm:p-10 md:p-12 flex flex-col" style={{ backgroundColor: "#ffffff" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "var(--sp-900)" }}>{c.choose_title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6" role="radiogroup">
                {([["slot", c.slot_title, c.slot_sub], ["callback", c.callback_title, c.callback_sub]] as const).map(([m, title, sub]) => {
                  const on = mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setMode(m)}
                      className="text-left rounded-2xl px-4 py-3.5 transition-all duration-200"
                      style={{
                        border: `1.5px solid ${on ? "var(--sp-500)" : "rgba(0,40,120,0.12)"}`,
                        background: on ? "#EAF3FF" : "#fff",
                        boxShadow: on ? "0 8px 24px -12px rgba(0,122,255,0.45)" : "none",
                      }}
                    >
                      <span className="flex items-center gap-2 font-bold text-sm" style={{ color: "var(--sp-900)" }}>
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ border: `2px solid ${on ? "var(--sp-500)" : "#C5CDD8"}`, boxShadow: on ? "inset 0 0 0 3px #fff" : "none", background: on ? "var(--sp-500)" : "#fff" }}
                        />
                        {title}
                      </span>
                      <span className="block text-xs mt-1 ml-6" style={{ color: "#7A8699" }}>{sub}</span>
                    </button>
                  );
                })}
              </div>

              {mode === "slot" ? (
                <div className="flex flex-col gap-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>{c.slot_text}</p>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 self-start"
                    style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", color: "#ffffff", boxShadow: "0 4px 14px rgba(0,122,255,0.35)" }}
                  >
                    {c.slot_cta}
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ) : status === "sent" ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(0,122,255,0.10)" }}>
                    <svg width="24" height="24" fill="none" stroke="#007AFF" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg mb-1" style={{ color: "var(--sp-900)" }}>{c.callback_success}</p>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{c.callback_success_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label={c.first_name}><input type="text" name="prenom" required placeholder={c.first_name_placeholder} value={form.prenom} onChange={handleChange} style={inputBase} /></Field>
                    <Field label={c.last_name}><input type="text" name="nom" required placeholder={c.last_name_placeholder} value={form.nom} onChange={handleChange} style={inputBase} /></Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label={c.phone}><input type="tel" name="telephone" required placeholder={c.phone_placeholder} value={form.telephone} onChange={handleChange} style={inputBase} /></Field>
                    <Field label={c.email}><input type="email" name="email" required placeholder={c.email_placeholder} value={form.email} onChange={handleChange} style={inputBase} /></Field>
                  </div>
                  <Field label={c.etablissement}><input type="text" name="etablissement" required placeholder={c.etablissement_placeholder} value={form.etablissement} onChange={handleChange} style={inputBase} /></Field>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>{c.callback_time}</span>
                    <div className="flex gap-2">
                      {c.callback_times.map((label, i) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setTime(i)}
                          className="flex-1 text-xs font-semibold py-2 rounded-lg transition-colors"
                          style={{ border: `1px solid ${time === i ? "var(--sp-500)" : "rgba(0,40,120,0.12)"}`, background: time === i ? "#EAF3FF" : "#fff", color: time === i ? "var(--sp-700)" : "#6B7280" }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>{c.callback_more}</span>
                    <textarea name="message" rows={3} placeholder={c.callback_more_placeholder} value={form.message} onChange={handleChange} style={{ ...inputBase, resize: "none" }} />
                  </label>

                  {status === "error" && <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{c.error_msg}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 mt-1"
                    style={{ background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)", color: "#ffffff", boxShadow: "0 4px 14px rgba(0,122,255,0.35)" }}
                  >
                    {status === "sending" ? c.sending : c.callback_submit}
                  </button>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    {c.privacy}{" "}
                    <a href="/politique-de-confidentialite" className="underline hover:opacity-70" style={{ color: "var(--sp-500)" }}>{c.privacy_link}</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
