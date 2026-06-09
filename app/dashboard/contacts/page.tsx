import Link from "next/link";
import { DataTable, Td, formatDate } from "@/components/dashboard/data-table";
import { ExportButtons } from "@/components/dashboard/export-buttons";
import { getContacts } from "@/lib/dashboard";

export default async function ContactsPage() {
  const contacts = await getContacts();

  const exportRows = contacts.map((c) => ({
    Date: formatDate(c.created_at),
    Name: c.name,
    Email: c.email,
    Company: c.company ?? "",
    Subject: c.subject ?? "",
    Message: c.message,
  }));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <p className="mt-1 text-sm text-muted-2">
            {contacts.length} message{contacts.length === 1 ? "" : "s"}.
          </p>
        </div>
        <ExportButtons rows={exportRows} filename="contacts" />
      </header>

      <DataTable
        columns={["Date", "Name", "Email", "Company", "Subject", "Message"]}
        hasRows={contacts.length > 0}
        empty="No contact messages yet."
      >
        {contacts.map((c) => (
          <tr key={c.id}>
            <Td className="whitespace-nowrap text-muted-2">{formatDate(c.created_at)}</Td>
            <Td className="whitespace-nowrap">
              <Link
                href={`/dashboard/contacts/${c.id}`}
                className="text-cyan-teal hover:underline"
              >
                {c.name}
              </Link>
            </Td>
            <Td className="whitespace-nowrap">
              <a href={`mailto:${c.email}`} className="text-cyan-teal hover:underline">
                {c.email}
              </a>
            </Td>
            <Td>{c.company ?? "—"}</Td>
            <Td>{c.subject ?? "—"}</Td>
            <Td className="max-w-md">
              <span className="line-clamp-2 whitespace-pre-wrap">{c.message}</span>
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
