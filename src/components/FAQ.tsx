"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function FAQItem({ question, answer, index, isOpen, onToggle }: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        className="w-full flex items-start gap-5 py-6 text-left transition-colors duration-150"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="flex-shrink-0 text-xs font-bold tabular-nums mt-0.5 transition-colors duration-200"
          style={{ color: "var(--sp-500)", minWidth: "1.75rem" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="flex-1 font-semibold text-base leading-snug transition-colors duration-200 pr-4"
          style={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.78)" }}
        >
          {question}
        </span>

        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5"
          style={{
            backgroundColor: isOpen ? "var(--sp-500)" : "rgba(255,255,255,0.08)",
            color: isOpen ? "#fff" : "rgba(255,255,255,0.5)",
          }}
        >
          <svg
            width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.28s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div
            className="pb-6 text-sm leading-relaxed font-medium"
            style={{ color: "rgba(255,255,255,0.50)", paddingLeft: "calc(1.75rem + 1.25rem)" }}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="faq" style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            {f.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "#ffffff" }}>
            {f.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{f.h2_accent}</span>
          </h2>
          <p className="text-lg font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
            {f.subtitle}
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 40px rgba(0,0,0,0.20)" }}
        >
          <div className="px-4 sm:px-8">
            {f.items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-sm font-medium mt-8" style={{ color: "rgba(255,255,255,0.35)" }}>
          {f.contact_text}{" "}
          <a
            href="mailto:contact@speakli.fr"
            className="font-semibold transition-colors duration-150 hover:underline"
            style={{ color: "var(--sp-500)" }}
          >
            {f.contact_link}
          </a>
        </p>
      </div>
    </section>
  );
}
