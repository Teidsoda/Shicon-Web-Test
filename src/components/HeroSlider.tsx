'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronsDown, FileText, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const HeroSlider: React.FC = () => {
  const { heroBanners, settings } = useContent();
  const activeSlides = heroBanners.filter((b) => b.isActive !== false);
  const slides = activeSlides.length > 0 ? activeSlides : heroBanners;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  // Safe slide index
  const safeSlideIndex = currentSlide >= totalSlides ? 0 : currentSlide;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, totalSlides]);

  const slide = slides[safeSlideIndex];

  const handleScrollDown = () => {
    const el = document.querySelector('#ve-chung-toi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!slide) return null;

  return (
    <section
      id="trang-chu"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-slate-950 text-white flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Fade Transition */}
      {slides.map((item, index) => {
        const isActive = index === safeSlideIndex;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Fullscreen Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${item.bgImage})` }}
            />

            {/* Neutral Dark Gradient Overlay (bỏ lớp phủ xanh, giữ màu tự nhiên của ảnh dự án) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent bg-black/20" />

            {/* Subtle Technical Pattern Grid */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        );
      })}

      {/* Main Container Content */}
      <div className="relative z-20 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-24 sm:pb-28">
        <div className="mb-8">
          {/* Main Content: Badge, Headline, Desc & 2 Action Buttons */}
          <div className="max-w-4xl lg:max-w-5xl space-y-5 animate-fadeIn">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest text-white rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24] animate-pulse"></span>
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline with generous line-height for Vietnamese typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-5xl font-extrabold uppercase leading-[1.45] sm:leading-[1.48] lg:leading-[1.52] tracking-normal font-heading text-white max-w-4xl drop-shadow-sm">
              {slide.title}
            </h1>

            {/* Description & Key Specs */}
            <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-3xl line-clamp-3 sm:line-clamp-none">
              {slide.desc}
            </p>

            <div className="text-xs sm:text-sm font-semibold text-white/90 font-mono tracking-wide">
              {slide.stats}
            </div>

            {/* 2 Buttons: Solid Red + Outline White (Bo góc <= 2px per spec) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#du-an"
                className="btn-shicons px-6 sm:px-8 py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm shadow-lg gap-2"
              >
                <span>Khám phá dự án tiêu biểu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={settings.profilePdfUrl || '/documents/SHICONS-EC-Profile-2026.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shicons px-6 sm:px-8 py-3.5 bg-transparent border border-white hover:bg-white hover:text-[#0040A0] text-white text-xs sm:text-sm gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Hồ sơ năng lực (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar: Prev/Next + Progress bar + Slide Dots (Placed safely at Bottom-Left) */}
        <div className="flex items-center justify-between pt-4 border-t border-white/15">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Slide trước"
                className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/30 text-white rounded-[2px] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Slide sau"
                className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/30 text-white rounded-[2px] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Chuyển tới slide ${i + 1}`}
                  className={`h-2 transition-all duration-300 rounded-[1px] ${
                    i === safeSlideIndex ? 'w-8 bg-[#ED1C24]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Slide Index Counter */}
            <div className="text-xs font-mono font-bold tracking-wider text-white/80 hidden sm:block">
              0{safeSlideIndex + 1} / 0{totalSlides}
            </div>
          </div>

          {/* Bottom Center Scroll Down Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-5 flex flex-col items-center z-20">
            <button
              onClick={handleScrollDown}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors group focus:outline-none"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
                Kéo xuống
              </span>
              <ChevronsDown className="w-5 h-5 animate-bounce text-[#ED1C24] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
