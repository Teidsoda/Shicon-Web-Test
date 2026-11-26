import { redirect } from '@/i18n/navigation';

export default async function GioiThieuRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/ve-chung-toi', locale });
}
