import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  dict: {
    ctaBanner: {
      headline: string;
      cta: string;
    };
  };
}

export function CtaBanner({ dict }: CtaBannerProps) {
  return (
    <section className="bg-accent py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-bold text-accent-foreground md:text-4xl">
          {dict.ctaBanner.headline}
        </h2>
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
      </div>
    </section>
  );
}
