"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type FormStrings = Dictionary["roles"]["form"];

const LABEL = "font-mono text-xs uppercase tracking-[0.14em] text-muted-2";
const INPUT =
  "border-0 border-b border-line bg-transparent py-[0.7rem] text-md text-white outline-none transition-colors duration-1 ease-akieni focus:border-cyan-teal";

export function ApplicationForm({
  strings,
  roleTitle,
}: Readonly<{ strings: FormStrings; roleTitle: string }>) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid max-w-[760px] grid-cols-1 gap-[1.2rem] min-[601px]:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-first" className={LABEL}>
          {strings.firstName}
        </label>
        <input id="ap-first" type="text" required className={INPUT} />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-last" className={LABEL}>
          {strings.lastName}
        </label>
        <input id="ap-last" type="text" required className={INPUT} />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-email" className={LABEL}>
          {strings.email}
        </label>
        <input id="ap-email" type="email" required className={INPUT} />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-phone" className={LABEL}>
          {strings.phone}
        </label>
        <input id="ap-phone" type="tel" className={INPUT} />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-loc" className={LABEL}>
          {strings.location}
        </label>
        <input
          id="ap-loc"
          type="text"
          placeholder={strings.locationPlaceholder}
          className={INPUT}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="ap-linkedin" className={LABEL}>
          {strings.profile}
        </label>
        <input
          id="ap-linkedin"
          type="url"
          placeholder="https://"
          className={INPUT}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem] min-[601px]:col-span-2">
        <label htmlFor="ap-role" className={LABEL}>
          {strings.role}
        </label>
        <input id="ap-role" type="text" readOnly value={roleTitle} className={INPUT} />
      </div>
      <div className="flex flex-col gap-[0.4rem] border border-dashed border-line bg-ink-2 p-4 min-[601px]:col-span-2">
        <label htmlFor="ap-cv" className={LABEL}>
          {strings.cv}
        </label>
        <input id="ap-cv" type="file" accept=".pdf,.doc,.docx" className="text-sm text-muted-2" />
        <span className="text-sm text-muted-2">{strings.cvHint}</span>
      </div>
      <div className="flex flex-col gap-[0.4rem] min-[601px]:col-span-2">
        <label htmlFor="ap-cover" className={LABEL}>
          {strings.cover}
        </label>
        <textarea
          id="ap-cover"
          rows={5}
          placeholder={strings.coverPlaceholder}
          className={[INPUT, "min-h-[110px] resize-y"].join(" ")}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem] min-[601px]:col-span-2">
        <label htmlFor="ap-where" className={LABEL}>
          {strings.source}
        </label>
        <select id="ap-where" className={INPUT}>
          {strings.sourceOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex items-start gap-[0.6rem] min-[601px]:col-span-2">
        <input id="ap-legal" type="checkbox" required className="mt-1" />
        <label htmlFor="ap-legal" className="text-sm text-muted-2">
          {strings.legal}
        </label>
      </div>
      <div className="min-[601px]:col-span-2">
        <button
          type="submit"
          disabled={sent}
          className="inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.7rem] py-[1.1rem] text-base font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-green hover:bg-green disabled:cursor-default"
        >
          {sent ? strings.sent : strings.submit}
        </button>
      </div>
    </form>
  );
}
