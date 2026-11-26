import { redirect } from '@/i18n/navigation';

export default async function DichVuRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/linh-vuc-hoat-dong', locale });
}
