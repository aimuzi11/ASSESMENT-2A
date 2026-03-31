import React from 'react';

// Glass icon wrapper component
const GlassIconWrapper = ({ children, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-xl
        flex items-center justify-center
        relative overflow-hidden
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Inner glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(30,64,175,0.3) 0%, transparent 60%)',
        }}
      />
      {children}
    </div>
  );
};

// Plumbing icon - two overlapping pipe segments + droplet
export const PlumbingIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Horizontal pipe */}
      <path d="M3 10h8" strokeLinecap="round" />
      <rect x="2" y="8" width="10" height="4" rx="1" fill="rgba(30,64,175,0.2)" stroke="currentColor" />

      {/* Vertical pipe */}
      <path d="M14 8v10" strokeLinecap="round" />
      <rect x="12" y="7" width="4" height="12" rx="1" fill="rgba(34,211,238,0.2)" stroke="currentColor" />

      {/* Pipe joint */}
      <rect x="10" y="8" width="4" height="4" rx="0.5" fill="rgba(30,64,175,0.3)" stroke="currentColor" />

      {/* Water droplet */}
      <path
        d="M20 13c0 1.5-1 3-2 3s-2-1.5-2-3c0-1.5 2-4 2-4s2 2.5 2 4z"
        fill="rgba(34,211,238,0.4)"
        stroke="rgba(34,211,238,0.8)"
      />
    </svg>
  </GlassIconWrapper>
);

// Electrical icon - lightning bolt with circuit-board micro-detail
export const ElectricalIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Circuit traces */}
      <path d="M4 8h3" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
      <path d="M4 12h2" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
      <path d="M4 16h3" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
      <circle cx="7" cy="8" r="0.75" fill="rgba(245,158,11,0.6)" />
      <circle cx="6" cy="12" r="0.75" fill="rgba(245,158,11,0.6)" />
      <circle cx="7" cy="16" r="0.75" fill="rgba(245,158,11,0.6)" />

      {/* Lightning bolt */}
      <path
        d="M13 2L9 11h4l-2 9 8-12h-5l3-6z"
        fill="rgba(245,158,11,0.3)"
        stroke="rgba(245,158,11,1)"
        strokeLinejoin="round"
      />

      {/* Right circuit traces */}
      <path d="M18 10h2" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
      <path d="M19 14h2" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
      <circle cx="18" cy="10" r="0.75" fill="rgba(245,158,11,0.6)" />
      <circle cx="19" cy="14" r="0.75" fill="rgba(245,158,11,0.6)" />
    </svg>
  </GlassIconWrapper>
);

// AC/HVAC icon - 6-point geometric snowflake
export const HVACIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Central hexagon */}
      <circle cx="12" cy="12" r="2" fill="rgba(34,211,238,0.3)" stroke="rgba(34,211,238,0.8)" />

      {/* 6-point snowflake arms */}
      {/* Top arm */}
      <path d="M12 10V4" stroke="rgba(34,211,238,0.9)" />
      <path d="M10 6l2-2 2 2" stroke="rgba(34,211,238,0.7)" />
      <path d="M10.5 7.5L12 5l1.5 2.5" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />

      {/* Bottom arm */}
      <path d="M12 14v6" stroke="rgba(34,211,238,0.9)" />
      <path d="M10 18l2 2 2-2" stroke="rgba(34,211,238,0.7)" />
      <path d="M10.5 16.5L12 19l1.5-2.5" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />

      {/* Top-right arm */}
      <path d="M13.7 10.3l4.2-4.2" stroke="rgba(34,211,238,0.9)" />
      <path d="M16 5l2 1-1 2" stroke="rgba(34,211,238,0.7)" />

      {/* Bottom-left arm */}
      <path d="M10.3 13.7l-4.2 4.2" stroke="rgba(34,211,238,0.9)" />
      <path d="M8 19l-2-1 1-2" stroke="rgba(34,211,238,0.7)" />

      {/* Top-left arm */}
      <path d="M10.3 10.3L6.1 6.1" stroke="rgba(34,211,238,0.9)" />
      <path d="M6 8l-1-2 2-1" stroke="rgba(34,211,238,0.7)" />

      {/* Bottom-right arm */}
      <path d="M13.7 13.7l4.2 4.2" stroke="rgba(34,211,238,0.9)" />
      <path d="M18 16l1 2-2 1" stroke="rgba(34,211,238,0.7)" />
    </svg>
  </GlassIconWrapper>
);

