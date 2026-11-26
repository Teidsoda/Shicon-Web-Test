import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageBanner } from '@/components/PageBanner';
import { NEWS_DATA } from '@/data/shiconsData';
import { routing } from '@/i18n/routing';
import { getServerLocalizedData } from '@/lib/getLocalizedData';

interface NewsDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return NEWS_DATA.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale: resolvedLocale, namespace: 'Metadata' });
  const { news } = await getServerLocalizedData(resolvedLocale);
  const post = news.find((n) => n.slug === slug);
  if (!post) return { title: tMeta('newsNotFoundTitle') };

  return {
    title: `${post.title} | SHICONS E&C`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(resolvedLocale);

  const t = await getTranslations({ locale: resolvedLocale, namespace: 'Pages.News' });
  const { news } = await getServerLocalizedData(resolvedLocale);
  const post = news.find((n) => n.slug === slug);
  if (!post) notFound();

  const relatedNews = news.filter((n) => n.slug !== post.slug).slice(0, 3);

  return (
    <div className="flex flex-col">
      <PageBanner
        title={post.title}
        subtitle={t('detailSubtitle', { category: post.categoryLabel, date: post.date })}
        breadcrumbs={[
          { label: t('breadcrumb'), href: '/tin-tuc' },
          { label: post.title },
        ]}
        badge={post.categoryLabel}
        bgImage={post.imageUrl}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0040A0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToList')}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (8 cols) */}
            <article className="lg:col-span-8 space-y-8">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#ED1C24]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-[#0040A0]" />
                    {post.author}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-100 text-[#0040A0] font-bold uppercase text-[10px] rounded-[1px]">
                  {post.categoryLabel}
                </span>
              </div>

              {/* Cover Image */}
              <div className="relative rounded-[2px] overflow-hidden max-h-[460px] shadow-md border border-gray-200 bg-slate-900">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Excerpt Lead */}
              <div className="p-6 rounded-[2px] bg-slate-50 border-l-4 border-[#0040A0] text-sm sm:text-base font-semibold text-gray-800 leading-relaxed italic">
                {post.excerpt}
              </div>

              {/* Full Article Text */}
              <div className="space-y-6 text-sm sm:text-base text-gray-800 leading-relaxed">
                <p>{post.content}</p>
                <p>{t('closingParagraph1')}</p>
                <p>{t('closingParagraph2')}</p>
              </div>

              {/* Footer Author Box */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-mono block">{t('authorLabel')}</span>
                  <strong className="text-sm font-heading font-extrabold text-[#0040A0] uppercase">
                    {post.author}
                  </strong>
                </div>
                <Link
                  href="/lien-he"
                  className="btn-shicons px-5 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs tracking-wider uppercase"
                >
                  {t('mediaContactBtn')}
                </Link>
              </div>
            </article>

            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Consultation Card */}
              <div className="p-6 rounded-[2px] bg-blue-50 border-2 border-[#0040A0] text-center space-y-4">
                <h4 className="text-base font-extrabold text-[#0040A0] uppercase font-heading">
                  {t('sidebarTitle')}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t('sidebarDesc')}
                </p>
                <Link
                  href="/lien-he"
                  className="w-full btn-shicons py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs tracking-wider uppercase block shadow-md"
                >
                  {t('sidebarBtn')}
                </Link>
              </div>

              {/* Related News */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 space-y-4">
                <h4 className="text-sm font-extrabold text-shicons-heading uppercase tracking-wider font-heading border-b border-gray-200 pb-3">
                  {t('relatedTitle')}
                </h4>
                <div className="space-y-4">
                  {relatedNews.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/tin-tuc/${rel.slug}`}
                      className="block p-3 bg-white rounded-[2px] border border-gray-200 hover:border-[#0040A0] hover:shadow-sm transition-all group"
                    >
                      <span className="text-[10px] text-[#ED1C24] font-bold uppercase tracking-wider block mb-1">
                        {rel.date}
                      </span>
                      <h5 className="text-xs font-bold text-shicons-heading uppercase font-heading group-hover:text-[#0040A0] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
