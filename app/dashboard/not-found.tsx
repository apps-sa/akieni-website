import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="text-sm text-muted-2">This dashboard page doesn’t exist.</p>
      <Link href="/dashboard" className="text-sm text-cyan-teal hover:underline">
        ← Back to overview
      </Link>
    </div>
  );
}
