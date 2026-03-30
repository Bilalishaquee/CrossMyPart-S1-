"use client";

import * as React from "react";
import { useId, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsapPlugins } from "./register-gsap";
import { cn } from "@/lib/utils";

export function GsapScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = root.current;
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 48,
        duration: 0.75,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: root, dependencies: [delay] }
  );

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}

const FLOW_STEPS = [
  { key: "Search", blurb: "Part number or BOM" },
  { key: "Compare", blurb: "Three sourcing paths" },
  { key: "Decide", blurb: "Cart & checkout" },
] as const;

/** Large premium “platform flow” diagram with GSAP draw + stagger + Framer hover. */
export function GsapPipelineVisual() {
  const uid = useId().replace(/:/g, "");
  const gradId = `flow-grad-${uid}`;
  const glowId = `flow-glow-${uid}`;
  const root = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const path = pathRef.current;
      const wrap = root.current;
      if (!path || !wrap) return;

      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      const nodes = wrap.querySelectorAll<SVGGElement>(".flow-node-ring");
      const labelBlocks = wrap.querySelectorAll<HTMLElement>(".flow-step-block");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      });

      tl.from(
        nodes,
        {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
          duration: 0.55,
          stagger: 0.18,
          ease: "back.out(1.85)",
        },
        "-=1.35"
      );

      tl.from(
        labelBlocks,
        {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.95"
      );

      nodes.forEach((node, i) => {
        gsap.to(node, {
          scale: 1.06,
          transformOrigin: "center center",
          duration: 2.2 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4 + i * 0.25,
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative border-b border-slate-200/80 bg-gradient-to-b from-slate-50/95 via-white to-slate-50/50 py-16 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 cmp-grid-bg opacity-[0.35]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(520px,70vw)] w-[min(520px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-indigo-800/80 md:text-sm"
        >
          Platform flow
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 md:text-base"
        >
          From first query to procurement decision — one continuous workflow.
        </motion.p>

        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md md:mt-14 md:p-10 lg:p-12">
          <svg
            viewBox="0 0 800 200"
            className="mx-auto h-auto w-full max-h-[min(280px,40vw)] md:max-h-[320px]"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(79 70 229)" />
                <stop offset="45%" stopColor="rgb(13 148 136)" />
                <stop offset="100%" stopColor="rgb(124 58 237)" />
              </linearGradient>
              <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={pathRef}
              d="M 100 130 L 250 48 L 400 130 L 550 48 L 700 130"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${glowId})`}
            />
            {[
              { x: 100, y: 130 },
              { x: 400, y: 130 },
              { x: 700, y: 130 },
            ].map((pt, i) => (
              <g key={i} className="flow-node-ring" transform={`translate(${pt.x} ${pt.y})`}>
                <circle r="22" fill="rgb(255 255 255)" stroke={`url(#${gradId})`} strokeWidth="3" />
                <circle r="8" fill="rgb(99 102 241)" className="opacity-90" />
              </g>
            ))}
          </svg>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-3 sm:gap-4 md:gap-8">
            {FLOW_STEPS.map((step) => (
              <motion.div
                key={step.key}
                className="flow-step-block group text-center"
                initial={false}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="mx-auto flex h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 via-teal-500 to-violet-500 opacity-80" />
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-[2.125rem]">
                  {step.key}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">{step.blurb}</p>
                <div className="mx-auto mt-4 h-px max-w-[140px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GsapParallaxStrip() {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      registerGsapPlugins();
      const layers = gsap.utils.toArray<HTMLElement>(root.current?.querySelectorAll(".par") ?? []);
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          y: (i + 1) * -18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/60 to-white py-20 md:py-24 lg:py-28"
    >
      <div className="par absolute inset-0 opacity-[0.08] cmp-grid-bg" />
      <div className="par absolute -left-10 top-10 h-48 w-48 rounded-full bg-indigo-400/35 blur-3xl" />
      <div className="par absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-teal-400/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[min(90%,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-800/80 md:text-sm"
        >
          Continue the journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem] lg:leading-tight"
        >
          Motion + data — built for stakeholder demos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg"
        >
          GSAP scroll choreography, Framer micro-interactions, and a clear three-path story — then sign in to use the
          workspace.
        </motion.p>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/auth/signin")}
          className="mt-10 inline-flex rounded-2xl bg-gradient-to-r from-indigo-700 to-indigo-900 px-10 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-900/25 transition-colors hover:from-indigo-600 hover:to-indigo-800"
        >
          Enter platform
        </motion.button>
      </div>
    </div>
  );
}
