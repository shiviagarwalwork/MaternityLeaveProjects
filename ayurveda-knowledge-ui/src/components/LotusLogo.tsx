'use client';

import Image from 'next/image';

interface LotusLogoProps {
  size?: number;
  className?: string;
}

export default function LotusLogo({ size = 40, className = '' }: LotusLogoProps) {
  return (
    <Image
      src="/images/Nayavednew.png"
      alt="NayaVed AI Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
