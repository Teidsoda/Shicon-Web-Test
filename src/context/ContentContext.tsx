'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HERO_SLIDES, 
  PROJECTS_DATA, 
  DOMAINS_DATA, 
  NEWS_DATA, 
  JOBS_DATA, 
  PARTNERS_DATA, 
  CONTACT_INFO, 
  COMPANY_STATS,
  PRODUCTION_LINES,
  Project, 
  NewsItem, 
  JobItem, 
  DomainItem, 
  PartnerItem,
  ProductionLine
} from '@/data/shiconsData';

export type { ProductionLine };

export interface ExtendedDomainItem extends DomainItem {
  isActive?: boolean;
}

export interface ExtendedHeroSlide {
  id: string;
  badge: string;
  title: string;
  desc: string;
  stats: string;
  bgImage: string;
  projectImage: string;
  link: string;
  isActive?: boolean;
}

export interface ExtendedPartnerItem extends PartnerItem {
  isActive?: boolean;
}

export interface AboutData {
  bannerTitle: string;
  bannerSubtitle: string;
  bannerBadge: string;
  bannerImage: string;
  overviewBadge?: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  overviewImage: string;
  experienceYears: string;
  experienceTitle: string;
  experienceSubtitle: string;
  imageBadgeCategory?: string;
  imageBadgeTitle?: string;
  highlights: string[];
  visionTitle: string;
  visionDesc: string;
  missionTitle: string;
  missionDesc: string;
  coreValuesTitle: string;
  coreValues: { title: string; desc: string }[];
  hseTitle: string;
  hseDesc: string;
  companyStats: { value: string; label: string; sub: string }[];
}

export interface ManufacturingData {
  bannerTitle: string;
  bannerSubtitle: string;
  bannerBadge: string;
  bannerImage: string;
  factoryTitle: string;
  factoryBadge: string;
  factoryParagraphs: string[];
  factoryImage: string;
  areaStat: string;
  areaLabel: string;
  ductStat: string;
  ductLabel: string;
  panelStat: string;
  panelLabel: string;
  productionLines: ProductionLine[];
}

export interface ContactSettingsData {
  companyName: string;
  tradingName: string;
  slogan: string;
  description: string;
  hotlines: string[];
  primaryHotline: string;
  email: string;
  recruitmentEmail: string;
  address: string;
  branchAddress: string;
  factoryAddress: string;
  workingHours: string;
  taxCode: string;
  websites: string[];
  zaloUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  profilePdfUrl: string;
  googleMapEmbedUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerBadge: string;
  bannerImage: string;
}

