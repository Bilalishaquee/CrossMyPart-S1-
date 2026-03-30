import Link from "next/link";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { Badge } from "@/components/ui/badge";
import { AppPageContainer, AppPageHeader, AppTableWrap } from "@/components/layout/app-page";

export default function OrdersPage() {
  return (
    <AppPageContainer maxWidth="max-w-[1100px]">
      <AppPageHeader
        eyebrow="Orders"
        title="Order history"
        description="Mock data for stakeholder review — statuses and totals are illustrative."
      />

      <AppTableWrap className="mt-4">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50/95 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Suppliers</th>
              <th className="px-5 py-4 text-right">Total</th>
              <th className="px-5 py-4"> </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="border-t border-slate-100 transition-colors hover:bg-indigo-50/30">
                <td className="px-5 py-4 font-mono text-xs font-semibold text-slate-900">{o.id}</td>
                <td className="px-5 py-4 text-slate-600">{o.date}</td>
                <td className="px-5 py-4">
                  <Badge variant="secondary" className="rounded-lg">
                    {o.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-xs text-slate-600">{o.suppliers.join(", ")}</td>
                <td className="px-5 py-4 text-right font-mono tabular-nums font-medium">${o.total.toFixed(2)}</td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/orders/${encodeURIComponent(o.id)}`}
                    className="text-sm font-semibold text-indigo-700 hover:underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AppTableWrap>
    </AppPageContainer>
  );
}
