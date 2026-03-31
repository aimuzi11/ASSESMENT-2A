import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const statusConfig = {
  Open: {
    bg: 'rgba(59, 130, 246, 0.15)',
    text: '#3B82F6',
    border: 'rgba(59, 130, 246, 0.3)',
    label: 'Open',
  },
  'In Progress': {
    bg: 'rgba(245, 158, 11, 0.15)',
    text: '#F59E0B',
    border: 'rgba(245, 158, 11, 0.3)',
    label: 'In Progress',
  },
  Resolved: {
    bg: 'rgba(34, 197, 94, 0.15)',
    text: '#22C55E',
    border: 'rgba(34, 197, 94, 0.3)',
    label: 'Resolved',
  },
};

const StatusDropdown = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const config = statusConfig[value] || statusConfig.Open;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (status) => {
    onChange(status);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          inline-flex items-center gap-2
          px-3 py-1.5 rounded-lg
          text-sm font-medium
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-110'}
        `}
        style={{
          backgroundColor: config.bg,
          color: config.text,
          border: `1px solid ${config.border}`,
        }}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Status: ${value}. Click to change.`}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: config.text }}
        />
        {config.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute mt-2 right-0 min-w-[160px] py-1 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            }}
            role="listbox"
            aria-label="Select status"
          >
            {Object.entries(statusConfig).map(([status, statusConf]) => (
              <motion.button
                key={status}
                type="button"
                onClick={() => handleSelect(status)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-left text-sm font-medium
                  transition-colors duration-150
                  hover:bg-black/5
                  ${value === status ? 'bg-black/5' : ''}
                `}
                style={{ color: statusConf.text }}
                whileHover={{ x: 2 }}
                role="option"
                aria-selected={value === status}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusConf.text }}
                />
                <span className="flex-1">{statusConf.label}</span>
                {value === status && (
                  <Check size={14} className="opacity-70" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Status badge (non-interactive version)
export const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Open;

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.text }}
      />
      {config.label}
    </span>
  );
};

export default StatusDropdown;
