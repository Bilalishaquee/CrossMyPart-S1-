"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { PartOption } from "@/lib/mock/types";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ComparisonDrawer({
  open,
  onOpenChange,
  options,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  options: [PartOption, PartOption, PartOption];
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 flex h-full max-h-[100dvh] flex-col border-l border-slate-200 bg-white shadow-2xl",
            "inset-y-0 right-0 top-0 w-full max-w-3xl gap-0 p-0 sm:rounded-l-2xl",
            "pt-[env(safe-area-inset-top,0px)]"
          )}
        >
          <div className="relative flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:py-4">
            <div className="min-w-0 pr-10 sm:pr-0">
              <DialogPrimitive.Title className="text-lg font-semibold text-slate-900">
                Technical comparison
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-sm text-slate-500">
                Side-by-side attributes for evaluation — not guaranteed drop-in replacements.
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-[max(0.5rem,env(safe-area-inset-top,0px))] shrink-0 sm:static sm:right-auto sm:top-auto"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <ScrollArea className="min-h-0 flex-1 px-4 py-3 sm:px-6 sm:py-4">
            <ComparisonTable options={options} />
          </ScrollArea>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
