// components/ProductGrid/ProductGrid.tsx
"use client"
import { ReactNode, useMemo, forwardRef } from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';
import React from 'react';

/**
 * Конфигурация сетки товаров
 * @interface GridConfig
 * @property {2 | 3 | 4 | 5 | 6} [columns=4] - Количество колонок
 * @property {'sm' | 'md' | 'lg'} [gap='md'] - Размер отступов между элементами
 * @property {boolean} [responsive=true] - Включить адаптивность
 * @property {Object} breakpoints - Брейкпоинты для адаптивной сетки
 * @property {number} breakpoints.sm - Колонки на маленьких экранах
 * @property {number} breakpoints.md - Колонки на средних экранах
 * @property {number} breakpoints.lg - Колонки на больших экранах
 * @property {number} breakpoints.xl - Колонки на очень больших экранах
 */
export interface GridConfig {
  columns?: 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * Интерфейс для компонента ProductGrid с полной поддержкой анимаций
 * @interface ProductGridProps
 * @property {ReactNode} children - Дочерние элементы (компоненты ProductCard)
 * @property {GridConfig} [gridConfig] - Конфигурация сетки
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {boolean} [isEmpty=false] - Пустая ли сетка
 * @property {ReactNode} [emptyState] - Компонент для пустого состояния
 * @property {boolean} [isLoading=false] - Состояние загрузки
 * @property {number} [skeletonCount=8] - Количество скелетонов при загрузке
 * @property {MotionProps} [motionProps] - Свойства анимации для контейнера сетки
 * @property {MotionProps} [itemMotionProps] - Свойства анимации для элементов сетки
 * @property {MotionProps} [skeletonMotionProps] - Свойства анимации для скелетонов
 * @property {MotionProps} [emptyStateMotionProps] - Свойства анимации для пустого состояния
 * @property {Object} animationConfig - Конфигурация анимаций
 * @property {'fade' | 'slide' | 'scale' | 'stagger'} [animationConfig.type='stagger'] - Тип анимации
 * @property {number} [animationConfig.duration=0.3] - Длительность анимации
 * @property {number} [animationConfig.staggerDelay=0.1] - Задержка между элементами при stagger анимации
 * @property {boolean} [animationConfig.enableHover=true] - Включить hover эффекты
 */
export interface ProductGridProps {
  children: ReactNode;
  gridConfig?: GridConfig;
  className?: string;
  isEmpty?: boolean;
  emptyState?: ReactNode;
  isLoading?: boolean;
  skeletonCount?: number;
  motionProps?: MotionProps;
  itemMotionProps?: MotionProps;
  skeletonMotionProps?: MotionProps;
  emptyStateMotionProps?: MotionProps;
  animationConfig?: {
    type?: 'fade' | 'slide' | 'scale' | 'stagger';
    duration?: number;
    staggerDelay?: number;
    enableHover?: boolean;
  };
}

/**
 * Компонент сетки товаров с расширенной системой анимаций и адаптивностью
 * @component
 * @param {ProductGridProps} props - Свойства компонента
 * @param {React.Ref<HTMLDivElement>} ref - Референс на DOM-элемент сетки
 * @returns {JSX.Element} Адаптивная сетка товаров с анимациями
 * 
 * @example
 * <ProductGrid
 *   gridConfig={{
 *     columns: 4,
 *     gap: 'md',
 *     responsive: true,
 *     breakpoints: { sm: 1, md: 2, lg: 3, xl: 4 }
 *   }}
 *   motionProps={{
 *     initial: { opacity: 0 },
 *     animate: { opacity: 1 },
 *     transition: { duration: 0.5 }
 *   }}
 *   itemMotionProps={{
 *     whileHover: { scale: 1.02, y: -4 },
 *     transition: { type: "spring", stiffness: 400 }
 *   }}
 *   animationConfig={{
 *     type: 'stagger',
 *     duration: 0.4,
 *     staggerDelay: 0.05
 *   }}
 * >
 *   <ProductCard ... />
 *   <ProductCard ... />
 * </ProductGrid>
 */
export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(({
  children,
  gridConfig = {},
  className = '',
  isEmpty = false,
  emptyState,
  isLoading = false,
  skeletonCount = 8,
  motionProps = {},
  itemMotionProps = {},
  skeletonMotionProps = {},
  emptyStateMotionProps = {},
  animationConfig = {}
}, ref) => {
  const { theme } = useTheme();

  // Деструктуризация конфигов с значениями по умолчанию
  const {
    columns = 4,
    gap = 'md',
    responsive = true,
    breakpoints = {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    }
  } = gridConfig;

  const {
    type = 'stagger',
    duration = 0.3,
    staggerDelay = 0.1,
    enableHover = true
  } = animationConfig;

  // Оптимизация: мемоизация классов сетки
  const gridClasses = useMemo(() => {
    const baseClasses = getThemeClasses(theme, 'product-grid');
    
    // Классы для отступов
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6'
    };

    // Адаптивные классы колонок
    const responsiveColumns = responsive ? `
      grid-cols-${breakpoints.sm || 1}
      sm:grid-cols-${breakpoints.md || 2}
      md:grid-cols-${breakpoints.lg || 3}
      lg:grid-cols-${breakpoints.xl || 4}
      xl:grid-cols-${columns}
    ` : `grid-cols-${columns}`;

    return `
      ${baseClasses}
      grid
      ${responsiveColumns}
      ${gapClasses[gap]}
      ${className}
    `.trim().replace(/\s+/g, ' ');
  }, [theme, columns, gap, responsive, breakpoints, className]);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration },
    ...motionProps
  }), [duration, motionProps]);

  const defaultItemMotionProps: MotionProps = useMemo(() => ({
    whileHover: enableHover ? { 
      scale: 1.02, 
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    } : {},
    whileTap: { scale: 0.98 },
    ...itemMotionProps
  }), [enableHover, itemMotionProps]);

  const defaultSkeletonMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 1, 0.5],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    ...skeletonMotionProps
  }), [skeletonMotionProps]);

  const defaultEmptyStateMotionProps: MotionProps = useMemo(() => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 25 },
    ...emptyStateMotionProps
  }), [emptyStateMotionProps]);

  // Оптимизация: мемоизация анимаций для элементов
  const getItemAnimation = useMemo(() => {
    const baseAnimation = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration }
    };

    switch (type) {
      case 'fade':
        return baseAnimation;
      
      case 'slide':
        return {
          ...baseAnimation,
          initial: { ...baseAnimation.initial, y: 20 },
          animate: { ...baseAnimation.animate, y: 0 },
          exit: { ...baseAnimation.exit, y: -20 }
        };
      
      case 'scale':
        return {
          ...baseAnimation,
          initial: { ...baseAnimation.initial, scale: 0.8 },
          animate: { ...baseAnimation.animate, scale: 1 },
          exit: { ...baseAnimation.exit, scale: 0.8 }
        };
      
      case 'stagger':
        return (index: number) => ({
          ...baseAnimation,
          initial: { ...baseAnimation.initial, y: 20, opacity: 0 },
          animate: { ...baseAnimation.animate, y: 0, opacity: 1 },
          exit: { ...baseAnimation.exit, y: -20, opacity: 0 },
          transition: {
            ...baseAnimation.transition,
            delay: index * staggerDelay
          }
        });
      
      default:
        return baseAnimation;
    }
  }, [type, duration, staggerDelay]);

  // Оптимизация: мемоизация рендера скелетонов
  const renderSkeletons = useMemo(() => {
    return Array.from({ length: skeletonCount }, (_, index) => (
      <motion.div
        key={`skeleton-${index}`}
        className="rounded-xl border bg-gray-200 dark:bg-gray-700 animate-pulse aspect-square"
        {...defaultSkeletonMotionProps}
        {...(typeof getItemAnimation === 'function' ? getItemAnimation(index) : getItemAnimation)}
      />
    ));
  }, [skeletonCount, defaultSkeletonMotionProps, getItemAnimation]);

  // Оптимизация: мемоизация рендера элементов
  const renderChildren = useMemo(() => {
    if (!children) return null;

    return React.Children.map(children, (child, index) => (
      <motion.div
        {...defaultItemMotionProps}
        {...(typeof getItemAnimation === 'function' ? getItemAnimation(index) : getItemAnimation)}
        layout // Автоматическая анимация при изменении layout
      >
        {child}
      </motion.div>
    ));
  }, [children, defaultItemMotionProps, getItemAnimation]);

  // Оптимизация: мемоизация пустого состояния
  const renderEmptyState = useMemo(() => {
    if (!isEmpty) return null;

    const defaultEmptyState = (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Товары не найдены
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );

    return (
      <motion.div
        className="col-span-full"
        {...defaultEmptyStateMotionProps}
      >
        {emptyState || defaultEmptyState}
      </motion.div>
    );
  }, [isEmpty, emptyState, defaultEmptyStateMotionProps]);

  return (
    <motion.div
      ref={ref}
      className={gridClasses}
      {...defaultMotionProps}
      layout // Автоматическая анимация при изменении layout
    >
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          renderSkeletons
        ) : isEmpty ? (
          renderEmptyState
        ) : (
          renderChildren
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;