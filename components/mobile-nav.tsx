"use client";

import { useState } from "react";
import Link from "next/link";
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

interface MobileNavProps {
  dict: {
    header: { phone: string; cta: string };
    languageSwitcher: Record<string, string>;
  };
  lang: Locale;
}

export function MobileNav({ dict, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);

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
