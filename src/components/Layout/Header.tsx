// components/Layout/Header.tsx
"use client"
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  blur?: boolean;
  motionProps?: MotionProps;
}

const Header = ({
  children,
  className = '',
  sticky = false,
  blur = false,
  motionProps = {}
}: HeaderProps) => {
  const { theme } = useTheme();
  const headerClasses = getThemeClasses(theme, 'header');

  const stickyClass = sticky ? 'sticky top-0 z-40' : '';
  const blurClass = blur ? 'backdrop-blur-md' : '';

  return (
    <motion.header
      className={`${headerClasses} ${stickyClass} ${blurClass} ${className}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      {...motionProps}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.header>
  );
};

export default Header;