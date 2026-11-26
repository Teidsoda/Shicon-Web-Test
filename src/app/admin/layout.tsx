import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ClientLayout } from '@/components/ClientLayout';
import viMessages from '../../../messages/vi.json';
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

export const metadata: Metadata = {
  title: 'Hệ Thống Quản Trị Nội Dung (CMS) | SHICONS E&C',
  description: 'Trang quản trị nội dung website Công ty Cổ phần Shicons E&C',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        <NextIntlClientProvider locale="vi" messages={viMessages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
