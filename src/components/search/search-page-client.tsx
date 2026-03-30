"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PARTS, suggestParts } from "@/lib/mock/parts";
import { AppPageContainer, AppPageHeader, AppSurface } from "@/components/layout/app-page";

export function SearchPageClient() {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const suggestions = q.length >= 4 ? suggestParts(q) : [];
  const recent = React.useMemo(() => ["STM32F407VGT6", "TPS5430DDAR"], []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim() || "STM32F407VGT6";
    setLoading(true);
    setTimeout(() => {
      router.push(`/search/results?q=${encodeURIComponent(query)}`);
    }, 400);
  }

  return (
    <AppPageContainer maxWidth="max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <AppPageHeader
          eyebrow="Search"
          title="Part number search"
          description="Enter exact part number or start typing to see prefix matches (after 4+ characters)."
        />
      </motion.div>

      <AppSurface className="mt-2">
        <form onSubmit={submit} className="relative">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500/80" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. STM32F407VGT6"
              className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 pl-12 pr-4 text-lg shadow-inner"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-300/20">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="block w-full px-4 py-3.5 text-left font-mono text-sm transition-colors hover:bg-indigo-50/80"
                    onClick={() => {
                      setQ(s);
                      router.push(`/search/results?q=${encodeURIComponent(s)}`);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full rounded-xl sm:w-auto" disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>
      </AppSurface>

      {loading && (
        <div className="mt-8 space-y-3">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      )}

      <div className="mt-12 space-y-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recent.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => router.push(`/search/results?q=${encodeURIComponent(r)}`)}
              >
                <Badge variant="secondary" className="cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs">
                  {r}
                </Badge>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Popular sample parts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_PARTS.map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => router.push(`/search/results?q=${encodeURIComponent(part)}`)}
              >
                <Badge variant="outline" className="cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs">
                  {part}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppPageContainer>
  );
}
