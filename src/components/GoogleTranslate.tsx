'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
    triggerGoogleTranslate?: (lang: 'vi' | 'en') => void;
  }
}

export const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Define the init function for Google Translate API
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'vi',
            includedLanguages: 'en,vi',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Helper function to trigger translation programmatically
    window.triggerGoogleTranslate = (lang: 'vi' | 'en') => {
      const hostname = window.location.hostname;

      if (lang === 'en') {
        // Set googtrans cookie to English
        document.cookie = `googtrans=/vi/en; path=/;`;
        document.cookie = `googtrans=/vi/en; domain=${hostname}; path=/;`;
        if (hostname.includes('.')) {
          const parts = hostname.split('.');
          const rootDomain = parts.slice(-2).join('.');
          document.cookie = `googtrans=/vi/en; domain=.${rootDomain}; path=/;`;
        }
      } else {
        // Reset to Vietnamese
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
        document.cookie = `googtrans=/vi/vi; path=/;`;
        document.cookie = `googtrans=/vi/vi; domain=${hostname}; path=/;`;
        if (hostname.includes('.')) {
          const parts = hostname.split('.');
          const rootDomain = parts.slice(-2).join('.');
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${rootDomain}; path=/;`;
          document.cookie = `googtrans=/vi/vi; domain=.${rootDomain}; path=/;`;
        }
      }

      // Try triggering the Google Translate combo select element
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
      } else {
        // If combo not ready yet, reload so Google Translate detects the cookie
        window.location.reload();
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
};
