import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ClientLayout } from '@/components/ClientLayout';
import '../globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'Metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: [
      'Shicons', 'Shicons E&C', 'nhà thầu cơ điện', 'MEP contractor', 'phòng sạch bán dẫn',
      'khí sạch bệnh viện', 'HVAC chiller', 'Revit MEP', 'BIM LOD 400',
      'nhà máy FDI', 'tổng thầu MEP'
    ],
    authors: [{ name: 'Shicons E&C' }],
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: 'https://shicons.vn',
      siteName: 'SHICONS E&C',
      locale: resolvedLocale === 'en' ? 'en_US' : 'vi_VN',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${beVietnamPro.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-white text-shicons-dark antialiased selection:bg-[#0040A0] selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
