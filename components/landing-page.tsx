"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { AppointmentDialog } from "@/components/appointment-dialog";
import type { Locale } from "@/lib/i18n";

interface LandingPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  lang: Locale;
}

export function LandingPage({ dict, lang }: LandingPageProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Header dict={dict} lang={lang} onOpenForm={() => setFormOpen(true)} />
      <main>
        <Hero dict={dict} onOpenForm={() => setFormOpen(true)} />
        <SocialProof dict={dict} />
        <Features dict={dict} />
        <Services dict={dict} />
        <Testimonials dict={dict} />
        <Faq dict={dict} />
        <CtaBanner dict={dict} />
      </main>
      <Footer dict={dict} />
      <AppointmentDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        dict={dict}
        lang={lang}
      />
    </>
  );
}
