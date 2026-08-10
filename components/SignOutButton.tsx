"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/signin");
    } catch (error) {
      // Handle sign out error silently or show toast notification
      router.push("/signin");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-2xl border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-ink/20 hover:bg-white/95"
    >
      Sign out
    </button>
  );
}
