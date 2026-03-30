import type { OrderSummary } from "./types";

export const MOCK_ORDERS: OrderSummary[] = [
  {
    id: "CMP-2026-18492",
    date: "2026-03-22",
    status: "Shipped",
    suppliers: ["DigiKey", "Zephyr Technologies"],
    total: 4281.4,
    itemCount: 14,
  },
  {
    id: "CMP-2026-18102",
    date: "2026-03-15",
    status: "Delivered",
    suppliers: ["LCSC", "DigiKey"],
    total: 912.0,
    itemCount: 6,
  },
  {
    id: "CMP-2026-17888",
    date: "2026-03-02",
    status: "Processing",
    suppliers: ["Zephyr Technologies"],
    total: 2402.0,
    itemCount: 22,
  },
];

export const ORDER_TIMELINE = [
  { key: "placed", label: "Order placed", done: true, date: "Mar 22, 2026 · 9:14 AM" },
  { key: "po", label: "PO created", done: true, date: "Mar 22, 2026 · 10:02 AM" },
  { key: "processing", label: "Processing", done: true, date: "Mar 23, 2026 · 2:30 PM" },
  { key: "shipped", label: "Shipped", done: true, date: "Mar 25, 2026 · 8:00 AM" },
  { key: "delivered", label: "Delivered", done: false, date: "Expected Mar 29" },
];
