"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type FormStrings = Dictionary["contact"]["form"];

const FIELD_LABEL = "font-mono text-xs uppercase tracking-[0.14em] text-muted-2";
const FIELD_INPUT =
  "border-0 border-b border-line bg-transparent py-[0.7rem] text-md text-ink outline-none transition-colors duration-1 ease-akieni focus:border-cyan-teal";

export function ContactForm({
  strings,
}: Readonly<{ strings: FormStrings }>) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid grid-cols-1 gap-[1.2rem] min-[601px]:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="name" className={FIELD_LABEL}>
          {strings.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={strings.namePlaceholder}
          className={FIELD_INPUT}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="email" className={FIELD_LABEL}>
          {strings.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={strings.emailPlaceholder}
          className={FIELD_INPUT}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="company" className={FIELD_LABEL}>
          {strings.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder={strings.companyPlaceholder}
          className={FIELD_INPUT}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label htmlFor="subject" className={FIELD_LABEL}>
          {strings.subject}
        </label>
        <select id="subject" name="subject" className={FIELD_INPUT}>
          {strings.subjectOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[0.4rem] min-[601px]:col-span-2">
        <label htmlFor="message" className={FIELD_LABEL}>
          {strings.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder={strings.messagePlaceholder}
          className={[FIELD_INPUT, "min-h-[110px] resize-y"].join(" ")}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-s4 min-[601px]:col-span-2">
        <span className="font-mono text-xs tracking-[0.14em] text-muted">
          {strings.note}
        </span>
        <button
          type="submit"
          disabled={sent}
          className="group inline-flex items-center gap-[0.65rem] border border-black bg-black px-[1.7rem] py-[1.1rem] text-base font-semibold uppercase tracking-[0.02em] text-white transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-ink hover:bg-ink hover:text-cyan-teal disabled:cursor-default disabled:border-cyan-teal disabled:bg-cyan-teal disabled:text-black"
        >
          {sent ? strings.sent : strings.submit}
          {!sent && (
            <span
              aria-hidden
              className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
            >
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
