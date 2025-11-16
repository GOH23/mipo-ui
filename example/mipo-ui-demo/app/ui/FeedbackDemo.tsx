// components/Demo/FeedbackDemo.tsx
"use client"
import { Card, Spinner, Progress, Skeleton, Button, useMessage,Code } from 'mipo-ui';
import { useState } from 'react';

export const FeedbackDemo = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useMessage();

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          success('Загрузка завершена!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      success('Действие завершено!');
    }, 2000);
  };

  const spinnerPropsCode = `interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'        // Размер спиннера
  type?: 'primary' | 'secondary' | 'white'  // Тип спиннера
  className?: string                // Дополнительные классы
  motionProps?: MotionProps         // Параметры анимации
}`;

  const progressPropsCode = `interface ProgressProps {
  value: number                     // Текущее значение (0-100)
  max?: number                      // Максимальное значение (по умолчанию 100)
  type?: 'primary' | 'success' | 'warning' | 'error'  // Тип прогресса
  className?: string                // Дополнительные классы
}`;

  const skeletonPropsCode = `interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect'  // Вариант скелетона
  width?: string                        // Ширина
  height?: string                       // Высота
  className?: string                    // Дополнительные классы
}`;

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Feedback Components</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Компоненты обратной связи: загрузки, прогресс-бары и скелетоны</p>

        {/* Spinners */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Spinner (Индикатор загрузки)</h3>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <Spinner size="sm" type="primary" />
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="md" type="primary" />
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Medium</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" type="primary" />
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Large</p>
            </div>
            <div className="text-center">
              <Spinner type="secondary" />
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Secondary</p>
            </div>
          </div>

          <Button 
            btnType="primary" 
            loading={isLoading}
            onClick={simulateLoading}
          >
            {isLoading ? 'Загрузка...' : 'Начать загрузку'}
          </Button>
        </div>

        {/* Progress Bars */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Progress (Прогресс-бар)</h3>
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Primary Progress</span>
                <span className="text-gray-600 dark:text-gray-400">{progress}%</span>
              </div>
              <Progress value={progress} type="primary" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Success Progress</span>
                <span className="text-gray-600 dark:text-gray-400">75%</span>
              </div>
              <Progress value={75} type="success" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Warning Progress</span>
                <span className="text-gray-600 dark:text-gray-400">50%</span>
              </div>
              <Progress value={50} type="warning" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Error Progress</span>
                <span className="text-gray-600 dark:text-gray-400">25%</span>
              </div>
              <Progress value={25} type="error" />
            </div>
          </div>

          <Button btnType="secondary" onClick={startProgress}>
            Запустить прогресс
          </Button>
        </div>

        {/* Skeletons */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Skeleton (Заглушки загрузки)</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton variant="circle" width="40px" height="40px" />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="70%" height="16px" />
                <Skeleton variant="text" width="50%" height="14px" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <Skeleton variant="rect" height="80px" />
              <Skeleton variant="rect" height="80px" />
              <Skeleton variant="rect" height="80px" />
            </div>
            
            <div className="space-y-2">
              <Skeleton variant="text" height="20px" />
              <Skeleton variant="text" height="20px" />
              <Skeleton variant="text" width="60%" height="20px" />
            </div>
          </div>
        </div>

        {/* Документация */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Code
            variant="block"
            language="typescript"
            showLineNumbers
            showHeader
            filename="SpinnerProps.ts"
          >
            {spinnerPropsCode}
          </Code>

          <Code
            variant="block"
            language="typescript"
            showLineNumbers
            showHeader
            filename="ProgressProps.ts"
          >
            {progressPropsCode}
          </Code>

          <Code
            variant="block"
            language="typescript"
            showLineNumbers
            showHeader
            filename="SkeletonProps.ts"
          >
            {skeletonPropsCode}
          </Code>
        </div>
      </div>
    </Card>
  );
};