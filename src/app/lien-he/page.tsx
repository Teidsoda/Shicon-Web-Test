'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Upload,
  Factory
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { useContent } from '@/context/ContentContext';

export default function ContactPage() {
  const { settings, services } = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectScale: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      <PageBanner
        title={settings.bannerTitle || 'Liên Hệ & Yêu Cầu Báo Giá Kỹ Thuật'}
        subtitle={settings.bannerSubtitle || 'Đội ngũ kỹ sư chuyên gia Shicons E&C luôn sẵn sàng hỗ trợ khảo sát, tư vấn giải pháp tối ưu chi phí và bóc tách khối lượng BIM cho dự án của bạn.'}
        breadcrumbs={[{ label: 'Liên hệ' }]}
        badge={settings.bannerBadge || 'Kết Nối Trực Tiếp'}
        bgImage={settings.bannerImage || '/images/projects/nha-may-intel.jpg'}
      />

      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Address Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-[2px] bg-white border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED1C24] block mb-1">
                    THÔNG TIN DOANH NGHIỆP
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45]">
                    {settings.companyName}
                  </h3>
                  <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                  {/* Trụ sở chính */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">Trụ sở chính:</strong>
                      <span>{settings.address}</span>
                    </div>
                  </div>

                  {/* Văn phòng đại diện (nếu có) */}
                  {settings.branchAddress && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">Văn phòng đại diện:</strong>
                        <span>{settings.branchAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Nhà máy sản xuất */}
                  {settings.factoryAddress && (
                    <div className="flex items-start gap-3">
                      <Factory className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">Nhà máy sản xuất 10.000 m²:</strong>
                        <span>{settings.factoryAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Hotlines */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#ED1C24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">Hotline hỗ trợ 24/7:</strong>
                      <div className="space-x-2 font-bold text-[#ED1C24]">
                        {(settings.hotlines || []).map((phone, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:underline">
                              {phone}
                            </a>
                            {pIdx < settings.hotlines.length - 1 && <span>•</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">Email liên hệ:</strong>
                      <a href={`mailto:${settings.email}`} className="text-[#0040A0] hover:underline font-medium">
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  {/* Giờ làm việc */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">Giờ làm việc:</strong>
                      <span>{settings.workingHours}</span>
                    </div>
                  </div>

                  {/* Mã số thuế */}
                  {settings.taxCode && (
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">Mã số thuế:</strong>
                        <span className="font-mono">{settings.taxCode}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bản đồ Google Map nhúng trực tiếp */}
              {settings.googleMapEmbedUrl && (
                <div className="rounded-[2px] overflow-hidden border border-gray-200 shadow-sm bg-slate-900 h-64 sm:h-72">
                  <iframe
                    src={settings.googleMapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Bản đồ chỉ đường đến Shicons E&C"
                  />
                </div>
              )}
            </div>

            {/* Right: Quotation & Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[2px] bg-white border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
                    FORM ĐĂNG KÝ
                  </span>
                  <h3 className="text-2xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45]">
                    Yêu Cầu Khảo Sát &amp; Báo Giá Dự Án
                  </h3>
                  <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
                  <p className="text-xs text-gray-500 pt-2">
                    Điền thông tin dự án cơ điện của bạn bên dưới. Chuyên gia tư toán và kỹ sư trưởng Shicons E&amp;C sẽ liên hệ trong 24 giờ.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-[2px] bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900 uppercase font-heading">
                      Gửi Yêu Cầu Báo Giá Thành Công!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                      Cảm ơn Quý khách hàng <strong>{formData.name || 'đối tác'}</strong> đã tin tưởng Shicons E&amp;C. Kỹ sư phụ trách mảng {selectedService || 'Cơ điện'} sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider mx-auto shadow-md"
                    >
                      Gửi thêm yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          Họ và tên người liên hệ *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Ví dụ: 0919 692 979"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          Email doanh nghiệp *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          Tên công ty / Chủ đầu tư
                        </label>
                        <input
                          type="text"
                          placeholder="Tên doanh nghiệp của bạn"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        Hạng mục cơ điện quan tâm *
                      </label>
                      <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                      >
                        <option value="">-- Chọn hệ thống cơ điện cần báo giá --</option>
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.viTitle}>
                            #{srv.code} - {srv.viTitle}
                          </option>
                        ))}
                        <option value="all-mep">Tổng thầu trọn gói toàn bộ hệ thống Cơ điện MEP</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        Quy mô diện tích hoặc công suất dự kiến
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Nhà máy 20.000 m², Trạm 22kV 2x2500kVA, Phòng sạch 2.000 m²..."
                        value={formData.projectScale}
                        onChange={(e) => setFormData({ ...formData, projectScale: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        Chi tiết yêu cầu kỹ thuật &amp; Tiến độ dự kiến
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả tóm tắt yêu cầu thiết kế, tình trạng mặt bằng hoặc tiêu chuẩn áp dụng..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white resize-none transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-shicons w-full py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm font-bold uppercase tracking-wider gap-2 shadow-md justify-center"
                      >
                        <Send className="w-4 h-4" />
                        <span>Gửi Yêu Cầu Báo Giá Kỹ Thuật</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
