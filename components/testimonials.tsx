import { Quote } from "lucide-react";

interface TestimonialsProps {
  dict: {
    testimonials: {
      title: string;
      items: { quote: string; name: string }[];
    };
  };
}

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {dict.testimonials.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {dict.testimonials.items.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl bg-muted p-8"
            >
              <Quote className="mb-4 size-8 text-primary/30" />
              <blockquote className="mb-4 text-lg leading-relaxed text-foreground italic">
                {`"${item.quote}"`}
              </blockquote>
              <cite className="text-sm font-semibold not-italic text-muted-foreground">
                {"— "}{item.name}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
