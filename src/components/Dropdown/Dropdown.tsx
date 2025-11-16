// components/Dropdown/Dropdown.tsx
"use client"
import { ReactNode, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Button from '../Button/Button';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для элемента выпадающего списка
 * @interface DropdownItem
 * @property {string} key - Уникальный ключ элемента
 * @property {ReactNode} label - Текст элемента
 * @property {ReactNode} [icon] - Иконка элемента
 * @property {boolean} [disabled=false] - Отключить элемент
 * @property {DropdownItem[]} [children] - Дочерние элементы (для вложенных меню)
 * @property {function} [onClick] - Обработчик клика по элементу
 * @property {ReactNode} [badge] - Бейдж элемента
 */
export interface DropdownItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: DropdownItem[];
  onClick?: () => void;
  badge?: ReactNode;
}

/**
 * Интерфейс для компонента Dropdown
 * @interface DropdownProps
 * @property {DropdownItem[]} items - Массив элементов меню
 * @property {ReactNode} [trigger] - Кастомный триггер для открытия меню
 * @property {'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'} [placement='bottom-start'] - Позиционирование меню
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {'glass' | 'classic'} [theme] - Тема компонента (переопределяет контекстную)
 * @property {boolean} [disabled=false] - Отключить dropdown
 * @property {MotionProps} [motionProps] - Свойства анимации для меню
 * @property {MotionProps} [itemMotionProps] - Свойства анимации для элементов
 */
export interface DropdownProps {
  items: DropdownItem[];
  trigger?: ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
  theme?: 'glass' | 'classic';
  disabled?: boolean;
  motionProps?: MotionProps;
  itemMotionProps?: MotionProps;
}

/**
 * Компонент Dropdown для создания выпадающих меню
 * @component
 * @param {DropdownProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент выпадающего меню
 * 
 * @example
 * <Dropdown
 *   items={[
 *     { key: '1', label: 'Пункт 1', onClick: () => console.log('1') },
 *     { key: '2', label: 'Пункт 2', disabled: true },
 *     { key: '3', label: 'Пункт 3', children: [...] }
 *   ]}
 *   placement="bottom-start"
 * />
 */
const Dropdown = ({
  items,
  trigger,
  placement = 'bottom-start',
  className = '',
  theme: propTheme,
  disabled = false,
  motionProps = {},
  itemMotionProps = {}
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  // Оптимизация: мемоизация классов
  const dropdownClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'dropdown'), [effectiveTheme]);
  
  const itemClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'dropdown-item'), [effectiveTheme]);
  
  const submenuClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'dropdown-submenu'), [effectiveTheme]);

  // Оптимизация: расчет позиции
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      switch (placement) {
        case 'bottom-start':
          top = triggerRect.bottom + 4;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + 4;
          left = triggerRect.right - dropdownRect.width;
          break;
        case 'top-start':
          top = triggerRect.top - dropdownRect.height - 4;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - dropdownRect.height - 4;
          left = triggerRect.right - dropdownRect.width;
          break;
      }
      
      setPositionStyle({
        top: `${top}px`,
        left: `${left}px`,
        position: 'fixed',
        minWidth: `${triggerRect.width}px`,
        transform: 'translate(0, 0)',
        zIndex: 1000
      });
    }
  }, [isOpen, placement]);

  // Оптимизация: обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 200
    },
    ...motionProps
  }), [motionProps]);

  const defaultItemMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.15 },
    ...itemMotionProps
  }), [itemMotionProps]);

  // Оптимизация: useCallback для рендер-функции
  const renderItems = useCallback((items: DropdownItem[], level = 0) => (
    <div className="py-1">
      {items.map((item, index) => (
        <motion.div
          key={item.key}
          custom={index}
          initial={defaultItemMotionProps.initial}
          animate={defaultItemMotionProps.animate}
          transition={{ 
            ...defaultItemMotionProps.transition,
            delay: level * 0.05 + index * 0.03
          }}
        >
          <button
            onClick={() => {
              if (!item.disabled && item.onClick) {
                item.onClick();
                setIsOpen(false);
              }
            }}
            disabled={item.disabled}
            className={`${itemClasses} ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} w-full text-left flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors`}
          >
            {item.icon && <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>}
            <span className={item.disabled ? 'text-gray-400 dark:text-gray-600' : ''}>
              {item.label}
            </span>
            {item.badge && (
              <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
            {item.children && <ChevronRight size={16} className="ml-auto text-gray-400" />}
          </button>
          
          {item.children && (
            <div className={`${submenuClasses} ml-4 mt-1 pl-3 border-l-2 border-gray-200 dark:border-gray-700`}>
              {renderItems(item.children, level + 1)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  ), [defaultItemMotionProps, itemClasses, submenuClasses]);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} inline-block`}
      >
        {trigger || (
          <Button 
            btnType="secondary" 
            variant="outline"
            icon={<ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
            theme={effectiveTheme}
            motionProps={{
              whileHover: { y: -1 },
              whileTap: { y: 1 }
            }}
          >
            Open Menu
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            {...defaultMotionProps}
            style={positionStyle}
            className={`${dropdownClasses} ${className} rounded-lg shadow-lg overflow-hidden z-50`}
            layout
          >
            {renderItems(items)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;