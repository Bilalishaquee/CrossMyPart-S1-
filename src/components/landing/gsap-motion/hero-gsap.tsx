"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsapPlugins } from "./register-gsap";

const HEADLINE_LINES = [
  "Find exact parts, global alternatives,",
  "and Zephyr-recommended options in one",
  "intelligent sourcing workflow.",
];

export function HeroGsapHeadline() {
  const root = useRef<HTMLDivElement>(null);
  const floatWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const lines = gsap.utils.toArray<HTMLElement>(root.current?.querySelectorAll(".hl-line") ?? []);
      const sub = root.current?.querySelector(".hl-sub") as HTMLElement | null;
      const wrap = floatWrap.current;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        delay: 0.12,
      });
      if (sub) {
        tl.from(sub, { opacity: 0, y: 28, duration: 0.65, ease: "power2.out" }, "-=0.35");
      }

      /* One shared drift for eyebrow + headline — avoids out-of-sync per-line yoyo (felt jittery). */
      tl.eventCallback("onComplete", () => {
        if (!wrap) return;
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }
        gsap.to(wrap, {
          y: 5,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div ref={floatWrap} className="will-change-transform">
        <div className="overflow-hidden">
          <p className="hl-line text-base font-semibold uppercase tracking-[0.2em] sm:text-lg">
            <span className="hero-moving-eyebrow inline-block">Intelligent component sourcing</span>
          </p>
        </div>
        <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-2.5">
          {HEADLINE_LINES.map((line, idx) => (
            <div key={line} className="overflow-hidden">
              <h1
                className="hl-line text-[1.65rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.12]"
                style={{ animationDelay: `${idx * 0.35}s` }}
              >
                <span className="hero-moving-headline inline-block">{line}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
      <p className="hl-sub mt-7 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Compare American supply, Asian alternatives, and recommended distributor options in a clean technical interface
        built for engineering and procurement teams.
      </p>
    </div>
  );
}
