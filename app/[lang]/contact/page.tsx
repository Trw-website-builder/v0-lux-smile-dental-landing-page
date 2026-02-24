import { getDictionary, type Locale } from "@/lib/i18n";
import { ContactPageContent } from "@/components/contact-page-content";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ContactPageContent dict={dict} lang={lang} />;
}
