"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "services" as const, hash: "#services" },
  { key: "reviews" as const, hash: "#reviews" },
  { key: "appointment" as const, hash: "#request-appointment" },
  { key: "faq" as const, hash: "#faq" },
];

interface MobileNavProps {
  dict: {
    header: { phone: string; cta: string };
    nav: { services: string; reviews: string; appointment: string; faq: string };
    languageSwitcher: Record<string, string>;
  };
  lang: Locale;
}

export function MobileNav({ dict, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  function navHref(hash: string) {
    return isHome ? hash : `/${lang}/${hash}`;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-6" />
      </Button>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-foreground">LuxSmile Dental</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 p-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={navHref(item.hash)}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {dict.nav[item.key]}
            </a>
          ))}

          <hr className="border-border" />

          <a
            href="tel:+35212345"
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4" />
            {dict.header.phone}
          </a>
          <Button asChild className="w-full" onClick={() => setOpen(false)}>
            <Link href={`/${lang}/contact`}>{dict.header.cta}</Link>
          </Button>
          <div className="pt-2">
            <LanguageSwitcher lang={lang} dict={dict.languageSwitcher} />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
