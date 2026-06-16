import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/dashboard/data-table";
import { getApplicationById, signedCvUrl } from "@/lib/dashboard";
import { getRoleBySlug } from "@/lib/queries/careers";

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

function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm text-white/90">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2">
          <span aria-hidden className="h-1.5 w-1.5 flex-none translate-y-[-2px] bg-cyan-teal" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ApplicationDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const application = await getApplicationById(id);
  if (!application) notFound();

  const [cvUrl, role] = await Promise.all([
    signedCvUrl(application.cv_path),
    application.role_slug ? getRoleBySlug(application.role_slug, "en") : Promise.resolve(null),
  ]);

  const a = application;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/dashboard/applications"
          className="text-sm text-cyan-teal hover:underline"
        >
          ← Back to applications
        </Link>
        <h1 className="mt-3 text-2xl font-semibold">
          {a.first_name} {a.last_name}
        </h1>
        <p className="mt-1 text-sm text-muted-2">
          Applied {formatDate(a.created_at)}
          {a.role_title ? ` · ${a.role_title}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Candidate */}
      <section className="flex flex-col gap-4 border border-line bg-ink-2 p-6 lg:col-span-7">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
          Candidate
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name">
            {a.first_name} {a.last_name}
          </Field>
          <Field label="Email">
            <a href={`mailto:${a.email}`} className="text-cyan-teal hover:underline">
              {a.email}
            </a>
          </Field>
          <Field label="Phone">{a.phone ?? "—"}</Field>
          <Field label="Location">{a.location ?? "—"}</Field>
          <Field label="Profile">
            {a.profile_url ? (
              <a
                href={a.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-cyan-teal hover:underline"
              >
                {a.profile_url}
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Source">{a.source ?? "—"}</Field>
          <Field label="CV">
            {cvUrl ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-teal hover:underline"
              >
                Download CV
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Status">{a.status}</Field>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
            Cover note
          </span>
          <p className="whitespace-pre-wrap text-sm text-white/90">
            {a.cover_note ?? "—"}
          </p>
        </div>
      </section>

      {/* Job role */}
      <section className="flex flex-col gap-4 border border-line bg-ink-2 p-6 lg:col-span-5">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
          Job role
        </h2>
        {role ? (
          <>
            <div>
              <p className="text-lg font-semibold text-white">{role.title}</p>
              {role.tagline && (
                <p className="mt-1 text-sm text-muted-2">{role.tagline}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Department">{role.dept ?? "—"}</Field>
              <Field label="Team">{role.team ?? "—"}</Field>
              <Field label="Location">{role.loc ?? "—"}</Field>
              <Field label="Type">{role.type ?? "—"}</Field>
              <Field label="Contract">{role.contract ?? "—"}</Field>
              <Field label="Start">{role.start ?? "—"}</Field>
            </div>
            {role.mission && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  Mission
                </span>
                <p className="whitespace-pre-wrap text-sm text-white/90">{role.mission}</p>
              </div>
            )}
            {role.responsibilities?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  Responsibilities
                </span>
                <BulletList items={role.responsibilities} />
              </div>
            )}
            {role.profile?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  Profile
                </span>
                <BulletList items={role.profile} />
              </div>
            )}
            {role.stack?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-line px-2 py-1 text-xs text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-2">
            {a.role_title ? (
              <>
                Applied for <span className="text-white/90">{a.role_title}</span>
                {a.role_slug ? ` (${a.role_slug})` : ""}. Full role details are
                unavailable — the role may have been removed from the CMS.
              </>
            ) : (
              "No role information was captured with this application."
            )}
          </p>
        )}
      </section>
      </div>
    </div>
  );
}
