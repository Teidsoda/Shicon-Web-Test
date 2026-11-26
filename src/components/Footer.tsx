'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUp, MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '@/context/ContentContext';

export const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const { settings } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="lien-he" className="bg-[#F2F2F2] text-[#222222] pt-16 pb-8 border-t border-gray-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-300">
          {/* Col 1: Brand & Full Company Name (~4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="color" showText={true} />
            <h3 className="text-sm font-extrabold text-shicons-heading uppercase tracking-wide font-heading pt-2">
              {settings.companyName}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              {settings.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0040A0]">
              <ShieldCheck className="w-4 h-4 text-[#ED1C24]" />
              <span>{t('taxCodeLabel')}: {settings.taxCode}</span>
            </div>
          </div>

          {/* Col 2: Contact Information (~4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-base font-extrabold text-shicons-heading uppercase tracking-wider font-heading">
              {t('contactHeading')}
            </h4>
            {/* Short blue bar ~40px under title */}
            <div className="w-10 h-0.5 bg-[#0040A0] rounded-[1px] mb-3" />

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0040A0] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-shicons-dark">{t('hqLabel')}:</strong> {settings.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                <span>
                  <strong className="text-shicons-dark">{t('hotlineLabel')}:</strong>{' '}
                  <a href={`tel:${settings.hotlines[0]}`} className="hover:text-[#ED1C24] transition-colors font-bold">
                    {settings.hotlines[0]}
                  </a>
                  {' – '}
                  <a href={`tel:${settings.hotlines[1]}`} className="hover:text-[#ED1C24] transition-colors font-bold">
                    {settings.hotlines[1]}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0040A0] flex-shrink-0" />
                <span>
                  <strong className="text-shicons-dark">{t('emailLabel')}:</strong>{' '}
                  <a href={`mailto:${settings.email}`} className="hover:text-[#0040A0] transition-colors">
                    {settings.email}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0040A0] flex-shrink-0" />
                <span>
                  <strong className="text-shicons-dark">{t('workingHoursLabel')}:</strong> {settings.workingHours}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#0040A0] flex-shrink-0" />
                <span>
                  <strong className="text-shicons-dark">{t('websiteLabel')}:</strong>{' '}
                  {settings.websites.join(' / ')}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Categories Links (~2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-base font-extrabold text-shicons-heading uppercase tracking-wider font-heading">
              {t('categoriesHeading')}
            </h4>
            <div className="w-10 h-0.5 bg-[#0040A0] rounded-[1px] mb-3" />

            <ul className="space-y-2 text-xs font-medium text-gray-700">
              <li>
                <Link href="/ve-chung-toi" className="hover:text-[#0040A0] transition-colors">
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link href="/linh-vuc-hoat-dong" className="hover:text-[#0040A0] transition-colors">
                  {t('links.domains')}
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="hover:text-[#0040A0] transition-colors">
                  {t('links.projects')}
                </Link>
              </li>
              <li>
                <Link href="/san-xuat" className="hover:text-[#0040A0] transition-colors">
                  {t('links.manufacturing')}
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-[#0040A0] transition-colors">
                  {t('links.news')}
                </Link>
              </li>
              <li>
                <Link href="/tuyen-dung" className="hover:text-[#0040A0] transition-colors">
                  {t('links.careers')}
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#0040A0] transition-colors">
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Links (~2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-base font-extrabold text-shicons-heading uppercase tracking-wider font-heading">
              {t('connectHeading')}
            </h4>
            <div className="w-10 h-0.5 bg-[#0040A0] rounded-[1px] mb-3" />

            <p className="text-xs text-gray-500 mb-3">
              {t('connectSubtitle')}
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook Button */}
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Shicons"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Zalo Button */}
              <a
                href={settings.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo Shicons"
                className="w-10 h-10 rounded-full bg-[#0068FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm font-bold text-xs"
              >
                Zalo
              </a>
            </div>

            {/* Profile PDF Download */}
            <div className="pt-4">
              <a
                href={settings.profilePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0040A0] hover:text-[#ED1C24] transition-colors"
              >
                <span>{t('downloadProfile')}</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row + Back to top button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            {t('copyright')}
          </div>

          {/* Round outline back to top button */}
          <button
            onClick={scrollToTop}
            aria-label={t('backToTop')}
            className="w-9 h-9 rounded-full border border-gray-400 text-gray-600 hover:text-white hover:bg-[#0040A0] hover:border-[#0040A0] flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
