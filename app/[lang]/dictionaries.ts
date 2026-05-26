import "server-only";
import type en from "./dictionaries/en.json";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
} as const;

export const LOCALES = ["en", "fr"] as const;
export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
