"use client";

import { SignIn } from "@clerk/nextjs";
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
          Use Google, Facebook, or another provider configured in Clerk to sign in or sign up instantly.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-soft">
          <SignIn
            routing="hash"
            signUpUrl="/signup"
            afterSignInUrl="/dashboard"
          />
        </div>

        <aside>
          <AuthSocialButtons />
        </aside>
      </div>
    </section>
  );
}
