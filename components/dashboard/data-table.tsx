import type { ReactNode } from "react";

// Minimal table primitive shared by the dashboard list pages.

export function DataTable({
  columns,
  children,
  empty = "Nothing here yet.",
  hasRows,
}: Readonly<{
  columns: string[];
  children: ReactNode;
  empty?: string;
  hasRows: boolean;
}>) {
  if (!hasRows) {
    return (
      <div className="border border-line bg-ink-2 p-10 text-center text-sm text-muted-2">
        {empty}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-ink-2">
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-2 font-medium"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <td className={`border-b border-line px-4 py-3 align-top text-white/90 ${className}`}>
      {children}
    </td>
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
