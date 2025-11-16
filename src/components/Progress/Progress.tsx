// components/Progress/Progress.tsx
"use client"
import { motion } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface ProgressProps {
  value: number;
  max?: number;
  type?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const Progress = ({
  value,
  max = 100,
  type = 'primary',
  className = ''
}: ProgressProps) => {
  const { theme } = useTheme();
  const progressClasses = getThemeClasses(theme, 'progress', 'track');
  const barClasses = getThemeClasses(theme, 'progress', type);

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`${progressClasses} ${className}`}>
      <motion.div
        className={`h-full rounded-full transition-all duration-500 ${barClasses}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default Progress;