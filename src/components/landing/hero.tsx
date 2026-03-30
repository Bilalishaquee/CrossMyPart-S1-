"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Cpu, LogIn, Search, Upload, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingOrbs } from "@/components/landing/gsap-motion/floating-orbs";
import { HeroGsapHeadline } from "@/components/landing/gsap-motion/hero-gsap";

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

function HeroCards() {
  const cards = [
    { label: "A", title: "DigiKey", sub: "Exact US supply", tone: "from-amber-50 to-white border-amber-200/70 shadow-amber-100/40" },
    { label: "B", title: "LCSC", sub: "Asian alternative", tone: "from-teal-50 to-white border-teal-200/70 shadow-teal-100/40" },
    { label: "C", title: "Zephyr", sub: "Recommended", tone: "from-violet-50 to-white border-violet-300/80 shadow-violet-200/50" },
  ];

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl lg:max-w-2xl xl:max-w-[42rem]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Whole visual floats gently as one group */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ ...floatTransition, duration: 6.5 }}
        className="relative"
      >
        <svg
          className="absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] text-indigo-300/45 lg:-inset-12"
          viewBox="0 0 520 360"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M260 52 L120 168 M260 52 L260 168 M260 52 L400 168"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, ease: "easeInOut", delay: 0.25 }}
          />
          <motion.circle
            cx="260"
            cy="52"
            r="9"
            className="fill-indigo-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.08, type: "spring", stiffness: 260 }}
          />
          <motion.circle
            cx="260"
            cy="52"
            r="18"
            className="fill-indigo-400/25"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        <div className="relative flex flex-col items-center gap-8 pt-2 sm:gap-10">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/95 px-7 py-4 text-base shadow-lg shadow-slate-200/50 backdrop-blur-md sm:px-8 sm:py-4 sm:text-lg"
          >
            <Search className="h-6 w-6 shrink-0 text-indigo-600 sm:h-7 sm:w-7" />
            <span className="font-mono text-lg font-semibold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
              STM32F407VGT6
            </span>
            <motion.span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.7)]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 md:gap-6">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4.2 + i * 0.45,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className={`h-full rounded-3xl border-2 bg-gradient-to-b p-6 shadow-xl sm:p-7 ${c.tone}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Option {c.label}</span>
                    <Cpu className="h-6 w-6 shrink-0 text-slate-400 sm:h-7 sm:w-7" />
                  </div>
                  <p className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">{c.title}</p>
                  <p className="mt-2 text-sm leading-snug text-slate-600 sm:text-base">{c.sub}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LandingHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-slate-200/60 cmp-radial-hero cmp-grid-bg"
    >
      <FloatingOrbs />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-14 px-4 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28 xl:gap-20">
        <motion.div style={{ y }} className="max-w-xl lg:max-w-none">
          <HeroGsapHeadline />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Input
              readOnly
              placeholder="Try a part number (preview)"
              className="h-12 flex-1 border-slate-200 bg-white/90 text-base shadow-inner shadow-slate-200/50"
              defaultValue="STM32F407VGT6"
            />
            <Button size="lg" className="h-12 shrink-0 gap-2" asChild>
              <Link href="/auth/signin?redirect=%2Fsearch%2Fresults%3Fq%3DSTM32F407VGT6">
                Preview results
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-2 text-xs text-slate-500">
            Opens sign-in, then sample results after authentication (demo).
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Button size="lg" className="h-12 gap-2" asChild>
              <Link href="/auth/signin?redirect=%2Fsearch">
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="h-12 gap-2" asChild>
              <Link href="/auth/signup?redirect=%2Fsearch">
                <UserPlus className="h-4 w-4" />
                Create account
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12" asChild>
              <Link href="/auth/signin?redirect=%2Fbom">
                <Upload className="h-4 w-4" />
                BOM (after sign-in)
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="flex min-h-[420px] items-center justify-center lg:min-h-[480px] xl:min-h-[520px]">
          <HeroCards />
        </div>
      </div>
    </section>
  );
}
