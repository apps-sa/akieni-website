import Link from "next/link";
import { DataTable, Td, formatDate } from "@/components/dashboard/data-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { getOverview } from "@/lib/dashboard";

export default async function DashboardHome() {
  const o = await getOverview();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted-2">
          Contact messages and job applications submitted through the website.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Contacts" value={o.contactCount} />
        <StatCard label="Unread contacts" value={o.unreadContacts} />
        <StatCard label="Applications" value={o.applicationCount} />
        <StatCard label="New applications" value={o.newApplications} />
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent contacts</h2>
          <Link href="/dashboard/contacts" className="text-sm text-cyan-teal hover:underline">
            View all →
          </Link>
        </div>
        <DataTable
          columns={["Date", "Name", "Email", "Subject"]}
          hasRows={o.recentContacts.length > 0}
          empty="No contact messages yet."
        >
          {o.recentContacts.map((c) => (
            <tr key={c.id}>
              <Td className="whitespace-nowrap text-muted-2">{formatDate(c.created_at)}</Td>
              <Td>{c.name}</Td>
              <Td>{c.email}</Td>
              <Td>{c.subject ?? "—"}</Td>
            </tr>
          ))}
        </DataTable>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent applications</h2>
          <Link
            href="/dashboard/applications"
            className="text-sm text-cyan-teal hover:underline"
          >
            View all →
          </Link>
        </div>
        <DataTable
          columns={["Date", "Name", "Role", "Email"]}
          hasRows={o.recentApplications.length > 0}
          empty="No applications yet."
        >
          {o.recentApplications.map((a) => (
            <tr key={a.id}>
              <Td className="whitespace-nowrap text-muted-2">{formatDate(a.created_at)}</Td>
              <Td>
                {a.first_name} {a.last_name}
              </Td>
              <Td>{a.role_title ?? "—"}</Td>
              <Td>{a.email}</Td>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
  );
}
