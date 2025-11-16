// components/Alert/Alert.tsx
"use client"
import { ReactNode, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

/**
 * Интерфейс для компонента Alert
 * @interface AlertProps
 * @property {ReactNode} children - Содержимое уведомления
 * @property {'info' | 'success' | 'warning' | 'error'} type - Тип уведомления
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {MotionProps} [motionProps] - Дополнительные свойства анимации Framer Motion
 */
export interface AlertProps {
    children: ReactNode;
    type: 'info' | 'success' | 'warning' | 'error';
    className?: string;
    motionProps?: MotionProps;
}

/**
 * Компонент Alert для отображения уведомлений разного типа
 * @component
 * @param {AlertProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент уведомления
 * 
 * @example
 * <Alert type="success" className="my-alert">
 *   Операция выполнена успешно!
 * </Alert>
 */
const Alert = ({
    children,
    type,
    className = '',
    motionProps = {}
}: AlertProps) => {
    const { theme } = useTheme();
    const alertClasses = getThemeClasses(theme, 'alert', type);

    // Оптимизация: мемоизация иконок для предотвращения пересоздания
    const icons = useMemo(() => ({
        info: <Info size={20} />,
        success: <CheckCircle size={20} />,
        warning: <AlertCircle size={20} />,
        error: <XCircle size={20} />
    }), []);

    return (
        <motion.div
            className={`${alertClasses} ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            {...motionProps}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default Alert;