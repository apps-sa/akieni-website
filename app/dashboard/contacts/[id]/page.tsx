import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/dashboard/data-table";
import { getContactById } from "@/lib/dashboard";

function Field({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
        {label}
      </span>
      <span className="wrap-break-word text-sm text-white/90">{children}</span>
    </div>
  );
}

export default async function ContactDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const contact = await getContactById(id);
  if (!contact) notFound();

  const c = contact;

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <Link
          href="/dashboard/contacts"
          className="text-sm text-cyan-teal hover:underline"
        >
          ← Back to contacts
        </Link>
        <h1 className="mt-3 text-2xl font-semibold">{c.name}</h1>
        <p className="mt-1 text-sm text-muted-2">
          Received {formatDate(c.created_at)}
          {c.subject ? ` · ${c.subject}` : ""}
        </p>
      </div>

      <section className="flex flex-col gap-4 border border-line bg-ink-2 p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
          Contact
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name">{c.name}</Field>
          <Field label="Email">
            <a href={`mailto:${c.email}`} className="text-cyan-teal hover:underline">
              {c.email}
            </a>
          </Field>
          <Field label="Company">{c.company ?? "—"}</Field>
          <Field label="Subject">{c.subject ?? "—"}</Field>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
            Message
          </span>
          <p className="whitespace-pre-wrap text-sm text-white/90">{c.message}</p>
        </div>
      </section>
    </div>
  );
}
