"use client"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'glass';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: ButtonType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    theme?: 'glass' | 'classic';
    motionProps?: MotionProps;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    btnType = 'primary',
    variant = 'solid',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    theme: propTheme,
    motionProps = {},
    children,
    className = '',
    style = {},
    ...props
}, ref) => {
    const { theme: contextTheme } = useTheme();
    const effectiveTheme = propTheme || contextTheme;
    const {
        onDrag,
        onDragEnd,
        onDragStart,
        onAnimationStart,
        ...filteredProps
    } = props;
    const sizeClasses = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-2.5 text-lg',
        xl: 'px-6 py-3 text-xl'
    };

    const baseClasses = getThemeClasses(effectiveTheme, 'button', btnType);
    const sizeClass = sizeClasses[size];
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    // Безопасное объединение motion props
    const mergedMotionProps: MotionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring', damping: 15, stiffness: 300 },
        ...motionProps
    };

    return (
        <motion.button
            onClick={props.onClick}
            ref={ref}
            disabled={disabled || loading}
            className={`${baseClasses} ${sizeClass} ${widthClass} ${disabledClasses} ${className}`}
            style={style}
            {...mergedMotionProps}
            {...filteredProps}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                    <span className="animate-spin mr-2">⟳</span>
                ) : icon && iconPosition === 'left' && (
                    <span>{icon}</span>
                )}
                {children}
                {icon && iconPosition === 'right' && (
                    <span>{icon}</span>
                )}
            </div>
        </motion.button>
    );
});

Button.displayName = 'Button';

export default Button;