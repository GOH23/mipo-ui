// components/ProductCard/ProductCard.tsx
"use client"
import { ReactNode, useCallback, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, MotionProps } from 'framer-motion';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import { Heart, ShoppingCart, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

/**
 * Интерфейс для бейджа товара
 * @interface ProductBadge
 * @property {'sale' | 'new' | 'hot' | 'out-of-stock' | 'limited'} type - Тип бейджа
 * @property {string} text - Текст бейджа
 */
export interface ProductBadge {
  type: 'sale' | 'new' | 'hot' | 'out-of-stock' | 'limited';
  text: string;
}

/**
 * Конфигурация анимаций для ProductCard
 * @interface AnimationConfig
 * @property {number} [imageTransition=0.5] - Длительность перехода между изображениями
 * @property {number} [hoverScale=1.02] - Масштаб при наведении
 * @property {number} [tapScale=0.98] - Масштаб при нажатии
 * @property {number} [floatDistance=8] - Расстояние всплытия при наведении
 * @property {boolean} [enableImageSwipe=true] - Включить свайп изображений
 * @property {boolean} [enableQuickActions=true] - Включить быстрые действия
 * @property {boolean} [enableHoverEffects=true] - Включить эффекты наведения
 */
export interface AnimationConfig {
  imageTransition?: number;
  hoverScale?: number;
  tapScale?: number;
  floatDistance?: number;
  enableImageSwipe?: boolean;
  enableQuickActions?: boolean;
  enableHoverEffects?: boolean;
}

/**
 * Интерфейс для компонента ProductCard с полной поддержкой анимаций
 * @interface ProductCardProps
 * @property {string} id - Уникальный идентификатор товара
 * @property {string} image - URL основного изображения товара
 * @property {string[]} [images] - Дополнительные изображения товара (для hover эффекта)
 * @property {string} title - Название товара
 * @property {string} [description] - Описание товара
 * @property {number} price - Цена товара
 * @property {number} [oldPrice] - Старая цена (для отображения скидки)
 * @property {string} [currency='₽'] - Валюта
 * @property {number} [rating=0] - Рейтинг товара от 0 до 5
 * @property {number} [reviewCount=0] - Количество отзывов
 * @property {ProductBadge[]} [badges] - Массив бейджей товара
 * @property {boolean} [isInWishlist=false] - В избранном ли товар
 * @property {boolean} [isInCart=false] - В корзине ли товар
 * @property {number} [availableQuantity=0] - Доступное количество
 * @property {function} [onAddToCart] - Callback при добавлении в корзину
 * @property {function} [onRemoveFromCart] - Callback при удалении из корзины
 * @property {function} [onAddToWishlist] - Callback при добавлении в избранное
 * @property {function} [onRemoveFromWishlist] - Callback при удалении из избранного
 * @property {function} [onQuickView] - Callback быстрого просмотра
 * @property {function} [onClick] - Callback клика по карточке
 * @property {boolean} [isLoading=false] - Состояние загрузки
 * @property {boolean} [showActions=true] - Показывать кнопки действий
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Размер карточки
 * @property {MotionProps} [motionProps] - Свойства анимации для основной карточки
 * @property {MotionProps} [imageMotionProps] - Свойства анимации для изображения
 * @property {MotionProps} [contentMotionProps] - Свойства анимации для контента
 * @property {MotionProps} [badgesMotionProps] - Свойства анимации для бейджей
 * @property {MotionProps} [actionsMotionProps] - Свойства анимации для кнопок действий
 * @property {MotionProps} [ratingMotionProps] - Свойства анимации для рейтинга
 * @property {MotionProps} [priceMotionProps] - Свойства анимации для цены
 * @property {MotionProps} [buttonMotionProps] - Свойства анимации для кнопки корзины
 * @property {AnimationConfig} [animationConfig] - Конфигурация параметров анимации
 */
export interface ProductCardProps {
  id: string;
  image: string;
  images?: string[];
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  badges?: ProductBadge[];
  isInWishlist?: boolean;
  isInCart?: boolean;
  availableQuantity?: number;
  onAddToCart?: (id: string) => void;
  onRemoveFromCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onRemoveFromWishlist?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onClick?: (id: string) => void;
  isLoading?: boolean;
  showActions?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  motionProps?: MotionProps;
  imageMotionProps?: MotionProps;
  contentMotionProps?: MotionProps;
  badgesMotionProps?: MotionProps;
  actionsMotionProps?: MotionProps;
  ratingMotionProps?: MotionProps;
  priceMotionProps?: MotionProps;
  buttonMotionProps?: MotionProps;
  animationConfig?: AnimationConfig;
}

/**
 * Компонент карточки товара для интернет-магазина с расширенной системой анимаций
 * @component
 * @param {ProductCardProps} props - Свойства компонента
 * @returns {JSX.Element} Карточка товара с полной кастомизацией анимаций
 * 
 * @example
 * <ProductCard
 *   id="1"
 *   image="/product.jpg"
 *   title="Название товара"
 *   price={2999}
 *   motionProps={{
 *     whileHover: { scale: 1.05, rotateY: 5 },
 *     whileTap: { scale: 0.95 }
 *   }}
 *   imageMotionProps={{
 *     whileHover: { scale: 1.1 },
 *     transition: { type: "spring", stiffness: 300 }
 *   }}
 *   animationConfig={{
 *     hoverScale: 1.05,
 *     floatDistance: 10
 *   }}
 * />
 */
export const ProductCard = ({
  id,
  image,
  images = [],
  title,
  description,
  price,
  oldPrice,
  currency = '₽',
  rating = 0,
  reviewCount = 0,
  badges = [],
  isInWishlist = false,
  isInCart = false,
  availableQuantity = 0,
  onAddToCart,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onQuickView,
  onClick,
  isLoading = false,
  showActions = true,
  className = '',
  size = 'md',
  motionProps = {},
  imageMotionProps = {},
  contentMotionProps = {},
  badgesMotionProps = {},
  actionsMotionProps = {},
  ratingMotionProps = {},
  priceMotionProps = {},
  buttonMotionProps = {},
  animationConfig = {}
}: ProductCardProps) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isImageDragging, setIsImageDragging] = useState(false);

  // Деструктуризация конфига анимаций с значениями по умолчанию
  const {
    imageTransition = 0.5,
    hoverScale = 1.02,
    tapScale = 0.98,
    floatDistance = 8,
    enableImageSwipe = true,
    enableQuickActions = true,
    enableHoverEffects = true
  } = animationConfig;

  // Оптимизация: мемоизация всех классов
  const cardClasses = useMemo(() => {
    const baseClasses = getThemeClasses(theme, 'product-card');
    const sizeClasses = {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4'
    };
    return `${baseClasses} ${sizeClasses[size]} ${className}`.trim();
  }, [theme, size, className]);

  const imageClasses = useMemo(() => 
    getThemeClasses(theme, 'product-card', 'image'), [theme]);

  const contentClasses = useMemo(() => 
    getThemeClasses(theme, 'product-card', 'content'), [theme]);

  // Оптимизация: мемоизация вычисляемых значений
  const discount = useMemo(() => {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }, [oldPrice, price]);

  const isOutOfStock = useMemo(() => 
    availableQuantity <= 0, [availableQuantity]);

  const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('ru-RU').format(price), [price]);

  const formattedOldPrice = useMemo(() => 
    oldPrice ? new Intl.NumberFormat('ru-RU').format(oldPrice) : null, [oldPrice]);

  // Оптимизация: useCallback для обработчиков
  const handleCardClick = useCallback(() => {
    if (onClick && !isLoading && !isImageDragging) {
      onClick(id);
    }
  }, [onClick, id, isLoading, isImageDragging]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart && !isLoading && !isOutOfStock) {
      onAddToCart(id);
    }
  }, [onAddToCart, id, isLoading, isOutOfStock]);

  const handleRemoveFromCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFromCart && !isLoading) {
      onRemoveFromCart(id);
    }
  }, [onRemoveFromCart, id, isLoading]);

  const handleWishlistToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlistLoading) return;

    setIsWishlistLoading(true);
    try {
      if (isInWishlist && onRemoveFromWishlist) {
        await onRemoveFromWishlist(id);
      } else if (!isInWishlist && onAddToWishlist) {
        await onAddToWishlist(id);
      }
    } finally {
      setIsWishlistLoading(false);
    }
  }, [isInWishlist, onAddToWishlist, onRemoveFromWishlist, id, isWishlistLoading]);

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView && !isLoading) {
      onQuickView(id);
    }
  }, [onQuickView, id, isLoading]);

  // Обработчики свайпа для изображений
  const handleDragStart = useCallback(() => {
    if (enableImageSwipe) {
      setIsImageDragging(true);
    }
  }, [enableImageSwipe]);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!enableImageSwipe) return;

    setIsImageDragging(false);
    const swipeThreshold = 50;
    
    if (info.offset.x < -swipeThreshold) {
      // Свайп влево - следующее изображение
      setCurrentImageIndex(prev => (prev + 1) % allImages.length);
    } else if (info.offset.x > swipeThreshold) {
      // Свайп вправо - предыдущее изображение
      setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
    }
  }, [enableImageSwipe]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  }, []);

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  }, []);

  // Оптимизация: мемоизация motion props с объединением дефолтных и пользовательских
  const defaultCardMotionProps: MotionProps = useMemo(() => ({
    whileHover: enableHoverEffects ? { y: -floatDistance, scale: hoverScale } : {},
    whileTap: { scale: tapScale },
    transition: { type: "spring", stiffness: 400, damping: 25 },
    ...motionProps
  }), [enableHoverEffects, floatDistance, hoverScale, tapScale, motionProps]);

  const defaultImageMotionProps: MotionProps = useMemo(() => ({
    whileHover: { scale: 1.05 },
    transition: { duration: imageTransition, ease: "easeInOut" },
    drag: enableImageSwipe ? "x" : false,
    dragConstraints: { left: 0, right: 0 },
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    ...imageMotionProps
  }), [enableImageSwipe, imageTransition, handleDragStart, handleDragEnd, imageMotionProps]);

  const defaultActionsMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
    transition: { duration: 0.2, type: "spring" },
    ...actionsMotionProps
  }), [actionsMotionProps]);

  const defaultBadgesMotionProps: MotionProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, delay: 0.1 },
    ...badgesMotionProps
  }), [badgesMotionProps]);

  // Оптимизация: мемоизация рендера бейджей
  const renderedBadges = useMemo(() => {
    if (!badges.length) return null;

    const badgeTypeMap = {
      sale: 'error',
      new: 'success',
      hot: 'warning',
      'out-of-stock': 'secondary',
      limited: 'primary'
    } as const;

    return (
      <motion.div 
        className="absolute top-2 left-2 z-10 flex flex-wrap gap-1"
        {...defaultBadgesMotionProps}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={`${badge.type}-${index}`}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Badge
              type={badgeTypeMap[badge.type]}
              className="text-xs font-semibold"
            >
              {badge.text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    );
  }, [badges, defaultBadgesMotionProps]);

  // Оптимизация: мемоизация рендера рейтинга
  const renderedRating = useMemo(() => {
    if (rating === 0 && reviewCount === 0) return null;

    const defaultRatingMotion: MotionProps = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: 0.2 },
      ...ratingMotionProps
    };

    return (
      <motion.div 
        className="flex items-center gap-1 mt-1"
        {...defaultRatingMotion}
      >
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Star
                size={14}
                className={`${
                  star <= rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </motion.div>
          ))}
        </div>
        {reviewCount > 0 && (
          <motion.span 
            className="text-xs text-gray-500 dark:text-gray-400 ml-1"
            whileHover={{ scale: 1.05 }}
          >
            ({reviewCount})
          </motion.span>
        )}
      </motion.div>
    );
  }, [rating, reviewCount, ratingMotionProps]);

  // Оптимизация: мемоизация рендера цены
  const renderedPrice = useMemo(() => {
    const priceClasses = "font-bold";
    const oldPriceClasses = "text-sm text-gray-500 dark:text-gray-400 line-through ml-2";

    const defaultPriceMotion: MotionProps = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: 0.3 },
      ...priceMotionProps
    };

    return (
      <motion.div 
        className="flex items-center flex-wrap gap-1 mt-2"
        {...defaultPriceMotion}
      >
        <motion.span 
          className={`${priceClasses} text-lg`}
          whileHover={{ scale: 1.05 }}
        >
          {formattedPrice} {currency}
        </motion.span>
        {formattedOldPrice && (
          <>
            <motion.span 
              className={oldPriceClasses}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formattedOldPrice} {currency}
            </motion.span>
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <Badge type="error" className="text-xs ml-2">
                  -{discount}%
                </Badge>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    );
  }, [formattedPrice, currency, formattedOldPrice, discount, priceMotionProps]);

  // Оптимизация: мемоизация рендера кнопок действий
  const renderedActions = useMemo(() => {
    if (!showActions || !enableQuickActions || isOutOfStock) return null;

    return (
      <AnimatePresence>
        {(isHovered || isImageDragging) && (
          <motion.div
            className="absolute bottom-3 right-3 flex flex-col gap-2 z-20"
            {...defaultActionsMotionProps}
          >
            <Button
              btnType="glass"
              size="sm"
              icon={<Heart 
                size={16} 
                className={isInWishlist ? "fill-current text-red-500" : ""}
              />}
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              motionProps={{
                whileHover: { scale: 1.1, rotate: 5 },
                whileTap: { scale: 0.9 },
                transition: { type: "spring", stiffness: 400 }
              }}
              className="w-8 h-8 !p-0 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />

            <Button
              btnType="glass"
              size="sm"
              icon={<Eye size={16} />}
              onClick={handleQuickView}
              motionProps={{
                whileHover: { scale: 1.1, rotate: -5 },
                whileTap: { scale: 0.9 },
                transition: { type: "spring", stiffness: 400 }
              }}
              className="w-8 h-8 !p-0 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }, [showActions, enableQuickActions, isOutOfStock, isHovered, isImageDragging, defaultActionsMotionProps, isInWishlist, isWishlistLoading, handleWishlistToggle, handleQuickView]);

  // Оптимизация: мемоизация рендера кнопки корзины
  const renderedCartButton = useMemo(() => {
    if (!showActions) return null;

    const defaultButtonMotion: MotionProps = {
      whileHover: { y: -2, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400 },
      ...buttonMotionProps
    };

    if (isOutOfStock) {
      return (
        <motion.div {...defaultButtonMotion}>
          <Button
            btnType="secondary"
            disabled
            fullWidth
            className="mt-3"
          >
            Нет в наличии
          </Button>
        </motion.div>
      );
    }

    return (
      <motion.div {...defaultButtonMotion}>
        <Button
          btnType={isInCart ? "success" : "primary"}
          icon={<ShoppingCart size={16} />}
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          disabled={isLoading}
          fullWidth
          className="mt-3"
          motionProps={{
            whileHover: { y: -2 },
            whileTap: { scale: 0.98 }
          }}
        >
          {isInCart ? 'В корзине' : 'В корзину'}
        </Button>
      </motion.div>
    );
  }, [showActions, isOutOfStock, isInCart, isLoading, handleAddToCart, handleRemoveFromCart, buttonMotionProps]);

  // Оптимизация: управление hover эффектом для изображений
  const allImages = useMemo(() => [image, ...images], [image, images]);
  
  const currentImage = useMemo(() => 
    allImages[currentImageIndex], [allImages, currentImageIndex]);

  const handleImageHover = useCallback(() => {
    if (allImages.length > 1 && enableHoverEffects) {
      setIsHovered(true);
    }
  }, [allImages.length, enableHoverEffects]);

  const handleImageLeave = useCallback(() => {
    if (enableHoverEffects) {
      setIsHovered(false);
    }
  }, [enableHoverEffects]);

  const showImageNavigation = useMemo(() => 
    allImages.length > 1 && isHovered, [allImages.length, isHovered]);

  if (isLoading) {
    return (
      <motion.div 
        className={`${cardClasses} animate-pulse`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`${imageClasses} aspect-square rounded-lg bg-gray-300 dark:bg-gray-600`} />
        <div className={contentClasses}>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cardClasses}
      onClick={handleCardClick}
      onMouseEnter={handleImageHover}
      onMouseLeave={handleImageLeave}
      {...defaultCardMotionProps}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* Изображение товара */}
      <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
        <motion.img
          src={currentImage}
          alt={title}
          className={`${imageClasses} w-full h-full object-cover cursor-grab active:cursor-grabbing`}
          {...defaultImageMotionProps}
        />
        
        {/* Бейджи */}
        {renderedBadges}

        {/* Навигация по изображениям */}
        <AnimatePresence>
          {showImageNavigation && (
            <>
              <motion.button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center z-10"
                onClick={handlePrevImage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center z-10"
                onClick={handleNextImage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Индикатор изображений */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {allImages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            ))}
          </div>
        )}

        {/* Кнопки действий */}
        {renderedActions}

        {/* Наложение для out of stock */}
        {isOutOfStock && (
          <motion.div 
            className="absolute inset-0 bg-gray-900/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="text-white font-semibold bg-black/70 px-3 py-1 rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              Нет в наличии
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Контент */}
      <motion.div 
        className={contentClasses}
        {...contentMotionProps}
      >
        {/* Заголовок */}
        <motion.h3 
          className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2"
          whileHover={{ color: "#3b82f6" }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        {/* Описание */}
        {description && (
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}

        {/* Рейтинг */}
        {renderedRating}

        {/* Цена */}
        {renderedPrice}

        {/* Кнопка корзины */}
        {renderedCartButton}
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;