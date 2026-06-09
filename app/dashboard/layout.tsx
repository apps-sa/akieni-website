import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import { SignIn } from "@/components/dashboard/sign-in";
import { getAdminSession } from "@/lib/dashboard";

// Dashboard lives OUTSIDE [lang] — English only, its own html/body, hidden from
// indexing. Always rendered at request time (reads session + database).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin · Akieni",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getAdminSession();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-black text-white font-sans">
        {admin ? (
          <div className="min-h-dvh">
            <Sidebar email={admin.email} />
            <main className="ml-60 overflow-x-hidden p-8">{children}</main>
          </div>
        ) : (
          <SignIn />
        )}
      </body>
    </html>
  );
}
