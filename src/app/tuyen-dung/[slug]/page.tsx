import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  GraduationCap, 
  Gift,
  Upload,
  Send
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { JOBS_DATA, getJobBySlug, CONTACT_INFO } from '@/data/shiconsData';

interface JobDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return JOBS_DATA.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: 'Không tìm thấy vị trí tuyển dụng | SHICONS E&C' };

  return {
    title: `${job.title} | Tuyển dụng SHICONS E&C`,
    description: `Tuyển dụng ${job.title} tại ${job.location}, mức lương ${job.salary}. Hạn nộp hồ sơ ${job.deadline}.`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const otherJobs = JOBS_DATA.filter((j) => j.slug !== job.slug);

  return (
    <div className="flex flex-col">
      <PageBanner
        title={job.title}
        subtitle={`${job.department} • Nơi làm việc: ${job.location}`}
        breadcrumbs={[
          { label: 'Tuyển dụng', href: '/tuyen-dung' },
          { label: job.title },
        ]}
        badge={`MỨC LƯƠNG: ${job.salary}`}
        bgImage={job.imageUrl}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/tuyen-dung"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0040A0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách tuyển dụng</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Job Title & Summary bar */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-mono">Mức lương:</span>
                  <div className="text-xl sm:text-2xl font-black text-[#ED1C24] font-heading">
                    {job.salary}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-mono">Kinh nghiệm:</span>
                  <div className="text-sm font-bold text-gray-800">
                    {job.experience}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-mono">Hạn nộp hồ sơ:</span>
                  <div className="text-sm font-mono font-bold text-[#0040A0]">
                    {job.deadline}
                  </div>
                </div>
              </div>

              {/* 1. Job Description */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-tight flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  <span>Mô Tả Công Việc</span>
                </h3>
                <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px]" />
                <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {job.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#0040A0] shrink-0 mt-1" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Candidate Requirements */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-tight flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  <span>Yêu Cầu Ứng Viên</span>
                </h3>
                <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px]" />
                <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#ED1C24] shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-tight flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  <span>Quyền Lợi &amp; Chế Độ Đãi Ngộ</span>
                </h3>
                <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px]" />
                <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {job.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Form Box */}
              <div id="ung-tuyen-form" className="p-8 rounded-[2px] bg-slate-50 border-2 border-[#0040A0] space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ED1C24] font-mono">
                    NỘP HỒ SƠ TRỰC TUYẾN
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] font-heading uppercase mt-1">
                    Ứng Tuyển: {job.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Điền thông tin và đính kèm CV (định dạng PDF, tối đa 10MB) để Ban Nhân sự liên hệ trong 48 giờ.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0919 xxx xxx"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Đính kèm CV ứng tuyển (PDF max 10MB) *
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="w-full px-4 py-2 bg-white border border-dashed border-gray-400 text-xs rounded-[2px] cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-shicons px-8 py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>NỘP HỒ SƠ ỨNG TUYỂN</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Job Info Summary */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 space-y-4 text-xs sm:text-sm">
                <h4 className="text-sm font-extrabold text-[#0040A0] uppercase font-heading tracking-wider border-b border-gray-200 pb-3">
                  TỔNG QUAN VỊ TRÍ
                </h4>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                    Phòng ban:
                  </span>
                  <span className="font-bold text-gray-800">{job.department}</span>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                    Địa điểm làm việc:
                  </span>
                  <span className="text-gray-800">{job.location}</span>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                    Mức lương đề xuất:
                  </span>
                  <span className="font-bold text-[#ED1C24]">{job.salary}</span>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                    Kinh nghiệm yêu cầu:
                  </span>
                  <span className="text-gray-800">{job.experience}</span>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                    Hạn nộp hồ sơ:
                  </span>
                  <span className="font-mono font-bold text-[#0040A0]">{job.deadline}</span>
                </div>
              </div>

              {/* Other Vacancies */}
              <div className="p-6 rounded-[2px] bg-slate-50 border border-gray-200 space-y-4">
                <h4 className="text-sm font-extrabold text-shicons-heading uppercase tracking-wider font-heading border-b border-gray-200 pb-3">
                  VỊ TRÍ TUYỂN DỤNG KHÁC
                </h4>
                <div className="space-y-3">
                  {otherJobs.map((other) => (
                    <Link
                      key={other.id}
                      href={`/tuyen-dung/${other.slug}`}
                      className="block p-3 bg-white rounded-[2px] border border-gray-200 hover:border-[#0040A0] hover:shadow-sm transition-all group"
                    >
                      <h5 className="text-xs font-bold text-shicons-heading uppercase font-heading group-hover:text-[#0040A0] transition-colors leading-snug">
                        {other.title}
                      </h5>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 font-mono">
                        <span>{other.location}</span>
                        <span className="font-bold text-[#ED1C24]">{other.salary.split('-')[0]}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
