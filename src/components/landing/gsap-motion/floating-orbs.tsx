"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsapPlugins } from "./register-gsap";

export function FloatingOrbs() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const orbs = gsap.utils.toArray<HTMLElement>(root.current?.querySelectorAll(".orb") ?? []);
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? 28 : -22,
          x: i % 4 === 0 ? 12 : -10,
          scale: 1.04,
          duration: 4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="orb absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.35),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <div
        className="orb absolute -right-10 top-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.28),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <div
        className="orb absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.22),transparent_65%)] blur-2xl"
        aria-hidden
      />
    </div>
  );
}
