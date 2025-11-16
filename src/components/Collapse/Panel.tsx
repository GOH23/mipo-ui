// components/Collapse/Panel.tsx
"use client"
import { ReactNode, useMemo } from 'react';
import { motion, MotionProps, AnimatePresence, Variant } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для компонента Panel
 * @interface PanelProps
 * @property {ReactNode} header - Заголовок панели
 * @property {ReactNode} children - Содержимое панели
 * @property {ReactNode} [extra] - Дополнительный контент в заголовке
 * @property {boolean} [showArrow=true] - Показывать стрелку раскрытия
 * @property {boolean} isActive - Активна ли панель
 * @property {function} onClick - Обработчик клика по заголовку
 * @property {boolean} [disabled=false] - Отключить панель
 * @property {'left' | 'right'} [expandIconPosition='right'] - Позиция иконки раскрытия
 * @property {string} [className] - Дополнительные CSS-классы для панели
 * @property {string} [headerClassName] - Дополнительные CSS-классы для заголовка
 * @property {string} [contentClassName] - Дополнительные CSS-классы для контента
 * @property {'glass' | 'classic'} [theme] - Тема компонента (переопределяет контекстную)
 * @property {MotionProps} [motionProps] - Свойства анимации для контейнера
 * @property {MotionProps} [contentMotionProps] - Свойства анимации для контента
 * @property {MotionProps} [expandMotionProps] - Свойства анимации для иконки раскрытия
 */
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

/**
 * Компонент Panel для использования внутри Collapse
 * @component
 * @param {PanelProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент панели
 * 
 * @example
 * <Panel
 *   header="Заголовок панели"
 *   isActive={true}
 *   onClick={() => {}}
 *   showArrow={true}
 * >
 *   Содержимое панели
 * </Panel>
 */
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
  
  // Оптимизация: мемоизация классов
  const headerClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'collapse-panel', 'header'), [effectiveTheme]);
  
  const activeClasses = useMemo(() => 
    isActive ? getThemeClasses(effectiveTheme, 'collapse-panel', 'active') : '', [isActive, effectiveTheme]);
  
  const contentClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'collapse-panel', 'content'), [effectiveTheme]);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.2 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.15 }
      }
    },
    ...motionProps
  }), [motionProps]);

  const defaultContentMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, y: -5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.25,
        delay: 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.15 
      }
    },
    ...contentMotionProps
  }), [contentMotionProps]);

  const defaultExpandMotionProps: Record<string, Variant> = useMemo(() => ({
    open: { 
      rotate: 180,
      transition: { 
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    closed: { 
      rotate: 0,
      transition: { 
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }), []);

  return (
    <div className={`${getThemeClasses(effectiveTheme, 'collapse-panel')} ${className}`}>
      <div
        className={`${headerClasses} ${activeClasses} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${headerClassName}`}
        onClick={() => !disabled && onClick()}
      >
        <div className="flex items-center flex-1 min-w-0">
          {expandIconPosition === 'left' && showArrow && (
            <motion.div
              className="mr-3 flex-shrink-0"
              animate={isActive ? 'open' : 'closed'}
              variants={defaultExpandMotionProps}
              {...expandMotionProps}
            >
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 transition-colors duration-200" />
            </motion.div>
          )}
          <div className={`font-medium ${isActive ? 'text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'} truncate transition-colors duration-200`}>
            {header}
          </div>
          {expandIconPosition === 'right' && showArrow && (
            <motion.div
              className="ml-3 flex-shrink-0"
              animate={isActive ? 'open' : 'closed'}
              variants={defaultExpandMotionProps}
              {...expandMotionProps}
            >
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 transition-colors duration-200" />
            </motion.div>
          )}
        </div>
        {extra && <div className="ml-4 flex-shrink-0">{extra}</div>}
      </div>
      
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            {...defaultMotionProps}
            className={`${contentClasses} ${contentClassName}`}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              {...defaultContentMotionProps}
              className="px-4 pr-6 text-gray-700 dark:text-gray-300"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Panel;