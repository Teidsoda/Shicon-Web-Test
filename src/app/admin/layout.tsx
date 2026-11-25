import type { Metadata } from 'next';

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
  return <>{children}</>;
}
