import { ORDER_TIMELINE } from "@/lib/mock/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { AppPageContainer, AppPageHeader } from "@/components/layout/app-page";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppPageContainer maxWidth="max-w-3xl">
      <AppBreadcrumb items={[{ label: "Orders", href: "/orders" }, { label: id }]} />
      <AppPageHeader
        eyebrow="Order detail"
        title={`Order ${id}`}
        description="Timeline and fulfillment — illustrative mock for demo walkthroughs."
      />

      <Card className="mt-10 rounded-3xl border-slate-200/90 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Status timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-5">
            {ORDER_TIMELINE.map((step) => (
              <li key={step.key} className="flex flex-wrap items-start gap-x-4 gap-y-2">
                <div
                  className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-offset-2 ${
                    step.done ? "bg-emerald-500 ring-emerald-200" : "bg-slate-200 ring-slate-100"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{step.label}</p>
                  <p className="text-xs text-slate-500">{step.date}</p>
                </div>
                {step.done && (
                  <Badge variant="success" className="h-fit shrink-0 rounded-lg">
                    Done
                  </Badge>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-3xl border-slate-200/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Line items</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-slate-600">
          <p>Mock packing list — same as cart demo data would appear here.</p>
        </CardContent>
      </Card>
    </AppPageContainer>
  );
}
