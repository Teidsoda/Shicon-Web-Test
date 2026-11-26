'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Building2,
  Factory,
  AlertCircle,
} from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { useContent } from '@/context/ContentContext';
import { mapApiErrorCodeToStatusKey } from '@/lib/contactSubmit';

export default function ContactPage() {
  const t = useTranslations('Pages.Contact');
  const tStatus = useTranslations('FormStatus');
  const locale = useLocale();
  const { settings, services } = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [lastSubmittedService, setLastSubmittedService] = useState('');
  const [lastSubmittedName, setLastSubmittedName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectScale: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !selectedService) {
      setErrorMsg(t('errorMissingFields'));
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'lien-he',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: selectedService,
          projectScale: formData.projectScale.trim(),
          message: formData.message.trim(),
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          locale,
          company_website: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(tStatus(mapApiErrorCodeToStatusKey(data?.code)));
        return;
      }

      setLastSubmittedName(formData.name.trim());
      setLastSubmittedService(selectedService);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        projectScale: '',
        message: '',
      });
      setSelectedService('');
      setHoneypot('');
    } catch {
      setErrorMsg(tStatus('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PageBanner
        title={settings.bannerTitle}
        subtitle={settings.bannerSubtitle}
        breadcrumbs={[{ label: t('breadcrumb') }]}
        badge={settings.bannerBadge}
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
                    {t('infoEyebrow')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45]">
                    {settings.companyName}
                  </h3>
                  <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                  {/* HQ */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">{t('hqLabel')}</strong>
                      <span>{settings.address}</span>
                    </div>
                  </div>

                  {/* Branch */}
                  {settings.branchAddress && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">{t('branchLabel')}</strong>
                        <span>{settings.branchAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Factory */}
                  {settings.factoryAddress && (
                    <div className="flex items-start gap-3">
                      <Factory className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">{t('factoryLabel')}</strong>
                        <span>{settings.factoryAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Hotlines */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#ED1C24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">{t('hotlineLabel')}</strong>
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
                      <strong className="block text-shicons-dark">{t('emailLabel')}</strong>
                      <a href={`mailto:${settings.email}`} className="text-[#0040A0] hover:underline font-medium">
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  {/* Working hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#0040A0] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-shicons-dark">{t('workingHoursLabel')}</strong>
                      <span>{settings.workingHours}</span>
                    </div>
                  </div>

                  {/* Tax code */}
                  {settings.taxCode && (
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-shicons-dark">{t('taxCodeLabel')}</strong>
                        <span className="font-mono">{settings.taxCode}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Map Embed */}
              {settings.googleMapEmbedUrl && (
                <div className="rounded-[2px] overflow-hidden border border-gray-200 shadow-sm bg-slate-900 h-64 sm:h-72">
                  <iframe
                    src={settings.googleMapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title={t('mapTitle')}
                  />
                </div>
              )}
            </div>

            {/* Right: Quotation & Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[2px] bg-white border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
                    {t('formEyebrow')}
                  </span>
                  <h3 className="text-2xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45]">
                    {t('formTitle')}
                  </h3>
                  <div className="w-12 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
                  <p className="text-xs text-gray-500 pt-2">
                    {t('formSubtitle')}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-[2px] bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900 uppercase font-heading">
                      {t('successTitle')}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                      {t('successDesc', {
                        name: lastSubmittedName || t('defaultPartnerName'),
                        service: lastSubmittedService || t('defaultServiceName'),
                      })}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider mx-auto shadow-md"
                    >
                      {t('sendAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
                    {/* Hidden Honeypot */}
                    <input
                      type="text"
                      name="company_website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    {errorMsg && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-[2px] border border-red-200">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          {t('nameLabel')}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t('namePlaceholder')}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          {t('phoneLabel')}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={t('phonePlaceholder')}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          {t('emailInputLabel')}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={t('emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                          {t('companyLabel')}
                        </label>
                        <input
                          type="text"
                          placeholder={t('companyPlaceholder')}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        {t('serviceLabel')}
                      </label>
                      <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                      >
                        <option value="">{t('servicePlaceholder')}</option>
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.viTitle}>
                            #{srv.code} - {srv.viTitle}
                          </option>
                        ))}
                        <option value={t('serviceAllOption')}>{t('serviceAllOption')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        {t('scaleLabel')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('scalePlaceholder')}
                        value={formData.projectScale}
                        onChange={(e) => setFormData({ ...formData, projectScale: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                        {t('messageLabel')}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t('messagePlaceholder')}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-[2px] outline-none text-gray-900 focus:border-[#0040A0] focus:bg-white resize-none transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-shicons w-full py-3.5 bg-[#ED1C24] hover:bg-[#d0141b] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold uppercase tracking-wider gap-2 shadow-md justify-center"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? t('submittingBtn') : t('submitBtn')}</span>
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
