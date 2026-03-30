"use client";

import { FileText, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { PartOption } from "@/lib/mock/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AttributeBreakdown } from "@/components/product/attribute-breakdown";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

const supplierStyles = {
  digkey: {
    ring: "ring-1 ring-amber-200/80",
    badge: "amber" as const,
    bar: "from-amber-100/90 to-white",
  },
  lcsc: {
    ring: "ring-1 ring-teal-200/80",
    badge: "teal" as const,
    bar: "from-teal-100/80 to-white",
  },
  zephyr: {
    ring: "ring-2 ring-violet-300/70 shadow-violet-200/40 shadow-lg",
    badge: "violet" as const,
    bar: "from-violet-100/90 via-indigo-50/50 to-white",
  },
};

export function ResultOptionCard({
  option,
  index,
}: {
  option: PartOption;
  index: number;
}) {
  const { addItem } = useCart();
  const st = supplierStyles[option.supplierKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden bg-gradient-to-b transition-shadow duration-300 hover:shadow-xl",
          st.bar,
          st.ring,
          option.isPreferred && "relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-violet-500/90 before:to-indigo-500/80"
        )}
      >
        <CardHeader className="space-y-3 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{option.label}</span>
            <Badge variant={st.badge}>{option.supplierName}</Badge>
            <Badge variant="outline" className="font-normal">
              {option.tag}
            </Badge>
          </div>
          <div>
            <p className="font-mono text-lg font-semibold tracking-tight text-slate-900">{option.partNumber}</p>
            <p className="text-sm text-slate-600">{option.manufacturer}</p>
          </div>
          {option.matchScore != null && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium uppercase text-slate-500">Match score</span>
              <span className="text-2xl font-bold tabular-nums text-slate-900">{option.matchScore}</span>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-2 rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3">
            <div>
              <p className="text-xs font-medium text-slate-500">Unit price</p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {option.currency} {option.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Availability</p>
              <p className="text-sm font-medium text-slate-800">{option.stockLabel}</p>
              <p className="text-xs tabular-nums text-slate-500">{option.stock.toLocaleString()} units</p>
            </div>
          </div>
          {option.supplierKey === "digkey" && (
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-amber-200/50 bg-white/70 p-3 text-xs">
              {option.attributes.slice(0, 4).map((a) => (
                <div key={a.name}>
                  <p className="font-medium text-slate-500">{a.name}</p>
                  <p className="font-mono text-slate-900">{a.candidate}</p>
                </div>
              ))}
            </div>
          )}
          {(option.supplierKey === "lcsc" || option.supplierKey === "zephyr") && (
            <AttributeBreakdown attributes={option.attributes} />
          )}
          {option.disclosure && (
            <p className="rounded-lg border border-violet-200/60 bg-violet-50/50 px-3 py-2 text-xs leading-relaxed text-slate-600">
              {option.disclosure}
            </p>
          )}
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-2 border-t border-slate-200/60 bg-white/40 pt-4">
          <div className="flex w-full gap-2">
            <Button variant="secondary" className="flex-1" size="sm" type="button">
              <FileText className="h-4 w-4" />
              Datasheet
            </Button>
            <Button
              className="flex-1"
              size="sm"
              type="button"
              onClick={() => {
                addItem({
                  partNumber: option.partNumber,
                  manufacturer: option.manufacturer,
                  supplierKey: option.supplierKey,
                  supplierName: option.supplierName,
                  qty: 1,
                  unitPrice: option.price,
                  currency: option.currency,
                });
                toast.success("Added to cart", {
                  description: `${option.partNumber} · ${option.supplierName}`,
                });
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </Button>
          </div>
          <p className="text-center text-[11px] text-slate-500">
            Indicative pricing — final price confirmed at checkout.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
