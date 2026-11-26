'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Wind, Activity, Cpu, ShieldAlert, Wrench, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const ServiceBanners: React.FC = () => {
  const t = useTranslations('ServiceBanners');
  const { services } = useContent();
  const activeDomains = services.filter((s) => s.isActive !== false);

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'hvac-system':
        return <Wind className="w-12 h-12 stroke-[1.6] text-white" />;
      case 'hospital-cleanroom':
        return <Activity className="w-12 h-12 stroke-[1.6] text-white" />;
      case 'factory-mep-cleanroom':
        return <Cpu className="w-12 h-12 stroke-[1.6] text-white" />;
      case 'ventilation-smoke-exhaust':
        return <ShieldAlert className="w-12 h-12 stroke-[1.6] text-white" />;
      case 'tc-om-maintenance':
        return <Wrench className="w-12 h-12 stroke-[1.6] text-white" />;
      default:
        return <Wind className="w-12 h-12 stroke-[1.6] text-white" />;
    }
  };

  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5';
    }
  };

  return (
    <section id="linh-vuc" className="w-full bg-[#07182E] overflow-hidden">
      {/* Top intro row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block mb-1">
            {t('eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
            {activeDomains.length > 0 ? t('titleCount', { count: activeDomains.length }) : t('titleDefault')}
          </h2>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-400 max-w-md text-left sm:text-right hidden sm:block">
            {t('subtitle')}
          </p>
          <Link
            href="/linh-vuc-hoat-dong"
            className="text-xs font-bold text-white hover:text-[#ED1C24] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>{t('allDomains')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Full-bleed Portrait Columns (Touching each other, 0 gap) */}
      {activeDomains.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          {t('emptyState')}
        </div>
      ) : (
        <div className={`grid ${getGridColsClass(activeDomains.length)} w-full min-h-[620px] lg:min-h-[680px]`}>
          {activeDomains.map((domain) => (
            <Link
              key={domain.id}
              href={`/linh-vuc-hoat-dong/${domain.slug}`}
              className="group relative h-[480px] sm:h-[540px] lg:h-auto overflow-hidden cursor-pointer border-r border-white/10 last:border-r-0 flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                style={{ backgroundImage: `url(${domain.imageUrl})` }}
              />

              {/* Dark Overlay ~50% -> Darker on hover */}
              <div className="absolute inset-0 bg-[#07182E]/65 group-hover:bg-[#0040A0]/80 transition-colors duration-500" />

              {/* Top Code / Index */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-white/60 group-hover:text-white transition-colors">
                  {domain.code}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Middle: Thin White Outline Circle ~110px with Line Icon */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
                <div className="w-[108px] h-[108px] rounded-full border border-white/70 group-hover:border-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  {getDomainIcon(domain.id)}
                </div>
              </div>

              {/* Bottom: English Subtitle + Uppercase Domain Title with Wide Letter Spacing */}
              <div className="relative z-10 text-center space-y-2">
                <p className="text-[10px] sm:text-[11px] font-bold text-[#ED1C24] transition-colors uppercase tracking-[0.25em]">
                  {domain.enTitle}
                </p>

                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider font-heading leading-snug">
                  {domain.viTitle}
                </h3>

                <p className="text-[11px] text-gray-300 line-clamp-2 max-w-xs mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-normal">
                  {domain.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
