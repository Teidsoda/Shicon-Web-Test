'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  validateAttachmentFile,
  encodeFileToBase64,
  mapApiErrorCodeToStatusKey,
} from '@/lib/contactSubmit';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('ConsultModal');
  const tStatus = useTranslations('FormStatus');
  const locale = useLocale();
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [content, setContent] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationErr = validateAttachmentFile(file);
      if (validationErr === 'INVALID_FILE_TYPE') {
        setErrorMsg(tStatus('invalidFileType'));
        setAttachedFile(null);
        setFileName(null);
        e.target.value = '';
        return;
      }
      if (validationErr === 'FILE_TOO_LARGE') {
        setErrorMsg(tStatus('fileTooLarge'));
        setAttachedFile(null);
        setFileName(null);
        e.target.value = '';
        return;
      }
      setErrorMsg('');
      setAttachedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim() || !contact.trim()) {
      setErrorMsg(t('missingRequired'));
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const attachment = attachedFile ? await encodeFileToBase64(attachedFile) : null;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'popup',
          name: fullName.trim(),
          contact: contact.trim(),
          message: content.trim(),
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
      setFullName('');
      setContact('');
      setContent('');
      setAttachedFile(null);
      setFileName(null);
      setHoneypot('');
      setErrorMsg('');
    } catch {
      setErrorMsg(tStatus('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-[760px] rounded-[2px] shadow-2xl p-6 sm:p-10 z-10 animate-fadeIn my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t('closeLabel')}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-800 transition-colors rounded"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ED1C24] block mb-1">
            {t('eyebrow')}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0040A0] uppercase font-heading tracking-normal leading-[1.45]">
            {t('title')}
          </h3>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 font-heading uppercase">
              {t('successTitle')}
            </h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {t('successDesc')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
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

            {/* Row 1: Name and Contact (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('nameLabel')} <span className="text-[#ED1C24]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('namePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#0040A0] focus:ring-1 focus:ring-[#0040A0] outline-none text-sm rounded-[2px] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('contactLabel')} <span className="text-[#ED1C24]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('contactPlaceholder')}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#0040A0] focus:ring-1 focus:ring-[#0040A0] outline-none text-sm rounded-[2px] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Content (Textarea) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t('contentLabel')}
              </label>
              <textarea
                rows={4}
                placeholder={t('contentPlaceholder')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#0040A0] focus:ring-1 focus:ring-[#0040A0] outline-none text-sm rounded-[2px] transition-colors resize-none"
              />
            </div>

            {/* Row 3: File Attachment */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t('attachmentLabel')}
              </label>
              <div className="relative border-2 border-dashed border-gray-300 hover:border-[#0040A0] p-4 text-center rounded-[2px] transition-colors bg-slate-50/50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {fileName ? (
                      <span className="font-bold text-[#0040A0]">{fileName}</span>
                    ) : (
                      t('dropzoneText')
                    )}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {t('dropzoneHint')}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button (Centered solid blue per spec) */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shicons px-12 py-3.5 bg-[#0040A0] hover:bg-[#004DA0] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm tracking-wider uppercase shadow-lg mx-auto"
              >
                {isSubmitting ? t('submittingButton') : t('submitButton')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
