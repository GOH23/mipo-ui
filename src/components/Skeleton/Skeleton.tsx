// components/Skeleton/Skeleton.tsx
"use client"
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = ''
}: SkeletonProps) => {
  const { theme } = useTheme();
  const skeletonClasses = getThemeClasses(theme, 'skeleton', variant);

  const style = {
    width,
    height
  };

  return (
    <div
      className={`${skeletonClasses} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;