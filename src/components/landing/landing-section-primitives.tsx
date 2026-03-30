"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const landingFadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export function LandingSectionBg({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className={cn("pointer-events-none absolute inset-0 cmp-grid-bg opacity-[0.28]", className)} />
      {children}
    </>
  );
}

export function LandingEyebrow({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.p
      {...landingFadeUp}
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.3em] text-indigo-800/85 md:text-sm",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {children}
    </motion.p>
  );
}

export function LandingHeading({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.h2
      {...landingFadeUp}
      transition={{ ...landingFadeUp.transition, delay: 0.05 }}
      className={cn(
        "text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem] lg:leading-tight",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}

export function LandingLead({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.p
      {...landingFadeUp}
      transition={{ ...landingFadeUp.transition, delay: 0.1 }}
      className={cn(
        "mt-4 text-base leading-relaxed text-slate-600 md:text-lg",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className
      )}
    >
      {children}
    </motion.p>
  );
}

export function LandingGlowOrbs({ variant = "default" }: { variant?: "default" | "teal" | "violet" }) {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl",
          variant === "violet" ? "bg-violet-400/15" : variant === "teal" ? "bg-teal-400/15" : "bg-indigo-400/12"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full blur-3xl",
          variant === "violet" ? "bg-indigo-500/10" : variant === "teal" ? "bg-indigo-400/10" : "bg-teal-400/10"
        )}
      />
    </>
  );
}

type MotionDivProps = HTMLMotionProps<"div">;

export function MotionPanel(props: MotionDivProps & { className?: string }) {
  const { className, children, ...rest } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm md:p-8",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
