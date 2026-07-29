import DeparturesBoard from "@/components/DeparturesBoard";

const stats = [
  { label: "Revenue (30d)", value: "R1,284.50", delta: "+18%" },
  { label: "Orders (30d)", value: "94", delta: "+6%" },
  { label: "Store visitors", value: "3,402", delta: "+22%" },
  { label: "Avg. margin", value: "74%", delta: "steady" },
];

const products = [
  { name: "Claw Clip Set (6pc)", sold: 31, revenue: "R309.69" },
  { name: "Ring Light Mini", sold: 22, revenue: "R329.78" },
  { name: "Phone Chain — Pearl", sold: 19, revenue: "R161.50" },
  { name: "Desk Mat — Sage", sold: 12, revenue: "R216.00" },
];

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Demo dashboard
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        This is what day 30 can look like.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/70">
        A sample store's dashboard — the same view you'll get once your
        store starts taking orders.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-ink/10 bg-white p-6"
          >
            <p className="text-xs text-slate">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-ink">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-xs text-sky">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Top products
          </h2>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between border-b border-ink/10 pb-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
              <span>Product</span>
              <span>Revenue</span>
            </div>
            {products.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between border-b border-ink/5 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-slate">{p.sold} sold</p>
                </div>
                <span className="font-mono text-ink">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        <DeparturesBoard />
      </div>

      <div className="mt-6 rounded-2xl bg-ink p-8 text-paper">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold">
              Your payout is scheduled
            </h3>
            <p className="mt-1 text-sm text-paper/60">
              Next payout: <span className="font-mono text-volt">Friday, Aug 1</span> ·{" "}
              <span className="font-mono">R412.30</span>
            </p>
          </div>
          <button className="focus-ring rounded-full bg-volt px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper">
            View payout history
          </button>
        </div>
      </div>
    </section>
  );
}