'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { ConsultModal } from '@/components/ConsultModal';
import { ContentProvider } from '@/context/ContentContext';
import { GoogleTranslate } from '@/components/GoogleTranslate';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <ContentProvider>
      {isAdmin ? (
        <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>
      ) : (
        <>
          <GoogleTranslate />
          <Header onOpenConsult={() => setIsConsultOpen(true)} />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
          <FloatingActions onOpenConsult={() => setIsConsultOpen(true)} />
          <ConsultModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
        </>
      )}
    </ContentProvider>
  );
};
