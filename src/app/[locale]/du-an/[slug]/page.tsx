import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PROJECTS_DATA } from '@/data/shiconsData';
import { ProjectDetailClient } from '@/components/ProjectDetailClient';
import { routing } from '@/i18n/routing';
import { getServerLocalizedData } from '@/lib/getLocalizedData';

interface ProjectDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const tMeta = await getTranslations({ locale: resolvedLocale, namespace: 'Metadata' });
  const { projects } = await getServerLocalizedData(resolvedLocale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: tMeta('projectNotFoundTitle') };

  return {
    title: `${project.name} | SHICONS E&C`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(resolvedLocale);

  const { projects } = await getServerLocalizedData(resolvedLocale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <ProjectDetailClient
      initialProject={project}
      otherProjects={otherProjects}
    />
  );
}
