"use client";

import * as React from "react";
import Link from "next/link";
import { Cpu, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pad =
  "pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:pl-4 sm:pr-4 lg:pl-8 lg:pr-8";

export function LandingNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className={cn("mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-2", pad)}>
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-md">
            <Cpu className="h-5 w-5" aria-hidden />
          </span>
          <span className="truncate">CrossMyPart</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Marketing">
          <Button variant="ghost" className="text-slate-700" asChild>
            <Link href="#how-it-works">Product</Link>
          </Button>
          <Button variant="ghost" className="text-slate-700" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button className="bg-indigo-700 text-white hover:bg-indigo-800" asChild>
            <Link href="/auth/signup?redirect=%2Fsearch">Get started</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1.5 md:hidden">
          <Button variant="ghost" size="sm" className="px-2 text-slate-700" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button size="sm" className="bg-indigo-700 px-3 text-white hover:bg-indigo-800" asChild>
            <Link href="/auth/signup?redirect=%2Fsearch">Start</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="landing-mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm md:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="landing-mobile-nav"
            className="fixed inset-x-0 top-14 z-50 border-b border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md md:hidden"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
          >
            <ul className="space-y-1">
              <li>
                <Link
                  href="#how-it-works"
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  Product overview
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signin"
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup?redirect=%2Fsearch"
                  className="block rounded-xl bg-indigo-700 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-800"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}
