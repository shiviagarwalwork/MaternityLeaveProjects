'use client';

interface LotusLogoProps {
  size?: number;
  className?: string;
}

export default function LotusLogo({ size = 40, className = '' }: LotusLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {/* Center petal */}
      <path
        d="M50 10 C55 25, 60 40, 50 55 C40 40, 45 25, 50 10"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Left inner petal */}
      <path
        d="M35 20 C25 35, 25 50, 40 60 C35 45, 35 30, 35 20"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Right inner petal */}
      <path
        d="M65 20 C75 35, 75 50, 60 60 C65 45, 65 30, 65 20"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Far left petal */}
      <path
        d="M20 30 C10 45, 15 60, 35 65 C25 55, 20 40, 20 30"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Far right petal */}
      <path
        d="M80 30 C90 45, 85 60, 65 65 C75 55, 80 40, 80 30"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Bottom left petal */}
      <path
        d="M25 55 C15 65, 20 80, 45 75 C30 70, 25 60, 25 55"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Bottom right petal */}
      <path
        d="M75 55 C85 65, 80 80, 55 75 C70 70, 75 60, 75 55"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Center circle */}
      <circle cx="50" cy="60" r="8" fill="currentColor" opacity="0.5" />
      {/* Inner dots representing seeds */}
      <circle cx="50" cy="58" r="2" fill="currentColor" opacity="0.8" />
      <circle cx="46" cy="62" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="54" cy="62" r="1.5" fill="currentColor" opacity="0.8" />
      {/* Base/water line */}
      <path
        d="M30 85 Q50 75, 70 85"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}
