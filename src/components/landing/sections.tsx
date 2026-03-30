"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  FileSpreadsheet,
  GitCompare,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LandingEyebrow,
  LandingGlowOrbs,
  LandingHeading,
  LandingLead,
  LandingSectionBg,
  MotionPanel,
  landingFadeUp,
} from "@/components/landing/landing-section-primitives";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HowItWorks() {
  const steps = [
    { title: "Search or upload", desc: "Enter a part number or upload a BOM — CSV or XLSX, up to 200 lines.", icon: Search },
    { title: "Three-path compare", desc: "Every match surfaces US exact, Asian alternative, and Zephyr-preferred pricing.", icon: GitCompare },
    { title: "Technical matrix", desc: "Review attributes with exact, compatible, and difference states at a glance.", icon: Layers },
    { title: "Evaluate & checkout", desc: "Add lines to cart with transparent supplier mix — pricing indicative until checkout.", icon: ShieldCheck },
  ];
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/40 to-white py-20 md:py-24 lg:py-32"
    >
      <LandingGlowOrbs />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
        <LandingEyebrow>Workflow</LandingEyebrow>
        <LandingHeading>How it works</LandingHeading>
        <LandingLead>
          One search, three sourcing paths — engineered for speed and confidence in technical evaluation.
        </LandingLead>

        <motion.div
          className="mx-auto mt-12 max-w-6xl rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-200/45 backdrop-blur-md md:mt-16 md:p-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={itemUp}>
                <Card className="group h-full border-2 border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80 shadow-md transition-all duration-300 hover:border-indigo-300/60 hover:shadow-xl">
                  <CardContent className="p-6 md:p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-900 text-white shadow-lg shadow-indigo-900/25 transition-transform duration-300 group-hover:scale-105">
                      <s.icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Step {i + 1}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-[1.35rem]">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhyTeams() {
  const items = [
    { title: "Faster technical triage", desc: "Structured A/B/C cards reduce back-and-forth between eng and sourcing.", icon: Zap },
    { title: "Transparent recommendations", desc: "Zephyr-preferred options are labeled — no hidden defaults.", icon: ShieldCheck },
    { title: "BOM-scale workflows", desc: "Upload, validate, and resolve line-by-line with the same three-path logic.", icon: FileSpreadsheet },
  ];
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-100/90 via-white to-slate-50/50 py-20 md:py-24 lg:py-32">
      <LandingGlowOrbs variant="teal" />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
        <LandingEyebrow>Value</LandingEyebrow>
        <LandingHeading>Why teams use CrossMyPart</LandingHeading>
        <LandingLead className="mt-2">
          Purpose-built for procurement and engineering stakeholders who need clarity, not clutter.
        </LandingLead>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <MotionPanel
              key={item.title}
              className="border-teal-200/40 bg-gradient-to-b from-white to-teal-50/20 p-8 md:p-9"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-900/20">
                <item.icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 md:text-2xl">{item.title}</h3>
              <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-90 md:mx-0" />
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{item.desc}</p>
            </MotionPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparePaths() {
  const suppliers = [
    { name: "DigiKey", sub: "Exact US", className: "from-amber-50 to-amber-100/50 border-amber-200/80 text-amber-950" },
    { name: "LCSC", sub: "Asian alt", className: "from-teal-50 to-teal-100/40 border-teal-200/80 text-teal-950" },
    { name: "Zephyr", sub: "Preferred", className: "from-violet-50 to-violet-100/40 border-violet-200/80 text-violet-950" },
  ];
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/30 py-20 md:py-24 lg:py-32">
      <LandingGlowOrbs />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <LandingEyebrow align="left">Sourcing intelligence</LandingEyebrow>
          <LandingHeading align="left">Compare sourcing paths instantly</LandingHeading>
          <LandingLead align="left" className="mt-2">
            See DigiKey exact supply, LCSC alternatives, and Zephyr-recommended pricing side by side — with match scores
            and attribute-level clarity.
          </LandingLead>
          <motion.div {...landingFadeUp} transition={{ ...landingFadeUp.transition, delay: 0.15 }} className="mt-10">
            <Button asChild size="lg" className="h-12 rounded-xl px-8 text-base shadow-lg shadow-indigo-900/15">
              <Link href="/auth/signin?redirect=%2Fsearch%2Fresults%3Fq%3DSTM32F407VGT6">View sample results</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md md:p-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Three-path preview</p>
            <div className="mt-8 flex flex-col gap-4">
              {suppliers.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
                  whileHover={{ x: -4, transition: { duration: 0.2 } }}
                  className={`flex items-center justify-between rounded-2xl border-2 bg-gradient-to-r px-6 py-5 ${s.className}`}
                >
                  <div>
                    <p className="text-lg font-bold md:text-xl">{s.name}</p>
                    <p className="text-sm font-medium opacity-80">{s.sub}</p>
                  </div>
                  <Sparkles className="h-6 w-6 opacity-50" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BomWorkflow() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white py-20 md:py-24 lg:py-32">
      <LandingGlowOrbs variant="violet" />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <LandingEyebrow align="left">BOM</LandingEyebrow>
          <LandingHeading align="left">BOM upload workflow</LandingHeading>
          <LandingLead align="left" className="mt-2">
            Drag in CSV or XLSX (max 5 MB, 200 lines). We validate part numbers, then resolve each line against the same
            three-option framework.
          </LandingLead>
          <motion.ul
            {...landingFadeUp}
            transition={{ ...landingFadeUp.transition, delay: 0.12 }}
            className="mt-8 space-y-4 text-sm text-slate-700 md:text-base"
          >
            <li className="flex gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
              <Boxes className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />
              <span>
                <span className="font-semibold text-slate-900">Required column:</span> Part Number — optional qty and
                reference designators.
              </span>
            </li>
            <li className="flex gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
              <BarChart3 className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />
              <span>
                <span className="font-semibold text-slate-900">Insights:</span> Summary tiles for resolved lines, review
                queue, and estimated savings.
              </span>
            </li>
          </motion.ul>
          <motion.div {...landingFadeUp} transition={{ ...landingFadeUp.transition, delay: 0.2 }} className="mt-10">
            <Button asChild className="h-12 rounded-xl px-8 text-base shadow-lg shadow-teal-900/10" variant="teal">
              <Link href="/auth/signin?redirect=%2Fbom">Try BOM upload</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border-2 border-slate-200/90 bg-gradient-to-br from-slate-100 via-white to-indigo-50/30 p-8 shadow-inner shadow-slate-200/60 md:p-10"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-transparent to-teal-500/5" />
          <div className="relative">
            <div className="flex items-center justify-between font-mono text-xs font-medium uppercase tracking-wider text-slate-500">
              <span>Upload preview</span>
              <motion.span
                className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800"
                animate={{ opacity: [1, 0.65, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                Validating
              </motion.span>
            </div>
            <div className="mt-6 space-y-0 overflow-hidden rounded-2xl border border-slate-200 bg-white font-mono text-sm shadow-lg">
              <div className="flex justify-between border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500">
                <span>Part Number</span>
                <span>Qty</span>
              </div>
              {[
                ["STM32F407VGT6", "24"],
                ["TPS5430DDAR", "8"],
                ["LM358DR", "40"],
              ].map(([pn, q], i) => (
                <motion.div
                  key={pn}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex justify-between border-b border-slate-100 px-5 py-3.5 text-slate-800 last:border-0"
                >
                  <span>{pn}</span>
                  <span className="tabular-nums text-slate-600">{q}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TechnicalMatching() {
  const chips = [
    { label: "Exact match", tone: "border-emerald-200 bg-emerald-50/90 text-emerald-900", icon: CheckCircle2 },
    { label: "Compatible", tone: "border-sky-200 bg-sky-50/90 text-sky-900", icon: Layers },
    { label: "Different", tone: "border-rose-200 bg-rose-50/90 text-rose-900", icon: GitCompare },
  ];
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-zinc-100/80 via-zinc-50/50 to-white py-20 md:py-24 lg:py-32">
      <LandingGlowOrbs />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
        <LandingEyebrow>Technical depth</LandingEyebrow>
        <LandingHeading>Technical attribute matching</LandingHeading>
        <LandingLead>
          Voltage, package, tolerance, temperature, and ratings — compared to your searched part with exact, compatible,
          and different states.
        </LandingLead>

        <motion.div
          className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200/90 bg-white/95 p-8 shadow-xl shadow-slate-200/45 backdrop-blur-md md:mt-14 md:p-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {chips.map((c) => (
              <motion.div
                key={c.label}
                variants={itemUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`flex flex-col items-center rounded-2xl border-2 px-6 py-8 text-center ${c.tone}`}
              >
                <c.icon className="h-10 w-10 opacity-90" strokeWidth={1.5} />
                <p className="mt-4 text-lg font-bold md:text-xl">{c.label}</p>
                <p className="mt-2 text-sm opacity-90">Row-level styling in comparison matrix</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            {...landingFadeUp}
            className="mt-10 text-center text-sm text-slate-600 md:text-base"
          >
            Every attribute row is readable at a glance — engineered for datasheet-driven decisions, not guesswork.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export function ZephyrTransparency() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-violet-50/70 via-white to-indigo-50/50 py-20 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[120%] -translate-x-1/2 bg-gradient-to-b from-violet-400/10 to-transparent blur-3xl" />
      <LandingGlowOrbs variant="violet" />
      <LandingSectionBg />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
        <LandingEyebrow>Transparency</LandingEyebrow>
        <LandingHeading>Transparent preferred supplier recommendations</LandingHeading>
        <LandingLead>
          Option C highlights Zephyr Technologies when it offers competitive pricing — clearly disclosed as
          CrossMyPart’s preferred distributor.
        </LandingLead>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-12 max-w-4xl rounded-3xl border-2 border-violet-200/80 bg-gradient-to-b from-white to-violet-50/40 p-8 shadow-xl shadow-violet-200/30 md:mt-14 md:p-12"
        >
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-8 md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 text-white shadow-lg">
              <ShieldCheck className="h-9 w-9" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-lg font-semibold leading-relaxed text-slate-800 md:text-xl">
                Recommendations support evaluation; always verify fit for your program. No hidden defaults — Zephyr is
                labeled as our preferred distributor when shown as Option C.
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-widest text-violet-800/80">Disclosure-first UX</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function EnterprisePreview() {
  const tiles = [
    { title: "Cart", desc: "Multi-supplier lines & totals", href: "/auth/signin?redirect=%2Fcart" },
    { title: "Orders", desc: "History & timelines", href: "/auth/signin?redirect=%2Forders" },
    { title: "Account", desc: "Profile & reorder shortcuts", href: "/auth/signin?redirect=%2Faccount" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-20 text-white md:py-24 lg:py-32">
      <LandingSectionBg className="opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
        <motion.p
          {...landingFadeUp}
          className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/90 md:text-sm"
        >
          Enterprise preview
        </motion.p>
        <motion.h2
          {...landingFadeUp}
          transition={{ ...landingFadeUp.transition, delay: 0.05 }}
          className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.65rem]"
        >
          Ready for stakeholder walkthroughs
        </motion.h2>
        <motion.p
          {...landingFadeUp}
          transition={{ ...landingFadeUp.transition, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-400 md:text-lg"
        >
          Cart, checkout, and order history — structured for demos with realistic mock data only.
        </motion.p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 md:gap-6">
          {tiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <Link
                href={t.href}
                className="group block h-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/40 hover:bg-white/10 hover:shadow-indigo-900/20"
              >
                <p className="text-xl font-bold text-white md:text-2xl">{t.title}</p>
                <p className="mt-2 text-sm text-slate-400">{t.desc}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-indigo-300 group-hover:text-indigo-200">
                  Open →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...landingFadeUp}
          transition={{ ...landingFadeUp.transition, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/auth/signin?redirect=%2Fcart">View cart</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-white/25 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/auth/signin?redirect=%2Forders">Orders</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
