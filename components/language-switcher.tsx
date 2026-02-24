"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Locale;
  dict: Record<string, string>;
}

export function LanguageSwitcher({ lang, dict }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <Select value={lang} onValueChange={handleChange}>
      <SelectTrigger className="w-28" aria-label="Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {dict[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
