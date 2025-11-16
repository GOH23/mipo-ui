import { MotionProps } from "framer-motion";
import { FloatingElements, FloatingElementsProps } from "./FloatingIcons";

export const FloatingContentBackground = ({
  contentItems = [],
  config = {},
  className = "",
  boundaryPadding = 15 // Увеличиваем отступ по умолчанию
}: {
  contentItems?: Array<{
    type: 'icon' | 'image' | 'component';
    content: React.ReactNode;
    size?: number | { width: number; height: number };
    motionProps?: MotionProps;
  }>;
  config?: Partial<FloatingElementsProps>;
  className?: string;
  boundaryPadding?: number;
}) => {
  const defaultConfig = {
    enableRotation: true,
    speedMultiplier: 0.7, // Уменьшаем множитель скорости
    pauseOnHover: true,
    debugMode: false,
    zIndex: 0,
    boundaryPadding: boundaryPadding
  };

  const mergedConfig = { ...defaultConfig, ...config };

  // Преобразуем contentItems в формат FloatingElements
  const items = contentItems.map(item => ({
    content: item.content,
    size: item.size || 35, // Уменьшаем размер по умолчанию
    motionProps: item.motionProps || {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
      transition: { type: "spring", stiffness: 200, damping: 15 } // Более плавная анимация
    }
  }));

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <FloatingElements
        items={items}
        {...mergedConfig}
        containerClassName={`opacity-90 ${mergedConfig.containerClassName || ''}`} // Уменьшаем непрозрачность
        itemClassName={`shadow-md ${mergedConfig.itemClassName || ''}`} // Уменьшаем тень
      />
    </div>
  );
};