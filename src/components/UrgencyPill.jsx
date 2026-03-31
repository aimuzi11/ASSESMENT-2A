import React from 'react';
import { motion } from 'framer-motion';

const urgencyConfig = {
  Low: {
    bg: 'rgba(34, 197, 94, 0.15)',
    text: '#22C55E',
    border: 'rgba(34, 197, 94, 0.3)',
    shadow: '0 0 8px rgba(34, 197, 94, 0.4)',
    label: 'Low',
  },
  Medium: {
    bg: 'rgba(245, 158, 11, 0.15)',
    text: '#F59E0B',
    border: 'rgba(245, 158, 11, 0.3)',
    shadow: '0 0 8px rgba(245, 158, 11, 0.4)',
    label: 'Medium',
  },
  High: {
    bg: 'rgba(239, 68, 68, 0.15)',
    text: '#EF4444',
    border: 'rgba(239, 68, 68, 0.3)',
    shadow: '0 0 8px rgba(239, 68, 68, 0.4)',
    label: 'High',
    pulse: true,
  },
};

const UrgencyPill = ({ urgency, size = 'md', showIcon = false }) => {
  const config = urgencyConfig[urgency] || urgencyConfig.Low;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1.5
        ${sizeClasses[size]}
        rounded-full font-medium
        ${config.pulse ? 'animate-pulse-high' : ''}
      `}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        boxShadow: config.shadow,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {showIcon && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: config.text }}
        />
      )}
      {config.label}
    </motion.span>
  );
};

// Urgency selector component for form
export const UrgencySelector = ({ value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-dark-900/70">
        Urgency Level
      </label>
      <div className="flex gap-3">
        {['Low', 'Medium', 'High'].map((level) => {
          const config = urgencyConfig[level];
          const isSelected = value === level;

          return (
            <motion.button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              className={`
                flex-1 py-3 px-4 rounded-xl font-medium text-sm
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
              `}
              style={{
                backgroundColor: isSelected ? config.bg : 'rgba(0, 0, 0, 0.04)',
                color: isSelected ? config.text : 'rgba(26, 26, 36, 0.6)',
                border: `1px solid ${isSelected ? config.border : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: isSelected ? config.shadow : 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={isSelected}
              aria-label={`${level} urgency`}
            >
              <span className="flex items-center justify-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isSelected ? 'scale-100' : 'scale-75 opacity-50'
                  }`}
                  style={{ backgroundColor: config.text }}
                />
                {level}
              </span>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default UrgencyPill;
