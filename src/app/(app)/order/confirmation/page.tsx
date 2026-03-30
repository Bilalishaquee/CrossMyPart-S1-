import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppPageContainer } from "@/components/layout/app-page";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const orderId = id || "CMP-2026-DEMO";

  return (
    <AppPageContainer maxWidth="max-w-2xl">
      <div className="flex flex-col items-center py-6 text-center md:py-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-lg shadow-emerald-200/50 ring-2 ring-emerald-100">
          <CheckCircle2 className="h-11 w-11 text-emerald-600" />
        </div>
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">Order placed</h1>
        <p className="mt-3 max-w-md text-slate-600">
          Thank you — this is a frontend-only demo. No order was sent to suppliers.
        </p>
        <p className="mt-6 rounded-xl border border-indigo-200/60 bg-indigo-50/80 px-4 py-2 font-mono text-lg font-semibold text-indigo-900">
          {orderId}
        </p>

        <Card className="mt-12 w-full rounded-3xl border-slate-200/90 text-left shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="font-medium">Mock line items</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Standard · US</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 font-semibold text-slate-900">
              <span>Payment</span>
              <span>Card ending 4242 (demo)</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <Button asChild size="lg" className="w-full rounded-xl px-8 sm:w-auto">
            <Link href="/search">Continue searching</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full rounded-xl px-8 sm:w-auto">
            <Link href="/orders">View orders</Link>
          </Button>
        </div>
      </div>
    </AppPageContainer>
  );
}
