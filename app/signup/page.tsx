import SignupForm from "@/components/SignupForm";

interface SignupPageProps {
  searchParams: {
    plan?: string;
  };
}

export default function SignupPage({ searchParams }: SignupPageProps) {
  const plan = searchParams.plan?.toLowerCase() ?? "starter";

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-signal">
          Create your account
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Start selling with a plan built for your pace.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          Finish signup now and launch your store with a 30-day free trial.
        </p>
      </div>

      <SignupForm plan={plan} />
    </section>
  );
}
