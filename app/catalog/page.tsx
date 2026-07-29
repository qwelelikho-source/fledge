const categories = ["All", "Desk & Study", "Beauty", "Tech Accessories", "Fashion", "Fandom"];

const products = [
  { name: "Ring Light Mini", cat: "Tech Accessories", cost: "R4.20", suggested: "R14.99", margin: "71%" },
  { name: "Claw Clip Set (6pc)", cat: "Beauty", cost: "R2.10", suggested: "R9.99", margin: "79%" },
  { name: "Desk Mat — Sage", cat: "Desk & Study", cost: "R5.60", suggested: "R18.00", margin: "69%" },
  { name: "Phone Chain — Pearl", cat: "Fashion", cost: "R1.80", suggested: "R8.50", margin: "79%" },
  { name: "LED Strip 5m", cat: "Tech Accessories", cost: "R6.40", suggested: "R21.99", margin: "71%" },
  { name: "Enamel Pin Pack", cat: "Fandom", cost: "R1.20", suggested: "R7.00", margin: "83%" },
  { name: "Sticker Sheet Vol.2", cat: "Fandom", cost: "R0.90", suggested: "R5.50", margin: "84%" },
  { name: "Tote Bag — Canvas", cat: "Fashion", cost: "R3.30", suggested: "R14.00", margin: "76%" },
  { name: "Skincare Fridge Mini", cat: "Beauty", cost: "R9.80", suggested: "R29.99", margin: "67%" },
];

export default function Catalog() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Catalog
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Vetted products, real margins, one click to list.
        </h1>
        <p className="mt-6 text-lg text-ink/70">
          Every product shown here is pre-checked for supplier reliability
          and shipping time before it's added to the catalog.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition ${
              i === 0
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/70 hover:border-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-ink/30 hover:shadow-sm"
          >
            <div className="flex aspect-square items-center justify-center rounded-xl bg-paper text-3xl">
              📦
            </div>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
              {p.cat}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-ink">
              {p.name}
            </h3>

            <div className="mt-4 flex items-center justify-between font-mono text-sm">
              <div>
                <p className="text-slate">Supplier cost</p>
                <p className="text-ink">{p.cost}</p>
              </div>
              <div className="text-right">
                <p className="text-slate">Suggested price</p>
                <p className="text-ink">{p.suggested}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="status-pill bg-volt/30 text-ink">
                {p.margin} margin
              </span>
              <button className="focus-ring rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition hover:bg-signal">
                Add to store
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}