"use client";

import * as XLSX from "xlsx";

// Client-side export of an array of flat record objects to CSV or Excel.
// The keys of the first row become the column headers, so callers should pass
// already-flattened, display-ready rows (see toExportRow in each table).

function timestamp(): string {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
}

export function ExportButtons({
  rows,
  filename,
}: Readonly<{ rows: Record<string, string | number>[]; filename: string }>) {
  const disabled = rows.length === 0;

  function download(format: "csv" | "xlsx") {
    if (disabled) return;
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
    XLSX.writeFile(workbook, `${filename}-${timestamp()}.${format}`, {
      bookType: format,
    });
  }

  const cls =
    "border border-line bg-ink-2 px-3 py-2 text-xs font-mono uppercase tracking-[0.14em] text-white/80 transition-colors duration-1 ease-akieni hover:border-cyan-teal hover:text-cyan-teal disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-none gap-2">
      <button
        type="button"
        onClick={() => download("csv")}
        disabled={disabled}
        className={`${cls} whitespace-nowrap`}
      >
        Export CSV
      </button>
      <button
        type="button"
        onClick={() => download("xlsx")}
        disabled={disabled}
        className={`${cls} whitespace-nowrap`}
      >
        Export Excel
      </button>
    </div>
  );
}
