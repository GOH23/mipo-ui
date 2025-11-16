// components/Layout/Layout.tsx
"use client"
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

const Layout = ({
  children,
  className = '',
  motionProps = {}
}: LayoutProps) => {
  const { theme } = useTheme();
  const layoutClasses = getThemeClasses(theme, 'layout');

  return (
    <motion.div
      className={`min-h-screen flex flex-col ${layoutClasses} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Layout;