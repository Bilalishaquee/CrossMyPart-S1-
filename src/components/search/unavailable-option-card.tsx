"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageX } from "lucide-react";

export function UnavailableOptionCard({
  label,
  supplierName,
  reason,
}: {
  label: string;
  supplierName: string;
  reason: string;
}) {
  return (
    <Card className="border-dashed border-rose-200/80 bg-rose-50/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
          <Badge variant="rose">{supplierName}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <PackageX className="h-10 w-10 text-rose-400" />
        <p className="text-sm font-medium text-slate-800">Not available for this query</p>
        <p className="max-w-xs text-xs text-slate-600">{reason}</p>
      </CardContent>
    </Card>
  );
}
