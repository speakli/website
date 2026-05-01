"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  separator?: string; // e.g. " " for "3 400"
  label: string;
  duration?: number; // ms
}

export default function StatCounter({
  target,
  prefix = "",
  suffix = "",
  separator = "",
  label,
  duration = 1400,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // ease-out: fast at start, slow at end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(progress * target));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  const formatted = separator
    ? count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : count.toString();

  return (
    <div ref={ref} className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--sp-50)", border: "1px solid var(--sp-100)" }}>
      <p className="text-3xl font-extrabold mb-1" style={{ color: "var(--sp-500)" }}>
        {prefix}{formatted}{suffix}
      </p>
      <p className="text-sm font-medium" style={{ color: "#4A5568" }}>
        {label}
      </p>
    </div>
  );
}
