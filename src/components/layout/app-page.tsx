"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Standard page width + vertical rhythm + subtle radial backdrop (app shell). */
export function AppPageContainer({
  children,
  className,
  maxWidth = "max-w-[1400px]",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(99,102,241,0.07),transparent_55%)]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/5 blur-3xl" />
      </div>
      <div
        className={cn(
          "relative mx-auto py-8 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:py-10 md:py-12 lg:pl-8 lg:pr-8",
          maxWidth
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AppPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-6 border-b border-slate-200/80 pb-6 sm:mb-8 sm:pb-8 md:mb-10 md:pb-10">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-800/85 md:text-sm">{eyebrow}</p>
      ) : null}
      <div className={cn("mt-2 flex flex-col gap-6", eyebrow && "mt-3")}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-[2rem] lg:leading-snug">
              {title}
            </h1>
            {description ? (
              <div className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{description}</div>
            ) : null}
          </div>
          {action ? (
            <div className="w-full shrink-0 lg:w-auto [&_a]:w-full [&_button]:w-full sm:[&_a]:w-auto sm:[&_button]:w-auto">
              {action}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/** Consistent elevated surface for primary content blocks. */
export function AppSurface({
  children,
  className,
  padding = "p-4 sm:p-6 md:p-8",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white/95 shadow-lg shadow-slate-200/40 backdrop-blur-sm",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}

export function AppTableWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "cmp-scroll-x-touch rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/30",
        className
      )}
    >
      {children}
    </div>
  );
}
