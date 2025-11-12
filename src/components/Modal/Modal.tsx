import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideClose?: boolean;
  backdropClose?: boolean;
  theme?: 'glass' | 'classic';
  motionProps?: {
    overlay?: MotionProps;
    content?: MotionProps;
    exit?: MotionProps;
  };
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  hideClose = false,
  backdropClose = true,
  theme: propTheme,
  motionProps = {}
}: ModalProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
    full: 'max-w-full w-full'
  };

  const modalClasses = getThemeClasses(effectiveTheme, 'modal');
  const backdropClasses = getThemeClasses(effectiveTheme, 'modal-backdrop');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const defaultOverlayMotion: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
    ...motionProps.overlay
  };

  const defaultContentMotion: MotionProps = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300,
      mass: 0.1
    },
    ...motionProps.content
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            {...defaultOverlayMotion}
            onClick={backdropClose ? onClose : undefined}
            className={`${backdropClasses} fixed inset-0 z-50 flex items-center justify-center p-4`}
            layout
          >
            <motion.div
              {...defaultContentMotion}
              onClick={e => e.stopPropagation()}
              className={`${modalClasses} ${sizeClasses[size]} w-full rounded-xl shadow-lg overflow-hidden`}
              layout
            >
              <div className={`flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 ${getThemeClasses(effectiveTheme, 'modal-header')}`}>
                {title && <h3 className="text-lg font-medium">{title}</h3>}
                {!hideClose && (
                  <Button
                    btnType="secondary"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    icon={<X size={18} />}
                    theme={effectiveTheme}
                    motionProps={{
                      whileHover: { rotate: 90 },
                      whileTap: { scale: 0.9 }
                    }}
                  />
                )}
              </div>
              
              <div className={`p-4 max-h-[70vh] overflow-y-auto ${getThemeClasses(effectiveTheme, 'modal-content')}`}>
                {children}
              </div>
              
              {footer && (
                <div className={`flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 ${getThemeClasses(effectiveTheme, 'modal-footer')}`}>
                  {footer}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;