import Link from "next/link";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppPageContainer, AppPageHeader } from "@/components/layout/app-page";

export default function AccountPage() {
  return (
    <AppPageContainer maxWidth="max-w-4xl">
      <AppPageHeader
        eyebrow="Account"
        title="Profile & preferences"
        description="Placeholder profile — no backend. Data is for demo only."
      />

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-slate-200/90 shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base">
            <p>
              <span className="font-medium text-slate-500">Name</span> — Alex Chen
            </p>
            <p>
              <span className="font-medium text-slate-500">Work email</span> — sourcing@example.com
            </p>
            <p>
              <span className="font-medium text-slate-500">Role</span> — Procurement lead
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-slate-200/90 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Reorder</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full rounded-xl">
              <Link href="/orders">From recent orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl border-slate-200/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Saved addresses</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 md:text-base">
          <p>Acme Robotics Inc. · Austin, TX · US</p>
          <Separator className="my-4" />
          <p className="text-xs text-slate-500">Payment methods on file: Visa •••• 4242 (placeholder)</p>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-3xl border-slate-200/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Recent orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {MOCK_ORDERS.slice(0, 2).map((o) => (
            <div
              key={o.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="break-all font-mono text-xs font-medium">{o.id}</span>
              <Button asChild variant="ghost" size="sm" className="w-full rounded-lg sm:w-auto">
                <Link href={`/orders/${encodeURIComponent(o.id)}`}>View</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppPageContainer>
  );
}
