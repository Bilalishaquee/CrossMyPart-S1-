"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Upload, ShoppingCart, Package, User, Cpu, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

const nav = [
  { href: "/search", label: "Search", icon: Search },
  { href: "/bom", label: "BOM Upload", icon: Upload },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/account", label: "Account", icon: User },
];

const headerPad =
  "pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:pl-4 sm:pr-4 lg:pl-8 lg:pr-8";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className={cn("mx-auto flex h-14 min-h-[3.5rem] max-w-[1400px] items-center gap-2 sm:h-16", headerPad)}>
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-md shadow-indigo-900/20">
            <Cpu className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden min-[360px]:inline">CrossMyPart</span>
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="app-mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
        </Button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4 opacity-70" aria-hidden />
                {label}
                {href === "/cart" && cartCount > 0 && (
                  <span className="ml-0.5 rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs font-semibold text-indigo-900">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 md:max-w-md md:flex-initial lg:max-w-lg">
          <Link
            href="/search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:hidden"
            aria-label="Search parts"
          >
            <Search className="h-5 w-5" />
          </Link>
          <form action="/search/results" method="get" className="hidden min-w-0 flex-1 sm:block md:max-w-none">
            <Input
              name="q"
              placeholder="Search part number…"
              className="h-9 border-slate-200 bg-slate-50/80 text-sm"
              aria-label="Global part search"
            />
          </form>
          <span
            className="hidden max-w-[100px] truncate text-xs text-slate-500 min-[900px]:inline lg:max-w-[140px]"
            title={user?.email}
          >
            {user?.email}
          </span>
          <Button
            variant="secondary"
            size="sm"
            className="shrink-0 gap-1 px-2 sm:px-3"
            type="button"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id="app-mobile-nav"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-slate-200 bg-white shadow-2xl md:hidden"
            style={{
              paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="text-sm font-semibold text-slate-900">Navigate</span>
              <Button type="button" variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-1">
                {nav.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href || pathname.startsWith(href + "/");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                          active ? "bg-indigo-50 text-indigo-950" : "text-slate-700 hover:bg-slate-50"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
                        {label}
                        {href === "/cart" && cartCount > 0 && (
                          <span className="ml-auto rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-900">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t border-slate-100 p-3">
              <form action="/search/results" method="get" className="space-y-2">
                <label className="sr-only" htmlFor="mobile-global-search">
                  Search part number
                </label>
                <Input
                  id="mobile-global-search"
                  name="q"
                  placeholder="Part number…"
                  className="h-11 border-slate-200 bg-slate-50/80"
                />
                <Button type="submit" className="w-full rounded-xl" size="sm">
                  Search
                </Button>
              </form>
              {user?.email ? (
                <p className="mt-3 truncate px-1 text-xs text-slate-500" title={user.email}>
                  {user.email}
                </p>
              ) : null}
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
