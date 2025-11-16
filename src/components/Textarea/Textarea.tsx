// components/Textarea/Textarea.tsx
"use client"
import { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface TextareaProps {
  placeholder?: string;
  error?: boolean;
  className?: string;
  motionProps?: MotionProps;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  placeholder = '',
  error = false,
  className = '',
  motionProps = {},
  ...props
}, ref) => {
  const { theme } = useTheme();
  const textareaClasses = getThemeClasses(theme, 'textarea', error ? 'error' : 'default');

  return (
    <motion.textarea
      ref={ref}
      placeholder={placeholder}
      className={`${textareaClasses} ${className}`}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      {...motionProps}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;