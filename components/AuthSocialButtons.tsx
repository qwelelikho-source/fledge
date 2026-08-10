"use client";

import { useCallback, useState } from "react";

export default function AuthSocialButtons() {
  const [isPending, setIsPending] = useState(false);

  const handleSocialClick = useCallback((provider: "google" | "facebook") => {
    setIsPending(true);
    window.location.href = `/api/auth/${provider}`;
  }, []);

  return (
    <div className="space-y-4 rounded-3xl border border-ink/10 bg-slate-50 p-6 text-center sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ink/60">
        Sign up faster with social login
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleSocialClick("google")}
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 py-4 text-ink transition hover:border-ink/20 hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Continue with Google"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.35 11.1H12v2.8h5.4c-.24 1.34-1.05 2.45-2.23 3.2v2.66h3.6c2.1-1.93 3.3-4.8 3.3-8.66 0-.6-.06-1.18-.18-1.74z" fill="#4285F4" />
            <path d="M12 22c2.7 0 4.96-.9 6.62-2.46l-3.6-2.65c-.98.66-2.24 1.05-3.02 1.05-2.32 0-4.28-1.56-4.98-3.66H3.74v2.3C5.37 19.9 8.44 22 12 22z" fill="#34A853" />
            <path d="M7.02 13.24a5.36 5.36 0 010-3.5V7.44H3.74a9.99 9.99 0 000 9.12l3.28-2.32z" fill="#FBBC05" />
            <path d="M12 6.72c1.44 0 2.74.5 3.76 1.47l2.82-2.82C16.96 3.76 14.7 3 12 3 8.44 3 5.37 4.1 3.74 6.44l3.28 2.3C7.72 8.28 9.68 6.72 12 6.72z" fill="#EA4335" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleSocialClick("facebook")}
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 py-4 text-ink transition hover:border-ink/20 hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Continue with Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12c0-5.53-4.48-10-10-10S2 6.47 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.88h2.75l-.44 2.9h-2.31V22C18.34 21.13 22 16.99 22 12z" fill="#1877F2" />
            <path d="M15.68 14.9l.44-2.9h-2.75v-1.88c0-.79.39-1.56 1.62-1.56h1.25V6.11s-1.14-.2-2.23-.2c-2.28 0-3.77 1.38-3.77 3.88v2.16H7.9v2.9h2.54v6.99h2.8v-6.99h2.44z" fill="#fff" opacity=".9" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-ink/60">
        If you already have a social account, use the signup flow and choose your provider there.
      </p>
    </div>
  );
}
