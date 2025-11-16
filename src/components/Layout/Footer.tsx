// components/Layout/Footer.tsx
"use client"
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface FooterProps {
  children: ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

const Footer = ({
  children,
  className = '',
  motionProps = {}
}: FooterProps) => {
  const { theme } = useTheme();
  const footerClasses = getThemeClasses(theme, 'footer');

  return (
    <motion.footer
      className={`${footerClasses} ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      {...motionProps}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.footer>
  );
};

export default Footer;