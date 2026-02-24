import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { locales, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "LuxSmile Dental - Dentisterie Moderne au Luxembourg",
    description:
      "Soins dentaires modernes, doux et sans stress au Luxembourg. Prenez rendez-vous avec LuxSmile Dental.",
  },
  en: {
    title: "LuxSmile Dental - Modern Dentistry in Luxembourg",
    description:
      "Modern, gentle, stress-free dental care in Luxembourg. Book your appointment with LuxSmile Dental.",
  },
  de: {
    title: "LuxSmile Dental - Moderne Zahnmedizin in Luxemburg",
    description:
      "Moderne, sanfte und stressfreie Zahnpflege in Luxemburg. Vereinbaren Sie Ihren Termin bei LuxSmile Dental.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = metadataByLocale[lang] || metadataByLocale.fr;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang,
      type: "website",
    },
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
        de: "/de",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
