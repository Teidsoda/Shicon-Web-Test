import React from 'react';

interface LogoProps {
  variant?: 'white' | 'color';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'white', className = '' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/logo_shicons.png"
        alt="Công ty Cổ phần Shicons E&C"
        className={`h-9 sm:h-11 w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${
          isWhite ? 'brightness-0 invert drop-shadow-sm' : ''
        }`}
      />
    </div>
  );
};
