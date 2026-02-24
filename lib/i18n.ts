export const locales = ["fr", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  fr: () => import("@/lib/dictionaries/fr.json").then((m) => m.default),
  en: () => import("@/lib/dictionaries/en.json").then((m) => m.default),
  de: () => import("@/lib/dictionaries/de.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const dict = await dictionaries[locale]();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dict as any;
}
