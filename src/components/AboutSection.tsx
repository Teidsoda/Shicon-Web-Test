'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const DEFAULT_HIGHLIGHTS = [
  'Tiêu chuẩn quốc tế HTM & NFPA',
  'Kiểm định T&C phòng sạch ISO',
  'Đội ngũ kỹ sư chứng chỉ hành nghề',
  'Bảo hành & O&M 24/7 toàn diện'
];

export const AboutSection: React.FC = () => {
  const { aboutData } = useContent();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const highlights = (aboutData.highlights && aboutData.highlights.length > 0)
    ? aboutData.highlights
    : DEFAULT_HIGHLIGHTS;

  const stats = (aboutData.companyStats && aboutData.companyStats.length > 0)
    ? aboutData.companyStats
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ve-chung-toi"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Background Watermark outline text "SHICONS" */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-40 z-0">
        <span className="text-[120px] sm:text-[180px] lg:text-[230px] font-black watermark-text tracking-widest block leading-none">
          SHICONS
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Media with thick offset frame (layer effect) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Thick Blue Offset Border Frame behind image */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border-[6px] border-[#0040A0] rounded-[2px] -z-10" />

              {/* Main Image */}
              <div className="relative h-[360px] sm:h-[440px] w-full overflow-hidden shadow-xl rounded-[2px] bg-slate-900 group">
                <img
                  src={aboutData.overviewImage || '/images/about/doi-ngu-shicons.jpg'}
                  alt="Đội ngũ kỹ sư Shicons E&C tại xưởng và công trường"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Sub-badge over image */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 border-l-4 border-[#0040A0] shadow-lg max-w-[260px]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {aboutData.imageBadgeCategory || 'Kỹ thuật & An toàn'}
                  </p>
                  <p className="text-xs font-extrabold text-[#0040A0] uppercase font-heading mt-0.5">
                    {aboutData.imageBadgeTitle || 'BIM Revit MEP LOD 400'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, description & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block">
                {aboutData.overviewBadge || 'VỀ CHÚNG TÔI'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
                {aboutData.overviewTitle || 'SHICONS E&C'}
              </h2>
              {/* Short Red Accent Line */}
              <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#444444] leading-relaxed">
              {(aboutData.overviewParagraphs && aboutData.overviewParagraphs.length > 0) ? (
                aboutData.overviewParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))
              ) : (
                <>
                  <p>
                    <strong className="text-shicons-dark">Công ty Cổ phần Shicons E&C</strong> là tổng thầu cơ điện chuyên sâu, tiên phong trong thiết kế và thi công hệ thống cơ điện lạnh (M&E / MEP), phòng sạch công nghệ cao cho các nhà máy FDI, bệnh viện tiêu chuẩn quốc tế và các tòa nhà văn phòng hạng A.
                  </p>
                  <p>
                    Với phương châm hành động{' '}
                    <span className="font-semibold text-shicons-dark">
                      “Kỹ thuật Chính xác — An toàn Tuyệt đối — Bền vững Cùng Khách hàng”
                    </span>
                    , Shicons luôn áp dụng toàn diện quy trình số hóa mô hình thông tin công trình BIM Revit MEP LOD 400 vào quản lý thi công thực tế, giúp tối ưu hóa chi phí và đảm bảo tiến độ chuẩn xác.
                  </p>
                </>
              )}
            </div>

            {/* Checklist items - 4 Cam kết kỹ thuật có thể chỉnh sửa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0040A0] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Gray Outline Button (secondary outline per spec) */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/ve-chung-toi"
                className="btn-shicons px-7 py-3.5 border border-gray-400 text-shicons-dark hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white text-xs sm:text-sm tracking-wider gap-2 group"
              >
                <span>Tìm hiểu năng lực Shicons E&C</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/du-an"
                className="btn-shicons px-7 py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm tracking-wider gap-2"
              >
                <span>Xem hồ sơ công trình</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 4 Key Stats Strip (Counting Animation) */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center md:text-left space-y-1 p-4 bg-slate-50/60 rounded-[2px] border-l-2 border-[#0040A0]"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0040A0] font-heading tracking-tight">
                  {hasAnimated ? stat.value : '0'}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-shicons-heading font-heading">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
