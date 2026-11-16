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
    <div className="group" style={{ borderBottom: "1px solid rgba(26,46,73,0.08)" }}>
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
          style={{ color: isOpen ? "var(--sp-900)" : "#3B4A60" }}
        >
          {question}
        </span>

        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5"
          style={{
            backgroundColor: isOpen ? "var(--sp-500)" : "#EAF3FF",
            color: isOpen ? "#fff" : "var(--sp-500)",
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
            style={{ color: "#5B6B82", paddingLeft: "calc(1.75rem + 1.25rem)" }}
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
    <section className="py-16 sm:py-24 px-4 sm:px-6" id="faq" style={{ background: "linear-gradient(180deg, #ffffff 0%, #F4F8FF 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            {f.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
            {f.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{f.h2_accent}</span>
          </h2>
          <p className="text-lg font-medium" style={{ color: "#5B6B82" }}>
            {f.subtitle}
          </p>
        </div>

        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "#ffffff", border: "1px solid rgba(0,40,120,0.08)", boxShadow: "0 24px 50px -32px rgba(13,48,160,0.45)" }}
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

        <p className="text-center text-sm font-medium mt-8" style={{ color: "#7A8699" }}>
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
