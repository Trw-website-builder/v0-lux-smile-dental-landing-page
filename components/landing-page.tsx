import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import type { Locale } from "@/lib/i18n";

interface LandingPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  lang: Locale;
}

export function LandingPage({ dict, lang }: LandingPageProps) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} lang={lang} />
        <SocialProof dict={dict} />
        <Features dict={dict} />
        <Services dict={dict} />
        <Testimonials dict={dict} />
        <Faq dict={dict} />
        <CtaBanner dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
