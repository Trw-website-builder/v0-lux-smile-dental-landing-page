import { HeartPulse, Stethoscope, PhoneCall } from "lucide-react";

const icons = [HeartPulse, Stethoscope, PhoneCall];

interface FeaturesProps {
  dict: {
    features: {
      title: string;
      items: { title: string; description: string }[];
    };
  };
}

export function Features({ dict }: FeaturesProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {dict.features.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl bg-muted p-8 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
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
