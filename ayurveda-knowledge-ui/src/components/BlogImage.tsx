'use client';

import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function BlogImage({ src, alt, caption, size = 'medium' }: BlogImageProps) {
  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-md',
    large: 'max-w-2xl'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto my-6`}>
      <div className="border-2 border-[var(--accent-primary)] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-sm text-[var(--text-muted)] mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
}
