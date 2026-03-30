import { FooterEnterprise } from "@/components/layout/footer-enterprise";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <FooterEnterprise dark />
    </div>
  );
}
