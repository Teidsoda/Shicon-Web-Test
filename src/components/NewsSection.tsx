'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const NewsSection: React.FC = () => {
  const t = useTranslations('NewsSection');
  const { news } = useContent();

  if (!news || news.length === 0) return null;

  const [featuredNews, ...otherNews] = news;

  return (
    <section id="tin-tuc" className="py-24 sm:py-32 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-gray-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
              {t('eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              {t('title')}
            </h2>
          </div>

          <Link
            href="/tin-tuc"
            className="btn-shicons px-6 py-2.5 border border-gray-400 text-shicons-dark hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white text-xs tracking-wider gap-2 group self-start sm:self-auto"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid: 1 Large Left (~2/3) + 2 Small Right stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Card (~2/3 on desktop, height ~430px) */}
          <div className="lg:col-span-8">
            <Link
              href={`/tin-tuc/${featuredNews.slug}`}
              className="group relative block h-[360px] sm:h-[440px] rounded-[10px] overflow-hidden shadow-md cursor-pointer bg-slate-900"
            >
              {/* Background Image */}
              <img
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content anchored at bottom-left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2.5 text-left">
                <span className="inline-block px-2.5 py-0.5 bg-[#ED1C24] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-[1px]">
                  {featuredNews.categoryLabel}
                </span>

                <h3 className="text-lg sm:text-2xl font-extrabold text-white uppercase font-heading tracking-normal leading-[1.4] transition-colors line-clamp-2">
                  {featuredNews.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-2xl font-normal leading-relaxed">
                  {featuredNews.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-gray-300 border-t border-white/20">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{featuredNews.date}</span>
                  </div>
                  <span>•</span>
                  <span>{featuredNews.author}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Stacked Small Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-6">
            {otherNews.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/tin-tuc/${item.slug}`}
                className="group bg-white rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col justify-between p-4 cursor-pointer flex-1"
              >
                <div className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-[4px] overflow-hidden bg-slate-900 flex-shrink-0 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0040A0] block">
                      {item.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-shicons-heading line-clamp-2 group-hover:text-[#0040A0] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="font-mono">{item.date}</span>
                  <span className="text-[#0040A0] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
