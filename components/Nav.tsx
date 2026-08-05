"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/catalog", label: "Catalog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/signin", label: "Sign in" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Nav() {
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function setNavHeight() {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    }
    setNavHeight();
    const ro = new ResizeObserver(setNavHeight);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", setNavHeight);
    return () => {
      window.removeEventListener("resize", setNavHeight);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Always show header near the top of the page
      if (currentScrollY < 80) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Only toggle after a small threshold to avoid jitter on tiny scrolls
      if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
        setHidden(isScrollingDown);
        lastScrollY.current = currentScrollY;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-2xl shadow-soft transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <Link href="/" className="link inline-flex items-center gap-3 text-[var(--color-text)]">
          <span className="font-display text-2xl font-bold tracking-tight">Fledge</span>
          <span className="rounded-full border border-[rgba(79,70,229,0.16)] bg-[rgba(79,70,229,0.08)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            shop
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex py-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link text-sm font-semibold text-[var(--color-neutral-1)] hover:text-[var(--color-accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/pricing" className="btn btn-primary">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}