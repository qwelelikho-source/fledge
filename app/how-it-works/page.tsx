import Link from "next/link";

const stages = [
  {
    n: "01",
    title: "Create your account",
    body: "Sign up with an email in under a minute. If you're under 18, a parent or guardian confirms with one click before your store goes live — required for the payment and shipping side of things.",
  },
  {
    n: "02",
    title: "Choose your niche",
    body: "Pick from ready-made catalogs — desk accessories, phone charms, skincare, streetwear add-ons — or mix products across categories into one store.",
  },
  {
    n: "03",
    title: "Build your storefront",
    body: "Use the drag-and-drop builder to set your store name, colors, and layout. No code. Your store gets a shareable link immediately.",
  },
  {
    n: "04",
    title: "Post where your audience is",
    body: "Share your store link on TikTok, Instagram, or in a group chat. Fledge gives you ready-to-post captions and product photos for every item.",
  },
  {
    n: "05",
    title: "A customer buys",
    body: "The order lands in your dashboard instantly. Payment is collected and your margin is calculated automatically.",
  },
  {
    n: "06",
    title: "The supplier ships it",
    body: "Fledge routes the order to the product's supplier, who packs and ships directly to your customer — typically dispatched within 24 hours.",
  },
  {
    n: "07",
    title: "You get paid",
    body: "Your profit — the difference between your store price and the supplier cost — is deposited on your weekly payout schedule.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        How it works
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        You handle the audience. We handle everything after "buy now."
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/70">
        Fledge is a dropshipping platform built for first-time sellers. Here's
        the full path from signing up to your first payout.
      </p>

      <ol className="mt-16 space-y-0">
        {stages.map((s, i) => (
          <li
            key={s.n}
            className="grid gap-4 border-t border-ink/10 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8"
          >
            <span className="font-mono text-sm text-slate">{s.n}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                {s.title}
              </h2>
              <p className="mt-2 max-w-xl text-ink/60">{s.body}</p>
            </div>
          </li>
        ))}
        <div className="border-t border-ink/10" />
      </ol>

      <div className="mt-16 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-ink/10">
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-ink">
            Ready to build your first store?
          </h3>
          <p className="mt-1 text-sm text-ink/60">
            First month free. No card charged today.
          </p>
        </div>
        <Link
          href="/pricing"
          className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-signal"
        >
          Start free
        </Link>
      </div>
    </section>
  );
}