import React from 'react';

interface HerbImageProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Mapping of herb names to Unsplash/placeholder images
const herbImages: Record<string, string> = {
  'ginger': 'https://images.unsplash.com/photo-1599909533879-63dc859e99b0?w=200&h=200&fit=crop',
  'turmeric': 'https://images.unsplash.com/photo-1615485500834-bc10199bc6c5?w=200&h=200&fit=crop',
  'brahmi': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop',
  'ashwagandha': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
  'tulsi': 'https://images.unsplash.com/photo-1628556307718-65256f9e9d66?w=200&h=200&fit=crop',
  'neem': 'https://images.unsplash.com/photo-1600493572421-8f2c1a5f9769?w=200&h=200&fit=crop',
  'amla': 'https://images.unsplash.com/photo-1590502160462-dffc3e3a5475?w=200&h=200&fit=crop',
  'triphala': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&h=200&fit=crop',
  'guduchi': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'giloy': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'cumin': 'https://images.unsplash.com/photo-1596040033229-a0b4a19ee322?w=200&h=200&fit=crop',
  'coriander': 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=200&h=200&fit=crop',
  'fennel': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=200&h=200&fit=crop',
  'cinnamon': 'https://images.unsplash.com/photo-1596040033229-a0b4a19ee322?w=200&h=200&fit=crop',
  'cardamom': 'https://images.unsplash.com/photo-1594985159017-0db13f075042?w=200&h=200&fit=crop',
  'black pepper': 'https://images.unsplash.com/photo-1599909533879-63dc859e99b0?w=200&h=200&fit=crop',
  'clove': 'https://images.unsplash.com/photo-1627662168781-d1c4974cd513?w=200&h=200&fit=crop',
  'sandalwood': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
  'saffron': 'https://images.unsplash.com/photo-1596040033229-a0b4a19ee322?w=200&h=200&fit=crop',
  'mint': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
  'peppermint': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
  'basil': 'https://images.unsplash.com/photo-1628556307718-65256f9e9d66?w=200&h=200&fit=crop',
  'holy basil': 'https://images.unsplash.com/photo-1628556307718-65256f9e9d66?w=200&h=200&fit=crop',
  'fenugreek': 'https://images.unsplash.com/photo-1599909533879-63dc859e99b0?w=200&h=200&fit=crop',
  'ajwain': 'https://images.unsplash.com/photo-1596040033229-a0b4a19ee322?w=200&h=200&fit=crop',
  'curry leaves': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
  'sesame': 'https://images.unsplash.com/photo-1599909533879-63dc859e99b0?w=200&h=200&fit=crop',
  'ghee': 'https://images.unsplash.com/photo-1628773822990-202c86f4a1e5?w=200&h=200&fit=crop',
  'honey': 'https://images.unsplash.com/photo-1587049352846-4a222e784720?w=200&h=200&fit=crop',
  'jatamansi': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'shankhpushpi': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'bhringraj': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
  'manjistha': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'guggulu': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'shallaki': 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=200&h=200&fit=crop',
  'nutmeg': 'https://images.unsplash.com/photo-1599909533879-63dc859e99b0?w=200&h=200&fit=crop',
};

export default function HerbImage({ name, size = 'small', className = '' }: HerbImageProps) {
  const lowerName = name.toLowerCase();
  const imageUrl = herbImages[lowerName] || 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop';

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  return (
    <div className={`inline-block ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden border-2 border-[var(--gold)] shadow-lg relative group`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
          <span className="text-[var(--gold)] text-xs font-bold" style={{fontFamily: 'Georgia, serif'}}>
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}
