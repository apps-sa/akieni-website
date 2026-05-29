import { Reveal } from "@/components/motion/primitives";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";

export type LegalStrings = {
  eyebrow: string;
  caption: string;
  title: string;
  lede: string;
  contentsLabel: string;
  sections: ReadonlyArray<{ id: string; heading: string; body: string }>;
};

export function LegalPage({
  strings,
}: Readonly<{ strings: LegalStrings }>) {
  return (
    <>
      <Container className="pb-s7 pt-[calc(var(--nav-h)+6rem)]">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-s4">
            <Eyebrow>{strings.eyebrow}</Eyebrow>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {strings.caption}
            </span>
          </div>
          <h1 className="mt-s3 max-w-[14ch] text-display font-bold leading-[0.92] tracking-[-0.045em] max-[720px]:text-[clamp(2.25rem,11vw,4rem)]">
            {strings.title}
          </h1>
          <p className="mt-s6 max-w-[60ch] text-lg leading-normal text-muted">
            {strings.lede}
          </p>
        </Reveal>
      </Container>

      <Container className="grid grid-cols-1 gap-s7 pb-s10 min-[901px]:[grid-template-columns:minmax(220px,280px)_1fr]">
        <aside className="self-start border-t border-line-light pt-4 min-[901px]:sticky min-[901px]:top-[calc(var(--nav-h)+1rem)]">
          <p className="mb-[0.8rem] font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {strings.contentsLabel}
          </p>
          <ol className="flex flex-col gap-[0.55rem]">
            {strings.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-ink transition-colors duration-1 ease-akieni hover:text-cyan-teal"
                >
                  <span className="font-mono text-xs tracking-[0.12em] text-muted-2">
                    {String(i + 1).padStart(2, "0")} ·{" "}
                  </span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div>
          {strings.sections.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid grid-cols-[40px_1fr] gap-s4 border-t border-line-light py-8 first:border-t-0 first:pt-0"
            >
              <div className="pt-[0.4rem] font-mono text-xs tracking-[0.14em] text-cyan-teal">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h2 className="mb-[0.8rem] text-2xl tracking-[-0.02em] font-bold">
                  {s.heading}
                </h2>
                <p className="text-md leading-[1.6] text-ink">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
