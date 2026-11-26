'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { PROJECTS_DATA } from '@/data/shiconsData';
import { useContent } from '@/context/ContentContext';

export default function ProjectsPage() {
  const t = useTranslations('Pages.Projects');
  const { projects } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'cleanroom', label: t('categories.cleanroom') },
    { key: 'industrial', label: t('categories.industrial') },
    { key: 'infrastructure', label: t('categories.infrastructure') },
  ];

  const projectList = projects && projects.length > 0 ? projects : PROJECTS_DATA;

  const filteredProjects = selectedCategory === 'all'
    ? projectList
    : projectList.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col">
      <PageBanner
        title={t('bannerTitle')}
        subtitle={t('bannerSubtitle')}
        breadcrumbs={[{ label: t('breadcrumb') }]}
        badge={t('bannerBadge')}
        bgImage="/images/projects/nha-ga-t3-tsn.jpg"
      />

      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`btn-shicons px-5 py-2.5 text-xs tracking-wider uppercase transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#0040A0] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0040A0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/du-an/${project.slug}`}
                className="bg-white rounded-[2px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#ED1C24] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-[1px]">
                      {project.categoryLabel}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-[1px]">
                      {project.status}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-[#0040A0]" />
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.scale}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-shicons-heading uppercase font-heading tracking-normal group-hover:text-[#0040A0] transition-colors line-clamp-2 leading-[1.45]">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#ED1C24] flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 pt-1 leading-relaxed">
                      {project.description}
                    </p>

                    {/* MEP Scope Badges */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {project.mepScope.slice(0, 3).map((scope, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-slate-100 text-[10px] font-mono text-gray-700 rounded-[1px]"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0040A0] uppercase tracking-wider group-hover:bg-[#0040A0] group-hover:text-white transition-colors">
                  <span>{t('viewDetail')}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
