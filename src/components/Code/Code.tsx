// components/Code/Code.tsx
"use client"
import { HTMLAttributes, ReactNode, useState, useEffect, CSSProperties, useMemo, useCallback } from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';
import { highlightCode, detectLanguage, LANGUAGES } from './codeHighlighter';
import '../../styles/syntax.css';

/**
 * Интерфейс для компонента Code
 * @interface CodeProps
 * @extends HTMLAttributes<HTMLElement>
 * @property {ReactNode} children - Код для отображения
 * @property {'inline' | 'block'} [variant='inline'] - Вариант отображения кода
 * @property {boolean} [highlighted=false] - Включить подсветку синтаксиса
 * @property {string} [language] - Язык программирования для подсветки
 * @property {boolean} [showLineNumbers=false] - Показать номера строк
 * @property {boolean} [showCopyButton=true] - Показать кнопку копирования
 * @property {boolean} [showHeader=false] - Показать заголовок с информацией о языке
 * @property {string | number} [maxHeight] - Максимальная высота блока кода
 * @property {boolean} [wrapLines=false] - Переносить длинные строки
 * @property {string} [filename] - Имя файла для отображения в заголовке
 * @property {boolean} [enableHighlight=true] - Включить подсветку синтаксиса
 * @property {'glass' | 'classic'} [theme] - Тема компонента (переопределяет контекстную)
 * @property {ReactNode} [preview] - Компонент предпросмотра для вкладки Preview
 * @property {string} [previewTitle='Preview'] - Заголовок вкладки предпросмотра
 */
export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'inline' | 'block';
  highlighted?: boolean;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showHeader?: boolean;
  maxHeight?: string | number;
  wrapLines?: boolean;
  filename?: string;
  enableHighlight?: boolean;
  theme?: 'glass' | 'classic';
  preview?: ReactNode;
  previewTitle?: string;
}

/**
 * Компонент Code для отображения фрагментов кода с подсветкой синтаксиса
 * @component
 * @param {CodeProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент отображения кода
 * 
 * @example
 * <Code 
 *   language="javascript" 
 *   variant="block"
 *   showLineNumbers={true}
 *   showCopyButton={true}
 * >
 *   {`function hello() { return "world"; }`}
 * </Code>
 */
const Code = ({
  children,
  variant = 'inline',
  highlighted = false,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  showHeader = false,
  maxHeight,
  wrapLines = false,
  filename,
  enableHighlight = true,
  theme: propTheme,
  preview,
  previewTitle = 'Preview',
  className = '',
  ...props
}: CodeProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  
  const detectedLanguage = language ? detectLanguage(language) : 'text';
  const languageName = LANGUAGES[detectedLanguage]?.name || detectedLanguage;
  
  // Оптимизация: мемоизация функции экранирования HTML
  const escapeHtml = useCallback((unsafe: string): string => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }, []);

  // Подсветка кода
  useEffect(() => {
    const processCode = () => {
      try {
        const codeString = typeof children === 'string' ? children : String(children);
        
        if (enableHighlight && variant === 'block' && language) {
          const highlighted = highlightCode(codeString, language);
          setHighlightedCode(highlighted);
        } else {
          setHighlightedCode(escapeHtml(codeString));
        }
      } catch (error) {
        console.error('Error processing code:', error);
        const codeString = typeof children === 'string' ? children : String(children);
        setHighlightedCode(escapeHtml(codeString));
      }
    };

    processCode();
  }, [children, language, enableHighlight, variant, escapeHtml]);

  // Оптимизация: мемоизация функции копирования
  const copyToClipboard = useCallback(async () => {
    try {
      const textToCopy = typeof children === 'string' 
        ? children 
        : String(children);
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [children]);

  // Оптимизация: мемоизация классов
  const baseClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'code', variant), [effectiveTheme, variant]);
  
  const highlightedClass = useMemo(() => 
    highlighted ? getThemeClasses(effectiveTheme, 'code', 'highlighted') : '', [highlighted, effectiveTheme]);
  
  const headerClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'code', 'header'), [effectiveTheme]);
  
  const copyButtonClasses = useMemo(() => 
    getThemeClasses(effectiveTheme, 'code', 'copyButton'), [effectiveTheme]);

  const combinedClasses = useMemo(() => 
    `${baseClasses} ${highlightedClass} ${className}`.trim(), [baseClasses, highlightedClass, className]);

  // Оптимизация: мемоизация стилей контейнера
  const containerStyle: CSSProperties = useMemo(() => 
    maxHeight ? { 
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      overflowY: 'auto'
    } : {}, [maxHeight]);

  // Для inline варианта
  if (variant === 'inline') {
    const content = enableHighlight && language ? 
      { __html: highlightedCode } : 
      undefined;

    return (
      <code 
        className={combinedClasses} 
        {...props}
        {...(content ? { dangerouslySetInnerHTML: content } : { children })}
      />
    );
  }

  // Оптимизация: мемоизация рендер-функций
  const renderCodeContent = useCallback(() => {
    const codeContent = { __html: highlightedCode };
    const originalCode = typeof children === 'string' ? children : String(children);
    const lineCount = originalCode.split('\n').length;

    return (
      <pre 
        className={combinedClasses} 
        style={Object.keys(containerStyle).length > 0 ? containerStyle : undefined}
        {...props}
      >
        {showLineNumbers ? (
          <div className={`flex ${wrapLines ? 'flex-col' : ''}`}>
            <div className={`pr-4 text-right text-gray-500 dark:text-gray-500 select-none border-r border-gray-300/50 dark:border-gray-600/50 mr-4 ${wrapLines ? 'pb-2' : ''}`}>
              {Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
            </div>
            <code 
              className={`flex-1 ${wrapLines ? 'whitespace-pre-wrap break-words' : ''}`}
              dangerouslySetInnerHTML={codeContent}
            />
          </div>
        ) : (
          <code 
            className={wrapLines ? 'whitespace-pre-wrap break-words' : ''}
            dangerouslySetInnerHTML={codeContent}
          />
        )}
      </pre>
    );
  }, [combinedClasses, containerStyle, props, highlightedCode, children, showLineNumbers, wrapLines]);

  const renderPreview = useCallback(() => {
    if (!preview) return null;
    
    return (
      <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-lg">
        <div className="flex items-center justify-center min-h-[100px]">
          {preview}
        </div>
      </div>
    );
  }, [preview]);

  const renderTabs = useCallback(() => {
    if (!preview) return null;

    return (
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'code'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'preview'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          {previewTitle}
        </button>
      </div>
    );
  }, [preview, activeTab, previewTitle]);

  return (
    <div className="relative rounded-lg overflow-hidden group mb-4">
      {(showHeader || language || filename) && (
        <div className={`${headerClasses} flex items-center justify-between px-4 py-2`}>
          <div className="flex items-center gap-3">
            {filename && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filename}
              </span>
            )}
            {language && (
              <span className="text-xs px-2 py-1 rounded bg-gray-400/20 text-gray-600 dark:text-gray-400">
                {languageName}
              </span>
            )}
          </div>
          
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className={`${copyButtonClasses} flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200`}
              title="Copy code"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      {renderTabs()}
      
      {(!preview || activeTab === 'code') && renderCodeContent()}
      {preview && activeTab === 'preview' && renderPreview()}
      
      {!showHeader && showCopyButton && !preview && (
        <button
          onClick={copyToClipboard}
          className={`${copyButtonClasses} absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 backdrop-blur-sm`}
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Code;