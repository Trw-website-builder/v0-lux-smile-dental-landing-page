import { getDictionary, type Locale } from "@/lib/i18n";
import { LandingPage } from "@/components/landing-page";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LandingPage dict={dict} lang={lang} />;
}
