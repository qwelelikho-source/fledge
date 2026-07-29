import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import DeparturesBoard from "@/components/DeparturesBoard";

const trust = [
  { k: "0", label: "inventory held by you" },
  { k: "24hr", label: "avg. supplier dispatch" },
  { k: "16+", label: "with parent sign-off" },
  { k: "R0", label: "charged this month" },
];

const benefits = [
  {
    title: "Shopfront in minutes",
    detail: "A polished storefront, custom domain-ready, and built for fast launch.",
  },
  {
    title: "No inventory ahead",
    detail: "Choose products, list them, and sell without upfront stock or storage fees.",
  },
  {
    title: "Shipping handled",
    detail: "Orders route to suppliers who pack, ship, and keep delivery moving.",
  },
];

const stats = [
  { label: "Live storefronts", value: 12500, suffix: "+" },
  { label: "Products ready", value: 4200, suffix: "" },
  { label: "Fastest setup", value: 8, suffix: " min" },
];

export default function Home() {
  return (
    <>
      <section className="hero relative overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-100 to-white pt-6 pb-24">
        <div className="absolute left-1/2 top-14 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-indigo-500/8 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="badge gap-3 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.92)] px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-neutral-1)] shadow-sm shadow-[0_8px_24px_-14px_rgba(15,23,42,0.12)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Live launch-ready products · no stock risk
                </div>
                <div className="badge gap-3 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.92)] px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-neutral-1)] shadow-sm shadow-[0_8px_24px_-14px_rgba(15,23,42,0.12)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  New · Connect Instagram & TikTok
                </div>
              </div>

              <div className="mb-8">
                <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink leading-tight sm:text-5xl lg:text-6xl xl:text-7xl mb-4">
                  Launch a modern storefront<br className="hidden sm:block" /> that shines from day one.
                </h1>
                <p className="max-w-2xl text-xl leading-9 text-ink/80 sm:text-2xl mb-8">
                  Create a premium online store with ready-made products, direct supplier shipping, and a brand-ready experience that converts.
                </p>
                <p className="max-w-2xl text-sm leading-6 text-[var(--color-neutral-1)] sm:text-base">
                  Connect your TikTok, Instagram, and Facebook to advertise products directly from your storefront — no extra apps needed.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link href="/pricing" className="btn btn-primary">
                  Start your free month
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary">
                  See the process
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-24">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-neutral-2 bg-white p-6 shadow-soft"
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      formatAsK={stat.value >= 1000}
                      decimals={1}
                      className="text-3xl font-display font-bold text-[var(--color-text)]"
                    />
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--color-neutral-1)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 pt-8 grid-cols-1 lg:grid-cols-3">
                <div className="rounded-2xl border border-neutral-2 bg-white p-6 shadow-soft">
                  <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">Premium launch</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">Drag-and-drop storefront design</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-neutral-1)]">
                    Use polished templates built for fast conversions, with image-led product pages and a customizable brand feel.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-2 bg-white p-6 shadow-soft">
                  <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">Fast fulfillment</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">Order flow that really moves</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-neutral-1)]">
                    Orders route automatically to suppliers, with live status updates and shipping notifications your customers can trust.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-2 bg-white p-6 shadow-soft">
                  <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">Social ready</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">Advertise where your customers already are</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-neutral-1)]">
                    Connect your TikTok, Instagram, and Facebook to post products straight from your storefront — no extra apps, no re-uploading.
                  </p>
                </div>
              </div>
            </div>

            <div className="contain-decorations rounded-[2.5rem] border border-ink/10 bg-white/95 p-6 shadow-soft sm:p-8">
              <div className="absolute z-0 -right-8 top-8 h-24 w-24 rounded-full bg-volt/20 blur-3xl" />
              <div className="relative z-10">
                <DeparturesBoard />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center space-y-6">
          <p className="font-mono text-sm uppercase tracking-[0.4em] text-[var(--color-accent)]">Fast, polished, unforgettable</p>
          <h2 className="text-4xl font-display font-semibold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Everything you need to launch a standout store.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--color-neutral-1)]">
            Put your storefront in front of customers with a design-first experience, automated fulfillment, and hands-off order flow.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group rounded-[2rem] border border-transparent bg-gradient-to-br from-white to-sky/5 p-8 shadow-soft transition hover:-translate-y-1 hover:border-ink/10 hover:shadow-bright">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky/10 text-sky transition group-hover:bg-sky/15">
                <span className="text-xl font-bold">→</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/75">{benefit.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[rgba(226,232,240,0.18)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-gradient-to-r from-[rgba(255,255,255,0.96)] via-[rgba(203,213,255,0.18)] to-[rgba(255,255,255,0.98)] p-8 shadow-bright sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">What creators love</p>
                <h2 className="mt-4 text-3xl font-display font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
                  Launch fast, grow with confidence.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--color-neutral-1)]">
                  Dedicated support, supplier-approved products, and a store that looks premium from day one.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trust.map((t) => (
                  <div key={t.label} className="rounded-[1.75rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface)] px-6 py-6 shadow-sm">
                    <p className="text-3xl font-display font-bold text-[var(--color-text)]">{t.k}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--color-neutral-1)]">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-volt">Pricing</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Try it free. Only pay once you're actually making sales.
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              Every plan begins with a free 30-day trial — full catalog access, your own storefront, real orders. No card required to start.
            </p>
          </div>
          <Link href="/pricing" className="btn btn-primary">
            Compare plans →
          </Link>
        </div>
      </section>
    </>
  );
}