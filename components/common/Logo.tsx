'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 60, className = '' }: LogoProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const logoSrc = currentTheme === 'dark' ? '/PNM_D.png' : '/PNM_L.png';

  return (
    <Image
      src={logoSrc}
      alt="PNM Logo"
      width={size}
      height={size}
      className={`rounded-lg shadow-md transition-all ${className}`}
      priority
    />
  );
}
