import Link from "next/link";
import { Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

interface CtaBannerProps {
  dict: {
    ctaBanner: {
      headline: string;
      cta: string;
    };
    header: {
      cta: string;
    };
  };
  lang: Locale;
}

export function CtaBanner({ dict, lang }: CtaBannerProps) {
  return (
    <section id="request-appointment" className="scroll-mt-20 bg-accent py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-bold text-accent-foreground md:text-4xl">
          {dict.ctaBanner.headline}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base font-semibold"
          >
            <a href="tel:+35212345">
              <Phone className="size-5" />
              {dict.ctaBanner.cta}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent-foreground/30 px-8 py-6 text-base font-semibold text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground"
          >
            <Link href={`/${lang}/contact`}>
              <CalendarDays className="size-5" />
              {dict.header.cta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
