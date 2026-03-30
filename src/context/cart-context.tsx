"use client";

import * as React from "react";
import type { SupplierKey } from "@/lib/mock/types";

export interface CartLine {
  id: string;
  partNumber: string;
  manufacturer: string;
  supplierKey: SupplierKey;
  supplierName: string;
  qty: number;
  unitPrice: number;
  currency: string;
}

interface CartState {
  items: CartLine[];
  addItem: (line: Omit<CartLine, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = React.createContext<CartState | null>(null);

function genId() {
  return `line-${Math.random().toString(36).slice(2, 10)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartLine[]>([]);

  const addItem = React.useCallback((line: Omit<CartLine, "id"> & { id?: string }) => {
    const id = line.id ?? genId();
    setItems((prev) => {
      const dup = prev.find(
        (p) =>
          p.partNumber === line.partNumber &&
          p.supplierKey === line.supplierKey
      );
      if (dup) {
        return prev.map((p) =>
          p.id === dup.id ? { ...p, qty: p.qty + line.qty } : p
        );
      }
      return [...prev, { ...line, id }];
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = React.useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const value = React.useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear }),
    [items, addItem, removeItem, updateQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
