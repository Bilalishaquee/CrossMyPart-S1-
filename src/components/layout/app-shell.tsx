import { AppHeader } from "@/components/layout/app-header";
import { FooterEnterprise } from "@/components/layout/footer-enterprise";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100/95 via-slate-50/90 to-white">
      <AppHeader />
      <main className="relative flex-1 pb-[max(0px,env(safe-area-inset-bottom,0px))]">{children}</main>
      <FooterEnterprise />
    </div>
  );
}
