"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { AppPageContainer, AppPageHeader } from "@/components/layout/app-page";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const shipping = items.length ? 12.5 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <AppPageContainer maxWidth="max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-12 text-center md:py-16"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
            <ShoppingBag className="h-10 w-10 text-indigo-400" />
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900 md:text-3xl">Your cart is empty</h1>
          <p className="mt-3 max-w-sm text-slate-600">{`Add parts from search or BOM results to build an order (demo only).`}</p>
          <Button asChild className="mt-10 rounded-xl px-8" size="lg">
            <Link href="/search">Start searching</Link>
          </Button>
        </motion.div>
      </AppPageContainer>
    );
  }

  return (
    <AppPageContainer maxWidth="max-w-[1100px]">
      <AppPageHeader
        eyebrow="Cart"
        title="Order lines"
        description="Mixed suppliers — indicative pricing until checkout."
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {items.map((line) => (
            <Card
              key={line.id}
              className="border-slate-200/90 shadow-md shadow-slate-200/30 transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="break-all font-mono text-base font-semibold text-slate-900">{line.partNumber}</span>
                    <Badge variant="outline" className="rounded-lg">
                      {line.supplierName}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{line.manufacturer}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/80">
                    <button
                      type="button"
                      className="p-2.5 transition-colors hover:bg-slate-100"
                      onClick={() => updateQty(line.id, line.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      className="p-2.5 transition-colors hover:bg-slate-100"
                      onClick={() => updateQty(line.id, line.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-500">Unit</p>
                    <p className="font-mono font-semibold tabular-nums text-slate-900">
                      {line.currency} {line.unitPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">
                      Ext. {line.currency} {(line.unitPrice * line.qty).toFixed(2)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" type="button" onClick={() => removeItem(line.id)}>
                    <Trash2 className="h-4 w-4 text-rose-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-4">
          <Card className="rounded-3xl border-indigo-200/60 bg-gradient-to-b from-indigo-50/80 to-white shadow-xl shadow-indigo-200/20 lg:sticky lg:top-24 xl:top-28">
            <CardHeader>
              <CardTitle className="text-lg">Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping estimate</span>
                <span className="font-mono tabular-nums">${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
              <Button asChild className="mt-4 w-full rounded-xl" size="lg">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppPageContainer>
  );
}
