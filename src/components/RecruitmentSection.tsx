'use client';

import React from 'react';
import Link from 'next/link';
import { HardHat, Compass, Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

interface RecruitmentSectionProps {
  onOpenConsult?: () => void;
}

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({ onOpenConsult }) => {
  const { jobs } = useContent();
  const activeJobs = jobs.filter((j) => j.status === 'active');

  // Tính năng: Khi không có thông tin tuyển dụng (hoặc đã đóng tuyển/xóa hết) sẽ tự động ẩn trên landing page
  if (activeJobs.length === 0) {
    return null;
  }

  const getJobIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Briefcase className="w-6 h-6 text-white stroke-[2]" />;
      case 1:
        return <Compass className="w-6 h-6 text-white stroke-[2]" />;
      case 2:
        return <HardHat className="w-6 h-6 text-white stroke-[2]" />;
      default:
        return <HardHat className="w-6 h-6 text-white stroke-[2]" />;
    }
  };

  return (
    <section id="tuyen-dung" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* S-curve background line decoration connecting 3 columns */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-12 hidden lg:block pointer-events-none -z-0 opacity-20">
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0,100 C300,20 400,180 600,100 C800,20 900,180 1200,100"
            stroke="#0040A0"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block">
            CƠ HỘI NGHỀ NGHIỆP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
            TUYỂN DỤNG NHÂN TÀI
          </h2>
          <div className="w-12 h-1 bg-[#ED1C24] mx-auto rounded-[1px] mt-2" />
          <p className="text-xs sm:text-sm text-gray-500 pt-2">
            Gia nhập đội ngũ kỹ sư tinh hoa Shicons E&amp;C — Môi trường chuyên nghiệp, chế độ đãi ngộ vượt trội và cơ hội làm chủ công nghệ BIM M&amp;E tiên tiến.
          </p>
        </div>

        {/* Dynamic Columns */}
        <div className={`grid grid-cols-1 ${activeJobs.length === 1 ? 'max-w-md mx-auto' : activeJobs.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'} gap-12 lg:gap-16`}>
          {activeJobs.map((job, index) => (
            <Link
              key={job.id}
              href={`/tuyen-dung/${job.slug}`}
              className="flex flex-col items-center text-center group relative cursor-pointer"
            >
              {/* Circular Photo ~250px with subtle dark overlay */}
              <div className="relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden shadow-xl p-1 bg-gradient-to-tr from-[#0040A0] to-[#0A4DA2] mb-6">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800">
                  <img
                    src={job.imageUrl}
                    alt={job.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-[#0040A0]/30 transition-colors" />
                </div>
              </div>

              {/* Title: Black, Uppercase, Bold ~18px, Centered */}
              <h3 className="text-base sm:text-lg font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-normal group-hover:text-[#0040A0] transition-colors min-h-[48px] flex items-center justify-center max-w-xs">
                {job.title}
              </h3>

              {/* Meta details: 2 lines max (Location + Salary range) */}
              <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-center gap-1.5 text-gray-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0040A0] flex-shrink-0" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[#ED1C24] font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-[#ED1C24] flex-shrink-0" />
                  <span>{job.salary}</span>
                </div>

                <div className="text-[11px] text-gray-400 font-mono pt-1">
                  Hạn nộp: {job.deadline} • {job.experience}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Centered Gray Outline Button "Ứng tuyển ngay" */}
        <div className="mt-16 text-center flex flex-wrap justify-center gap-4">
          <Link
            href="/tuyen-dung"
            className="btn-shicons px-10 py-3.5 border-2 border-gray-400 text-shicons-dark hover:border-[#0040A0] hover:bg-[#0040A0] hover:text-white text-xs sm:text-sm tracking-wider uppercase gap-2 group shadow-sm inline-flex"
          >
            <span>XEM TẤT CẢ VỊ TRÍ TUYỂN DỤNG</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onOpenConsult && (
            <button
              onClick={onOpenConsult}
              className="btn-shicons px-10 py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm tracking-wider uppercase shadow-sm inline-flex"
            >
              NỘP HỒ SƠ NHANH
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
