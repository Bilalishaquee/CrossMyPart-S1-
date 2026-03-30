import { Suspense } from "react";
import { ResultsView } from "@/components/search/results-view";
import { Skeleton } from "@/components/ui/skeleton";
import { AppPageContainer } from "@/components/layout/app-page";

function Fallback() {
  return (
    <AppPageContainer>
      <Skeleton className="h-12 w-2/3 max-w-lg rounded-2xl" />
      <Skeleton className="mt-6 h-24 max-w-2xl rounded-2xl" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-[420px] rounded-3xl" />
        <Skeleton className="h-[420px] rounded-3xl" />
        <Skeleton className="h-[420px] rounded-3xl" />
      </div>
    </AppPageContainer>
  );
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "STM32F407VGT6";

  return (
    <Suspense fallback={<Fallback />}>
      <ResultsView query={query} />
    </Suspense>
  );
}
