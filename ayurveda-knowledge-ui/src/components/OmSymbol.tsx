import React from 'react';

interface OmSymbolProps {
  size?: number;
  className?: string;
}

export default function OmSymbol({ size = 40, className = '' }: OmSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 30 45 Q 35 35, 45 40 Q 50 42, 48 50 Q 46 58, 40 60 Q 30 62, 25 55 Q 22 50, 25 45 Q 28 42, 30 45 Z"
        fill="currentColor"
        opacity="0.8"
      />

      <path
        d="M 50 35 Q 58 30, 65 35 Q 72 40, 70 48 Q 68 55, 62 58 Q 55 60, 50 55"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      <circle
        cx="72"
        cy="28"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.8"
      />

      <path
        d="M 35 65 Q 40 60, 50 62 Q 65 65, 70 72 Q 72 78, 68 82 Q 60 88, 50 85 Q 38 82, 32 75 Q 28 70, 32 65"
        fill="currentColor"
        opacity="0.7"
      />

      <path
        d="M 45 30 Q 48 25, 52 30 L 50 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
