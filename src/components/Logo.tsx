import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'horizontal';
  showSubtext?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtext = true,
  className = '',
}) => {
  // Dimensions map
  const dimensions = {
    sm: { icon: 26, text: 'text-sm', subtext: 'text-[9px]' },
    md: { icon: 34, text: 'text-base', subtext: 'text-[10px]' },
    lg: { icon: 42, text: 'text-lg', subtext: 'text-[11px]' },
    xl: { icon: 52, text: 'text-2xl', subtext: 'text-[12px]' },
  };

  const current = dimensions[size] || dimensions.md;

  const IconEmblem = (
    <div className="relative flex items-center justify-center flex-shrink-0">
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Left Organic Leaf Half */}
        <path
          d="M 50,15 C 28,25 18,50 25,75 C 32,82 43,84 50,85 Z"
          stroke="#38A169"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(56, 161, 105, 0.15)"
        />
        {/* Internal Leaf Veins */}
        <path
          d="M 38,62 L 50,52 M 32,46 L 50,38"
          stroke="#38A169"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Center Vertical Divider Stem */}
        <path
          d="M 50,15 L 50,85"
          stroke="#F2F5F3"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Right Digital Circuit Half */}
        <path
          d="M 50,32 L 62,32 L 72,20"
          stroke="#F2F5F3"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="72" cy="20" r="5" stroke="#F2F5F3" strokeWidth="4" fill="#151B17" />

        <path
          d="M 50,50 L 65,50 L 78,38"
          stroke="#F2F5F3"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="78" cy="38" r="5" stroke="#F2F5F3" strokeWidth="4" fill="#151B17" />

        <path
          d="M 50,68 L 60,68 L 72,56"
          stroke="#F2F5F3"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="72" cy="56" r="5" stroke="#F2F5F3" strokeWidth="4" fill="#151B17" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconEmblem}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {IconEmblem}

      <div className="flex flex-col justify-center">
        <div className={`font-bold tracking-tight text-[#F2F5F3] flex items-center leading-none ${current.text}`}>
          <span>Agro</span>
          <span className="text-[#38A169]">AI</span>
        </div>
        {showSubtext && (
          <span className={`font-semibold tracking-[0.2em] uppercase text-[#38A169] pt-1 leading-none ${current.subtext}`}>
            HELPER
          </span>
        )}
      </div>
    </div>
  );
};
