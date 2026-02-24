import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  dict: {
    faq: {
      title: string;
      items: { question: string; answer: string }[];
    };
  };
}

export function Faq({ dict }: FaqProps) {
  return (
    <section id="faq" className="scroll-mt-20 bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {dict.faq.title}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {dict.faq.items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
