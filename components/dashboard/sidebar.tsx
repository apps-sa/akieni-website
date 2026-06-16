"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/contacts", label: "Contacts" },
  { href: "/dashboard/applications", label: "Applications" },
] as const;

export function Sidebar({ email }: Readonly<{ email: string }>) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-60 flex-col justify-between overflow-y-auto border-r border-line bg-ink-2 p-6">
      <div>
        <Link href="/dashboard" className="block">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
            Akieni
          </span>
          <span className="mt-1 block text-lg font-semibold text-white">Admin</span>
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={[
                "px-3 py-2 text-sm transition-colors duration-1 ease-akieni",
                isActive(item.href)
                  ? "bg-cyan-teal text-black font-semibold"
                  : "text-white/80 hover:text-cyan-teal",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <span className="truncate text-xs text-muted-2" title={email}>
          {email}
        </span>
        <SignOutButton />
      </div>
    </aside>
  );
}
