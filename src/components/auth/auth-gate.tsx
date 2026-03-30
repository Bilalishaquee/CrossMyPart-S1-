"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

function GateLoading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-100 to-white px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <p className="text-sm text-slate-600">Checking session…</p>
    </div>
  );
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const redirected = React.useRef(false);

  React.useEffect(() => {
    if (!ready || user) {
      redirected.current = false;
      return;
    }
    if (redirected.current) return;
    redirected.current = true;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const full = pathname + search;
    router.replace(`/auth/signin?redirect=${encodeURIComponent(full)}`);
  }, [ready, user, router, pathname]);

  if (!ready) return <GateLoading />;
  if (!user) return <GateLoading />;
  return <>{children}</>;
}
