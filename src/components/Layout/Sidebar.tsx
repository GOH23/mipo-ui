// components/Layout/Sidebar.tsx
"use client"
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface SidebarProps {
  children: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isOpen?: boolean;
  onClose?: () => void;
  static?: boolean;
  className?: string;
  motionProps?: any;
}

const Sidebar = ({
  children,
  position = 'left',
  width = 'md',
  height = 'full',
  isOpen = true,
  onClose,
  static: isStatic = false,
  className = '',
  motionProps = {}
}: SidebarProps) => {
  const { theme } = useTheme();
  const sidebarClasses = getThemeClasses(theme, 'sidebar');

  // Размеры для десктопа (полные классы Tailwind)
  const widthClasses = { sm: 'w-48', md: 'w-64', lg: 'w-80', xl: 'w-96', full: 'w-full' };
  const heightClasses = { sm: 'h-48', md: 'h-64', lg: 'h-80', xl: 'h-96', full: 'h-full' };
  
  const isHorizontal = position === 'left' || position === 'right';
  const sizeClass = isHorizontal ? widthClasses[width] : heightClasses[height];

  // Позиции для десктопа (всегда на весь экран)
  const positionClasses = {
    left: 'left-0 top-0 h-screen border-r',
    right: 'right-0 top-0 h-screen border-l',
    top: 'top-0 left-0 w-screen border-b',
    bottom: 'bottom-0 left-0 w-screen border-t'
  };

  const positionClass = positionClasses[position];
  const staticClasses = isStatic ? 'relative' : 'fixed z-40';

  // Анимация
  const variants = {
    left: { open: { x: 0, opacity: 1 }, closed: { x: '-100%', opacity: 0 } },
    right: { open: { x: 0, opacity: 1 }, closed: { x: '100%', opacity: 0 } },
    top: { open: { y: 0, opacity: 1 }, closed: { y: '-100%', opacity: 0 } },
    bottom: { open: { y: 0, opacity: 1 }, closed: { y: '100%', opacity: 0 } }
  };

  // Статичный сайдбар без анимации
  if (isStatic) {
    return (
      <div className={`${staticClasses} ${positionClass} ${sidebarClasses} ${className} ${sizeClass}`}>
        <div className="p-4 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sidebar - скрыт на мобильных, анимированный */}
      <div className="hidden lg:block">
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={variants[position]}
          transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 100 }}
          className={`${staticClasses} ${positionClass} ${sidebarClasses} ${className} ${sizeClass}`}
          {...motionProps}
        >
          <div className="p-4 overflow-y-auto h-full">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Mobile Sidebar with Overlay - скрыт на десктопе, анимированный */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            
            {/* Sidebar */}
            <motion.div
              className={`lg:hidden ${staticClasses} z-40 ${sidebarClasses} ${className}`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants[position]}
              transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 100 }}
              style={{ 
                // Адаптивные размеры для мобильных
                ...(position === 'left' && { left: 0, top: 0, width: '80%', height: '100vh' }),
                ...(position === 'right' && { right: 0, top: 0, width: '80%', height: '100vh' }),
                ...(position === 'top' && { top: 0, left: 0, width: '100vw', height: '50%' }),
                ...(position === 'bottom' && { bottom: 0, left: 0, width: '100vw', height: '50%' })
              }}
              {...motionProps}
            >
              <div className="p-4 overflow-y-auto h-full">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;