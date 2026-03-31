import React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Option as BaseOption } from '@base-ui/react/select';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MuiSelect = ({ value, onChange, options, placeholder, error, label, id }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-900/70">
          {label}
        </label>
      )}
      <BaseSelect
        value={value}
        onValueChange={(e, newValue) => onChange(newValue)}
        className="relative w-full"
      >
        <BaseSelect.Trigger
          className={`
            w-full px-4 py-3 rounded-xl text-left
            glass-input text-dark-900
            flex items-center justify-between
            focus-ring-animate
            ${error ? 'border-red-500/50' : ''}
          `}
        >
          <BaseSelect.Value placeholder={placeholder} />
          <ChevronDown size={18} className="text-dark-900/50" />
        </BaseSelect.Trigger>

        <BaseSelect.Positioner sideOffset={8}>
          <BaseSelect.Popup
            className="rounded-xl overflow-hidden shadow-2xl z-50 min-w-[200px]"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            }}
          >
            {options.map((option) => (
              <BaseOption
                key={option.value}
                value={option.value}
                className="px-4 py-3 text-sm text-dark-900/80 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition-colors"
              >
                {option.label}
              </BaseOption>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default MuiSelect;
