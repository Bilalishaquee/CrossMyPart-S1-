"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { safeRedirectPath } from "@/lib/safe-redirect";

export default function SignInPage() {
  return (
    <React.Suspense fallback={<SignInFallback />}>
      <SignInForm />
    </React.Suspense>
  );
}

function SignInFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, ready } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!ready || !user) return;
    router.replace(safeRedirectPath(searchParams.get("redirect")));
  }, [ready, user, router, searchParams]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Enter email and password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      toast.success("Signed in", { description: "Welcome to the workspace (demo)." });
      const next = safeRedirectPath(searchParams.get("redirect"));
      router.push(next);
      setLoading(false);
    }, 450);
  }

  return (
    <AuthSplitLayout
      title="Sign in"
      subtitle="Use your work email to access CrossMyPart. This is a frontend-only demo."
      imageRight
    >
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <span className="text-xs text-slate-500">Demo: any value</span>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in to platform"}
        </Button>
        <p className="text-center text-sm text-slate-600">
          No account?{" "}
          <Link
            href={`/auth/signup${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`}
            className="font-semibold text-indigo-700 hover:underline"
          >
            Create one
          </Link>
        </p>
        <p className="text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            ← Back to landing
          </Link>
        </p>
      </motion.form>
    </AuthSplitLayout>
  );
}
