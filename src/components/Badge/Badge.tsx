// components/Badge/Badge.tsx
"use client"
import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для компонента Badge
 * @interface BadgeProps
 * @property {ReactNode} children - Содержимое бейджа
 * @property {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'} type - Тип бейджа
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {MotionProps} [motionProps] - Дополнительные свойства анимации Framer Motion
 */
export interface BadgeProps {
  children: ReactNode;
  type: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
  motionProps?: MotionProps;
}

/**
 * Компонент Badge для отображения меток и статусов
 * @component
 * @param {BadgeProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент бейджа
 * 
 * @example
 * <Badge type="success" className="my-badge">
 *   Активный
 * </Badge>
 */
const Badge = ({
  children,
  type,
  className = '',
  motionProps = {}
}: BadgeProps) => {
  const { theme } = useTheme();
  const badgeClasses = getThemeClasses(theme, 'badge', type);

  return (
    <motion.span
      className={`${badgeClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.span>
  );
};

export default Badge;