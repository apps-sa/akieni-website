import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  await getDictionary(lang); // wired; unused until pages start reading it

  return (
    <main className="mx-auto flex max-w-page flex-1 flex-col items-start gap-s5 px-gutter pt-[calc(var(--nav-h)+3rem)] pb-s9">
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {lang.toUpperCase()} · placeholder
      </span>
      <h1 className="text-5xl font-bold tracking-tight">Akieni</h1>
      <p className="max-w-[60ch] text-lg text-muted">
        Locale routing is live and the header is mounted. Scroll down to see
        the nav switch from transparent to solid. Use the switcher in the nav
        to swap between <code className="font-mono">/en</code> and{" "}
        <code className="font-mono">/fr</code>.
      </p>
      <div className="h-[200vh]" aria-hidden />
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        End of placeholder
      </p>
    </main>
  );
}
