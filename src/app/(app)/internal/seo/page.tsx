import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppPageContainer, AppPageHeader } from "@/components/layout/app-page";

export default function SeoPreviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CrossMyPart",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <AppPageContainer maxWidth="max-w-3xl">
      <AppPageHeader
        eyebrow="Internal"
        title="SEO / snippet preview"
        description="Mock metadata preview — not live configuration."
      />

      <Card className="mt-4 rounded-3xl border-slate-200/90 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Canonical & meta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-mono text-xs md:text-sm">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-slate-500">Canonical URL</p>
            <p className="mt-2 break-all rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800">
              https://crossmypart.example/
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-slate-500">Title</p>
            <p className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800">
              CrossMyPart — Intelligent electronic component sourcing
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-slate-500">Meta description</p>
            <p className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-3 leading-relaxed text-slate-800">
              Compare American supply, Asian alternatives, and Zephyr-recommended options in one technical sourcing
              workflow for engineering teams.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-3xl border-slate-200/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Structured data (JSON-LD)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="max-h-64 overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-emerald-100">
            {JSON.stringify(jsonLd, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-3xl border-slate-200/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Search snippet preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-inner">
            <p className="text-sm font-medium text-indigo-800">CrossMyPart — Intelligent electronic component sourcing</p>
            <p className="mt-1 text-xs text-emerald-700">https://crossmypart.example/</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Compare American supply, Asian alternatives, and Zephyr-recommended options in one technical sourcing
              workflow.
            </p>
          </div>
        </CardContent>
      </Card>
    </AppPageContainer>
  );
}
