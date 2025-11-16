// components/Price/Price.tsx
"use client"
import { useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Варианты размера компонента цены
 * @type {('xs' | 'sm' | 'md' | 'lg' | 'xl')}
 */
export type PriceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Варианты веса шрифта для цены
 * @type {('normal' | 'medium' | 'semibold' | 'bold')}
 */
export type PriceWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Варианты выравнивания цены
 * @type {('left' | 'center' | 'right')}
 */
export type PriceAlign = 'left' | 'center' | 'right';

/**
 * Интерфейс для компонента Price с полной поддержкой анимаций
 * @interface PriceProps
 * @property {number} amount - Основная сумма цены
 * @property {number} [oldAmount] - Старая цена (для отображения скидки)
 * @property {string} [currency='₽'] - Символ валюты
 * @property {string} [currencyPosition='after'] - Позиция валюты ('before' | 'after')
 * @property {PriceSize} [size='md'] - Размер компонента
 * @property {PriceWeight} [weight='semibold'] - Насыщенность шрифта
 * @property {PriceAlign} [align='left'] - Выравнивание текста
 * @property {boolean} [showDiscount=true] - Показывать процент скидки
 * @property {boolean} [showCurrency=true] - Показывать символ валюты
 * @property {boolean} [strikeOldPrice=true] - Перечеркивать старую цену
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {MotionProps} [motionProps] - Свойства анимации для основного контейнера
 * @property {MotionProps} [currentPriceMotionProps] - Свойства анимации для текущей цены
 * @property {MotionProps} [oldPriceMotionProps] - Свойства анимации для старой цены
 * @property {MotionProps} [discountMotionProps] - Свойства анимации для бейджа скидки
 * @property {MotionProps} [currencyMotionProps] - Свойства анимации для символа валюты
 * @property {Object} animationConfig - Конфигурация анимаций
 * @property {boolean} [animationConfig.enableCountUp=false] - Включить анимацию счетчика
 * @property {number} [animationConfig.countUpDuration=1] - Длительность анимации счетчика
 * @property {boolean} [animationConfig.enablePulse=false] - Включить пульсацию при изменении
 * @property {boolean} [animationConfig.staggerChildren=true] - Включить последовательные анимации
 * @property {number} [animationConfig.staggerDelay=0.1] - Задержка между анимациями элементов
 */
export interface PriceProps {
  amount: number;
  oldAmount?: number;
  currency?: string;
  currencyPosition?: 'before' | 'after';
  size?: PriceSize;
  weight?: PriceWeight;
  align?: PriceAlign;
  showDiscount?: boolean;
  showCurrency?: boolean;
  strikeOldPrice?: boolean;
  className?: string;
  motionProps?: MotionProps;
  currentPriceMotionProps?: MotionProps;
  oldPriceMotionProps?: MotionProps;
  discountMotionProps?: MotionProps;
  currencyMotionProps?: MotionProps;
  animationConfig?: {
    enableCountUp?: boolean;
    countUpDuration?: number;
    enablePulse?: boolean;
    staggerChildren?: boolean;
    staggerDelay?: number;
  };
}

/**
 * Компонент для отображения цены с поддержкой скидок, анимаций и кастомизации
 * @component
 * @param {PriceProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент цены с анимациями
 * 
 * @example
 * // Базовая цена
 * <Price amount={2999} />
 * 
 * @example
 * // Цена со скидкой и анимациями
 * <Price
 *   amount={1999}
 *   oldAmount={2999}
 *   currency="₽"
 *   size="lg"
 *   showDiscount={true}
 *   motionProps={{
 *     initial: { opacity: 0, y: 20 },
 *     animate: { opacity: 1, y: 0 },
 *     transition: { duration: 0.3 }
 *   }}
 *   animationConfig={{
 *     enableCountUp: true,
 *     countUpDuration: 2,
 *     staggerChildren: true
 *   }}
 * />
 * 
 * @example
 * // Цена с кастомными анимациями элементов
 * <Price
 *   amount={1500}
 *   currentPriceMotionProps={{
 *     whileHover: { scale: 1.1, color: "#10b981" },
 *     transition: { type: "spring", stiffness: 400 }
 *   }}
 *   discountMotionProps={{
 *     whileHover: { scale: 1.2, rotate: 5 },
 *     whileTap: { scale: 0.9 }
 *   }}
 * />
 */
export const Price = ({
  amount,
  oldAmount,
  currency = '₽',
  currencyPosition = 'after',
  size = 'md',
  weight = 'semibold',
  align = 'left',
  showDiscount = true,
  showCurrency = true,
  strikeOldPrice = true,
  className = '',
  motionProps = {},
  currentPriceMotionProps = {},
  oldPriceMotionProps = {},
  discountMotionProps = {},
  currencyMotionProps = {},
  animationConfig = {}
}: PriceProps) => {
  const { theme } = useTheme();

  // Деструктуризация конфига анимаций
  const {
    enableCountUp = false,
    countUpDuration = 1,
    enablePulse = false,
    staggerChildren = true,
    staggerDelay = 0.1
  } = animationConfig;

  // Оптимизация: мемоизация вычисляемых значений
  const discount = useMemo(() => {
    if (!oldAmount || oldAmount <= amount) return 0;
    return Math.round(((oldAmount - amount) / oldAmount) * 100);
  }, [oldAmount, amount]);

  const hasDiscount = useMemo(() => 
    discount > 0, [discount]);

  const formattedAmount = useMemo(() => 
    new Intl.NumberFormat('ru-RU').format(amount), [amount]);

  const formattedOldAmount = useMemo(() => 
    oldAmount ? new Intl.NumberFormat('ru-RU').format(oldAmount) : null, [oldAmount]);

  // Оптимизация: мемоизация классов
  const containerClasses = useMemo(() => {
    const baseClasses = getThemeClasses(theme, 'price');
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end'
    };
    return `flex items-baseline flex-wrap gap-2 ${alignClasses[align]} ${className}`.trim();
  }, [theme, align, className]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      xs: { current: 'text-sm', old: 'text-xs', discount: 'text-xs' },
      sm: { current: 'text-base', old: 'text-sm', discount: 'text-xs' },
      md: { current: 'text-lg', old: 'text-base', discount: 'text-sm' },
      lg: { current: 'text-xl', old: 'text-lg', discount: 'text-base' },
      xl: { current: 'text-2xl', old: 'text-xl', discount: 'text-lg' }
    };
    return sizes[size];
  }, [size]);

  const weightClasses = useMemo(() => {
    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    };
    return weights[weight];
  }, [weight]);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
    ...motionProps
  }), [motionProps]);

  const defaultCurrentPriceMotionProps: MotionProps = useMemo(() => ({
    initial: { scale: enablePulse ? 0.8 : 1, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        delay: staggerChildren ? staggerDelay * 0 : 0
      }
    },
    whileHover: { scale: 1.05 },
    ...currentPriceMotionProps
  }), [enablePulse, staggerChildren, staggerDelay, currentPriceMotionProps]);

  const defaultOldPriceMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        delay: staggerChildren ? staggerDelay * 1 : 0
      }
    },
    ...oldPriceMotionProps
  }), [staggerChildren, staggerDelay, oldPriceMotionProps]);

  const defaultDiscountMotionProps: MotionProps = useMemo(() => ({
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 500,
        delay: staggerChildren ? staggerDelay * 2 : 0
      }
    },
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.9 },
    ...discountMotionProps
  }), [staggerChildren, staggerDelay, discountMotionProps]);

  const defaultCurrencyMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        delay: staggerChildren ? staggerDelay * 0.5 : 0
      }
    },
    ...currencyMotionProps
  }), [staggerChildren, staggerDelay, currencyMotionProps]);

  // Рендер символа валюты
  const renderCurrency = useMemo(() => {
    if (!showCurrency) return null;

    return (
      <motion.span
        className={`${sizeClasses.current} ${weightClasses} text-inherit`}
        {...defaultCurrencyMotionProps}
      >
        {currency}
      </motion.span>
    );
  }, [showCurrency, sizeClasses.current, weightClasses, currency, defaultCurrencyMotionProps]);

  // Рендер текущей цены
  const renderCurrentPrice = useMemo(() => (
    <motion.span
      className={`${sizeClasses.current} ${weightClasses} text-gray-900 dark:text-gray-100`}
      {...defaultCurrentPriceMotionProps}
    >
      {currencyPosition === 'before' && renderCurrency}
      {formattedAmount}
      {currencyPosition === 'after' && renderCurrency}
    </motion.span>
  ), [
    sizeClasses.current, weightClasses, currencyPosition, formattedAmount, 
    renderCurrency, defaultCurrentPriceMotionProps
  ]);

  // Рендер старой цены
  const renderOldPrice = useMemo(() => {
    if (!formattedOldAmount || !hasDiscount) return null;

    return (
      <motion.span
        className={`${sizeClasses.old} font-normal text-gray-500 dark:text-gray-400 ${
          strikeOldPrice ? 'line-through' : ''
        }`}
        {...defaultOldPriceMotionProps}
      >
        {currencyPosition === 'before' && `${currency} `}
        {formattedOldAmount}
        {currencyPosition === 'after' && ` ${currency}`}
      </motion.span>
    );
  }, [
    formattedOldAmount, hasDiscount, sizeClasses.old, strikeOldPrice, 
    currencyPosition, currency, defaultOldPriceMotionProps
  ]);

  // Рендер бейджа скидки
  const renderDiscount = useMemo(() => {
    if (!hasDiscount || !showDiscount) return null;

    return (
      <motion.span
        className={`${sizeClasses.discount} font-bold bg-red-500 text-white px-2 py-1 rounded-full`}
        {...defaultDiscountMotionProps}
      >
        -{discount}%
      </motion.span>
    );
  }, [hasDiscount, showDiscount, sizeClasses.discount, discount, defaultDiscountMotionProps]);

  return (
    <motion.div
      className={containerClasses}
      {...defaultMotionProps}
    >
      {renderCurrentPrice}
      {renderOldPrice}
      {renderDiscount}
    </motion.div>
  );
};

export default Price;