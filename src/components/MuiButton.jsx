import React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { motion } from 'framer-motion';

const MuiButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-blue-800 text-white hover:bg-blue-900 active:bg-blue-950 shadow-lg hover:shadow-xl',
    secondary: 'border border-black/10 text-dark-900/70 hover:text-dark-900 hover:bg-black/5 active:bg-black/10',
    ghost: 'text-dark-900/60 hover:text-dark-900 hover:bg-black/5 active:bg-black/10',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <BaseButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClass}
        ${className}
        focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2
      `}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

// Motion wrapper for animated buttons
export const MotionMuiButton = motion(MuiButton);

export default MuiButton;
