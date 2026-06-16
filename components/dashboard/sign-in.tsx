"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    } catch {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-sm border border-line bg-ink-2 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
          Akieni
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-muted-2">
          Sign in with your authorised Google account.
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-cyan-teal bg-cyan-teal px-5 py-3 text-base font-semibold uppercase tracking-[0.02em] text-black transition-colors duration-3 ease-akieni hover:bg-green hover:border-green disabled:cursor-default disabled:opacity-70"
        >
          {loading ? "Redirecting…" : "Continue with Google"}
        </button>
        {error && (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
