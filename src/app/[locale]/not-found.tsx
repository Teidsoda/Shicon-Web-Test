import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Compass } from 'lucide-react';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound');

  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#F5F5F5] pt-28 pb-20 px-4">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-[2px] shadow-md p-8 sm:p-12 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#0040A0] mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="text-5xl sm:text-6xl font-black text-[#0040A0] font-heading tracking-wider">
          {t('code')}
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-shicons-heading uppercase font-heading">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('description')}
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-shicons px-6 py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs tracking-wider uppercase gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backHome')}</span>
          </Link>
          <Link
            href="/du-an"
            className="btn-shicons px-6 py-3 border border-gray-400 text-shicons-dark hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white text-xs tracking-wider uppercase"
          >
            {t('viewProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
}
