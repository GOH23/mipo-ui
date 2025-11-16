// components/Demo/InputDemo.tsx
"use client"
import { SetStateAction, useState } from 'react';
import { Card, Input, Textarea, Button, useMessage,Code } from 'mipo-ui';


export const InputDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const { success } = useMessage();

  const inputPropsCode = `interface InputProps {
  type?: string                    // Тип инпута
  placeholder?: string            // Плейсхолдер
  value?: string                  // Значение
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean                 // Состояние ошибки
  disabled?: boolean              // Отключенное состояние
  className?: string              // Дополнительные классы
  motionProps?: MotionProps       // Параметры анимации
}`;

  const textareaPropsCode = `interface TextareaProps {
  placeholder?: string            // Плейсхолдер
  value?: string                  // Значение
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: boolean                 // Состояние ошибки
  disabled?: boolean              // Отключенное состояние
  className?: string              // Дополнительные классы
  motionProps?: MotionProps       // Параметры анимации
}`;

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Input & Textarea</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Поля ввода с валидацией и анимациями</p>

        {/* Базовые поля ввода */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Обычное поле</label>
            <Input
              placeholder="Введите текст..."
              value={inputValue}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setInputValue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Поле с ошибкой</label>
            <Input
              placeholder="Ошибочное поле..."
              error={true}
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Текстовое поле</label>
          <Textarea
            placeholder="Введите многострочный текст..."
            value={textareaValue}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTextareaValue(e.target.value)}
            rows={4}
          />
        </div>

        {/* Disabled состояния */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Отключенное поле</label>
            <Input
              placeholder="Неактивное поле..."
              disabled={true}
              value="Нельзя изменить"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Отключенный Textarea</label>
            <Textarea
              placeholder="Неактивное поле..."
              disabled={true}
              value="Заблокировано для редактирования"
              rows={2}
            />
          </div>
        </div>

        {/* Пример формы */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Пример формы</h3>
          <div className="space-y-4 max-w-md">
            <Input placeholder="Ваше имя" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Сообщение" rows={3} />
            <Button 
              btnType="primary" 
              onClick={() => success('Форма отправлена!')}
            >
              Отправить
            </Button>
          </div>
        </div>

        {/* Документация */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Code
            variant="block"
            language="typescript"
            showLineNumbers
            showHeader
            filename="InputProps.ts"
          >
            {inputPropsCode}
          </Code>

          <Code
            variant="block"
            language="typescript"
            showLineNumbers
            showHeader
            filename="TextareaProps.ts"
          >
            {textareaPropsCode}
          </Code>
        </div>
      </div>
    </Card>
  );
};