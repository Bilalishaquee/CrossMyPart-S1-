"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { MOCK_BOM_LINES } from "@/lib/mock/bom";
import { buildMockResult } from "@/lib/mock/parts";
import { ResultOptionCard } from "@/components/product/result-option-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { AppPageContainer, AppPageHeader, AppTableWrap } from "@/components/layout/app-page";

export default function BomResultsPage() {
  const { addItem } = useCart();
  const [open, setOpen] = React.useState<number | null>(1);

  const resolved = MOCK_BOM_LINES.filter((l) => l.status === "resolved").length;
  const review = MOCK_BOM_LINES.filter((l) => l.status === "review").length;
  const savings = MOCK_BOM_LINES.reduce((s, l) => s + (l.savingsUsd || 0), 0);

  return (
    <AppPageContainer>
      <AppBreadcrumb items={[{ label: "BOM upload", href: "/bom" }, { label: "Results" }]} />
      <AppPageHeader
        eyebrow="BOM resolution"
        title="Line-by-line results"
        description="Mock dataset — three-option framework per line with expandable comparison."
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-slate-200/90 bg-white shadow-md shadow-slate-200/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Line items</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold tabular-nums">{MOCK_BOM_LINES.length}</CardContent>
        </Card>
        <Card className="border-emerald-200/60 bg-emerald-50/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Resolved</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-emerald-900">{resolved}</CardContent>
        </Card>
        <Card className="border-amber-200/60 bg-amber-50/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Needs review</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-amber-950">{review}</CardContent>
        </Card>
        <Card className="border-indigo-200/60 bg-indigo-50/40 sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900">Est. savings vs. US list</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-indigo-950">${savings.toFixed(2)}</CardContent>
        </Card>
      </div>

      <AppTableWrap className="mt-10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="sticky top-0 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3"> </th>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Part number</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Option A</th>
              <th className="px-4 py-3">Option B</th>
              <th className="px-4 py-3">Option C</th>
              <th className="px-4 py-3">Best score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BOM_LINES.map((row) => (
              <React.Fragment key={row.line}>
                <tr className="border-t border-slate-100 hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      aria-expanded={open === row.line}
                      onClick={() => setOpen(open === row.line ? null : row.line)}
                      className="rounded-lg p-1 hover:bg-slate-200/60"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${open === row.line ? "rotate-180" : ""}`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{row.line}</td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">{row.partNumber}</td>
                  <td className="px-4 py-3">{row.qty}</td>
                  <td className="px-4 py-3 text-slate-600">{row.refDes}</td>
                  <td className="max-w-[140px] truncate px-4 py-3 text-xs">{row.optionA}</td>
                  <td className="max-w-[140px] truncate px-4 py-3 text-xs">{row.optionB}</td>
                  <td className="max-w-[140px] truncate px-4 py-3 text-xs">{row.optionC}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{row.bestScore}</td>
                  <td className="px-4 py-3">
                    <Badge variant={row.status === "resolved" ? "success" : "warning"}>{row.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        const o = buildMockResult(row.partNumber).options[2];
                        addItem({
                          partNumber: o.partNumber,
                          manufacturer: o.manufacturer,
                          supplierKey: o.supplierKey,
                          supplierName: o.supplierName,
                          qty: row.qty,
                          unitPrice: o.price,
                          currency: o.currency,
                        });
                        toast.success("Added preferred line", { description: row.partNumber });
                      }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add C
                    </Button>
                  </td>
                </tr>
                {open === row.line && (
                  <tr>
                    <td colSpan={11} className="bg-slate-50/90 p-6">
                      <div className="grid gap-4 xl:grid-cols-3">
                        {buildMockResult(row.partNumber).options.map((opt, i) => (
                          <ResultOptionCard key={opt.label} option={opt} index={i} />
                        ))}
                      </div>
                      {row.savingsUsd != null && (
                        <p className="mt-4 text-xs text-emerald-800">
                          Savings opportunity (illustrative): ${row.savingsUsd.toFixed(2)} on this line vs. US list.
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </AppTableWrap>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/cart">View cart</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-xl">
          <Link href="/bom">Upload another BOM</Link>
        </Button>
      </div>
    </AppPageContainer>
  );
}
