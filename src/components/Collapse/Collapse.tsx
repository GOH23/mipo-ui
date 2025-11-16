// components/Collapse/Collapse.tsx
"use client"
import { useState, ReactNode, Children, isValidElement, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import Panel from './Panel';
import Button from '../Button/Button';
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

/**
 * Интерфейс для панели компонента Collapse
 * @interface CollapsePanelProps
 * @property {string} key - Уникальный ключ панели
 * @property {ReactNode} label - Заголовок панели
 * @property {ReactNode} children - Содержимое панели
 * @property {ReactNode} [extra] - Дополнительный контент в заголовке
 * @property {boolean} [showArrow=true] - Показывать стрелку раскрытия
 * @property {boolean} [disabled=false] - Отключить панель
 * @property {string} [className] - Дополнительные CSS-классы для панели
 * @property {string} [headerClassName] - Дополнительные CSS-классы для заголовка
 * @property {string} [contentClassName] - Дополнительные CSS-классы для контента
 */
export interface CollapsePanelProps {
  key: string;
  label: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

/**
 * Интерфейс для компонента Collapse
 * @interface CollapseProps
 * @property {string[]} [activeKey] - Контролируемые активные ключи (управляемый режим)
 * @property {string[]} [defaultActiveKey=[]] - Ключи по умолчанию (неуправляемый режим)
 * @property {function} [onChange] - Callback при изменении активных ключей
 * @property {boolean} [accordion=false] - Режим аккордеона (только одна открытая панель)
 * @property {boolean} [ghost=false] - Призрачный режим без границ
 * @property {'left' | 'right'} [expandIconPosition='right'] - Позиция иконки раскрытия
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {CollapsePanelProps[]} [items] - Массив панелей через проп items
 * @property {ReactNode} [children] - Дочерние элементы (альтернатива items)
 * @property {boolean} [showControls=false] - Показать кнопки управления
 * @property {'top' | 'bottom'} [controlPosition='top'] - Позиция кнопок управления
 * @property {'glass' | 'classic'} [theme] - Тема компонента (переопределяет контекстную)
 * @property {MotionProps} [motionProps] - Свойства анимации для контейнера
 * @property {MotionProps} [panelMotionProps] - Свойства анимации для панелей
 * @property {MotionProps} [expandMotionProps] - Свойства анимации для иконок раскрытия
 */
export interface CollapseProps {
  activeKey?: string[];
  defaultActiveKey?: string[];
  onChange?: (keys: string[]) => void;
  accordion?: boolean;
  ghost?: boolean;
  expandIconPosition?: 'left' | 'right';
  className?: string;
  items?: CollapsePanelProps[];
  children?: ReactNode;
  showControls?: boolean;
  controlPosition?: 'top' | 'bottom';
  theme?: 'glass' | 'classic';
  motionProps?: MotionProps;
  panelMotionProps?: MotionProps;
  expandMotionProps?: MotionProps;
}

/**
 * Компонент Collapse для создания аккордеонов и раскрывающихся панелей
 * @component
 * @param {CollapseProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент раскрывающихся панелей
 * 
 * @example
 * <Collapse accordion={true} showControls={true}>
 *   <Collapse.Panel key="1" header="Панель 1">
 *     Содержимое панели 1
 *   </Collapse.Panel>
 *   <Collapse.Panel key="2" header="Панель 2">
 *     Содержимое панели 2
 *   </Collapse.Panel>
 * </Collapse>
 */
const Collapse = ({
  activeKey: controlledActiveKey,
  defaultActiveKey = [],
  onChange,
  accordion = false,
  ghost = false,
  expandIconPosition = 'right',
  className = '',
  items,
  children,
  showControls = false,
  controlPosition = 'top',
  theme: propTheme,
  motionProps = {},
  panelMotionProps = {},
  expandMotionProps = {}
}: CollapseProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string[]>(defaultActiveKey);
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const isControlled = controlledActiveKey !== undefined;
  const activeKeys = isControlled ? controlledActiveKey : internalActiveKey;

  // Оптимизация: useCallback для обработчиков
  const handlePanelClick = useCallback((key: string) => {
    let newKeys: string[];

    if (accordion) {
      newKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      newKeys = activeKeys.includes(key)
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];
    }

    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  }, [activeKeys, accordion, isControlled, onChange]);

  const expandAll = useCallback(() => {
    const allKeys = items ? items.map(item => item.key) : [];
    if (allKeys.length === 0) return;

    const newKeys = [...new Set([...activeKeys, ...allKeys])];
    
    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  }, [activeKeys, items, isControlled, onChange]);

  const collapseAll = useCallback(() => {
    const newKeys: string[] = [];
    
    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  }, [isControlled, onChange]);

  // Оптимизация: мемоизация кнопок управления
  const ControlButtons = useCallback(() => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        btnType="primary" 
        variant="outline"
        icon={<ChevronDownCircle size={16} />} 
        onClick={expandAll}
        size="sm"
        theme={effectiveTheme}
        motionProps={{
          whileHover: { y: -2 },
          whileTap: { scale: 0.95 }
        }}
      >
        Expand All
      </Button>
      <Button 
        btnType="secondary" 
        variant="outline"
        icon={<ChevronUpCircle size={16} />} 
        onClick={collapseAll}
        size="sm"
        theme={effectiveTheme}
        motionProps={{
          whileHover: { y: -2 },
          whileTap: { scale: 0.95 }
        }}
      >
        Collapse All
      </Button>
    </div>
  ), [expandAll, collapseAll, effectiveTheme]);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
    ...motionProps
  }), [motionProps]);

  return (
    <motion.div {...defaultMotionProps} className="relative">
      <div className={`${ghost ? '' : 'border rounded-xl'} border-gray-200 dark:border-gray-700 ${className}`}>
        {showControls && controlPosition === 'top' && <ControlButtons />}
        
        <AnimatePresence mode="sync">
          {items ? (
            items.map((item) => (
              <Panel
                key={item.key}
                header={item.label}
                children={item.children}
                extra={item.extra}
                showArrow={item.showArrow}
                disabled={item.disabled}
                className={item.className}
                headerClassName={item.headerClassName}
                contentClassName={item.contentClassName}
                isActive={activeKeys.includes(item.key)}
                onClick={() => handlePanelClick(item.key)}
                expandIconPosition={expandIconPosition}
                theme={effectiveTheme}
                motionProps={panelMotionProps}
                expandMotionProps={expandMotionProps}
              />
            ))
          ) : (
            Children.map(children, (child) => {
              if (isValidElement(child) && child.key) {
                const key = child.key.toString();
                return (
                  <Panel
                    key={key}
                    header={child.props.header || key}
                    children={child.props.children}
                    isActive={activeKeys.includes(key)}
                    onClick={() => handlePanelClick(key)}
                    expandIconPosition={expandIconPosition}
                    theme={effectiveTheme}
                    motionProps={panelMotionProps}
                    expandMotionProps={expandMotionProps}
                  />
                );
              }
              return null;
            })
          )}
        </AnimatePresence>

        {showControls && controlPosition === 'bottom' && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ControlButtons />
          </div>
        )}
      </div>
    </motion.div>
  );
};

Collapse.Panel = Panel;

export default Collapse;