export const DEFAULT_ABOUT_DATA: AboutData = {
  bannerTitle: 'Về Chúng Tôi – Shicons E&C',
  bannerSubtitle: 'Hơn một thập kỷ tiên phong cung cấp giải pháp Cơ điện (M&E / MEP) toàn diện, ứng dụng công nghệ BIM và năng lực thi công thực chiến.',
  bannerBadge: 'Giới thiệu Doanh nghiệp',
  bannerImage: '/images/about/doi-ngu-shicons.jpg',
  overviewBadge: 'VỀ CHÚNG TÔI',
  overviewTitle: 'SHICONS E&C',
  overviewParagraphs: [
    'Công ty Cổ phần Shicons E&C là tổng thầu cơ điện chuyên sâu, tiên phong trong thiết kế và thi công hệ thống cơ điện lạnh (M&E / MEP), phòng sạch công nghệ cao cho các nhà máy FDI, bệnh viện tiêu chuẩn quốc tế và các tòa nhà văn phòng hạng A.',
    'Với phương châm hành động “Kỹ thuật Chính xác — An toàn Tuyệt đối — Bền vững Cùng Khách hàng”, Shicons luôn áp dụng toàn diện quy trình số hóa mô hình thông tin công trình BIM Revit MEP LOD 400 vào quản lý thi công thực tế, giúp tối ưu hóa chi phí và đảm bảo tiến độ chuẩn xác.'
  ],
  overviewImage: '/images/about/doi-ngu-shicons.jpg',
  experienceYears: '10+',
  experienceTitle: '10+ Năm Kinh Nghiệm',
  experienceSubtitle: 'Nhà thầu Cơ điện chuyên nghiệp',
  imageBadgeCategory: 'Kỹ thuật & An toàn',
  imageBadgeTitle: 'BIM Revit MEP LOD 400',
  highlights: [
    'Tiêu chuẩn quốc tế HTM & NFPA',
    'Kiểm định T&C phòng sạch ISO',
    'Đội ngũ kỹ sư chứng chỉ hành nghề',
    'Bảo hành & O&M 24/7 toàn diện'
  ],
  visionTitle: 'Tầm nhìn',
  visionDesc: 'Trở thành Nhà thầu Cơ điện (MEP) hàng đầu khu vực trong phân khúc Nhà máy công nghệ cao, Phòng sạch bán dẫn và Cao ốc thông minh, được đối tác toàn cầu tin tưởng lựa chọn.',
  missionTitle: 'Sứ mệnh',
  missionDesc: 'Đem đến cho khách hàng hệ thống cơ điện an toàn, vận hành ổn định và tiết kiệm tối đa năng lượng. Đồng thời xây dựng môi trường làm việc chuyên nghiệp, phát huy tài năng của các kỹ sư Việt.',
  coreValuesTitle: 'Giá trị Cốt lõi',
  coreValues: [
    { title: 'Chính xác', desc: 'Chuẩn mực kỹ thuật trong từng mối nối, đường cáp và kiểm thử.' },
    { title: 'An toàn', desc: 'An toàn là trên hết (Safety First - Zero LTI).' },
    { title: 'Cam kết', desc: 'Bàn giao đúng tiến độ, đồng hành và chịu trách nhiệm tới cùng.' }
  ],
  hseTitle: 'Cam Kết An Toàn Lao Động & Chất Lượng Kỹ Thuật',
  hseDesc: 'Đối với Shicons E&C, an toàn lao động và kỷ luật kỹ thuật tại công trường không chỉ là quy định mà là sinh mệnh và uy tín danh dự của doanh nghiệp.',
  companyStats: COMPANY_STATS
};

export const DEFAULT_MANUFACTURING_DATA: ManufacturingData = {
  bannerTitle: 'Năng Lực Sản Xuất & Chế Tạo Thiết Bị',
  bannerSubtitle: 'Chủ động 100% chuỗi cung ứng vật tư cơ điện với Nhà máy sản xuất 10.000 m² tại Bình Dương, làm chủ công nghệ gia công chính xác cao.',
  bannerBadge: 'Nhà Máy Chế Tạo Cơ Điện',
  bannerImage: '/images/about/doi-ngu-shicons.jpg',
  factoryTitle: 'Nhà máy sản xuất 10.000 m² - Chủ động tiến độ & chất lượng vật tư',
  factoryBadge: 'HẠ TẦNG CÔNG NGHIỆP HIỆN ĐẠI',
  factoryParagraphs: [
    'Nhằm tối ưu hóa tiến độ và đảm bảo tính đồng bộ kỹ thuật cho các dự án tổng thầu MEP, Shicons E&C đã đầu tư xây dựng nhà máy sản xuất thiết bị và phụ kiện cơ điện quy mô 10.000 m² tại Tỉnh Bình Dương.',
    'Nhà máy được trang bị đồng bộ các dây chuyền gia công tự động: máy cắt laser/plasma CNC, dây chuyền Auto-Line cán gân ống gió bích TDC/TDF, máy đột dập liên hoàn và xưởng lắp ráp thử nghiệm tủ bảng điện đạt chuẩn an toàn quốc tế.'
  ],
  factoryImage: '/images/about/doi-ngu-shicons.jpg',
  areaStat: '10.000 m²',
  areaLabel: 'Diện tích nhà xưởng',
  ductStat: '300.000 m²',
  ductLabel: 'Ống gió xuất xưởng/năm',
  panelStat: '6300A',
  panelLabel: 'Tủ điện phân phối MSB',
  productionLines: PRODUCTION_LINES
};

