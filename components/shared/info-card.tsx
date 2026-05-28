import { MotionCard } from "@/components/motion/primitives";

export function InfoCard({
  number,
  title,
  desc,
  surface = "light",
}: Readonly<{
  number: string;
  title: string;
  desc: string;
  surface?: "light" | "dark";
}>) {
  const isDark = surface === "dark";
  return (
    <MotionCard
      className={[
        "flex flex-col gap-s3 overflow-hidden border p-[1.6rem] transition-colors duration-2 ease-akieni",
        isDark
          ? "bg-ink-2 border-line text-white"
          : "bg-white border-line-light",
      ].join(" ")}
    >
      <span className="font-mono text-sm tracking-widest text-cyan-teal">
        {number}
      </span>
      <h3 className="text-xl font-bold leading-[1.15] tracking-[-0.02em]">
        {title}
      </h3>
      <p
        className={["text-md", isDark ? "text-muted-2" : "text-muted"].join(
          " ",
        )}
      >
        {desc}
      </p>
    </MotionCard>
  );
}