// Furniture icon - minimal chair silhouette
export const FurnitureIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Chair back */}
      <path
        d="M7 4h10a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"
        fill="rgba(139,92,246,0.2)"
        stroke="rgba(139,92,246,0.9)"
      />

      {/* Chair seat */}
      <path
        d="M5 12h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z"
        fill="rgba(139,92,246,0.3)"
        stroke="rgba(139,92,246,0.9)"
      />

      {/* Chair legs */}
      <path d="M6 16v4" stroke="rgba(139,92,246,0.9)" strokeLinecap="round" />
      <path d="M18 16v4" stroke="rgba(139,92,246,0.9)" strokeLinecap="round" />

      {/* Front legs (shorter) */}
      <path d="M9 16v3" stroke="rgba(139,92,246,0.7)" strokeLinecap="round" />
      <path d="M15 16v3" stroke="rgba(139,92,246,0.7)" strokeLinecap="round" />
    </svg>
  </GlassIconWrapper>
);

// Cleaning icon - spray bottle with mist arc lines
export const CleaningIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Spray bottle body */}
      <path
        d="M8 10h5a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z"
        fill="rgba(34,197,94,0.2)"
        stroke="rgba(34,197,94,0.9)"
      />

      {/* Bottle neck */}
      <path d="M9 10V8a1 1 0 011-1h1a1 1 0 011 1v2" stroke="rgba(34,197,94,0.9)" />

      {/* Spray nozzle */}
      <path
        d="M10 7h2l2-3h2"
        stroke="rgba(34,197,94,0.9)"
        strokeLinecap="round"
      />
      <circle cx="16" cy="4" r="1" fill="rgba(34,197,94,0.5)" stroke="rgba(34,197,94,0.9)" />

      {/* Spray mist arcs */}
      <path d="M17 6c2-1 3-0.5 4 0" stroke="rgba(34,197,94,0.6)" strokeWidth="1" strokeLinecap="round" />
      <path d="M17 8c2 0 3 0.5 4 1.5" stroke="rgba(34,197,94,0.5)" strokeWidth="1" strokeLinecap="round" />
      <path d="M17 4c2-2 3-2 4-1.5" stroke="rgba(34,197,94,0.5)" strokeWidth="1" strokeLinecap="round" />

      {/* Mist droplets */}
      <circle cx="19" cy="5" r="0.5" fill="rgba(34,197,94,0.4)" />
      <circle cx="20" cy="7" r="0.5" fill="rgba(34,197,94,0.4)" />
      <circle cx="21" cy="3" r="0.5" fill="rgba(34,197,94,0.3)" />
    </svg>
  </GlassIconWrapper>
);

// Other icon - asterisk / star-of-david hybrid
export const OtherIcon = ({ size = 'md' }) => (
  <GlassIconWrapper size={size}>
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Upward triangle */}
      <path
        d="M12 4l7 12H5l7-12z"
        fill="rgba(30,64,175,0.15)"
        stroke="rgba(30,64,175,0.6)"
      />

      {/* Downward triangle */}
      <path
        d="M12 20l-7-12h14l-7 12z"
        fill="rgba(34,211,238,0.15)"
        stroke="rgba(34,211,238,0.6)"
      />

      {/* Center circle */}
      <circle cx="12" cy="12" r="2" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.8)" />

      {/* Radiating dots at intersections */}
      <circle cx="12" cy="6" r="0.75" fill="rgba(255,255,255,0.5)" />
      <circle cx="8" cy="14" r="0.75" fill="rgba(255,255,255,0.5)" />
      <circle cx="16" cy="14" r="0.75" fill="rgba(255,255,255,0.5)" />
      <circle cx="12" cy="18" r="0.75" fill="rgba(255,255,255,0.5)" />
      <circle cx="7" cy="10" r="0.75" fill="rgba(255,255,255,0.5)" />
      <circle cx="17" cy="10" r="0.75" fill="rgba(255,255,255,0.5)" />
    </svg>
  </GlassIconWrapper>
);

// Icon mapping for easy lookup
export const CategoryIcons = {
  'Plumbing': PlumbingIcon,
  'Electrical': ElectricalIcon,
  'AC/HVAC': HVACIcon,
  'Furniture': FurnitureIcon,
  'Cleaning': CleaningIcon,
  'Other': OtherIcon,
};

// Get icon by category name
export const getCategoryIcon = (category, size = 'md') => {
  const IconComponent = CategoryIcons[category];
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  return <OtherIcon size={size} />;
};

export default {
  PlumbingIcon,
  ElectricalIcon,
  HVACIcon,
  FurnitureIcon,
  CleaningIcon,
  OtherIcon,
  CategoryIcons,
  getCategoryIcon,
};