export const DEFAULT_CONTACT_SETTINGS_DATA: ContactSettingsData = {
  ...CONTACT_INFO,
  branchAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
  factoryAddress: 'Đường ĐT 743, KCN Sóng Thần 3, Thành phố Thủ Dầu Một, Tỉnh Bình Dương',
  recruitmentEmail: 'tuyendung@shicons.vn',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.665392095982!2d106.7214!3d10.837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUwJzEzLjIiTiAxMDbCsDQzJzE3LjAiRQ!5e0!3m2!1svi!2s!4v1600000000000!5m2!1svi!2s',
  bannerTitle: 'Liên Hệ & Yêu Cầu Báo Giá Kỹ Thuật',
  bannerSubtitle: 'Đội ngũ kỹ sư chuyên gia Shicons E&C luôn sẵn sàng hỗ trợ khảo sát, tư vấn giải pháp tối ưu chi phí và bóc tách khối lượng BIM cho dự án của bạn.',
  bannerBadge: 'Kết Nối Trực Tiếp',
  bannerImage: '/images/projects/nha-may-intel.jpg'
};

interface ContentContextType {
  heroBanners: ExtendedHeroSlide[];
  projects: Project[];
  services: ExtendedDomainItem[];
  news: NewsItem[];
  jobs: JobItem[];
  partners: ExtendedPartnerItem[];
  settings: ContactSettingsData;
  aboutData: AboutData;
  manufacturingData: ManufacturingData;

  // Hero Banners
  updateHeroBanner: (banner: ExtendedHeroSlide) => void;
  toggleHeroBanner: (id: string) => void;

  // Projects
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  // Services / Domains
  updateService: (service: ExtendedDomainItem) => void;
  toggleServiceActive: (id: string) => void;

  // News
  addNews: (newsItem: NewsItem) => void;
  updateNews: (newsItem: NewsItem) => void;
  deleteNews: (id: string) => void;

  // Jobs / Careers
  addJob: (job: JobItem) => void;
  updateJob: (job: JobItem) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;

  // Partners
  addPartner: (partner: ExtendedPartnerItem) => void;
  updatePartner: (partner: ExtendedPartnerItem) => void;
  deletePartner: (id: string) => void;
  togglePartnerActive: (id: string) => void;

  // Settings & Contact
  updateSettings: (newSettings: ContactSettingsData) => void;

  // About Page
  updateAboutData: (data: Partial<AboutData>) => void;

  // Manufacturing Page
  updateManufacturingData: (data: Partial<ManufacturingData>) => void;
  updateProductionLine: (line: ProductionLine) => void;
  addProductionLine: (line: ProductionLine) => void;
  deleteProductionLine: (id: string) => void;

  // Reset
  resetAllToDefault: () => void;
}

