// components/Layout/Body.tsx
"use client"
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface BodyProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  motionProps?: MotionProps;
}

const Body = ({
  children,
  className = '',
  padding = 'md',
  motionProps = {}
}: BodyProps) => {
  const { theme } = useTheme();
  const bodyClasses = getThemeClasses(theme, 'body');

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.main
      className={`flex-1 ${bodyClasses} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      {...motionProps}
    >
      <div className="container mx-auto">
        {children}
      </div>
    </motion.main>
  );
};

export default Body;