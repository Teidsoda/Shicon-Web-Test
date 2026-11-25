import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

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
  title: 'SHICONS E&C — Tổng thầu Cơ điện (MEP) & Phòng sạch Chuyên sâu',
  description: 'Công ty Cổ phần Shicons E&C — Nhà thầu hàng đầu chuyên thiết kế, cung cấp và thi công trọn gói hệ thống Cơ điện (M&E / MEP) cho các dự án Nhà máy công nghệ cao, Tòa tháp thương mại, Phòng sạch Dược phẩm & Trung tâm dữ liệu.',
  keywords: [
    'Shicons', 'Shicons E&C', 'nhà thầu cơ điện', 'phòng sạch bán dẫn',
    'khí sạch bệnh viện', 'HVAC chiller', 'Revit MEP', 'BIM LOD 400',
    'nhà máy FDI', 'tổng thầu MEP'
  ],
  authors: [{ name: 'Shicons E&C' }],
  openGraph: {
    title: 'SHICONS E&C — Tổng thầu Cơ điện (MEP) & Phòng sạch Chuyên sâu',
    description: 'Chuyên gia cơ điện lạnh, phòng sạch bán dẫn, khí y tế bệnh viện và giải pháp thông gió công nghiệp chuẩn quốc tế.',
    url: 'https://shicons.vn',
    siteName: 'SHICONS E&C',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-white text-shicons-dark antialiased selection:bg-[#0040A0] selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
