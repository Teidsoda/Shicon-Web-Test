'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  HeartHandshake 
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { JOBS_DATA, CONTACT_INFO } from '@/data/shiconsData';

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      <PageBanner
        title="Cơ Hội Tuyển Dụng Shicons E&C"
        subtitle="Gia nhập đội ngũ kỹ sư tinh hoa Shicons E&C — Làm chủ công nghệ BIM Revit MEP, mức lương hấp dẫn và lộ trình thăng tiến rõ ràng."
        breadcrumbs={[{ label: 'Tuyển dụng' }]}
        badge="Phát Triển Sự Nghiệp"
        bgImage="/images/about/doi-ngu-shicons.jpg"
      />

      {/* 1. Value Proposition for Candidates */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2px] bg-slate-50 border border-gray-200">
              <div className="w-12 h-12 rounded-[2px] bg-blue-100 text-[#0040A0] flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold uppercase font-heading text-[#0040A0] mb-2">
                Đãi Ngộ Cạnh Tranh
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thu nhập tương xứng năng lực thực chiến, thưởng tiến độ dự án, phụ cấp công trường và bảo hiểm sức khỏe cao cấp 24/7.
              </p>
            </div>

            <div className="p-8 rounded-[2px] bg-slate-50 border border-gray-200">
              <div className="w-12 h-12 rounded-[2px] bg-red-100 text-[#ED1C24] flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold uppercase font-heading text-[#0040A0] mb-2">
                Đào Tạo Chuyên Sâu
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Tài trợ các khóa đào tạo nâng cao về Quản lý BIM quốc tế, chứng chỉ an toàn HSE và phương pháp chỉ huy hiện đại.
              </p>
            </div>

            <div className="p-8 rounded-[2px] bg-slate-50 border border-gray-200">
              <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold uppercase font-heading text-[#0040A0] mb-2">
                Môi Trường Nhân Văn
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Tôn trọng con người, xây dựng văn hóa làm việc minh bạch, đoàn kết và coi an toàn lao động là giá trị sống còn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Job Openings List */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block">
              VỊ TRÍ ĐANG TUYỂN DỤNG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              Gia Nhập Đội Ngũ Kỹ Sư Shicons
            </h2>
            <div className="w-12 h-1 bg-[#ED1C24] mx-auto rounded-[1px] mt-2" />
            <p className="text-xs sm:text-sm text-gray-500 pt-2">
              Hạn nộp hồ sơ hiện tại: <strong>31/12/2026</strong>. Ứng tuyển sớm để được ưu tiên phỏng vấn.
            </p>
          </div>

          <div className="space-y-6">
            {JOBS_DATA.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-[2px] bg-white border border-gray-200 hover:border-[#0040A0] hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-[#0040A0] text-[10px] font-bold font-mono uppercase rounded-[1px]">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-gray-600 text-[10px] font-mono rounded-[1px]">
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45]">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-[#ED1C24]" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#ED1C24] font-bold">
                      <DollarSign className="w-4 h-4 text-[#ED1C24]" />
                      <span>{job.salary}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                      <Clock className="w-4 h-4" />
                      <span>Hạn nộp: {job.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-center">
                  <Link
                    href={`/tuyen-dung/${job.slug}`}
                    className="btn-shicons px-6 py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs sm:text-sm tracking-wider uppercase gap-2 shadow-sm"
                  >
                    <span>Xem chi tiết &amp; Ứng tuyển</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Apply Banner */}
          <div className="mt-16 p-8 rounded-[2px] bg-[#07182E] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold font-heading uppercase">
                Chưa tìm thấy vị trí phù hợp?
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Gửi CV và hồ sơ năng lực của bạn về email tuyển dụng: <strong>{CONTACT_INFO.email}</strong> để được lưu trữ vào ngân hàng nhân tài Shicons.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_INFO.email}?subject=Ứng tuyển vị trí kỹ sư Shicons E&C`}
              className="btn-shicons px-8 py-3 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap shadow-md"
            >
              Gửi CV trực tiếp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
