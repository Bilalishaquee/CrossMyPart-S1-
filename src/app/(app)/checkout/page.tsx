"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart-context";
import { AppPageContainer, AppPageHeader } from "@/components/layout/app-page";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCartComputed();
  const [priceChanged] = React.useState(true);

  function placeOrder() {
    toast.success("Order placed (demo)");
    router.push("/order/confirmation?id=CMP-2026-DEMO");
  }

  if (items.length === 0) {
    return (
      <AppPageContainer maxWidth="max-w-lg">
        <div className="py-16 text-center">
          <p className="text-slate-600">Cart is empty.</p>
          <Button asChild className="mt-6 rounded-xl">
            <Link href="/search">Search parts</Link>
          </Button>
        </div>
      </AppPageContainer>
    );
  }

  return (
    <AppPageContainer maxWidth="max-w-[1100px]">
      <AppPageHeader
        eyebrow="Checkout"
        title="Complete your order"
        description="Guest checkout — shipping available to US, Canada, and Mexico only. No real payment is processed."
      />

      {priceChanged && (
        <div className="mt-2 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-4 text-sm text-amber-950 shadow-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold">Price update</p>
            <p className="mt-0.5 text-xs opacity-90">
              One or more lines changed since added to cart — indicative pricing refreshed (mock state).
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <Card className="rounded-3xl border-slate-200/90 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Shipping address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" className="mt-1.5 rounded-xl" placeholder="Acme Robotics Inc." />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" className="mt-1.5 rounded-xl" placeholder="1200 Industrial Blvd" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" className="mt-1.5 rounded-xl" placeholder="Austin" />
              </div>
              <div>
                <Label htmlFor="zip">Postal code</Label>
                <Input id="zip" className="mt-1.5 rounded-xl" placeholder="78701" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/90 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Shipping method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:border-indigo-200 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 font-medium leading-snug">Standard · 5–7 business days</span>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="font-mono text-slate-700 tabular-nums">$12.50</span>
                  <input type="radio" name="ship" defaultChecked className="h-4 w-4 shrink-0 accent-indigo-600" />
                </div>
              </label>
              <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:border-indigo-200 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 font-medium leading-snug">Expedited · 2–3 business days</span>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="font-mono text-slate-700 tabular-nums">$28.00</span>
                  <input type="radio" name="ship" className="h-4 w-4 shrink-0 accent-indigo-600" />
                </div>
              </label>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/90 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="card">Credit / Debit</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="card">Card number</Label>
                    <Input id="card" className="mt-1.5 rounded-xl font-mono" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="exp">Expiry</Label>
                      <Input id="exp" className="mt-1.5 rounded-xl" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" className="mt-1.5 rounded-xl" placeholder="123" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal">
                  <p className="text-sm text-slate-600">PayPal redirect simulated — no external window in demo.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="rounded-3xl border-slate-200/90 bg-white/95 shadow-xl lg:sticky lg:top-24 xl:top-28">
            <CardHeader>
              <CardTitle className="text-lg">Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-600">
                Stock and price confirmed at order placement — demo uses static mock confirmation.
              </div>
              {items.map((line) => (
                <div key={line.id} className="flex justify-between gap-2">
                  <span className="truncate font-mono text-xs">
                    {line.partNumber} × {line.qty}
                  </span>
                  <span className="shrink-0 font-mono tabular-nums">
                    ${(line.unitPrice * line.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="font-mono">${(subtotal + 12.5).toFixed(2)}</span>
              </div>
              <Button className="w-full rounded-xl" size="lg" type="button" onClick={placeOrder}>
                Place order
              </Button>
              <p className="text-center text-[11px] text-slate-500">No real payment is processed.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppPageContainer>
  );
}

function useCartComputed() {
  const { items } = useCart();
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  return { items, subtotal };
}
