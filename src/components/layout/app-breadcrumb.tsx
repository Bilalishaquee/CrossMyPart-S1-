"use client";

import Link from "next/link";

export type AppCrumb = { label: string; href?: string };

export function AppBreadcrumb({ items }: { items: AppCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs font-medium text-slate-500 md:text-sm">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
          {i > 0 && (
            <span className="text-slate-300 select-none" aria-hidden>
              /
            </span>
          )}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-indigo-800">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
