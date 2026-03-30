import Image from "next/image";
import Link from "next/link";
import { Cpu } from "lucide-react";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80";

export function AuthSplitLayout({
  children,
  title,
  subtitle,
  imageRight = true,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  /** When false, image on left (signup variant). */
  imageRight?: boolean;
}) {
  const panel = (
    <div className="relative hidden flex-1 overflow-hidden lg:flex">
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 0vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/85 via-slate-950/75 to-slate-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.35),transparent_50%)]" />
      <div className="relative z-10 flex flex-col justify-between p-10 text-white">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Cpu className="h-5 w-5" />
          </span>
          CrossMyPart
        </Link>
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/90">B2B sourcing</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">One search. Three sourcing paths.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-200/90">
            Compare US exact supply, Asian alternatives, and Zephyr-recommended options in a single technical workflow —
            built for engineering and procurement teams.
          </p>
        </div>
        <p className="text-xs text-slate-400">Mock authentication — no credentials are sent to a server.</p>
      </div>
    </div>
  );

  const formSide = (
    <div className="flex flex-1 flex-col justify-center py-10 pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:px-12 sm:py-12 lg:px-16">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 lg:hidden">
          <Cpu className="h-5 w-5 text-indigo-700" />
          CrossMyPart
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      {imageRight ? (
        <>
          {formSide}
          {panel}
        </>
      ) : (
        <>
          {panel}
          {formSide}
        </>
      )}
    </div>
  );
}
