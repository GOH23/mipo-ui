'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'glass' | 'classic';
export type Mode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'glass',
  mode: 'system',
  setTheme: () => {},
  setMode: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({
  children,
  defaultTheme = 'glass',
  defaultMode = 'system',
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultMode?: Mode;
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [isDarkMode, setIsDarkMode] = useState(false); // Начальное значение false для SSR

  // Инициализация ТОЛЬКО на клиенте
  useEffect(() => {
    const storedTheme = localStorage.getItem('mipo-ui-theme') as Theme | null;
    const storedMode = localStorage.getItem('mipo-ui-mode') as Mode | null;
    
    if (storedTheme) setTheme(storedTheme);
    if (storedMode) setMode(storedMode);
  }, []);

  // Обработка режима
  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('mipo-ui-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('mipo-ui-mode', mode);
    
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkMode(mode === 'dark');
    }
  }, [mode]);

  // Безопасное обновление DOM
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};