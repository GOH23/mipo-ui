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
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Инициализация из localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('mipo-ui-theme') as Theme | null;
    const storedMode = localStorage.getItem('mipo-ui-mode') as Mode | null;
    
    if (storedTheme) setThemeState(storedTheme);
    if (storedMode) setModeState(storedMode);
  }, []);

  // Обновление темы
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('mipo-ui-theme', newTheme);
  };

  // Обновление режима
  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem('mipo-ui-mode', newMode);
  };

  // Обработка системного режима
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

  // Применение dark класса
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
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