import React from 'react';

interface ChakraIconProps {
  size?: number;
  className?: string;
}

export default function ChakraIcon({ size = 60, className = '' }: ChakraIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Lotus petals - Outer layer */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={`outer-${angle}`}
          cx="50"
          cy="50"
          rx="18"
          ry="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.4"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Lotus petals - Inner layer */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="50"
          cy="50"
          rx="12"
          ry="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Center mandala pattern */}
      <circle
        cx="50"
        cy="50"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Inner geometric pattern */}
      <path
        d="M 50 28 L 58 42 L 72 42 L 61 50 L 58 64 L 50 56 L 42 64 L 39 50 L 28 42 L 42 42 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />

      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="currentColor"
        opacity="0.3"
      />

      {/* Bindu (center point) */}
      <circle
        cx="50"
        cy="50"
        r="3"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}
