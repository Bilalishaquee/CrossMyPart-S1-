import Link from "next/link";
import { buildMockResult } from "@/lib/mock/parts";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { Button } from "@/components/ui/button";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { AppPageContainer, AppPageHeader, AppSurface } from "@/components/layout/app-page";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "STM32F407VGT6";
  const data = buildMockResult(query);

  return (
    <AppPageContainer maxWidth="max-w-[1200px]">
      <AppBreadcrumb
        items={[
          { label: "Search", href: "/search" },
          { label: "Results", href: `/search/results?q=${encodeURIComponent(query)}` },
          { label: "Compare" },
        ]}
      />
      <AppPageHeader
        eyebrow="Technical comparison"
        title={
          <>
            Full comparison — <span className="font-mono text-indigo-800">{data.query}</span>
          </>
        }
        description="Attribute rows use color coding: exact match, compatible, or different. Use this view for technical evaluation only."
      />
      <AppSurface className="mt-2 overflow-x-auto">
        <ComparisonTable options={data.options} />
      </AppSurface>
      <Button asChild className="mt-8 w-full rounded-xl sm:w-auto" variant="secondary" size="lg">
        <Link href={`/search/results?q=${encodeURIComponent(query)}`}>Back to results</Link>
      </Button>
    </AppPageContainer>
  );
}
