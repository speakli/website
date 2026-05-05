"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useInView } from "motion/react";
import CountUp from "./CountUp";
import { useLanguage } from "@/context/LanguageContext";

const STAT_CONFIGS = [
  {
    prefix: "+", numTo: 30000, suffix: "", separator: "\u00a0",
    image: "/photos/human/13.png",
    imageAlt: "Soignante aidant une résidente à s'habiller",
    bg: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)",
    imageTop: false,
  },
  {
    prefix: "", numTo: 3, suffix: "×", separator: "",
    image: "/photos/human/2.png",
    imageAlt: "Aide-soignante accompagnant une résidente en fauteuil roulant",
    bg: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)",
    imageTop: true,
  },
  {
    prefix: "", numTo: 3, suffix: "h", separator: "",
    image: "/photos/human/17.png",
    imageAlt: "Soignante accompagnant tendrement un résident vers la fenêtre",
    imagePosition: "28% center",
    bg: "linear-gradient(135deg, #1A5CE0 0%, #007AFF 100%)",
    imageTop: false,
  },
  {
    prefix: "", numTo: 98, suffix: "%", separator: "",
    image: "/photos/human/10.png",
    imageAlt: "Soignante montrant son téléphone à une résidente",
    bg: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)",
    imageTop: true,
  },
];

const Y_RANGES: [number, number][] = [
  [35, -35],
  [-30, 30],
  [25, -25],
  [-28, 28],
];

type StatEntry = typeof STAT_CONFIGS[number] & { label: string; sub: string; imagePosition?: string };

function StatCard({ stat, index, scrollingDown }: { stat: StatEntry; index: number; scrollingDown: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [triggered, setTriggered] = useState(false);
  const base = index * 0.12;

  useEffect(() => {
    if (inView && scrollingDown && !triggered) {
      setTriggered(true);
    }
  }, [inView, scrollingDown, triggered]);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-4 sm:p-7 flex flex-col justify-center overflow-hidden text-left"
      style={{ background: stat.bg, aspectRatio: "1 / 1" }}
    >
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: base }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-none"
          style={{ color: "#fff" }}
        >
          {stat.prefix}
          <CountUp
            from={0}
            to={stat.numTo}
            suffix={stat.suffix}
            duration={stat.numTo >= 10000 ? 1.5 : 2}
            separator={stat.separator}
            startWhen={triggered}
          />
        </motion.div>

        <div className="flex flex-col gap-1.5">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={triggered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: base + 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base font-bold leading-snug"
            style={{ color: "rgba(255,255,255,0.95)", textAlign: "left" }}
          >
            {stat.label}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={triggered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: base + 0.62, ease: "easeOut" }}
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.55)", textAlign: "left" }}
          >
            {stat.sub}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ stat }: { stat: StatEntry }) {
  return (
    <div className="rounded-3xl overflow-hidden relative" style={{ aspectRatio: "1 / 1" }}>
      <Image
        src={stat.image}
        alt={stat.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
        style={{ objectPosition: stat.imagePosition ?? "center center" }}
      />
    </div>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const ss = t.stats_section;
  const STATS: StatEntry[] = STAT_CONFIGS.map((cfg, i) => ({
    ...cfg,
    label: t.stats[i].label,
    sub: t.stats[i].sub,
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y0 = useTransform(scrollYProgress, [0, 1], Y_RANGES[0]);
  const y1 = useTransform(scrollYProgress, [0, 1], Y_RANGES[1]);
  const y2 = useTransform(scrollYProgress, [0, 1], Y_RANGES[2]);
  const y3 = useTransform(scrollYProgress, [0, 1], Y_RANGES[3]);
  const yValues = [y0, y1, y2, y3];

  const [scrollingDown, setScrollingDown] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrollingDown(y >= lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            {ss.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--sp-900)" }}>
            {ss.h2}{" "}
            <span style={{ color: "var(--sp-500)" }}>{ss.h2_accent}</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {STATS.map((stat, i) => (
            <motion.div key={i} style={{ y: isMobile ? 0 : yValues[i] }} className="flex flex-col gap-4">
              {stat.imageTop ? (
                <>
                  <PhotoCard stat={stat} />
                  <StatCard stat={stat} index={i} scrollingDown={scrollingDown} />
                </>
              ) : (
                <>
                  <StatCard stat={stat} index={i} scrollingDown={scrollingDown} />
                  <PhotoCard stat={stat} />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
