'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const ProjectsSection: React.FC = () => {
  const { projects } = useContent();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const updateView = () => setCardsPerView(mq.matches ? 2 : 1);
    updateView();
    mq.addEventListener('change', updateView);
    return () => mq.removeEventListener('change', updateView);
  }, []);

  if (!projects || projects.length === 0) return null;

  const featuredProject = projects[0];
  const carouselProjects = projects.length > 1 ? projects.slice(1) : [projects[0]];
  const maxIndex = Math.max(0, carouselProjects.length - cardsPerView);
  const safeCarouselIndex = Math.min(carouselIndex, maxIndex);

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="du-an" className="relative py-24 sm:py-32 bg-[#F5F5F5] overflow-hidden">
      {/* Background Watermark Outline "SHICONS" top-right */}
      <div className="absolute right-0 top-12 select-none pointer-events-none opacity-40 z-0">
        <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-black watermark-text tracking-widest block leading-none">
          SHICONS
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with vertical blue bar */}
        <div className="relative pl-6 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Vertical Blue Bar `#0040A0` */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0040A0] rounded-[1px]" />

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
              HỒ SƠ CÔNG TRÌNH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              DỰ ÁN TIÊU BIỂU
            </h2>
          </div>

          {/* Solid Blue Button "XEM THÊM DỰ ÁN" */}
          <Link
            href="/du-an"
            className="btn-shicons px-8 py-3.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs sm:text-sm tracking-wider uppercase shadow-md gap-2 self-start sm:self-auto"
          >
            <span>XEM TẤT CẢ DỰ ÁN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Zones Layout: Left Featured (~42%) + Right Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Featured Project (~42% width) */}
          <div className="lg:col-span-5">
            <Link
              href={`/du-an/${featuredProject.slug}`}
              className="block bg-white rounded-[2px] shadow-lg overflow-hidden group cursor-pointer border border-gray-200"
            >
              {/* Photo */}
              <div className="relative h-[280px] sm:h-[340px] overflow-hidden bg-slate-900">
                <img
                  src={featuredProject.imageUrl}
                  alt={featuredProject.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#ED1C24] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-[1px]">
                  {featuredProject.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-[1px]">
                  {featuredProject.status}
                </div>
              </div>

              {/* White Caption Bar below photo */}
              <div className="p-6 bg-white space-y-3">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  {featuredProject.location} • {featuredProject.year} • {featuredProject.scale}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-normal group-hover:text-[#0040A0] transition-colors truncate">
                  {featuredProject.name}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {featuredProject.description}
                </p>

                {/* Red "Chi tiết" Link with blue circle right chevron */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs font-mono font-semibold text-gray-400 truncate max-w-[200px]">
                    {featuredProject.client}
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ED1C24] group-hover:text-[#d0141b] tracking-wider uppercase">
                    <span>Chi tiết</span>
                    <span className="w-6 h-6 rounded-full bg-[#0040A0] text-white flex items-center justify-center group-hover:bg-[#ED1C24] transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Carousel Grid of remaining projects */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                CÔNG TRÌNH TIÊU BIỂU ({carouselProjects.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={safeCarouselIndex === 0}
                  aria-label="Dự án trước"
                  className={`w-8 h-8 rounded-[2px] flex items-center justify-center border ${
                    safeCarouselIndex === 0
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                      : 'border-gray-400 text-gray-700 hover:bg-[#0040A0] hover:border-[#0040A0] hover:text-white transition-colors bg-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={safeCarouselIndex >= maxIndex}
                  aria-label="Dự án tiếp"
                  className={`w-8 h-8 rounded-[2px] flex items-center justify-center border ${
                    safeCarouselIndex >= maxIndex
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                      : 'border-gray-400 text-gray-700 hover:bg-[#0040A0] hover:border-[#0040A0] hover:text-white transition-colors bg-white'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Viewport with smooth transform */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out -mx-2"
                style={{
                  transform: `translateX(-${safeCarouselIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {carouselProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="w-full sm:w-1/2 flex-shrink-0 px-2"
                  >
                    <Link
                      href={`/du-an/${proj.slug}`}
                      className="bg-white rounded-[2px] shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group cursor-pointer flex flex-col h-full"
                    >
                      {/* Photo on top (landscape ratio) */}
                      <div className="relative h-[180px] overflow-hidden bg-slate-900">
                        <img
                          src={proj.imageUrl}
                          alt={proj.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded-[1px]">
                          {proj.status}
                        </div>
                      </div>

                      {/* White Caption below */}
                      <div className="p-4 bg-white flex flex-col justify-between flex-1 space-y-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-[#0040A0] uppercase tracking-wider mb-1 truncate">
                            {proj.categoryLabel}
                          </p>
                          <h4 className="text-xs sm:text-sm font-extrabold text-shicons-heading uppercase font-heading tracking-normal line-clamp-2 group-hover:text-[#0040A0] transition-colors leading-[1.45]">
                            {proj.name}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-mono flex items-center justify-between gap-2">
                          <span className="truncate min-w-0">{proj.location}</span>
                          <span className="font-bold text-gray-700 flex-shrink-0">
                            {proj.year}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
