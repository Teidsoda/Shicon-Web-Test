import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA, getProjectBySlug } from '@/data/shiconsData';
import { ProjectDetailClient } from '@/components/ProjectDetailClient';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Không tìm thấy dự án | SHICONS E&C' };

  return {
    title: `${project.name} | SHICONS E&C`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = PROJECTS_DATA.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <ProjectDetailClient
      initialProject={project}
      otherProjects={otherProjects}
    />
  );
}
