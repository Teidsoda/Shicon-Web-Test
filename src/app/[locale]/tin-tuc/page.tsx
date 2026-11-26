'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { useContent } from '@/context/ContentContext';

export default function NewsPage() {
  const t = useTranslations('Pages.News');
  const { news } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'project', label: t('categories.project') },
    { key: 'technical', label: t('categories.technical') },
    { key: 'company', label: t('categories.company') },
  ];

  const filteredNews = news.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      <PageBanner
        title={t('bannerTitle')}
        subtitle={t('bannerSubtitle')}
        breadcrumbs={[{ label: t('breadcrumb') }]}
        badge={t('bannerBadge')}
        bgImage="/images/projects/nha-may-bel.jpg"
      />

      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-gray-300">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`btn-shicons px-4 py-2 text-xs tracking-wider uppercase transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-[#0040A0] text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0040A0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <Link
                key={item.id}
                href={`/tin-tuc/${item.slug}`}
                className="bg-white rounded-[2px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#0040A0] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-[1px]">
                      {item.categoryLabel}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#ED1C24]" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-shicons-heading uppercase font-heading tracking-normal group-hover:text-[#0040A0] transition-colors line-clamp-2 leading-[1.45]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0040A0] uppercase tracking-wider group-hover:bg-[#0040A0] group-hover:text-white transition-colors">
                  <span className="text-[11px] font-mono font-normal text-gray-500 group-hover:text-white/80">
                    {item.author}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
