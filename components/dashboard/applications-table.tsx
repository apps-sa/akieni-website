"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable, Td, formatDate } from "@/components/dashboard/data-table";
import { ExportButtons } from "@/components/dashboard/export-buttons";
import type { Application } from "@/lib/dashboard";

type Row = { application: Application; cvUrl: string | null };

function toExportRow(a: Application): Record<string, string | number> {
  return {
    Date: formatDate(a.created_at),
    "First name": a.first_name,
    "Last name": a.last_name,
    Email: a.email,
    Phone: a.phone ?? "",
    Location: a.location ?? "",
    Role: a.role_title ?? "",
    Profile: a.profile_url ?? "",
    Source: a.source ?? "",
    Status: a.status,
    "Cover note": a.cover_note ?? "",
  };
}

export function ApplicationsTable({ rows }: Readonly<{ rows: Row[] }>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(({ application }) =>
      (application.role_title ?? "").toLowerCase().includes(q),
    );
  }, [rows, query]);

  const exportRows = useMemo(
    () => filtered.map(({ application }) => toExportRow(application)),
    [filtered],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-2">
          {filtered.length} application{filtered.length === 1 ? "" : "s"}
          {query.trim() && ` matching “${query.trim()}”`}.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role…"
            className="w-56 border border-line bg-ink-2 px-3 py-2 text-sm text-white outline-none transition-colors duration-1 ease-akieni placeholder:text-muted-2 focus:border-cyan-teal"
          />
          <ExportButtons rows={exportRows} filename="applications" />
        </div>
      </div>

      <DataTable
        columns={["Date", "Name", "Role", "Email", "Phone", "Profile", "CV", "Cover note"]}
        hasRows={filtered.length > 0}
        empty={query.trim() ? "No applications match that role." : "No applications yet."}
      >
        {filtered.map(({ application: a, cvUrl }) => (
          <tr key={a.id}>
            <Td className="whitespace-nowrap text-muted-2">{formatDate(a.created_at)}</Td>
            <Td className="whitespace-nowrap">
              <Link
                href={`/dashboard/applications/${a.id}`}
                className="text-cyan-teal hover:underline"
              >
                {a.first_name} {a.last_name}
              </Link>
            </Td>
            <Td>{a.role_title ?? "—"}</Td>
            <Td className="whitespace-nowrap">
              <a href={`mailto:${a.email}`} className="text-cyan-teal hover:underline">
                {a.email}
              </a>
            </Td>
            <Td className="whitespace-nowrap">{a.phone ?? "—"}</Td>
            <Td className="whitespace-nowrap">
              {a.profile_url ? (
                <a
                  href={a.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-teal hover:underline"
                >
                  Link
                </a>
              ) : (
                "—"
              )}
            </Td>
            <Td className="whitespace-nowrap">
              {cvUrl ? (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-teal hover:underline"
                >
                  Download
                </a>
              ) : (
                "—"
              )}
            </Td>
            <Td className="max-w-sm">
              {a.cover_note ? (
                <span className="line-clamp-2 whitespace-pre-wrap">{a.cover_note}</span>
              ) : (
                "—"
              )}
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
