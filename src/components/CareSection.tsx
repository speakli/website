"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInView, motion } from "motion/react";

interface CareBlock {
  imageRight: boolean;
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  titleAccent: string;
  body: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
}

const BLOCKS: CareBlock[] = [
  {
    imageRight: true,
    image: "/photos/human/1.png",
    imageAlt: "Aide-soignante accompagnant un couple de résidents au repas",
    tag: "Temps libéré",
    title: "Du temps pour ce qui",
    titleAccent: "compte vraiment",
    body: "En réduisant la documentation à quelques secondes, Speakli redonne aux soignants la liberté de se consacrer pleinement à leurs résidents, plus de présence, moins d'administratif.",
    metric: "36'",
    metricLabel: "économisées par service et par soignant",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    imageRight: false,
    image: "/photos/human/12.png",
    imageAlt: "Soignante souriante avec une résidente près de la fenêtre",
    tag: "Traçabilité",
    title: "Chaque soin tracé",
    titleAccent: "sans effort",
    body: "La voix capte chaque moment de soin en temps réel. Plus besoin de retourner au bureau pour remplir le dossier résident, la traçabilité se fait naturellement, dans le mouvement.",
    metric: "+92 %",
    metricLabel: "des soins planifiés signés",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    imageRight: true,
    image: "/photos/human/14.png",
    imageAlt: "Soignante entourée de résidents dans un salon confortable",
    tag: "Bien-être des équipes",
    title: "Des équipes soignantes",
    titleAccent: "épanouies",
    body: "Moins de charge administrative, plus de sens au travail. Speakli allège le quotidien pour que vos soignants restent ce qu'ils sont : des professionnels de l'humain.",
    metric: "−20 %",
    metricLabel: "de congés maladie",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Block({ block, index }: { block: CareBlock; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const imgFirst = !block.imageRight;
  const dark = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
      style={{
        boxShadow: dark ? "0 8px 48px rgba(0,20,80,0.30)" : "0 8px 48px rgba(0,20,80,0.12)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,40,120,0.08)",
        minHeight: 440,
      }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden min-h-72 md:min-h-0${imgFirst ? " md:order-first" : " md:order-last"}`}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : { scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={block.image}
            alt={block.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className={`flex flex-col justify-center px-8 py-12 md:px-12${imgFirst ? " md:order-last" : " md:order-first"}`}
        style={{
          background: dark
            ? "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)"
            : "#ffffff",
        }}
        initial={{ opacity: 0, x: block.imageRight ? -28 : 28 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: block.imageRight ? -28 : 28 }}
        transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
      >
        {/* Tag + icon */}
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={dark
              ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(147,197,253,0.9)" }
              : { background: "var(--sp-50)", border: "1px solid var(--sp-100)", color: "var(--sp-500)" }
            }
          >
            {block.icon}
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: dark ? "rgba(147,197,253,0.85)" : "var(--sp-500)" }}
          >
            {block.tag}
          </span>
        </div>

        {/* Heading */}
        <h3
          className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4"
          style={{ color: dark ? "#ffffff" : "var(--sp-900)" }}
        >
          {block.title}{" "}
          <span style={{ color: dark ? "#60AAFF" : "var(--sp-500)" }}>{block.titleAccent}</span>
        </h3>

        {/* Body */}
        <p className="text-base leading-relaxed mb-7 text-left" style={{ color: dark ? "rgba(255,255,255,0.65)" : "#4A5568" }}>
          {block.body}
        </p>

        {/* Metric chip */}
        <div
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl self-center"
          style={dark
            ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }
            : { background: "var(--sp-50)", border: "1px solid var(--sp-100)" }
          }
        >
          <span className="text-lg sm:text-2xl font-extrabold leading-none" style={{ color: dark ? "#93C5FD" : "var(--sp-500)" }}>
            {block.metric}
          </span>
          <span className="text-xs sm:text-sm font-medium" style={{ color: dark ? "rgba(255,255,255,0.55)" : "#6B7280" }}>
            {block.metricLabel}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CareSection() {
  return (
    <section
      id="impact-quotidien"
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "transparent" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
            L&apos;impact au quotidien
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
            Speakli,{" "}
            <span style={{ color: "var(--sp-500)" }}>au cœur du soin</span>
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: "#4A5568" }}>
            Une technologie pensée pour s&apos;effacer derrière l&apos;essentiel : la relation humaine entre soignants et résidents.
          </p>
        </div>

        {/* Alternating blocks */}
        <div className="flex flex-col gap-6">
          {BLOCKS.map((block, i) => (
            <Block key={block.tag} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
