"use client";

import { motion } from "framer-motion";

const TAGS = [
  "Part-number intelligence",
  "DigiKey · LCSC · Zephyr",
  "BOM resolution",
  "Attribute matrix",
  "Enterprise sourcing",
  "Mock data demo",
];

export function TechMarquee() {
  const doubled = [...TAGS, ...TAGS, ...TAGS];
  return (
    <div className="relative overflow-hidden border-y border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-5 md:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.06),transparent)]" />
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap md:gap-14"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10 md:gap-14">
            <span className="bg-gradient-to-r from-slate-200 via-indigo-200 to-teal-200 bg-clip-text text-base font-semibold uppercase tracking-[0.2em] text-transparent md:text-lg">
              {t}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60 shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
