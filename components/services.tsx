import { Scan, Sparkles, Crown, Siren } from "lucide-react";

const icons = [Scan, Sparkles, Crown, Siren];

interface ServicesProps {
  dict: {
    services: {
      title: string;
      items: { title: string; description: string }[];
    };
  };
}

export function Services({ dict }: ServicesProps) {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {dict.services.title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
