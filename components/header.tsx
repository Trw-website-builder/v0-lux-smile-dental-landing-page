"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  dict: {
    header: { phone: string; cta: string };
    nav: { services: string; reviews: string; appointment: string; faq: string };
    languageSwitcher: Record<string, string>;
  };
  lang: Locale;
}

const NAV_ITEMS = [
  { key: "services" as const, hash: "#services" },
  { key: "reviews" as const, hash: "#reviews" },
  { key: "appointment" as const, hash: "#request-appointment" },
  { key: "faq" as const, hash: "#faq" },
];

export function Header({ dict, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function navHref(hash: string) {
    return isHome ? hash : `/${lang}/${hash}`;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-2 text-foreground"
        >
          <Smile className="size-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            LuxSmile Dental
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={navHref(item.hash)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {dict.nav[item.key]}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href="tel:+35212345"
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4" />
            {dict.header.phone}
          </a>
          <Button asChild size="lg">
            <Link href={`/${lang}/contact`}>{dict.header.cta}</Link>
          </Button>
          <LanguageSwitcher lang={lang} dict={dict.languageSwitcher} />
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <MobileNav dict={dict} lang={lang} />
        </div>
      </div>
    </header>
  );
}