const STORAGE_KEY = 'shicons_cms_storage_v4';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroBanners, setHeroBanners] = useState<ExtendedHeroSlide[]>(
    HERO_SLIDES.map((b) => ({ ...b, isActive: true }))
  );
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [services, setServices] = useState<ExtendedDomainItem[]>(
    DOMAINS_DATA.map((s) => ({ ...s, isActive: true }))
  );
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [jobs, setJobs] = useState<JobItem[]>(JOBS_DATA);
  const [partners, setPartners] = useState<ExtendedPartnerItem[]>(
    PARTNERS_DATA.map((p) => ({ ...p, isActive: true }))
  );
  const [settings, setSettings] = useState<ContactSettingsData>(DEFAULT_CONTACT_SETTINGS_DATA);
  const [aboutData, setAboutData] = useState<AboutData>(DEFAULT_ABOUT_DATA);
  const [manufacturingData, setManufacturingData] = useState<ManufacturingData>(DEFAULT_MANUFACTURING_DATA);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.heroBanners) setHeroBanners(parsed.heroBanners);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.services) setServices(parsed.services);
        if (parsed.news) setNews(parsed.news);
        if (parsed.jobs) setJobs(parsed.jobs);
        if (parsed.partners) setPartners(parsed.partners);
        if (parsed.settings) setSettings({ ...DEFAULT_CONTACT_SETTINGS_DATA, ...parsed.settings });
        if (parsed.aboutData) {
          setAboutData({
            ...DEFAULT_ABOUT_DATA,
            ...parsed.aboutData,
            highlights: parsed.aboutData.highlights && parsed.aboutData.highlights.length > 0
              ? parsed.aboutData.highlights
              : DEFAULT_ABOUT_DATA.highlights
          });
        }
        if (parsed.manufacturingData) setManufacturingData({ ...DEFAULT_MANUFACTURING_DATA, ...parsed.manufacturingData });
      }
    } catch (e) {
      console.error('Failed to load CMS state from localStorage', e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          heroBanners,
          projects,
          services,
          news,
          jobs,
          partners,
          settings,
          aboutData,
          manufacturingData,
        })
      );
    } catch (e) {
      console.error('Failed to save CMS state to localStorage', e);
    }
  }, [heroBanners, projects, services, news, jobs, partners, settings, aboutData, manufacturingData]);

  const updateHeroBanner = (banner: ExtendedHeroSlide) => {
    setHeroBanners((prev) => prev.map((b) => (b.id === banner.id ? banner : b)));
  };

  const toggleHeroBanner = (id: string) => {
    setHeroBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: b.isActive === false ? true : false } : b))
    );
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const updateProject = (project: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateService = (service: ExtendedDomainItem) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: s.isActive === false ? true : false } : s))
    );
  };

  const addNews = (item: NewsItem) => {
    setNews((prev) => [item, ...prev]);
  };

  const updateNews = (item: NewsItem) => {
    setNews((prev) => prev.map((n) => (n.id === item.id ? item : n)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const addJob = (job: JobItem) => {
    setJobs((prev) => [job, ...prev]);
  };

  const updateJob = (job: JobItem) => {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const toggleJobStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: j.status === 'active' ? 'closed' : 'active' } : j
      )
    );
  };

  const addPartner = (partner: ExtendedPartnerItem) => {
    setPartners((prev) => [...prev, partner]);
  };

  const updatePartner = (partner: ExtendedPartnerItem) => {
    setPartners((prev) => prev.map((p) => (p.id === partner.id ? partner : p)));
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePartnerActive = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p))
    );
  };

  const updateSettings = (newSettings: ContactSettingsData) => {
    setSettings(newSettings);
  };

  const updateAboutData = (data: Partial<AboutData>) => {
    setAboutData((prev) => ({ ...prev, ...data }));
  };

  const updateManufacturingData = (data: Partial<ManufacturingData>) => {
    setManufacturingData((prev) => ({ ...prev, ...data }));
  };

  const updateProductionLine = (line: ProductionLine) => {
    setManufacturingData((prev) => ({
      ...prev,
      productionLines: prev.productionLines.map((l) => (l.id === line.id ? line : l)),
    }));
  };

  const addProductionLine = (line: ProductionLine) => {
    setManufacturingData((prev) => ({
      ...prev,
      productionLines: [...prev.productionLines, line],
    }));
  };

  const deleteProductionLine = (id: string) => {
    setManufacturingData((prev) => ({
      ...prev,
      productionLines: prev.productionLines.filter((l) => l.id !== id),
    }));
  };

  const resetAllToDefault = () => {
    setHeroBanners(HERO_SLIDES.map((b) => ({ ...b, isActive: true })));
    setProjects(PROJECTS_DATA);
    setServices(DOMAINS_DATA.map((s) => ({ ...s, isActive: true })));
    setNews(NEWS_DATA);
    setJobs(JOBS_DATA);
    setPartners(PARTNERS_DATA.map((p) => ({ ...p, isActive: true })));
    setSettings(DEFAULT_CONTACT_SETTINGS_DATA);
    setAboutData(DEFAULT_ABOUT_DATA);
    setManufacturingData(DEFAULT_MANUFACTURING_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        heroBanners,
        projects,
        services,
        news,
        jobs,
        partners,
        settings,
        aboutData,
        manufacturingData,
        updateHeroBanner,
        toggleHeroBanner,
        addProject,
        updateProject,
        deleteProject,
        updateService,
        toggleServiceActive,
        addNews,
        updateNews,
        deleteNews,
        addJob,
        updateJob,
        deleteJob,
        toggleJobStatus,
        addPartner,
        updatePartner,
        deletePartner,
        togglePartnerActive,
        updateSettings,
        updateAboutData,
        updateManufacturingData,
        updateProductionLine,
        addProductionLine,
        deleteProductionLine,
        resetAllToDefault,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
