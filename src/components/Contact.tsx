"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

const DEMO_URL = "https://calendly.com/ruben-speakli/30min";

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  etablissement: string;
  message: string;
}

const INITIAL: FormState = { prenom: "", nom: "", email: "", telephone: "", etablissement: "", message: "" };

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
        body: JSON.stringify(form),
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
    outline: "none",
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
              style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
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
                  style={{ color: "rgba(0,122,255,0.9)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  {c.tag}
                </p>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5 tracking-tight leading-tight"
                  style={{ color: "#ffffff" }}
                >
                  {c.title}<br />
                  <span style={{ color: "#007AFF" }}>{c.title_accent}</span>
                </h2>
                <p className="mb-8 leading-relaxed font-medium text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {c.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {c.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(0,122,255,0.25)", border: "1px solid rgba(0,122,255,0.4)" }}
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
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center justify-center gap-2.5 font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 20px rgba(0,122,255,0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,122,255,0.60), 0 1px 0 rgba(255,255,255,0.12) inset"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,122,255,0.45), 0 1px 0 rgba(255,255,255,0.12) inset"; }}
              >
                {c.cta}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Right — contact form */}
            <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center" style={{ backgroundColor: "#ffffff" }}>
              {status === "sent" ? (
                <div className="text-center py-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(0,122,255,0.10)" }}
                  >
                    <svg width="24" height="24" fill="none" stroke="#007AFF" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg mb-1" style={{ color: "var(--sp-900)" }}>{c.success_title}</p>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{c.success_desc}</p>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "var(--sp-900)" }}>
                    {c.form_title}
                  </h3>
                  <p className="text-sm font-medium mb-7" style={{ color: "#9CA3AF" }}>
                    {c.form_subtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                          {c.first_name} <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          required
                          placeholder={c.first_name_placeholder}
                          value={form.prenom}
                          onChange={handleChange}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                          {c.last_name} <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="nom"
                          required
                          placeholder={c.last_name_placeholder}
                          value={form.nom}
                          onChange={handleChange}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                        {c.email} <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={c.email_placeholder}
                        value={form.email}
                        onChange={handleChange}
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                        {c.phone} <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        required
                        placeholder={c.phone_placeholder}
                        value={form.telephone}
                        onChange={handleChange}
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                        {c.etablissement} <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="etablissement"
                        required
                        placeholder={c.etablissement_placeholder}
                        value={form.etablissement}
                        onChange={handleChange}
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: "var(--sp-700)" }}>
                        {c.message_label} <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder={c.message_placeholder}
                        value={form.message}
                        onChange={handleChange}
                        style={{ ...inputBase, resize: "none" }}
                        onFocus={(e) => { e.target.style.borderColor = "var(--sp-500)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(0,40,120,0.12)"; }}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs font-medium" style={{ color: "#ef4444" }}>
                        {c.error_msg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)",
                        color: "#ffffff",
                        boxShadow: "0 4px 14px rgba(0,122,255,0.35)",
                      }}
                    >
                      {status === "sending" ? c.sending : c.submit}
                      {status !== "sending" && (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      {c.privacy}{" "}
                      <a href="/politique-de-confidentialite" className="underline hover:opacity-70" style={{ color: "var(--sp-500)" }}>
                        {c.privacy_link}
                      </a>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
