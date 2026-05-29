import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ApplicationForm } from "@/components/forms/application-form";
import { Badge } from "@/components/shared/badge";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type Role = Dictionary["roles"]["items"]["senior-backend-go"];
type Shared = Dictionary["roles"]["shared"];
type FormStrings = Dictionary["roles"]["form"];

function List({
  items,
}: Readonly<{ items: ReadonlyArray<string> }>) {
  return (
    <ul className="flex flex-col gap-[0.6rem] text-md text-muted-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-[0.6rem]">
          <span aria-hidden className="h-1.5 w-1.5 flex-none translate-y-[-2px] bg-cyan-teal" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function RoleDetail({
  lang,
  role,
  shared,
  form,
}: Readonly<{ lang: string; role: Role; shared: Shared; form: FormStrings }>) {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-black pb-s8 pt-[calc(var(--nav-h)+3.5rem)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
        />
        <Container className="relative z-2 grid grid-cols-1 items-end gap-s7 lg:[grid-template-columns:1.4fr_1fr]">
          <div>
            <Link
              href={`/${lang}/careers`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
            >
              <span aria-hidden>←</span> {shared.back}
            </Link>
            <div className="mt-s5 flex flex-wrap gap-2">
              <Badge surface="dark">{role.dept}</Badge>
              <Badge surface="dark">{role.type}</Badge>
              <Badge surface="dark">{role.status}</Badge>
            </div>
            <h1 className="mt-s5 text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1] tracking-[-0.035em]">
              {role.title}
            </h1>
            <p className="mt-s4 max-w-[52ch] text-lg text-muted-2">
              {role.tagline}
            </p>
          </div>

          <aside className="grid grid-cols-2 gap-x-[0.8rem] gap-y-4 border border-line bg-ink-2 p-s5">
            {[
              { k: shared.teamLabel, v: role.team },
              { k: shared.locationLabel, v: role.loc },
              { k: shared.contractLabel, v: role.contract },
              { k: shared.startLabel, v: role.start },
            ].map((cell) => (
              <div key={cell.k} className="flex flex-col gap-[0.2rem]">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  {cell.k}
                </span>
                <span className="text-md font-semibold">{cell.v}</span>
              </div>
            ))}
          </aside>
        </Container>
      </section>

      {/* Anchor bar */}
      <nav
        aria-label="Section navigation"
        className="sticky top-nav-h z-20 flex gap-s5 overflow-x-auto border-y border-line bg-ink-2 px-gutter font-mono text-xs uppercase tracking-[0.14em]"
      >
        {shared.anchors.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="whitespace-nowrap border-b-2 border-transparent py-4 text-muted-2 transition-colors duration-1 ease-akieni hover:text-white"
          >
            {a.label}
          </a>
        ))}
      </nav>

      {/* Body */}
      <Section variant="paper">
        <div className="grid grid-cols-1 gap-s7 lg:[grid-template-columns:1fr_1.4fr]">
          <div className="flex flex-col gap-s6">
            <div id="mission" className="scroll-mt-[calc(var(--nav-h)+4rem)]">
              <Eyebrow>{shared.missionLabel}</Eyebrow>
              <p className="mt-4 text-lg leading-[1.5]">{role.mission}</p>
            </div>
            <div
              id="responsibilities"
              className="scroll-mt-[calc(var(--nav-h)+4rem)]"
            >
              <h3 className="mb-s3 text-xl tracking-[-0.02em] font-bold">
                {shared.responsibilitiesLabel}
              </h3>
              <List items={role.responsibilities} />
            </div>
            <div id="profile" className="scroll-mt-[calc(var(--nav-h)+4rem)]">
              <h3 className="mb-s3 text-xl tracking-[-0.02em] font-bold">
                {shared.profileLabel}
              </h3>
              <List items={role.profile} />
            </div>
          </div>

          <aside className="flex flex-col gap-s5 border border-line-light bg-white p-s6">
            <div id="stack" className="scroll-mt-[calc(var(--nav-h)+4rem)]">
              <p className="mb-s3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {shared.stackLabel}
              </p>
              <div className="flex flex-wrap gap-[0.6rem]">
                {role.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
            <hr className="border-line-light" />
            <div id="benefits" className="scroll-mt-[calc(var(--nav-h)+4rem)]">
              <p className="mb-s3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {shared.benefitsLabel}
              </p>
              <ul className="flex flex-col gap-[0.6rem] text-md text-muted">
                {shared.benefits.map((b) => (
                  <li key={b} className="flex items-baseline gap-[0.55rem]">
                    <span aria-hidden className="text-cyan-teal">
                      +
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Application form */}
      <Section
        variant="dark"
        id="apply"
        className="scroll-mt-[calc(var(--nav-h)+4rem)]"
      >
        <div className="mb-s7">
          <Eyebrow accent>{shared.applyEyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
            {shared.applyTitle}
          </h2>
        </div>
        <ApplicationForm strings={form} roleTitle={role.title} />
      </Section>
    </>
  );
}
