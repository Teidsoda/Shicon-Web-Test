'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Sparkles } from 'lucide-react';

interface ConstructionGallerySliderProps {
  photos: string[];
  projectName: string;
}

export const ConstructionGallerySlider: React.FC<ConstructionGallerySliderProps> = ({
  photos,
  projectName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const totalPhotos = photos.length;
  // For screen >= lg, show 3 at a time. The max sliding index is totalPhotos - 3.
  const itemsPerView = 3;
  const maxIndex = Math.max(0, totalPhotos - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-scroll when photos > 3
  useEffect(() => {
    if (totalPhotos <= 3 || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(interval);
  }, [totalPhotos, isPaused, nextSlide]);

  if (!photos || photos.length === 0) return null;

  // RULE: If photos.length <= 3, show standard 3-column grid
  if (totalPhotos <= 3) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#ED1C24] rounded-[1px]" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-shicons-heading font-heading uppercase tracking-normal leading-[1.45]">
              Hình Ảnh Thi Công Thực Tế ({totalPhotos} ảnh)
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-500">
            Tiêu chuẩn 3 ảnh thi công
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {photos.map((imgUrl, gIdx) => (
            <div
              key={gIdx}
              onClick={() => setSelectedPhoto(imgUrl)}
              className="h-56 sm:h-64 rounded-[2px] overflow-hidden shadow-sm border border-gray-200 bg-slate-900 group relative cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={`${projectName} - Ảnh thi công ${gIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-[1px] bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono">
                Ảnh {gIdx + 1}/{totalPhotos}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-10 right-0 p-1.5 text-white hover:text-[#ED1C24] transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
              <img
                src={selectedPhoto}
                alt="Phóng to ảnh thi công"
                className="max-h-[85vh] w-auto object-contain rounded-[2px] shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // RULE: If photos.length > 3, "nếu nhiều hơn sẽ làm ảnh tự trượt ngang"
  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#ED1C24] rounded-[1px]" />
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-shicons-heading font-heading uppercase tracking-normal leading-[1.45] flex items-center gap-2">
              <span>Hình Ảnh Thi Công Thực Tế</span>
              <span className="text-xs px-2 py-0.5 rounded-[1px] bg-[#0040A0] text-white font-mono font-bold">
                {totalPhotos} ảnh
              </span>
            </h3>
          </div>
        </div>

        {/* Controls & Badge for Auto Slide */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[1px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tự động trượt ngang</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              aria-label="Ảnh trước"
              className="w-8 h-8 rounded-[2px] bg-white border border-gray-300 hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Ảnh sau"
              className="w-8 h-8 rounded-[2px] bg-white border border-gray-300 hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white flex items-center justify-center transition-colors text-gray-700 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-sliding Horizontal Viewport */}
      <div className="overflow-hidden relative rounded-[2px]">
        <div
          className="flex transition-transform duration-700 ease-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {photos.map((imgUrl, gIdx) => (
            <div
              key={gIdx}
              onClick={() => setSelectedPhoto(imgUrl)}
              className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] flex-shrink-0 h-56 sm:h-64 rounded-[2px] overflow-hidden shadow-sm border border-gray-200 bg-slate-900 group relative cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={`${projectName} - Ảnh thi công ${gIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-[1px] bg-[#0040A0]/90 backdrop-blur-sm text-white text-[10px] font-mono">
                Thi công thực tế #{gIdx + 1}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[1px] bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono">
                {gIdx + 1} / {totalPhotos}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots / Bar */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx)}
            aria-label={`Slide ${dotIdx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-[1px] ${
              dotIdx === currentIndex ? 'w-6 bg-[#0040A0]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 p-1.5 text-white hover:text-[#ED1C24] transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={selectedPhoto}
              alt="Phóng to ảnh thi công"
              className="max-h-[85vh] w-auto object-contain rounded-[2px] shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
