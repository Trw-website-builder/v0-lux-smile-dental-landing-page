"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import type { Locale } from "@/lib/i18n";

interface ContactPageContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  lang: Locale;
}

export function ContactPageContent({ dict, lang }: ContactPageContentProps) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        {/* Hero section */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {dict.contactPage.heroTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
              {dict.contactPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3 lg:px-8">
            {/* Form column */}
            <div className="lg:col-span-2">
              <ContactForm dict={dict} lang={lang} />
            </div>

            {/* Sidebar with contact info */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {dict.footer.contact}
                </h3>
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-primary" />
                    <a
                      href="tel:+35212345"
                      className="transition-colors hover:text-foreground"
                    >
                      {dict.header.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-primary" />
                    <a
                      href="mailto:hello@luxsmile.lu"
                      className="transition-colors hover:text-foreground"
                    >
                      hello@luxsmile.lu
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{dict.footer.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{dict.footer.hours}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-accent py-16 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:px-8">
            <h2 className="max-w-2xl text-balance text-2xl font-bold text-accent-foreground md:text-3xl">
              {dict.contactPage.ctaTitle}
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-accent-foreground/80">
              {dict.contactPage.ctaDescription}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base font-semibold"
            >
              <a href="tel:+35212345">
                <Phone className="size-5" />
                {dict.contactPage.ctaButton}
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer dict={dict} />
    </>
  );
}
