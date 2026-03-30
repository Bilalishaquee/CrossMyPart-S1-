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

export default function SignUpPage() {
  return (
    <React.Suspense fallback={<SignUpFallback />}>
      <SignUpForm />
    </React.Suspense>
  );
}

function SignUpFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
    </div>
  );
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, user, ready } = useAuth();
  const [name, setName] = React.useState("");
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
      signup(name, email, password);
      toast.success("Account ready", { description: "Redirecting to the platform (demo)." });
      const next = safeRedirectPath(searchParams.get("redirect"));
      router.push(next);
      setLoading(false);
    }, 500);
  }

  return (
    <AuthSplitLayout
      title="Create account"
      subtitle="Join your team on CrossMyPart. No backend — credentials stay in this browser."
      imageRight={false}
    >
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Alex Chen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign up & enter platform"}
        </Button>
        <p className="text-center text-sm text-slate-600">
          Already have access?{" "}
          <Link
            href={`/auth/signin${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`}
            className="font-semibold text-indigo-700 hover:underline"
          >
            Sign in
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
