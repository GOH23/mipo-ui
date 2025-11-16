// components/Input/Input.tsx
"use client"
import { forwardRef, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для компонента Input
 * @interface InputProps
 * @property {string} [type='text'] - Тип input элемента
 * @property {string} [placeholder] - Плейсхолдер input элемента
 * @property {boolean} [error=false] - Состояние ошибки
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {MotionProps} [motionProps] - Свойства анимации Framer Motion
 */
export interface InputProps {
  type?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
  motionProps?: MotionProps;
}

/**
 * Компонент Input с поддержкой анимаций и различных состояний
 * @component
 * @param {InputProps} props - Свойства компонента
 * @param {React.Ref<HTMLInputElement>} ref - Референс на DOM-элемент input
 * @returns {JSX.Element} Компонент поля ввода
 * 
 * @example
 * <Input 
 *   type="email" 
 *   placeholder="Введите email"
 *   error={true}
 *   className="my-input"
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder = '',
  error = false,
  className = '',
  motionProps = {},
  ...props
}, ref) => {
  const { theme } = useTheme();
  
  // Оптимизация: мемоизация классов
  const inputClasses = useMemo(() => 
    getThemeClasses(theme, 'input', error ? 'error' : 'default'), [theme, error]);

  // Оптимизация: мемоизация motion props
  const defaultMotionProps: MotionProps = useMemo(() => ({
    whileFocus: { scale: 1.01 },
    transition: { duration: 0.2 },
    ...motionProps
  }), [motionProps]);

  return (
    <motion.input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`${inputClasses} ${className}`}
      {...defaultMotionProps}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;