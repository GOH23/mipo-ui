"use client"
import { forwardRef, createElement } from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface TypographyProps {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'muted';
}

// Основной компонент Typography
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    as = 'p', 
    children, 
    className = '', 
    variant = 'primary',
    ...props 
  }, ref) => {
    const { theme } = useTheme();
    
    // Получаем цвет текста в зависимости от темы и варианта
    const getColorClasses = () => {
      const baseColors = {
        primary: getThemeClasses(theme, 'typography', 'primary'),
        secondary: getThemeClasses(theme, 'typography', 'secondary'),
        muted: getThemeClasses(theme, 'typography', 'muted'),
      };
      return baseColors[variant] || baseColors.primary;
    };

    // Размеры для заголовков
    const sizeClasses = {
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-bold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      p: 'text-base',
      span: 'text-base',
      div: 'text-base',
    };

    const colorClasses = getColorClasses();
    const sizeClass = sizeClasses[as] || sizeClasses.p;

    return createElement(
      as,
      {
        ref,
        className: `${colorClasses} ${sizeClass} ${className}`,
        ...props,
      },
      children
    );
  }
);
Typography.displayName = 'Typography';

// Упрощённые компоненты для частого использования
export const Text = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'as'>>(
  (props, ref) => <Typography ref={ref} as="p" {...props} />
);
Text.displayName = 'Text';

export const Heading1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as'>>(
  (props, ref) => <Typography ref={ref} as="h1" variant="primary" {...props} />
);
Heading1.displayName = 'Heading1';

export const Heading2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as'>>(
  (props, ref) => <Typography ref={ref} as="h2" variant="primary" {...props} />
);
Heading2.displayName = 'Heading2';

export const Heading3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as'>>(
  (props, ref) => <Typography ref={ref} as="h3" variant="primary" {...props} />
);
Heading3.displayName = 'Heading3';

export const TextMuted = forwardRef<HTMLElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography ref={ref} as="p" variant="muted" {...props} />
);
TextMuted.displayName = 'TextMuted';

export const TextSecondary = forwardRef<HTMLElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography ref={ref} as="p" variant="secondary" {...props} />
);
TextSecondary.displayName = 'TextSecondary';