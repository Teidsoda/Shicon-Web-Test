'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { Project } from '@/data/shiconsData';
import { useContent } from '@/context/ContentContext';
import { ConstructionGallerySlider } from '@/components/ConstructionGallerySlider';

interface ProjectDetailClientProps {
  initialProject: Project;
  otherProjects: Project[];
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  initialProject,
  otherProjects: initialOtherProjects,
}) => {
  const t = useTranslations('Pages.Projects');
  const { projects } = useContent();

  // Find the live project from shared reactive context (localized + reflects Admin edits)
  const project = projects.find((p) => p.slug === initialProject.slug) || initialProject;
  const otherProjects = projects.length > 0
    ? projects.filter((p) => p.slug !== project.slug).slice(0, 3)
    : initialOtherProjects;

  return (
    <div className="flex flex-col">
      <PageBanner
        title={project.name}
        subtitle={`${project.client} • ${project.location}`}
        breadcrumbs={[
          { label: t('breadcrumb'), href: '/du-an' },
          { label: project.name },
        ]}
        badge={project.categoryLabel}
        bgImage={project.imageUrl}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0040A0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToList')}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Cover Photo (1 ảnh nhà máy) */}
              <div className="relative rounded-[2px] overflow-hidden max-h-[500px] shadow-md border border-gray-200 bg-slate-900 group">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0040A0] text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-[1px] shadow">
                  {t('coverBadge')}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0040A0] font-heading uppercase tracking-normal leading-[1.45] sm:leading-[1.5]">
                  {t('overviewTitle')}
                </h2>
                <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px]" />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
                  {project.description}
                </p>
              </div>

              {/* Technical Highlights */}
              {project.technicalHighlights && project.technicalHighlights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-shicons-heading font-heading uppercase tracking-normal leading-[1.45]">
                    {t('highlightsTitle')}
                  </h3>
                  <div className="space-y-3 pt-2">
                    {project.technicalHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-[2px] bg-slate-50 border border-gray-200">
                        <CheckCircle2 className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              {project.challengesAndSolutions && (
                <div className="p-6 sm:p-8 rounded-[2px] bg-[#07182E] text-white space-y-3">
                  <div className="flex items-center gap-2 text-[#ED1C24]">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">
                      {t('challengesEyebrow')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-heading uppercase">
                    {t('challengesSubtitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                    {project.challengesAndSolutions}
                  </p>
                </div>
              )}

              {/* Gallery Photos */}
              <ConstructionGallerySlider
                photos={project.gallery || []}
                projectName={project.name}
              />
            </div>

            {/* Right Sidebar: Meta & Contact (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Project Meta Card */}
              <div className="p-6 sm:p-8 rounded-[2px] bg-slate-50 border border-gray-200 space-y-5">
                <h3 className="text-base font-extrabold text-[#0040A0] uppercase font-heading tracking-wider border-b border-gray-200 pb-3">
                  {t('specsTitle')}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                      {t('clientLabel')}
                    </span>
                    <strong className="text-shicons-dark text-sm">{project.client}</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                      {t('locationLabel')}
                    </span>
                    <span className="text-gray-800">{project.location}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                      {t('yearLabel')}
                    </span>
                    <span className="font-mono text-gray-800 font-bold">{project.year}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                      {t('scaleLabel')}
                    </span>
                    <span className="font-semibold text-gray-800">{project.scale}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                      {t('statusLabel')}
                    </span>
                    <span className="inline-block px-2.5 py-1 rounded-[1px] bg-[#0040A0] text-white font-bold text-xs uppercase tracking-wide">
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-2">
                      {t('scopeLabel')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.mepScope.map((scope, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-[1px] bg-white border border-gray-300 text-gray-700 text-[11px] font-medium"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation CTA Box */}
              <div className="p-6 rounded-[2px] bg-gradient-to-br from-[#00306E] to-[#0040A0] text-white space-y-4 shadow-lg">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
                  {t('consultEyebrow')}
                </span>
                <h4 className="text-lg font-extrabold uppercase font-heading leading-snug">
                  {t('consultTitle')}
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {t('consultDesc')}
                </p>
                <Link
                  href="/lien-he"
                  className="btn-shicons w-full py-3 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs uppercase font-bold tracking-wider text-center justify-center shadow-md block"
                >
                  {t('consultBtn')}
                </Link>
              </div>
            </div>
          </div>

          {/* Other Related Projects */}
          {otherProjects.length > 0 && (
            <div className="mt-20 pt-16 border-t border-gray-200 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
                    {t('relatedEyebrow')}
                  </span>
                  <h3 className="text-2xl font-extrabold text-shicons-heading uppercase tracking-normal leading-[1.45] font-heading">
                    {t('relatedTitle')}
                  </h3>
                </div>
                <Link
                  href="/du-an"
                  className="text-xs font-bold text-[#0040A0] hover:text-[#ED1C24] uppercase tracking-wider flex items-center gap-1"
                >
                  <span>{t('viewAll')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherProjects.map((op) => (
                  <Link
                    key={op.id}
                    href={`/du-an/${op.slug}`}
                    className="group bg-white rounded-[2px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={op.imageUrl}
                        alt={op.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#ED1C24] text-white text-[10px] font-bold uppercase rounded-[1px]">
                        {op.categoryLabel}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] text-gray-500 font-mono">
                        {op.location} • {op.year}
                      </div>
                      <h4 className="text-sm font-bold text-shicons-heading uppercase font-heading group-hover:text-[#0040A0] transition-colors line-clamp-2">
                        {op.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
