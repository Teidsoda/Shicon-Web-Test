'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Factory,
  Layers,
  CheckCircle2,
  Zap,
  Boxes,
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { useContent } from '@/context/ContentContext';

export default function ManufacturingPage() {
  const t = useTranslations('Pages.Manufacturing');
  const { manufacturingData } = useContent();

  const getLineIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Layers className="w-8 h-8 text-white stroke-[2]" />;
      case 1:
        return <Zap className="w-8 h-8 text-white stroke-[2]" />;
      case 2:
        return <Boxes className="w-8 h-8 text-white stroke-[2]" />;
      default:
        return <Factory className="w-8 h-8 text-white stroke-[2]" />;
    }
  };

  return (
    <div className="flex flex-col">
      <PageBanner
        title={manufacturingData.bannerTitle}
        subtitle={manufacturingData.bannerSubtitle}
        breadcrumbs={[{ label: t('breadcrumb') }]}
        badge={manufacturingData.bannerBadge}
        bgImage={manufacturingData.bannerImage}
      />

      {/* 1. Factory Overview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
                  {manufacturingData.factoryBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
                  {manufacturingData.factoryTitle}
                </h2>
                <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
              </div>

              {(manufacturingData.factoryParagraphs || []).map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-[2px] bg-slate-50 border-l-4 border-[#0040A0]">
                  <div className="text-2xl sm:text-3xl font-black text-[#0040A0] font-heading">
                    {manufacturingData.areaStat}
                  </div>
                  <div className="text-xs font-bold text-gray-700 uppercase font-heading mt-1">
                    {manufacturingData.areaLabel}
                  </div>
                </div>

                <div className="p-4 rounded-[2px] bg-slate-50 border-l-4 border-[#ED1C24]">
                  <div className="text-2xl sm:text-3xl font-black text-[#ED1C24] font-heading">
                    {manufacturingData.ductStat}
                  </div>
                  <div className="text-xs font-bold text-gray-700 uppercase font-heading mt-1">
                    {manufacturingData.ductLabel}
                  </div>
                </div>

                <div className="p-4 rounded-[2px] bg-slate-50 border-l-4 border-emerald-500">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
                    {manufacturingData.panelStat}
                  </div>
                  <div className="text-xs font-bold text-gray-700 uppercase font-heading mt-1">
                    {manufacturingData.panelLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border-[6px] border-[#0040A0] rounded-[2px] -z-10" />
                <div className="relative h-[360px] sm:h-[420px] rounded-[2px] overflow-hidden shadow-xl bg-slate-900">
                  <img
                    src={manufacturingData.factoryImage}
                    alt={t('factoryAlt')}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 border-l-4 border-[#0040A0] shadow-md max-w-[260px]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {t('qcBadgeLabel')}
                    </div>
                    <div className="text-xs font-extrabold text-[#0040A0] uppercase font-heading mt-0.5">
                      {t('qcBadgeTitle')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Production Lines */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block">
              {t('linesEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              {t('linesTitle')}
            </h2>
            <div className="w-12 h-1 bg-[#ED1C24] mx-auto rounded-[1px] mt-2" />
            <p className="text-xs sm:text-sm text-gray-500 pt-2">
              {t('linesSubtitle')}
            </p>
          </div>

          <div className="space-y-16">
            {(manufacturingData.productionLines || []).map((line, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={line.id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-[2px] border border-gray-200 shadow-sm`}
                >
                  {/* Photo with code icon badge */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative h-[260px] sm:h-[340px] rounded-[2px] overflow-hidden bg-slate-900 group">
                      <img
                        src={line.image}
                        alt={line.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 w-14 h-14 rounded-[2px] bg-[#0040A0] flex items-center justify-center shadow-lg">
                        {getLineIcon(index)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-[#ED1C24] uppercase tracking-widest">
                        {line.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading">
                        {line.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {line.desc}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-shicons-heading">
                        {t('specsHeading')}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {line.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#0040A0] shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Factory Visit CTA */}
      <section className="py-16 bg-[#00306E] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
            {t('ctaEyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-heading max-w-2xl mx-auto">
            {t('ctaTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="pt-2">
            <Link
              href="/lien-he"
              className="btn-shicons px-8 py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm uppercase tracking-wider shadow-lg inline-flex"
            >
              {t('ctaBtn')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
