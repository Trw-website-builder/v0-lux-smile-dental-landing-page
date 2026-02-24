"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Smile, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  dict: {
    header: { phone: string; cta: string };
    languageSwitcher: Record<string, string>;
  };
  lang: Locale;
  onOpenForm: () => void;
}

export function Header({ dict, lang, onOpenForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-foreground"
        >
          <Smile className="size-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            LuxSmile Dental
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+35212345"
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4" />
            {dict.header.phone}
          </a>
          <Button onClick={onOpenForm} size="lg">
            {dict.header.cta}
          </Button>
          <LanguageSwitcher lang={lang} dict={dict.languageSwitcher} />
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <MobileNav
            dict={dict}
            lang={lang}
            onOpenForm={onOpenForm}
          />
        </div>
      </div>
    </header>
  );
}
