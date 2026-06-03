import Image from "next/image";
import Link from "next/link";
import { MotionCard } from "@/components/motion/primitives";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Tag } from "@/components/shared/tag";

export type Project = {
  slug: string;
  client: string;
  title: string;
  tags: ReadonlyArray<string>;
  years?: string;
  statusLabel: string;
  mediaLabel?: string;
  image?: string;
  desc?: string;
};

type Size = "default" | "lg" | "sm" | "full";

const SIZE_SPAN: Record<Size, string> = {
  default: "",
  lg: "lg:col-span-7",
  sm: "lg:col-span-5",
  full: "lg:col-span-12",
};

const SIZE_ASPECT: Record<Size, string> = {
  default: "4/3",
  lg: "16/10",
  sm: "4/3",
  full: "21/6",
};

export function ProjectCard({
  project,
  lang,
  surface = "dark",
  size = "default",
}: Readonly<{
  project: Project;
  lang: string;
  surface?: "dark" | "paper";
  size?: Size;
}>) {
  const isDark = surface === "dark";
  const isLinkable = project.slug.length > 0;

  const cardCls = [
    "relative flex flex-col overflow-hidden border transition-colors duration-2 ease-akieni",
    isDark
      ? "bg-ink-2 border-line text-white"
      : "bg-white border-line-light text-black",
    isLinkable
      ? isDark
        ? "hover:border-cyan-teal"
        : "hover:border-black"
      : "",
    SIZE_SPAN[size],
  ]
    .filter(Boolean)
    .join(" ");

  const descCls = isDark ? "text-md text-muted-2" : "text-md text-muted";
  const clientCls = isLinkable
    ? "font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal"
    : isDark
      ? "font-mono text-xs uppercase tracking-[0.14em] text-muted-2"
      : "font-mono text-xs uppercase tracking-[0.14em] text-muted";
  const footBorderCls = isDark ? "border-line" : "border-line-light";
  const footTextCls = isDark ? "text-muted-2" : "text-muted";

  const isFullSize = size === "full";

  const body = (
    <>
      {project.image ? (
        <div className="relative min-h-[420px] flex-1 overflow-hidden">
          <Image
            src={project.image}
            alt={project.mediaLabel ?? project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <PlaceholderMedia
          aspect={SIZE_ASPECT[size]}
          label={project.mediaLabel}
        />
      )}
      <div className="flex flex-1 flex-col gap-s3 p-[1.6rem_1.6rem_1.8rem]">
        {isFullSize ? (
          <div className="flex flex-wrap items-start justify-between gap-s4">
            <div className="flex max-w-[60ch] flex-col gap-2">
              <span className={clientCls}>{project.client}</span>
              <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-col items-end gap-[0.6rem]">
              <div className="flex flex-wrap justify-end gap-[0.4rem]">
                {project.tags.map((t) => (
                  <Tag key={t} surface={isDark ? "dark" : "light"}>
                    {t}
                  </Tag>
                ))}
              </div>
              {/* <Tag variant="status" surface={isDark ? "dark" : "light"}>
                {project.statusLabel}
              </Tag> */}
            </div>
          </div>
        ) : (
          <>
            <span className={clientCls}>{project.client}</span>
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              {project.title}
            </h3>
            {project.desc && <p className={descCls}>{project.desc}</p>}
            <div className="flex flex-wrap gap-[0.4rem]">
              {project.tags.map((t) => (
                <Tag key={t} surface={isDark ? "dark" : "light"}>
                  {t}
                </Tag>
              ))}
            </div>
          </>
        )}
      </div>
      {!isFullSize && (
        <div
          className={[
            "flex items-center justify-between border-t px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em]",
            footBorderCls,
            footTextCls,
          ].join(" ")}
        >
          <span>{project.years ?? ""}</span>
          {/* <Tag variant="status" surface={isDark ? "dark" : "light"}>
            {project.statusLabel}
          </Tag> */}
        </div>
      )}
    </>
  );

  if (isLinkable) {
    return (
      <MotionCard className={cardCls}>
        <Link
          href={`/${lang}/projects/${project.slug}`}
          className="flex flex-1 flex-col"
        >
          {body}
        </Link>
      </MotionCard>
    );
  }

  return (
    <MotionCard className={cardCls} lift={0}>
      <div className="flex flex-1 flex-col">{body}</div>
    </MotionCard>
  );
}
