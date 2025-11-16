// components/Card/Card.tsx
"use client"
import { ReactNode } from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для компонента Card
 * @interface CardProps
 * @property {ReactNode} children - Основное содержимое карточки
 * @property {ReactNode} [header] - Заголовок карточки (опционально)
 * @property {ReactNode} [footer] - Футер карточки (опционально)
 * @property {string} [className] - Дополнительные CSS-классы для основной обертки
 * @property {string} [headerClassName] - Дополнительные CSS-классы для заголовка
 * @property {string} [contentClassName] - Дополнительные CSS-классы для контента
 * @property {string} [footerClassName] - Дополнительные CSS-классы для футера
 * @property {'glass' | 'classic'} [theme] - Тема карточки (переопределяет контекстную)
 */
export interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  theme?: 'glass' | 'classic';
}

/**
 * Универсальный компонент Card для создания карточек с заголовком, контентом и футером
 * @component
 * @param {CardProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент карточки
 * 
 * @example
 * <Card 
 *   header={<h3>Заголовок</h3>}
 *   footer={<button>Действие</button>}
 *   className="my-card"
 * >
 *   Основной контент карточки
 * </Card>
 */
const Card = ({
  children,
  header,
  footer,
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  theme: propTheme
}: CardProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const baseClasses = getThemeClasses(effectiveTheme, 'card');

  return (
    <div className={`${baseClasses} ${className}`}>
      {header && (
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
          {header}
        </div>
      )}
      
      <div className={`p-4 ${contentClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;