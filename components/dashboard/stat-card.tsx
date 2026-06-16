export function StatCard({
  label,
  value,
  hint,
}: Readonly<{ label: string; value: number | string; hint?: string }>) {
  return (
    <div className="border border-line bg-ink-2 p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-sm text-muted-2">{hint}</p>}
    </div>
  );
}
