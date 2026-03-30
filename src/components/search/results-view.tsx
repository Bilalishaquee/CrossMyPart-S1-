"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GitCompare, SlidersHorizontal } from "lucide-react";
import { buildMockResult } from "@/lib/mock/parts";
import type { DemoScenario } from "@/components/search/demo-scenario-bar";
import { DemoScenarioBar } from "@/components/search/demo-scenario-bar";
import { ResultOptionCard } from "@/components/product/result-option-card";
import { UnavailableOptionCard } from "@/components/search/unavailable-option-card";
import { ComparisonDrawer } from "@/components/comparison/comparison-drawer";
import {
  AvailabilitySummary,
  EstimatedSavingsCard,
  MatchScoreOverview,
  PriceTrendPlaceholder,
} from "@/components/product/report-panels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { AppPageContainer, AppPageHeader, AppSurface } from "@/components/layout/app-page";
import type { PartOption } from "@/lib/mock/types";

function pickScenario(scenario: DemoScenario, options: [PartOption, PartOption, PartOption]) {
  const [a, b, c] = options;
  switch (scenario) {
    case "full":
      return { show: [true, true, true] as const, options: [a, b, c] as const };
    case "ab":
      return { show: [true, true, false] as const, options: [a, b, c] as const };
    case "bc":
      return { show: [false, true, true] as const, options: [a, b, c] as const };
    case "a_only":
      return { show: [true, false, false] as const, options: [a, b, c] as const };
    case "c_only":
      return { show: [false, false, true] as const, options: [a, b, c] as const };
    case "none":
      return { show: [false, false, false] as const, options: [a, b, c] as const };
    default:
      return { show: [true, true, true] as const, options: [a, b, c] as const };
  }
}

export function ResultsView({ query }: { query: string }) {
  const sp = useSearchParams();
  const scenario = (sp.get("scenario") as DemoScenario) || "full";
  const data = React.useMemo(() => buildMockResult(query), [query]);
  const { show, options } = pickScenario(scenario, data.options);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const labels = ["Option A", "Option B", "Option C"] as const;
  const suppliers = ["DigiKey", "LCSC", "Zephyr Technologies"];

  const headerActions = (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
      <Badge variant="secondary" className="rounded-lg px-3 py-1">
        Mock data
      </Badge>
      <Button variant="secondary" size="sm" className="rounded-xl" asChild>
        <Link href={`/compare?q=${encodeURIComponent(data.query)}`} className="gap-2">
          <GitCompare className="h-4 w-4" />
          Full compare
        </Link>
      </Button>
      <Button variant="secondary" size="sm" className="rounded-xl gap-2" onClick={() => setDrawerOpen(true)}>
        <GitCompare className="h-4 w-4" />
        Drawer
      </Button>
    </div>
  );

  if (scenario === "none") {
    return (
      <AppPageContainer>
        <AppBreadcrumb items={[{ label: "Search", href: "/search" }, { label: "Results" }]} />
        <AppPageHeader
          eyebrow="Results"
          title="No matches"
          description="Try a different part number or upload your BOM for batch resolution. This is a demo state with mock data only."
        />
        <DemoScenarioBar />
        <AppSurface className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No exact matches found</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Adjust your query or switch demo scenario above to see full three-option results.
          </p>
          <Button asChild className="mt-8 rounded-xl">
            <Link href="/search">New search</Link>
          </Button>
        </AppSurface>
      </AppPageContainer>
    );
  }

  return (
    <AppPageContainer>
      <AppBreadcrumb items={[{ label: "Search", href: "/search" }, { label: "Results" }]} />
      <AppPageHeader
        eyebrow="Search results"
        title={
          <>
            Results for <span className="font-mono text-indigo-800">{data.query}</span>
          </>
        }
        description="Recommendations are for evaluation — verify datasheet fit before production. Pricing is indicative until checkout."
        action={headerActions}
      />

      <AppSurface padding="p-5 md:p-6" className="mb-10">
        <DemoScenarioBar />
      </AppSurface>

      <div className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3.5 shadow-sm backdrop-blur-sm md:px-5">
        <SlidersHorizontal className="h-4 w-4 text-indigo-600/70" />
        <span className="text-sm font-semibold text-slate-800">Filters</span>
        <Badge variant="outline" className="rounded-lg">
          In stock
        </Badge>
        <Badge variant="outline" className="rounded-lg">
          RoHS
        </Badge>
        <Badge variant="outline" className="rounded-lg">
          Cut tape OK
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {show.map((visible, i) =>
              visible ? (
                <ResultOptionCard key={labels[i]} option={options[i]} index={i} />
              ) : (
                <UnavailableOptionCard
                  key={labels[i]}
                  label={labels[i]}
                  supplierName={suppliers[i]}
                  reason={
                    i === 0
                      ? "No US distributor line item matched this query in the demo dataset."
                      : i === 1
                        ? "Asian alternative not surfaced for this scenario — try full A+B+C demo."
                        : "Preferred option unavailable for this scenario — see disclosure on full results."
                  }
                />
              )
            )}
          </div>
        </div>
        <aside className="space-y-4 lg:col-span-4 lg:sticky lg:top-20 lg:self-start xl:top-24">
          <MatchScoreOverview a={100} b={94} c={97} />
          <EstimatedSavingsCard amount={124.08} />
          <AvailabilitySummary />
          <PriceTrendPlaceholder />
          <div className="rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 to-white p-5 text-sm text-slate-700 shadow-sm">
            <p className="font-semibold text-indigo-900">Supplier mix insight</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              For this query, splitting between US exact and Zephyr-preferred lines can reduce landed cost while
              maintaining traceability — illustrative only.
            </p>
          </div>
        </aside>
      </div>

      <ComparisonDrawer open={drawerOpen} onOpenChange={setDrawerOpen} options={data.options} />
    </AppPageContainer>
  );
}
