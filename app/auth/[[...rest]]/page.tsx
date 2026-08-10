"use client";

import AuthSocialButtons from "@/components/AuthSocialButtons";

export default function AuthPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-signal">
          Secure account access
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Sign in with social login.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Use Google or Facebook to sign in with a custom auth redirect flow.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-soft">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ink/60">
              Social login without Clerk
            </p>
            <p className="text-base leading-7 text-ink/80">
              Sign in using a provider login flow powered by a custom auth API.
            </p>
            <div className="rounded-3xl bg-slate-50 p-6 text-left">
              <p className="font-semibold text-ink">Supported providers</p>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                <li>Google</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>

        <aside>
          <AuthSocialButtons />
        </aside>
      </div>
    </section>
  );
}
