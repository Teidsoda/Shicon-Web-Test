'use client';

import React from 'react';
import { Send, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/data/shiconsData';

interface FloatingActionsProps {
  onOpenConsult: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenConsult }) => {
  return (
    <aside
      aria-label="Kênh liên hệ nhanh"
      className="fixed right-3 sm:right-5 top-[45%] -translate-y-1/2 z-40 flex flex-col items-center gap-3 select-none"
    >
      {/* 1. Blue Button: Send paper plane icon -> Open Modal */}
      <button
        onClick={onOpenConsult}
        aria-label="Gửi yêu cầu tư vấn"
        title="Gửi yêu cầu tư vấn"
        className="w-12 h-12 rounded-full bg-[#0040A0] hover:bg-[#004DA0] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#0040A0]/50"
      >
        <Send className="w-5 h-5 transition-transform group-hover:scale-110" />
      </button>

      {/* 2. Zalo Chat Button: Zalo Brand Blue */}
      <a
        href={CONTACT_INFO.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat qua Zalo"
        title="Chat qua Zalo"
        className="w-12 h-12 rounded-full bg-[#0068FF] hover:bg-[#0055d4] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0068FF]/50"
      >
        <span className="font-extrabold text-[12px] tracking-tighter">Zalo</span>
      </a>

      {/* 3. Red Button: Phone Hotline */}
      <a
        href={`tel:${CONTACT_INFO.primaryHotline}`}
        aria-label={`Gọi hotline ${CONTACT_INFO.hotlines[0]}`}
        title={`Gọi hotline: ${CONTACT_INFO.hotlines[0]}`}
        className="w-12 h-12 rounded-full bg-[#ED1C24] hover:bg-[#d0141b] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 animate-pulse hover:animate-none focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/50"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>
    </aside>
  );
};
