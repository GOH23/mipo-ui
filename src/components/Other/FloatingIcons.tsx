'use client';
import { useState, useEffect, useRef, ReactNode, useMemo } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

export interface FloatingItem {
  id: string;
  content: ReactNode;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number | { width: number; height: number };
  rotation?: number;
  rotationSpeed?: number;
}

export interface FloatingElementsProps {
  items: Array<{
    content: ReactNode;
    size?: number | { width: number; height: number };
    initialPosition?: { x?: number; y?: number };
    initialSpeed?: { x?: number; y?: number };
    initialRotation?: number;
    rotationSpeed?: number;
    motionProps?: MotionProps;
  }>;
  containerClassName?: string;
  itemClassName?: string;
  enableRotation?: boolean;
  rotationRange?: { min: number; max: number };
  speedMultiplier?: number;
  zIndex?: number;
  pauseOnHover?: boolean;
  debugMode?: boolean;
  boundaryPadding?: number;
}

export const FloatingElements = ({
  items,
  containerClassName = '',
  itemClassName = '',
  enableRotation = true,
  rotationRange = { min: -5, max: 5 },
  speedMultiplier = 1,
  zIndex = 0,
  pauseOnHover = true,
  debugMode = false,
  boundaryPadding = 10, // Добавляем отступ от границ
}: FloatingElementsProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Получение классов темы
  const containerThemeClasses = getThemeClasses(theme, 'floating-elements', 'container');
  const itemThemeClasses = getThemeClasses(theme, 'floating-elements', 'item');

  // Инициализация элементов с учетом границ
  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0 || isInitialized) return;

    const rect = container.getBoundingClientRect();
    setContainerSize({ 
      width: rect.width - boundaryPadding * 2, 
      height: rect.height - boundaryPadding * 2 
    });

    const newItems: FloatingItem[] = items.map(item => {
      const size = item.size || 50;
      const width = typeof size === 'number' ? size : size.width;
      const height = typeof size === 'number' ? size : size.height;
      
      // Учитываем отступы от границ
      const maxX = rect.width - width - boundaryPadding * 2;
      const maxY = rect.height - height - boundaryPadding * 2;
      
      const initialX = item.initialPosition?.x ?? Math.random() * maxX + boundaryPadding;
      const initialY = item.initialPosition?.y ?? Math.random() * maxY + boundaryPadding;
      
      // Уменьшаем скорость для плавности
      const speedX = (item.initialSpeed?.x ?? (Math.random() - 0.5) * 1.5) * speedMultiplier;
      const speedY = (item.initialSpeed?.y ?? (Math.random() - 0.5) * 1.5) * speedMultiplier;
      
      return {
        id: uuidv4(),
        content: item.content,
        x: Math.max(boundaryPadding, Math.min(initialX, maxX + boundaryPadding)),
        y: Math.max(boundaryPadding, Math.min(initialY, maxY + boundaryPadding)),
        speedX,
        speedY,
        size: size,
        rotation: item.initialRotation ?? (enableRotation ? (Math.random() - 0.5) * 10 : 0),
        rotationSpeed: item.rotationSpeed ?? (enableRotation ? (Math.random() - 0.5) * 0.5 : 0)
      };
    });

    setFloatingItems(newItems);
    setIsInitialized(true);
  }, [items, isInitialized, speedMultiplier, enableRotation, boundaryPadding]);

  // Обновление размера контейнера при ресайзе
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      setContainerSize({ 
        width: rect.width - boundaryPadding * 2, 
        height: rect.height - boundaryPadding * 2 
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [boundaryPadding]);

  // Плавная анимация движения элементов
  useEffect(() => {
    if (!isInitialized || floatingItems.length === 0 || (pauseOnHover && isHovered)) return;

    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const deltaTime = Math.min(time - lastTime, 32); // Ограничиваем deltaTime для плавности
      lastTime = time;

      setFloatingItems(prevItems => {
        return prevItems.map(item => {
          const width = typeof item.size === 'number' ? item.size : item.size.width;
          const height = typeof item.size === 'number' ? item.size : item.size.height;
          
          // Плавное движение с учетом времени
          let newX = item.x + item.speedX * (deltaTime / 16);
          let newY = item.y + item.speedY * (deltaTime / 16);
          
          let newSpeedX = item.speedX;
          let newSpeedY = item.speedY;
          
          // Плавное отражение от границ с учетом скорости
          if (newX <= boundaryPadding) {
            newSpeedX = Math.abs(item.speedX) * 0.95; // Немного уменьшаем скорость при отражении
            newX = boundaryPadding;
          } else if (newX + width >= containerSize.width + boundaryPadding * 2) {
            newSpeedX = -Math.abs(item.speedX) * 0.95;
            newX = containerSize.width + boundaryPadding * 2 - width;
          }
          
          if (newY <= boundaryPadding) {
            newSpeedY = Math.abs(item.speedY) * 0.95;
            newY = boundaryPadding;
          } else if (newY + height >= containerSize.height + boundaryPadding * 2) {
            newSpeedY = -Math.abs(item.speedY) * 0.95;
            newY = containerSize.height + boundaryPadding * 2 - height;
          }
          
          // Плавное вращение
          let newRotation = item.rotation;
          if (enableRotation && item.rotationSpeed) {
            newRotation = (item.rotation || 0) + item.rotationSpeed * (deltaTime / 16);
            // Ограничиваем вращение для плавности
            if (newRotation > 360) newRotation -= 360;
            if (newRotation < -360) newRotation += 360;
          }

          return {
            ...item,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: newRotation
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [floatingItems, containerSize, isInitialized, isHovered, pauseOnHover, enableRotation, boundaryPadding]);

  // Обработка ховера для паузы
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsHovered(false);
  };

  // Оптимизация рендеринга с useMemo
  const renderedItems = useMemo(() => {
    return floatingItems.map((item, index) => {
      const itemConfig = items[index] || {};
      const motionProps = itemConfig.motionProps || {};
      
      const width = typeof item.size === 'number' ? item.size : item.size.width;
      const height = typeof item.size === 'number' ? item.size : item.size.height;
      
      // Базовые анимации
      const defaultMotionProps: MotionProps = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: { 
          opacity: 0, 
          scale: 0.8,
          transition: { duration: 0.3 }
        },
        ...motionProps
      };

      return (
        <motion.div
          key={item.id}
          className={`absolute rounded-xl flex items-center justify-center border ${itemThemeClasses} ${itemClassName}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `rotate(${item.rotation || 0}deg)`,
            zIndex: zIndex,
            cursor: pauseOnHover ? 'pointer' : 'default',
            boxShadow: debugMode ? '0 0 0 2px rgba(255,0,0,0.5)' : undefined
          }}
          {...defaultMotionProps}
          whileHover={pauseOnHover ? { scale: 1.05, transition: { duration: 0.2 } } : undefined}
        >
          {item.content}
          {debugMode && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-red-500 bg-white px-1 rounded">
              {Math.round(item.x)}, {Math.round(item.y)}
            </div>
          )}
        </motion.div>
      );
    });
  }, [floatingItems, items, itemThemeClasses, itemClassName, zIndex, pauseOnHover, debugMode]);

  if (!isInitialized && items.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${containerThemeClasses} ${containerClassName}`}
      style={{ zIndex }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        <AnimatePresence>
          {renderedItems}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Хук для легкого использования предустановленных элементов
export const useFloatingElements = (config: {
  count?: number;
  types?: ('icon' | 'image' | 'text' | 'custom')[];
  sizes?: Array<number | { width: number; height: number }>;
  content?: ReactNode[];
} = {}) => {
  const { count = 5, types = ['icon'], content = [] } = config;
  
  return useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      const size = config.sizes?.[i] || 30 + Math.random() * 30; // Уменьшаем разброс размеров
      
      let itemContent: ReactNode;
      
      switch (type) {
        case 'icon':
          itemContent = content[i] || (
            <div className="w-full h-full flex items-center justify-center text-xl"> {/* Уменьшаем размер шрифта */}
              {['🚀', '✨', '💫', '🌟', '⭐'][i % 5]}
            </div>
          );
          break;
        case 'image':
          itemContent = content[i] || (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              IMG
            </div>
          );
          break;
        case 'text':
          itemContent = content[i] || (
            <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg p-1 text-xs font-medium"> {/* Уменьшаем padding и шрифт */}
              Text
            </div>
          );
          break;
        default:
          itemContent = content[i] || (
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">★</span> {/* Уменьшаем шрифт */}
            </div>
          );
      }
      
      items.push({
        content: itemContent,
        size: size,
        initialSpeed: {
          x: (Math.random() - 0.5) * 1.2, // Уменьшаем начальную скорость
          y: (Math.random() - 0.5) * 1.2
        },
        rotationSpeed: 0.2 + Math.random() * 0.4, // Уменьшаем скорость вращения
        motionProps: {
          whileHover: { scale: 1.05, rotate: 3, transition: { duration: 0.2 } } // Уменьшаем эффект ховера
        }
      });
    }
    
    return items;
  }, [count, types, config.sizes, content]);
};