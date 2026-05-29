import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type DepartmentsStrings = Dictionary["team"]["departments"];

function OrgNode({
  name,
  role,
  root = false,
}: Readonly<{ name: string; role: string; root?: boolean }>) {
  return (
    <div
      className={[
        "min-w-[220px] border px-[1.4rem] py-[1rem] text-center",
        root
          ? "border-cyan-teal bg-cyan-teal text-black"
          : "border-line bg-ink-2 text-white",
      ].join(" ")}
    >
      <div className="text-md font-bold tracking-[-0.01em]">{name}</div>
      <div className="mt-[0.2rem] font-mono text-xs uppercase tracking-[0.12em] opacity-70">
        {role}
      </div>
    </div>
  );
}

export function TeamDepartments({
  strings,
}: Readonly<{ strings: DepartmentsStrings }>) {
  return (
    <Section variant="dark">
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
        variant="dark"
      />

      <div className="grid grid-cols-1 gap-0 border-y border-line min-[721px]:grid-cols-2 lg:grid-cols-4">
        {strings.items.map((d, i) => {
          const isLastCol = (i + 1) % 4 === 0;
          return (
            <div
              key={d.number}
              className={[
                "flex flex-col gap-[0.6rem] p-[2rem_1.4rem]",
                "border-line",
                "lg:border-r",
                isLastCol ? "lg:border-r-0" : "",
                "border-b min-[721px]:border-b lg:border-b-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
                {d.number}
              </span>
              <h3 className="text-xl tracking-[-0.02em] font-bold">{d.name}</h3>
              <p className="text-sm text-muted-2">{d.lead}</p>
              <div className="mt-[0.4rem] text-[2.4rem] font-bold tracking-[-0.03em]">
                {d.size}
              </div>
              <p className="text-sm text-muted-2">{d.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-s4 py-s7">
        <OrgNode
          name={strings.org.root.name}
          role={strings.org.root.role}
          root
        />
        <div className="h-7 w-px bg-line" />
        <div className="flex flex-wrap justify-center gap-s3">
          {strings.org.nodes.map((n) => (
            <OrgNode key={n.name} name={n.name} role={n.role} />
          ))}
        </div>
      </div>
    </Section>
  );
}
