"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignupFormProps {
  plan: string;
}

function calculateAge(dateString: string) {
  if (!dateString) {
    return 0;
  }

  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age;
}

export default function SignupForm({ plan }: SignupFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const age = useMemo(() => calculateAge(dateOfBirth), [dateOfBirth]);
  const isMinor = age > 0 && age < 18;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          idNumber,
          dateOfBirth,
          plan,
          guardianName: isMinor ? guardianName : undefined,
          guardianEmail: isMinor ? guardianEmail : undefined,
        }),
      });

      let result: { error?: string; message?: string; success?: boolean } | null = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || result?.success === false) {
        const message = result?.error || result?.message || "Unable to create your account. Please try again.";
        setError(message);
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (submitError) {
      setError("Unable to create your account. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink/10 bg-white p-8 text-ink">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
        />
      </div>

      <div>
        <label htmlFor="idNumber" className="block text-sm font-semibold text-ink">
          ID number
        </label>
        <input
          id="idNumber"
          name="idNumber"
          type="text"
          value={idNumber}
          onChange={(event) => setIdNumber(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
          placeholder="Your ID or guardian's ID"
        />
        <p className="mt-2 text-sm text-slate">
          Enter your own ID number, or if you are under 18, use your guardian's ID number.
        </p>
        <p className="text-sm text-slate">
          Your ID is stored securely and used only for account verification.
        </p>
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-ink">
          Date of birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
        />
      </div>

      {dateOfBirth && age > 0 && (
        <p className="text-sm text-slate">
          {age} years old
        </p>
      )}

      {isMinor && (
        <div className="space-y-4 rounded-2xl border border-ink/10 bg-[rgba(15,23,42,0.03)] p-5">
          <p className="text-sm text-slate">
            A guardian must confirm the account because this user is under 18.
          </p>

          <div>
            <label htmlFor="guardianName" className="block text-sm font-semibold text-ink">
              Guardian name
            </label>
            <input
              id="guardianName"
              name="guardianName"
              type="text"
              value={guardianName}
              onChange={(event) => setGuardianName(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
            />
          </div>

          <div>
            <label htmlFor="guardianEmail" className="block text-sm font-semibold text-ink">
              Guardian email
            </label>
            <input
              id="guardianEmail"
              name="guardianEmail"
              type="email"
              value={guardianEmail}
              onChange={(event) => setGuardianEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink text-sm outline-none focus-ring"
            />
          </div>
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-display font-semibold text-paper transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>

      <div className="mt-6 text-center text-sm text-ink/70">
        Already have an account?{' '}
        <Link href="/auth" className="font-semibold text-ink underline-offset-4 hover:underline">
          Use social login
        </Link>
      </div>
    </form>
  );
}
