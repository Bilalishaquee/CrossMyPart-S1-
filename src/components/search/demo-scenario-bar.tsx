"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DemoScenario = "full" | "ab" | "bc" | "c_only" | "a_only" | "none";

const options: { id: DemoScenario; label: string }[] = [
  { id: "full", label: "A + B + C" },
  { id: "ab", label: "A + B only" },
  { id: "bc", label: "B + C only" },
  { id: "c_only", label: "C only" },
  { id: "a_only", label: "A only" },
  { id: "none", label: "No results" },
];

export function DemoScenarioBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = (sp.get("scenario") as DemoScenario) || "full";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Demo scenario</span>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => {
              const p = new URLSearchParams(sp.toString());
              p.set("scenario", o.id);
              router.push(`${pathname}?${p.toString()}`);
            }}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm transition-all",
              current === o.id
                ? "border-indigo-300 bg-indigo-50 font-semibold text-indigo-900 shadow-sm"
                : "border-transparent bg-slate-900/[0.03] text-slate-600 hover:border-slate-200 hover:bg-white"
            )}
          >
            {o.label}
          </button>
        ))}
        <Badge variant="outline" className="ml-auto rounded-lg border-slate-200 bg-white/80">
          Stakeholder demo
        </Badge>
      </div>
    </div>
  );
}
