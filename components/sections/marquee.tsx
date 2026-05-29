import type { Dictionary } from "@/app/[lang]/dictionaries";

type MarqueeStrings = Dictionary["home"]["marquee"];

export function Marquee({ strings }: Readonly<{ strings: MarqueeStrings }>) {
  const items = [...strings.items, ...strings.items];

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-line bg-black py-[0.9rem] font-mono text-sm uppercase tracking-[0.16em] text-white"
    >
      <div className="flex gap-12 whitespace-nowrap will-change-transform animate-marquee">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-4 text-muted-2 after:ml-4 after:text-[0.6rem] after:text-cyan-teal after:content-['◆']"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
