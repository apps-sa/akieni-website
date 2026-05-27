export function FeatureGrid({
  items,
  surface = "light",
}: Readonly<{
  items: ReadonlyArray<{ key: string; value: string }>;
  surface?: "light" | "dark";
}>) {
  const borderCls = surface === "dark" ? "border-line" : "border-line-light";
  return (
    <div
      className={[
        "grid grid-cols-1 border min-[721px]:grid-cols-2",
        borderCls,
      ].join(" ")}
    >
      {items.map((it) => (
        <div
          key={it.key}
          className={[
            "flex flex-col gap-[0.35rem] p-[1.2rem]",
            "border-b max-[720px]:border-r-0",
            "min-[721px]:border-r [&:nth-child(2n)]:min-[721px]:border-r-0",
            "[&:nth-last-child(-n+2)]:min-[721px]:border-b-0",
            "[&:last-child]:max-[720px]:border-b-0",
            borderCls,
          ].join(" ")}
        >
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal">
            {it.key}
          </span>
          <span className="text-md font-semibold">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
