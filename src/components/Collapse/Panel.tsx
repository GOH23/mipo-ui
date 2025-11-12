"use client"
import { ReactNode } from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface PanelProps {
  header: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  showArrow?: boolean;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  expandIconPosition?: 'left' | 'right';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  theme?: 'glass' | 'classic';
  motionProps?: MotionProps;
  contentMotionProps?: MotionProps;
  expandMotionProps?: MotionProps;
}

const Panel = ({
  header,
  children,
  extra,
  showArrow = true,
  isActive,
  onClick,
  disabled = false,
  expandIconPosition = 'right',
  className = '',
  headerClassName = '',
  contentClassName = '',
  theme: propTheme,
  motionProps = {},
  contentMotionProps = {},
  expandMotionProps = {}
}: PanelProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const headerClasses = getThemeClasses(effectiveTheme, 'collapse-panel', 'header');
  const activeClasses = isActive ? getThemeClasses(effectiveTheme, 'collapse-panel', 'active') : '';
  const contentClasses = getThemeClasses(effectiveTheme, 'collapse-panel', 'content');

  const defaultMotionProps: MotionProps = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    ...motionProps
  };

  const defaultContentMotionProps: MotionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
    ...contentMotionProps
  };

  const defaultExpandMotionProps = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
    transition: { duration: 0.2 }
  };

  return (
    <div className={`${getThemeClasses(effectiveTheme, 'collapse-panel')} ${className}`}>
      <div 
        className={`${headerClasses} ${activeClasses} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${headerClassName}`}
        onClick={() => !disabled && onClick()}
      >
        <div className="flex items-center flex-1 min-w-0">
          {expandIconPosition === 'left' && showArrow && (
            <AnimatePresence mode="wait">
              <motion.div 
                className="mr-3 flex-shrink-0"
                animate={isActive ? 'open' : 'closed'}
                variants={defaultExpandMotionProps as any}
                {...expandMotionProps}
              >
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </motion.div>
            </AnimatePresence>
          )}
          <div className={`font-medium ${isActive ? 'text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'} truncate`}>
            {header}
          </div>
          {expandIconPosition === 'right' && showArrow && (
            <AnimatePresence mode="wait">
              <motion.div 
                className="ml-3 flex-shrink-0"
                animate={isActive ? 'open' : 'closed'}
                variants={defaultExpandMotionProps as any}
                {...expandMotionProps}
              >
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {extra && <div className="ml-4 flex-shrink-0">{extra}</div>}
      </div>
      
      <motion.div 
        {...defaultMotionProps}
        className={`${contentClasses} ${contentClassName}`}
      >
        <motion.div
          {...defaultContentMotionProps}
          className="px-4 pr-6 text-gray-700 dark:text-gray-300"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Panel;