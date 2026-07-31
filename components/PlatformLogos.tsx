// components/PlatformLogos.tsx
// "Integrates with" strip — shows the platforms Fledge stores can connect to.

const platforms = [
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3.1c-1.5 0-2.9-.4-4-1.2v6.4c0 3.3-2.7 5.8-6 5.8s-6-2.5-6-5.8 2.7-5.8 6-5.8c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 0 0-.9-.15 2.7 2.7 0 1 0 2.7 2.65V3h3.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M13.6 21v-7h2.2l.3-2.6h-2.5V9.7c0-.75.2-1.26 1.28-1.26h1.37V5.66C15.94 5.6 15.1 5.5 14.1 5.5c-2.1 0-3.5 1.28-3.5 3.63v2.31H8.4v2.6h2.2v7h3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function PlatformLogos() {
  return (
    <div className="mt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-1)] mb-4">
        Connect and advertise on
      </p>
      <div className="flex flex-wrap items-center gap-6">
        {platforms.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2 rounded-full border border-neutral-2 bg-white px-4 py-2 shadow-sm text-ink/70 hover:text-ink hover:border-ink/20 transition"
            title={p.name}
          >
            <span className="h-5 w-5">{p.icon}</span>
            <span className="text-sm font-medium">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}