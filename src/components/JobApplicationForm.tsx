'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  validateAttachmentFile,
  encodeFileToBase64,
  mapApiErrorCodeToStatusKey,
} from '@/lib/contactSubmit';

interface JobApplicationFormProps {
  jobTitle: string;
  jobDepartment: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobTitle,
  jobDepartment,
}) => {
  const t = useTranslations('Pages.Careers');
  const tStatus = useTranslations('FormStatus');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setCvFile(null);
      return;
    }
    const validationErr = validateAttachmentFile(file);
    if (validationErr === 'INVALID_FILE_TYPE') {
      setErrorMsg(tStatus('invalidFileType'));
      setCvFile(null);
      e.target.value = '';
      return;
    }
    if (validationErr === 'FILE_TOO_LARGE') {
      setErrorMsg(tStatus('fileTooLarge'));
      setCvFile(null);
      e.target.value = '';
      return;
    }
    setErrorMsg('');
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg(tStatus('missingRequired'));
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const attachment = cvFile ? await encodeFileToBase64(cvFile) : null;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'ung-tuyen',
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          jobTitle,
          jobDepartment,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          locale,
          company_website: honeypot,
          attachment,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(tStatus(mapApiErrorCodeToStatusKey(data?.code)));
        return;
      }

      setIsSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setCvFile(null);
      setHoneypot('');
    } catch {
      setErrorMsg(tStatus('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-[2px] bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
        <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-emerald-900 uppercase font-heading">
          {t('formSuccessTitle')}
        </h4>
        <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
          {t('formSuccess')}
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider mx-auto shadow-md"
        >
          {t('formSendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            {t('formNameLabel')}
          </label>
          <input
            type="text"
            required
            placeholder={t('formNamePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            {t('formPhoneLabel')}
          </label>
          <input
            type="tel"
            required
            placeholder={t('formPhonePlaceholder')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          {t('formEmailLabel')}
        </label>
        <input
          type="email"
          required
          placeholder={t('formEmailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs rounded-[2px] outline-none focus:border-[#0040A0]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          {t('formCvLabel')}
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full px-4 py-2 bg-white border border-dashed border-gray-400 text-xs rounded-[2px] cursor-pointer"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-shicons px-8 py-3 bg-[#0040A0] hover:bg-[#004DA0] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs uppercase tracking-wider gap-2 shadow-md"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? t('formSubmitting') : t('formSubmit')}</span>
      </button>
    </form>
  );
};
