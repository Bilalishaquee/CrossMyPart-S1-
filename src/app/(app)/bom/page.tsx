"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileSpreadsheet, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppPageContainer, AppPageHeader, AppSurface } from "@/components/layout/app-page";

type Phase = "idle" | "uploading" | "validating" | "processing" | "completed";

export default function BomPage() {
  const router = useRouter();
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [progress, setProgress] = React.useState(0);

  function runPipeline() {
    setPhase("uploading");
    setProgress(10);
    setTimeout(() => {
      setPhase("validating");
      setProgress(35);
    }, 800);
    setTimeout(() => {
      setPhase("processing");
      setProgress(72);
    }, 1800);
    setTimeout(() => {
      setPhase("completed");
      setProgress(100);
      toast.success("BOM processed", { description: "Validation complete — opening results." });
      setTimeout(() => router.push("/bom/results"), 900);
    }, 3200);
  }

  return (
    <AppPageContainer maxWidth="max-w-3xl">
      <AppPageHeader
        eyebrow="BOM"
        title="BOM upload"
        description={
          <>
            CSV or XLSX · max 5 MB · up to 200 line items · required column:{" "}
            <span className="font-mono text-slate-800">Part Number</span>
          </>
        }
      />

      <AppSurface padding="p-0" className="overflow-hidden">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="border-b border-slate-100 px-6 pb-4 pt-6 md:px-8">
            <CardTitle className="text-lg md:text-xl">Upload file</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8 pt-6 md:px-8">
            <button
              type="button"
              onClick={runPipeline}
              disabled={phase !== "idle" && phase !== "completed"}
              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-6 py-16 text-center transition-colors hover:border-indigo-400 hover:bg-indigo-50/40 disabled:opacity-60"
            >
              <Upload className="h-10 w-10 text-indigo-400" />
              <p className="mt-4 font-semibold text-slate-800">Drag & drop or click to browse</p>
              <p className="mt-1 text-sm text-slate-500">Supports .csv, .xlsx</p>
            </button>

            <AnimatePresence mode="wait">
              {phase !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-inner"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">Progress</span>
                    <Badge variant="secondary" className="rounded-lg">
                      {phase}
                    </Badge>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 md:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Uploading — encrypted transfer (demo)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Validating columns & row count
                    </li>
                    <li className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                      Resolving part numbers against supplier feeds (mock)
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-xs text-amber-950 md:text-sm">
              Validation: Part Number required per row. Optional: Qty, Reference Designator. Rows exceeding limits will
              surface in review.
            </div>

            <Button asChild variant="outline" className="w-full rounded-xl sm:w-auto">
              <Link href="/bom/results">Skip to sample BOM results</Link>
            </Button>
          </CardContent>
        </Card>
      </AppSurface>
    </AppPageContainer>
  );
}
