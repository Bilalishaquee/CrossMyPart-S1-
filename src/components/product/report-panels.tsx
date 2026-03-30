"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MatchScoreOverview({ a, b, c }: { a: number; b: number; c: number }) {
  const max = Math.max(a, b, c);
  return (
    <Card className="border-slate-200/80 bg-gradient-to-br from-slate-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Match score overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: "DigiKey (A)", value: a, tone: "bg-amber-200/80" },
          { label: "LCSC (B)", value: b, tone: "bg-teal-400/70" },
          { label: "Zephyr (C)", value: c, tone: "bg-violet-400/70" },
        ].map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full transition-all", row.tone)}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function EstimatedSavingsCard({ amount }: { amount: number }) {
  return (
    <Card className="border-emerald-200/60 bg-gradient-to-br from-emerald-50/90 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-emerald-900">Estimated savings vs. US list</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tabular-nums text-emerald-800">${amount.toFixed(2)}</p>
        <p className="mt-1 text-xs text-emerald-800/80">Based on indicative unit pricing for evaluated lines.</p>
      </CardContent>
    </Card>
  );
}

export function AvailabilitySummary() {
  return (
    <Card className="border-slate-200/80 bg-slate-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Availability summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
        <div className="rounded-lg bg-white/80 px-3 py-2 shadow-sm">
          <p className="text-xs text-slate-500">In stock</p>
          <p className="text-lg font-semibold text-slate-900">3 / 3</p>
        </div>
        <div className="rounded-lg bg-white/80 px-3 py-2 shadow-sm">
          <p className="text-xs text-slate-500">Lead time</p>
          <p className="text-lg font-semibold text-slate-900">Same day</p>
        </div>
        <div className="rounded-lg bg-white/80 px-3 py-2 shadow-sm">
          <p className="text-xs text-slate-500">MOQ</p>
          <p className="text-lg font-semibold text-slate-900">1</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function PriceTrendPlaceholder() {
  return (
    <Card className="overflow-hidden border-indigo-200/40 bg-gradient-to-b from-indigo-50/40 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Price trend (90d)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-28 items-end gap-1">
          {[40, 55, 48, 62, 58, 70, 65, 72, 68, 75, 71, 78].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-indigo-200 to-indigo-400/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Illustrative — not live market data.</p>
      </CardContent>
    </Card>
  );
}
