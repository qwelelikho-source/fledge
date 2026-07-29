import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] text-[var(--color-neutral-1)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-[var(--color-text)]">
              Fledge
            </span>
            <p className="mt-3 max-w-[24ch] text-sm text-[var(--color-neutral-1)]/80">
              Your first business, already in flight — built for founders who want a simple launch.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-1)]/70">
              Product
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-neutral-1)]/80">
              <li>
                <Link className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="/how-it-works">
                  How it works
                </Link>
              </li>
              <li>
                <Link className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="/catalog">
                  Catalog
                </Link>
              </li>
              <li>
                <Link className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="/pricing">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-1)]/70">
              Learn
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-neutral-1)]/80">
              <li>
                <Link className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="/dashboard">
                  Demo dashboard
                </Link>
              </li>
              <li>
                <a className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="#">
                  Seller guides
                </a>
              </li>
              <li>
                <a className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="#">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-1)]/70">
              Trust & safety
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-neutral-1)]/80">
              <li>
                <a className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="#">
                  Terms of service
                </a>
              </li>
              <li>
                <a className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="#">
                  Parental consent
                </a>
              </li>
              <li>
                <a className="link text-[var(--color-neutral-1)] transition hover:text-[var(--color-accent)]" href="#">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgba(15,23,42,0.08)] pt-6 text-xs text-[var(--color-neutral-1)]/70 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Fledge, Inc.</p>
          <p>Built for first-time founders age 16+.</p>
        </div>
      </div>
    </footer>
  );
}
