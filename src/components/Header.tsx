'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';
import { CONTACT_INFO } from '@/data/shiconsData';

interface HeaderProps {
  onOpenConsult?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsult }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isWhiteLogo = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const menuItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/ve-chung-toi' },
    { label: 'Lĩnh vực', href: '/linh-vuc-hoat-dong' },
    { label: 'Dự án', href: '/du-an' },
    { label: 'Sản xuất', href: '/san-xuat' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ', href: '/lien-he' },
  ];

  const handleNavClick = (item: { href: string }) => {
    setIsDrawerOpen(false);
    if (isHomePage && item.href === '/') {
      const element = document.querySelector('#trang-chu');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = item.href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled || !isHomePage
            ? 'bg-[#0040A0] shadow-lg py-3 h-[64px]'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 h-[84px]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">
          {/* Left: Hamburger Button */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Mở Menu điều hướng"
              className="p-2 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 rounded-[2px]"
            >
              <Menu className="w-7 h-7 stroke-[2.2]" />
            </button>
          </div>

          {/* Center: Logo canh chính giữa tuyệt đối so với toàn trang/header */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <Link
              href="/"
              className="transition-transform duration-200 hover:scale-[1.02] focus:outline-none flex items-center"
            >
              <Logo variant={isWhiteLogo ? 'white' : 'color'} showText={true} />
            </Link>
          </div>

          {/* Right: Search (Future i18n slot reserved here) */}
          <div className="flex items-center gap-2 sm:gap-4 z-10">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Tìm kiếm"
              className="p-2 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 rounded-[2px]"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 transition-visibility duration-300 ${
          isDrawerOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-full max-w-[340px] sm:max-w-[400px] bg-white text-shicons-dark shadow-2xl flex flex-col transition-transform duration-300 ease-out z-10 ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 bg-white text-shicons-dark flex items-center justify-between border-b border-gray-100">
            <Logo variant="color" showText={true} />
            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Đóng Menu"
              className="p-2 text-gray-500 hover:text-shicons-dark transition-colors rounded-[2px]"
            >
              <X className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* Drawer Menu Links */}
          <div className="flex-1 overflow-y-auto py-6 px-6 divide-y divide-gray-100">
            <nav className="space-y-1">
              {menuItems.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`w-full text-left py-3 px-3 text-sm sm:text-base font-bold transition-colors uppercase tracking-wider flex items-center justify-between group rounded-[2px] ${
                    pathname === item.href
                      ? 'text-[#0040A0] bg-blue-50/60 font-black'
                      : 'text-shicons-dark hover:text-[#0040A0] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#ED1C24] transition-colors font-mono">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="pt-6 mt-6 space-y-4">
              <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
                Hỗ trợ tư vấn 24/7
              </p>
              <a
                href={`tel:${CONTACT_INFO.primaryHotline}`}
                className="flex items-center gap-3 p-3 bg-red-50 text-[#ED1C24] hover:bg-red-100 transition-colors rounded-[2px]"
              >
                <PhoneCall className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm tracking-wide">
                  Hotline: {CONTACT_INFO.hotlines[0]}
                </span>
              </a>

              {onOpenConsult && (
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenConsult();
                  }}
                  className="w-full btn-shicons py-3 bg-[#0040A0] hover:bg-[#004DA0] text-white text-sm"
                >
                  Gửi yêu cầu báo giá
                </button>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
            © 2026 Shicons E&C. All rights reserved.
          </div>
        </div>
      </div>

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[2px] shadow-2xl p-6 relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-shicons-heading uppercase tracking-wide mb-4">
              Tìm kiếm dự án & thông tin
            </h3>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Nhập tên dự án, lĩnh vực hoặc công nghệ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-[#0040A0] focus:ring-1 focus:ring-[#0040A0] outline-none text-sm rounded-[2px]"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
            <div className="mt-4 text-xs text-gray-500 flex flex-wrap gap-2">
              <span className="font-medium text-gray-600">Gợi ý:</span>
              {['Intel', 'Tân Sơn Nhất', 'Phòng sạch', 'BIM Revit', 'Bel Việt Nam'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-[2px] text-gray-700"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Link
                href="/du-an"
                onClick={() => setIsSearchOpen(false)}
                className="btn-shicons px-5 py-2.5 bg-[#0040A0] text-white text-xs hover:bg-[#004DA0]"
              >
                Xem tất cả dự án
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
