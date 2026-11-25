'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';

export const PartnersSection: React.FC = () => {
  const { partners } = useContent();
  const activePartners = partners.filter((p) => p.isActive !== false);

  if (activePartners.length === 0) return null;

  return (
    <section id="doi-tac" className="py-20 sm:py-28 bg-white border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0040A0] block mb-1">
            MẠNG LƯỚI TOÀN CẦU
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-shicons-heading uppercase font-heading tracking-normal leading-[1.45] sm:leading-[1.5]">
            ĐỐI TÁC UY TÍN
          </h2>
          <div className="w-16 h-1 bg-[#ED1C24] rounded-[1px] mt-2" />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="h-[90px] sm:h-[110px] border border-gray-200 rounded-[2px] bg-slate-50/50 hover:bg-white hover:border-[#0040A0] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center p-4 group cursor-pointer"
            >
              <div className="relative w-full h-[45px] flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[140px] object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-[#0040A0] transition-colors mt-2">
                {partner.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
