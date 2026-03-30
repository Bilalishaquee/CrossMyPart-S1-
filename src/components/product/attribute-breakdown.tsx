"use client";

import { Check, AlertTriangle, X } from "lucide-react";
import type { AttributeCompare, MatchStatus } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

function StatusIcon({ status }: { status: MatchStatus }) {
  if (status === "exact")
    return <Check className="h-4 w-4 text-emerald-600" aria-label="Exact match" />;
  if (status === "compatible")
    return <AlertTriangle className="h-4 w-4 text-amber-600" aria-label="Compatible" />;
  return <X className="h-4 w-4 text-rose-600" aria-label="Different" />;
}

function rowBg(status: MatchStatus) {
  if (status === "exact") return "bg-emerald-50/80";
  if (status === "compatible") return "bg-sky-50/60";
  return "bg-rose-50/50";
}

export function AttributeBreakdown({
  attributes,
  searchedLabel = "Searched",
}: {
  attributes: AttributeCompare[];
  searchedLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-3 py-2">Attribute</th>
            <th className="px-3 py-2">{searchedLabel}</th>
            <th className="px-3 py-2">Candidate</th>
            <th className="w-10 px-2 py-2"> </th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((a) => (
            <tr key={a.name} className={cn("border-b border-slate-100 last:border-0", rowBg(a.status))}>
              <td className="px-3 py-2 font-medium text-slate-800">{a.name}</td>
              <td className="px-3 py-2 font-mono text-xs text-slate-600">{a.searched}</td>
              <td className="px-3 py-2 font-mono text-xs text-slate-800">{a.candidate}</td>
              <td className="px-2 py-2">
                <StatusIcon status={a.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
