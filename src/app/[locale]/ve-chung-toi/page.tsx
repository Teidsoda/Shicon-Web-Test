'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { useContent } from '@/context/ContentContext';

export default function AboutPage() {
  const t = useTranslations('Pages.About');
  const { aboutData, settings } = useContent();

  return (
    <div className="flex flex-col">
      <PageBanner
        title={aboutData.bannerTitle}
        subtitle={aboutData.bannerSubtitle}
        breadcrumbs={[{ label: t('breadcrumb') }]}
        badge={aboutData.bannerBadge}
        bgImage={aboutData.bannerImage}
      />

      {/* 1. Overview Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
                  {aboutData.overviewBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
                  {aboutData.overviewTitle}
                </h2>
                <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                {(aboutData.overviewParagraphs || []).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 4 Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(aboutData.highlights || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0040A0] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/du-an"
                  className="btn-shicons px-7 py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm tracking-wider uppercase gap-2 shadow-md"
                >
                  <span>{t('exploreProjects')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={settings.profilePdfUrl || '/documents/SHICONS-EC-Profile-2026.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shicons px-7 py-3.5 border border-gray-400 text-shicons-dark hover:border-[#0040A0] hover:bg-[#004DA0] hover:text-white text-xs sm:text-sm tracking-wider uppercase gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('downloadProfile')}</span>
                </a>
              </div>
            </div>

            {/* Right Media with thick blue offset frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border-[6px] border-[#0040A0] rounded-[2px] -z-10" />

                <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden shadow-xl rounded-[2px] bg-slate-900 group">
                  <img
                    src={aboutData.overviewImage}
                    alt={t('imageAlt')}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 border-l-4 border-[#0040A0] shadow-lg max-w-[280px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#0040A0] text-white flex items-center justify-center font-black text-xl font-heading rounded-[2px]">
                        {aboutData.experienceYears}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-[#0040A0] uppercase font-heading">
                          {aboutData.experienceTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {aboutData.experienceSubtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision, Mission, Core Values */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5] border-y border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block">
              {t('guidanceEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              {t('guidanceTitle')}
            </h2>
            <div className="w-12 h-1 bg-[#ED1C24] mx-auto rounded-[1px] mt-2" />
            <p className="text-xs sm:text-sm text-gray-500 pt-2">
              {t('guidanceSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="p-8 rounded-[2px] bg-white border border-gray-200 shadow-sm hover:border-[#0040A0] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-[2px] bg-blue-50 text-[#0040A0] flex items-center justify-center mb-6">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0040A0] font-heading uppercase mb-3">
                  {aboutData.visionTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {aboutData.visionDesc}
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6 text-xs font-mono font-semibold text-gray-400">
                {t('visionFooter')}
              </div>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-[2px] bg-white border border-gray-200 shadow-sm hover:border-[#0040A0] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-[2px] bg-red-50 text-[#ED1C24] flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0040A0] font-heading uppercase mb-3">
                  {aboutData.missionTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {aboutData.missionDesc}
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6 text-xs font-mono font-semibold text-gray-400">
                {t('missionFooter')}
              </div>
            </div>

            {/* Core Values */}
            <div className="p-8 rounded-[2px] bg-white border border-gray-200 shadow-sm hover:border-[#0040A0] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-[2px] bg-blue-50 text-[#0040A0] flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0040A0] font-heading uppercase mb-3">
                  {aboutData.coreValuesTitle}
                </h3>
                <ul className="text-gray-600 text-sm space-y-3">
                  {(aboutData.coreValues || []).map((val, vIdx) => (
                    <li key={vIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0040A0] shrink-0 mt-0.5" />
                      <span><strong>{val.title}:</strong> {val.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6 text-xs font-mono font-semibold text-gray-400">
                {t('coreValuesFooter')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HSE Safety & Engineering Capacity */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Photos */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-64 rounded-[2px] overflow-hidden shadow-md bg-slate-900">
                  <img
                    src="/images/projects/nha-may-intel.jpg"
                    alt={t('hsePhotoAlt1')}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-[2px] overflow-hidden shadow-md bg-slate-900 mt-6">
                  <img
                    src="/images/projects/nha-may-bel.jpg"
                    alt={t('hsePhotoAlt2')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
                  {t('hseEyebrow')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
                  {aboutData.hseTitle}
                </h2>
                <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {aboutData.hseDesc}
              </p>

              <div className="space-y-4 pt-2">
                {(aboutData.companyStats || []).map((stat, sIdx) => {
                  const borderColor = sIdx === 0 ? 'border-emerald-500' : sIdx === 1 ? 'border-[#0040A0]' : 'border-[#ED1C24]';
                  const bgIconColor = sIdx === 0 ? 'bg-emerald-100 text-emerald-700' : sIdx === 1 ? 'bg-blue-100 text-[#0040A0]' : 'bg-red-100 text-[#ED1C24]';
                  return (
                    <div key={sIdx} className={`flex items-start gap-4 p-4 rounded-[2px] bg-slate-50 border-l-4 ${borderColor}`}>
                      <div className={`w-10 h-10 rounded-[2px] ${bgIconColor} flex items-center justify-center shrink-0`}>
                        {sIdx === 0 ? <ShieldCheck className="w-6 h-6" /> : sIdx === 1 ? <Users className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-shicons-dark text-sm sm:text-base font-heading uppercase">
                          {stat.value} {stat.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          {stat.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
