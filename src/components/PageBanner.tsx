'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  bgImage?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  badge,
  bgImage = '/images/projects/nha-may-intel.jpg',
}) => {
  const t = useTranslations('PageBanner');

  return (
    <div className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-20 bg-[#00306E] overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Gradient Overlay: Deep Navy -> Blue */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00306E]/95 via-[#0040A0]/90 to-[#0A4DA2]/75" />

      {/* Watermark outline "SHICONS" */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-20">
        <span className="text-[120px] sm:text-[180px] font-black watermark-text tracking-widest block leading-none">
          SHICONS
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-white/75 uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            {t('home')}
          </Link>
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-white/50" />
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-bold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-widest text-white rounded-[2px] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold uppercase font-heading tracking-normal leading-[1.48] sm:leading-[1.5] lg:leading-[1.55] max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
