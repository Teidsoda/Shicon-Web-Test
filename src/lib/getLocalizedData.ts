import {
  PROJECTS_DATA,
  DOMAINS_DATA,
  NEWS_DATA,
  JOBS_DATA,
  PARTNERS_DATA,
  CONTACT_INFO,
  COMPANY_STATS,
  PRODUCTION_LINES,
  Project,
  DomainItem,
  NewsItem,
  JobItem,
  PartnerItem,
  ProductionLine,
} from '@/data/shiconsData';

type MessagesData = Record<string, any>;

export function localizeProjects(projects: Project[], dataMessages?: MessagesData): Project[] {
  const dict = dataMessages?.projects;
  if (!dict) return projects;
  return projects.map((p) => {
    const tr = dict[p.id];
    if (!tr) return p;
    return {
      ...p,
      name: tr.name ?? p.name,
      categoryLabel: tr.categoryLabel ?? p.categoryLabel,
      client: tr.client ?? p.client,
      location: tr.location ?? p.location,
      year: tr.year ?? p.year,
      scale: tr.scale ?? p.scale,
      status: tr.status ?? p.status,
      mepScope: tr.mepScope ?? p.mepScope,
      description: tr.description ?? p.description,
      technicalHighlights: tr.technicalHighlights ?? p.technicalHighlights,
      challengesAndSolutions: tr.challengesAndSolutions ?? p.challengesAndSolutions,
    };
  });
}

export function localizeDomains<T extends DomainItem>(domains: T[], dataMessages?: MessagesData): T[] {
  const dict = dataMessages?.domains;
  if (!dict) return domains;
  return domains.map((d) => {
    const tr = dict[d.id];
    if (!tr) return d;
    return {
      ...d,
      enTitle: tr.enTitle ?? d.enTitle,
      viTitle: tr.viTitle ?? d.viTitle,
      shortDesc: tr.shortDesc ?? d.shortDesc,
      fullDesc: tr.fullDesc ?? d.fullDesc,
      standard: tr.standard ?? d.standard,
      badge: tr.badge ?? d.badge,
      features: tr.features ?? d.features,
      subSystems: tr.subSystems ?? d.subSystems,
      standards: tr.standards ?? d.standards,
    };
  });
}

export function localizeNews(news: NewsItem[], dataMessages?: MessagesData): NewsItem[] {
  const dict = dataMessages?.news;
  if (!dict) return news;
  return news.map((n) => {
    const tr = dict[n.id];
    if (!tr) return n;
    return {
      ...n,
      title: tr.title ?? n.title,
      categoryLabel: tr.categoryLabel ?? n.categoryLabel,
      date: tr.date ?? n.date,
      excerpt: tr.excerpt ?? n.excerpt,
      content: tr.content ?? n.content,
      author: tr.author ?? n.author,
    };
  });
}

export function localizeJobs(jobs: JobItem[], dataMessages?: MessagesData): JobItem[] {
  const dict = dataMessages?.jobs;
  if (!dict) return jobs;
  return jobs.map((j) => {
    const tr = dict[j.id];
    if (!tr) return j;
    return {
      ...j,
      title: tr.title ?? j.title,
      department: tr.department ?? j.department,
      location: tr.location ?? j.location,
      salary: tr.salary ?? j.salary,
      deadline: tr.deadline ?? j.deadline,
      experience: tr.experience ?? j.experience,
      description: tr.description ?? j.description,
      requirements: tr.requirements ?? j.requirements,
      benefits: tr.benefits ?? j.benefits,
    };
  });
}

export function localizePartners<T extends PartnerItem>(partners: T[], dataMessages?: MessagesData): T[] {
  const dict = dataMessages?.partners;
  if (!dict) return partners;
  return partners.map((p) => {
    const tr = dict[p.id];
    if (!tr) return p;
    return {
      ...p,
      tag: tr.tag ?? p.tag,
      typeLabel: tr.typeLabel ?? p.typeLabel,
    };
  });
}

export function localizeProductionLines(lines: ProductionLine[], dataMessages?: MessagesData): ProductionLine[] {
  const dict = dataMessages?.productionLines;
  if (!dict) return lines;
  return lines.map((l) => {
    const tr = dict[l.id];
    if (!tr) return l;
    return {
      ...l,
      title: tr.title ?? l.title,
      desc: tr.desc ?? l.desc,
      specs: tr.specs ?? l.specs,
      tag: tr.tag ?? l.tag,
    };
  });
}

export async function getServerLocalizedData(locale: string) {
  const messages = (await import(`../../messages/${locale === 'en' ? 'en' : 'vi'}.json`)).default;
  const dataMsg = messages.Data;
  return {
    projects: localizeProjects(PROJECTS_DATA, dataMsg),
    domains: localizeDomains(DOMAINS_DATA, dataMsg),
    news: localizeNews(NEWS_DATA, dataMsg),
    jobs: localizeJobs(JOBS_DATA, dataMsg),
    partners: localizePartners(PARTNERS_DATA, dataMsg),
    productionLines: localizeProductionLines(PRODUCTION_LINES, dataMsg),
    contact: { ...CONTACT_INFO, ...(dataMsg?.contact || {}) },
    companyStats: dataMsg?.companyStats || COMPANY_STATS,
  };
}
