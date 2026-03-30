"use client";

import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "rounded-xl border border-slate-200 bg-white shadow-lg",
            title: "text-slate-900 font-medium",
            description: "text-slate-600",
          },
        }}
      />
      </CartProvider>
    </AuthProvider>
  );
}
