import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ShieldCheck, Layers } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageBanner } from '@/components/PageBanner';
import { DOMAINS_DATA } from '@/data/shiconsData';
import { routing } from '@/i18n/routing';
import { getServerLocalizedData } from '@/lib/getLocalizedData';

interface ServiceDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DOMAINS_DATA.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale: resolvedLocale, namespace: 'Metadata' });
  const { domains } = await getServerLocalizedData(resolvedLocale);
  const service = domains.find((d) => d.slug === slug);
  if (!service) return { title: tMeta('domainNotFoundTitle') };

  return {
    title: `${service.viTitle} | SHICONS E&C`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(resolvedLocale);

  const t = await getTranslations({ locale: resolvedLocale, namespace: 'Pages.Domains' });
  const { domains, contact } = await getServerLocalizedData(resolvedLocale);
  const service = domains.find((d) => d.slug === slug);
  if (!service) notFound();

  const otherServices = domains.filter((d) => d.slug !== service.slug);

  return (
    <div className="flex flex-col">
      <PageBanner
        title={service.viTitle}
        subtitle={service.enTitle}
        breadcrumbs={[
          { label: t('breadcrumb'), href: '/linh-vuc-hoat-dong' },
          { label: service.viTitle },
        ]}
        badge={t('detailStandardBadge', { standard: service.standard })}
        bgImage={service.imageUrl}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/linh-vuc-hoat-dong"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0040A0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToList')}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Cover Image */}
              <div className="relative rounded-[2px] overflow-hidden h-[340px] sm:h-[420px] shadow-md border border-gray-200 bg-slate-900">
                <img
                  src={service.imageUrl}
                  alt={service.viTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0040A0] text-white px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest rounded-[1px]">
                  {service.badge}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0040A0] font-heading uppercase tracking-tight">
                  {t('overviewTitle')}
                </h2>
                <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px]" />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
                  {service.fullDesc}
                </p>
              </div>

              {/* Sub-systems breakdown */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-shicons-heading font-heading uppercase tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-[#0040A0]" />
                  <span>{t('subSystemsTitle')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.subSystems.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-[2px] bg-slate-50 border border-gray-200 hover:border-[#0040A0] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#0040A0] text-white text-xs font-bold flex items-center justify-center font-mono">
                          0{idx + 1}
                        </span>
                        <h4 className="font-extrabold text-sm text-shicons-heading uppercase font-heading">
                          {sub.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standards and Compliance */}
              <div className="p-6 sm:p-8 rounded-[2px] bg-[#07182E] text-white space-y-4">
                <div className="flex items-center gap-2 text-[#ED1C24]">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-widest font-mono">
                    {t('standardsEyebrow')}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading uppercase">
                  {t('standardsTitle')}
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.standards.map((std, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-mono font-semibold rounded-[2px]"
                    >
                      ✓ {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Consultation Box */}
              <div className="p-6 sm:p-8 rounded-[2px] bg-blue-50 border-2 border-[#0040A0] space-y-4 text-center">
                <h4 className="text-lg font-extrabold text-[#0040A0] uppercase font-heading">
                  {t('consultBoxTitle')}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t('consultBoxDesc')}
                </p>
                <div className="pt-2 space-y-2">
                  <Link
                    href="/lien-he"
                    className="w-full btn-shicons py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs tracking-wider uppercase shadow-md"
                  >
                    {t('requestQuote')}
                  </Link>
                  <a
                    href={`tel:${contact.primaryHotline}`}
                    className="w-full btn-shicons py-3 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs tracking-wider uppercase shadow-md block"
                  >
                    Hotline: {contact.hotlines[0]}
                  </a>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 space-y-4">
                <h4 className="text-sm font-extrabold text-shicons-heading uppercase tracking-wider font-heading border-b border-gray-200 pb-3">
                  {t('otherDomainsTitle')}
                </h4>
                <div className="space-y-2">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/linh-vuc-hoat-dong/${other.slug}`}
                      className="block p-3 rounded-[2px] bg-white hover:bg-blue-50 hover:text-[#0040A0] border border-gray-200 text-xs font-bold uppercase transition-colors"
                    >
                      {other.viTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
