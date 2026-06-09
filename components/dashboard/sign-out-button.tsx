"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-left font-mono text-xs uppercase tracking-[0.14em] text-muted-2 transition-colors duration-1 ease-akieni hover:text-cyan-teal"
    >
      Sign out
    </button>
  );
}
