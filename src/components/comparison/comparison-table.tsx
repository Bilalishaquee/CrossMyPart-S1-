"use client";

import { Badge } from "@/components/ui/badge";
import type { PartOption } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

const rowTone = (status: string) => {
  if (status === "exact") return "bg-emerald-50/70";
  if (status === "compatible") return "bg-sky-50/50";
  return "bg-rose-50/40";
};

export function ComparisonTable({ options }: { options: [PartOption, PartOption, PartOption] }) {
  const attrNames = options[0].attributes.map((a) => a.name);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">Attribute</th>
            {options.map((o) => (
              <th key={o.label} className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <span>{o.label}</span>
                  <Badge variant={o.supplierKey === "digkey" ? "amber" : o.supplierKey === "lcsc" ? "teal" : "violet"}>
                    {o.supplierName}
                  </Badge>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="px-4 py-2 font-medium text-slate-700">Unit price</td>
            {options.map((o) => (
              <td key={o.label} className="px-4 py-2 font-mono tabular-nums">
                {o.currency} {o.price.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-slate-100">
            <td className="px-4 py-2 font-medium text-slate-700">Stock</td>
            {options.map((o) => (
              <td key={o.label} className="px-4 py-2 tabular-nums">
                {o.stock.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr className="border-b border-slate-100">
            <td className="px-4 py-2 font-medium text-slate-700">Match</td>
            {options.map((o) => (
              <td key={o.label} className="px-4 py-2">
                {o.matchScore ?? "—"}
                {o.tag.includes("Exact") && (
                  <Badge variant="success" className="ml-2">
                    Exact
                  </Badge>
                )}
                {o.isPreferred && (
                  <Badge variant="violet" className="ml-2">
                    Preferred
                  </Badge>
                )}
              </td>
            ))}
          </tr>
          {attrNames.map((name) => (
            <tr key={name} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-2 font-medium text-slate-800">{name}</td>
              {options.map((o) => {
                const row = o.attributes.find((a) => a.name === name)!;
                return (
                  <td key={o.label + name} className={cn("px-4 py-2 font-mono text-xs", rowTone(row.status))}>
                    {row.candidate}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
