'use client';

import React from 'react';
import { HeroSlider } from '@/components/HeroSlider';
import { AboutSection } from '@/components/AboutSection';
import { NewsSection } from '@/components/NewsSection';
import { ServiceBanners } from '@/components/ServiceBanners';
import { RecruitmentSection } from '@/components/RecruitmentSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { PartnersSection } from '@/components/PartnersSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero Slider (100vh) */}
      <HeroSlider />

      {/* 2. About Us Section (2 columns, 4 stats counter, watermark) */}
      <AboutSection />

      {/* 3. News Section (1 Large + 2 Small) */}
      <NewsSection />

      {/* 4. 5 Domains / Service Vertical Banners (Full-bleed) */}
      <ServiceBanners />

      {/* 5. Recruitment Section (3 Circular photo columns + S-curve) */}
      <RecruitmentSection />

      {/* 6. Projects Section (Intel Vietnam Featured + 5 Projects Carousel) */}
      <ProjectsSection />

      {/* 7. Partners Grid (4 x 2 = 8 Partners) */}
      <PartnersSection />
    </>
  );
}
