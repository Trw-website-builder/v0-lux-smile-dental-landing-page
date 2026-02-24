import Link from "next/link";
import { Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

interface HeroProps {
  dict: {
    hero: {
      headline: string;
      subheadline: string;
      callNow: string;
      callback: string;
    };
  };
  lang: Locale;
}

export function Hero({ dict, lang }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center lg:px-8 lg:py-36">
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          {dict.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/90 md:text-xl">
          {dict.hero.subheadline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base"
          >
            <a href="tel:+35212345">
              <Phone className="size-5" />
              {dict.hero.callNow}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-white/10 px-8 py-6 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            <Link href={`/${lang}/contact`}>
              <CalendarDays className="size-5" />
              {dict.hero.callback}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
