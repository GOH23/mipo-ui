"use client"
import { ReactNode } from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  theme?: 'glass' | 'classic';
}

const Card = ({
  children,
  header,
  footer,
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  theme: propTheme
}: CardProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const baseClasses = getThemeClasses(effectiveTheme, 'card');

  return (
    <div className={`${baseClasses} ${className}`}>
      {header && (
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
          {header}
        </div>
      )}
      
      <div className={`p-4 ${contentClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;