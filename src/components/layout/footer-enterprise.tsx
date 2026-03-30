import Link from "next/link";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/search", label: "Search" },
      { href: "/bom", label: "BOM Upload" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/orders", label: "Orders" },
      { href: "/account", label: "Account" },
      { href: "#", label: "Documentation" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Contact" },
    ],
  },
] as const;

export function FooterEnterprise({ dark }: { dark?: boolean }) {
  return (
    <footer
      className={cn(
        "relative border-t",
        dark
          ? "border-slate-800/90 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-300"
          : "border-slate-200/90 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white text-slate-600"
      )}
      role="contentinfo"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-90",
          dark ? "from-transparent via-indigo-500/40 to-transparent" : "from-transparent via-indigo-400/50 to-transparent"
        )}
        aria-hidden
      />

      <div className="mx-auto max-w-[1400px] py-14 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:py-16 lg:pl-8 lg:pr-8">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand — matches app header mark + wordmark */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className={cn(
                "group inline-flex max-w-lg items-start gap-4 rounded-2xl outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2",
                dark ? "focus-visible:ring-offset-slate-950" : "focus-visible:ring-offset-white"
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.03]",
                  dark
                    ? "bg-gradient-to-br from-indigo-500 to-indigo-800 text-white shadow-indigo-950/50 ring-1 ring-white/10"
                    : "bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-indigo-900/25"
                )}
              >
                <Cpu className="h-6 w-6" aria-hidden />
              </span>
              <span className="min-w-0 pt-0.5 text-left">
                <span
                  className={cn(
                    "block text-xl font-bold tracking-tight sm:text-2xl",
                    dark ? "text-white" : "text-slate-900"
                  )}
                >
                  CrossMyPart
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs",
                    dark ? "text-indigo-300/90" : "text-indigo-800/80"
                  )}
                >
                  Intelligent component sourcing
                </span>
              </span>
            </Link>
            <p
              className={cn(
                "mt-6 max-w-md text-sm leading-relaxed sm:text-[0.9375rem]",
                dark ? "text-slate-400" : "text-slate-600"
              )}
            >
              Part-number intelligence for engineering and procurement. Recommendations are for evaluation; verify fit
              before production use.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8 xl:gap-10">
            {cols.map((c) => (
              <nav key={c.title} aria-labelledby={`footer-heading-${c.title.toLowerCase()}`}>
                <h3
                  id={`footer-heading-${c.title.toLowerCase()}`}
                  className={cn(
                    "text-base font-bold tracking-tight sm:text-lg",
                    dark ? "text-white" : "text-slate-900"
                  )}
                >
                  {c.title}
                </h3>
                <span
                  className={cn(
                    "mt-3 block h-1 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500",
                    dark && "from-indigo-400 to-teal-400"
                  )}
                  aria-hidden
                />
                <ul className="mt-5 space-y-1">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className={cn(
                          "inline-flex rounded-lg px-1 py-2 text-sm font-medium transition-colors sm:text-[0.9375rem]",
                          dark
                            ? "text-slate-400 hover:bg-white/5 hover:text-white"
                            : "text-slate-600 hover:bg-indigo-50/80 hover:text-indigo-950"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mt-14 flex flex-col gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-sm",
            dark ? "border-slate-800/80 text-slate-500" : "border-slate-200/90 text-slate-500"
          )}
        >
          <p className="leading-relaxed">© {new Date().getFullYear()} CrossMyPart. All rights reserved.</p>
          <p
            className={cn(
              "inline-flex w-fit max-w-full items-center rounded-full border px-3 py-1.5 text-[11px] font-medium leading-snug sm:text-xs",
              dark
                ? "border-slate-700/80 bg-slate-900/50 text-slate-400"
                : "border-slate-200/90 bg-white/80 text-slate-600 shadow-sm shadow-slate-200/30"
            )}
          >
            Pricing shown is indicative until checkout.
          </p>
        </div>
      </div>
    </footer>
  );
}
