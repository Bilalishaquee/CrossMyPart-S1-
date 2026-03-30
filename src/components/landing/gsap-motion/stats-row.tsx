"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsapPlugins } from "./register-gsap";

const STATS = [
  { label: "Parts indexed (demo)", end: 128400, suffix: "+" },
  { label: "Sourcing paths", end: 3, suffix: "" },
  { label: "Avg. match score", end: 96, suffix: "%" },
];

export function GsapStatsRow() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const blocks = gsap.utils.toArray<HTMLElement>(root.current?.querySelectorAll("[data-stat]") ?? []);
      blocks.forEach((block, i) => {
        const end = STATS[i]?.end ?? 0;
        const suf = STATS[i]?.suffix ?? "";
        const obj = { n: 0 };
        gsap.to(obj, {
          n: end,
          duration: 2.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const v = Math.round(obj.n);
            if (suf === "+") block.textContent = `${v.toLocaleString()}+`;
            else if (suf === "%") block.textContent = `${v}%`;
            else block.textContent = String(v);
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-100/90 via-white to-slate-50/80 py-16 md:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[80%] -translate-x-1/2 bg-gradient-to-b from-indigo-200/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 cmp-grid-bg opacity-[0.2]" />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-indigo-800/80 md:text-sm"
      >
        At a glance
      </motion.p>
      <div className="relative z-10 mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3 lg:px-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-3xl border border-slate-200/90 bg-white/95 p-8 text-center shadow-lg shadow-slate-200/40 backdrop-blur-sm md:p-10"
          >
            <p
              data-stat
              className="bg-gradient-to-br from-slate-900 to-indigo-900 bg-clip-text text-4xl font-bold tabular-nums text-transparent sm:text-5xl md:text-6xl"
            >
              0
            </p>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 opacity-80" />
            <p className="mt-4 text-sm font-semibold text-slate-600 md:text-base">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
