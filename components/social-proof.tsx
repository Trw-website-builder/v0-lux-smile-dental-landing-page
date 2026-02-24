import { Star } from "lucide-react";

interface SocialProofProps {
  dict: {
    socialProof: { text: string };
  };
}

export function SocialProof({ dict }: SocialProofProps) {
  return (
    <section className="bg-secondary py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-center lg:px-8">
        <div className="flex gap-1" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-5 fill-gold text-gold"
            />
          ))}
        </div>
        <p className="text-sm font-medium text-secondary-foreground md:text-base">
          {dict.socialProof.text}
        </p>
      </div>
    </section>
  );
}
