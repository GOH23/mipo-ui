// components/Spinner/Spinner.tsx
"use client"
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'primary' | 'secondary' | 'white';
  className?: string;
  motionProps?: MotionProps;
}

const Spinner = ({
  size = 'md',
  type = 'primary',
  className = '',
  motionProps = {}
}: SpinnerProps) => {
  const { theme } = useTheme();
  const spinnerClasses = getThemeClasses(theme, 'spinner', type);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${spinnerClasses} ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      {...motionProps}
    />
  );
};

export default Spinner;