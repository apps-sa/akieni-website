import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { ClientCard } from "@/lib/queries/clients";
import { BlurImage } from "@/components/shared/blur-image";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type ClientsStrings = Dictionary["home"]["clients"];

export function Clients({
  strings,
  clients,
}: Readonly<{ strings: ClientsStrings; clients: ClientCard[] }>) {
  const dictItems = strings.items ?? [];
  const items: Array<{ name: string; tag: string; logoUrl: string | null; website: string | null }> =
    clients.length > 0
      ? clients.map((c, i) => ({ ...c, tag: dictItems[i]?.tag ?? "" }))
      : dictItems.map((d) => ({ name: d.name, tag: d.tag, logoUrl: null, website: d.website ?? null }));

  if (items.length === 0) return null;

  return (
    <Section variant="default" className="bg-white">
      <div className="flex flex-col gap-s6">
        <div className="flex flex-wrap items-end justify-between gap-s4">
          <div className="flex flex-col gap-s2">
            <Eyebrow>{strings.eyebrow}</Eyebrow>
            {strings.title && (
              <h2 className="max-w-[22ch] text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                {strings.title}
              </h2>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-line-light min-[601px]:grid-cols-4">
          {items.map((c) => {
            const inner = (
              <div className="flex flex-col items-start gap-[0.75rem] p-[1.8rem_1.6rem]">
                <div className="flex items-center gap-[0.6rem]">
                  {c.logoUrl ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                      <BlurImage
                        src={c.logoUrl}
                        alt={c.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <span
                      aria-hidden
                      className="inline-block h-[1.4rem] w-[1.4rem] shrink-0 border border-current opacity-40"
                    />
                  )}
                  <span className="text-base font-bold tracking-[-0.01em]">{c.name}</span>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  {c.tag}
                </span>
              </div>
            );

            return (
              <div
                key={c.name}
                className="border-b border-r border-line-light transition-colors duration-2 ease-akieni hover:bg-paper"
              >
                {c.website ? (
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={c.name}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
