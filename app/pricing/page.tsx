const plans = [
  {
    name: "Starter",
    price: "R89.99",
    cadence: "/month after your free trial",
    tagline: "For testing your first niche",
    features: [
      "Up to 25 live products",
      "1 storefront",
      "Standard supplier network",
      "Weekly payouts",
      "Community Discord access",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R129.99",
    cadence: "/month after your free trial",
    tagline: "For sellers ready to scale",
    features: [
      "Unlimited products",
      "3 storefronts",
      "Premium + faster suppliers",
      "Daily payouts",
      "Ad & caption templates",
      "Priority support",
    ],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Studio",
    price: "R219.99",
    cadence: "/month after your free trial",
    tagline: "For teams or multi-brand sellers",
    features: [
      "Everything in Pro",
      "10 storefronts",
      "Team seats (up to 5)",
      "Custom domain support",
      "1:1 onboarding call",
    ],
    cta: "Start free",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Pricing
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Every plan starts with 30 days free.
        </h1>
        <p className="mt-6 text-lg text-ink/70">
          No card charged today. We'll remind you three days before your
          trial ends — cancel in one click if it's not for you.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl border p-8 ${
              p.highlight
                ? "border-ink bg-ink text-paper"
                : "border-ink/10 bg-white text-ink"
            }`}
          >
            {p.highlight && (
              <span className="mb-4 w-fit rounded-full bg-volt px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink">
                Most popular
              </span>
            )}
            <h2 className="font-display text-xl font-bold">{p.name}</h2>
            <p
              className={`mt-1 text-sm ${
                p.highlight ? "text-paper/60" : "text-slate"
              }`}
            >
              {p.tagline}
            </p>

            <div className="mt-6">
              <span className="font-display text-4xl font-bold">
                {p.price}
              </span>
              <span
                className={`ml-1 text-sm ${
                  p.highlight ? "text-paper/50" : "text-slate"
                }`}
              >
                {p.cadence}
              </span>
            </div>

            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                      p.highlight ? "bg-volt" : "bg-signal"
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`focus-ring mt-8 rounded-full px-6 py-3 text-sm font-semibold transition ${
                p.highlight
                  ? "bg-volt text-ink hover:bg-paper"
                  : "bg-ink text-paper hover:bg-signal hover:text-ink"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-white p-8 ring-1 ring-ink/10">
        <h3 className="font-display text-lg font-bold text-ink">
          A note for sellers under 18
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Because subscriptions involve billing and payouts, anyone under 18
          needs a parent or guardian to confirm the account before charges
          begin or payouts are sent. This keeps things straightforward and
          compliant for younger founders and their families.
        </p>
      </div>
    </section>
  );
}