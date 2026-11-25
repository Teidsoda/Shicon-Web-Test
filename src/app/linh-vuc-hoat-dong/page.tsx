import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Wind, Activity, Cpu, ShieldAlert, Wrench, ShieldCheck } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { DOMAINS_DATA } from '@/data/shiconsData';

export const metadata: Metadata = {
  title: 'Lĩnh Vực Hoạt Động Cơ Điện (MEP) | SHICONS E&C',
  description: 'Tổng thầu Cơ điện MEP Shicons E&C chuyên sâu 5 hệ thống mũi nhọn: HVAC & Phòng sạch, Điện & ELV/BMS, PCCC, Cấp thoát nước và Dịch vụ O&M bảo trì công nghiệp.',
};

const getDomainIcon = (id: string) => {
  switch (id) {
    case 'hvac-system':
      return <Wind className="w-8 h-8 text-white stroke-[2]" />;
    case 'hospital-cleanroom':
      return <Activity className="w-8 h-8 text-white stroke-[2]" />;
    case 'factory-mep-cleanroom':
      return <Cpu className="w-8 h-8 text-white stroke-[2]" />;
    case 'ventilation-smoke-exhaust':
      return <ShieldAlert className="w-8 h-8 text-white stroke-[2]" />;
    case 'tc-om-maintenance':
      return <Wrench className="w-8 h-8 text-white stroke-[2]" />;
    default:
      return <Wind className="w-8 h-8 text-white stroke-[2]" />;
  }
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <PageBanner
        title="Lĩnh Vực Hoạt Động Cơ Điện (MEP)"
        subtitle="5 mảng năng lực cốt lõi được thiết kế & thi công đồng bộ, làm chủ công nghệ cao và giải pháp số hóa BIM LOD 400."
        breadcrumbs={[{ label: 'Lĩnh vực hoạt động' }]}
        badge="Năng lực Kỹ thuật"
        bgImage="/images/projects/nha-may-intel.jpg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block">
              GIẢI PHÁP TỔNG THỂ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
              Dịch vụ Cơ điện M&amp;E / MEP Toàn diện
            </h2>
            <div className="w-12 h-1 bg-[#ED1C24] mx-auto rounded-[1px] mt-2" />
            <p className="text-xs sm:text-sm text-gray-500 pt-2">
              Shicons E&amp;C sở hữu năng lực triển khai trọn gói từ khâu khảo sát, mô hình hóa BIM, gia công chế tạo tại xưởng đến đóng điện nghiệm thu tại công trường.
            </p>
          </div>

          <div className="space-y-16">
            {DOMAINS_DATA.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[2px] p-6 sm:p-8 lg:p-10 bg-slate-50 border border-gray-200 hover:border-[#0040A0] hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-[2px] overflow-hidden h-72 sm:h-96 border border-gray-200 bg-slate-900 group">
                      <img
                        src={service.imageUrl}
                        alt={service.viTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 left-4 w-14 h-14 rounded-[2px] bg-[#0040A0] text-white flex items-center justify-center shadow-lg border border-white/20">
                        {getDomainIcon(service.id)}
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/75 backdrop-blur-sm text-white text-[11px] font-mono rounded-[1px]">
                        {service.standard}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#ED1C24] block font-mono">
                          {service.enTitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase font-heading text-white mt-1">
                          {service.viTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#ED1C24] mb-1">
                        LĨNH VỰC #{service.code}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0040A0] font-heading uppercase tracking-normal leading-[1.45]">
                        {service.viTitle}
                      </h3>
                      <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-1">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                          <CheckCircle2 className="w-4 h-4 text-[#0040A0] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Standards Badges */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {service.standards.map((std, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 text-xs font-mono font-medium rounded-[2px]"
                        >
                          {std}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/linh-vuc-hoat-dong/${service.slug}`}
                        className="btn-shicons px-6 py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs sm:text-sm tracking-wider uppercase gap-2"
                      >
                        <span>Chi tiết giải pháp kỹ thuật</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
