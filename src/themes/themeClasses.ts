import { Theme } from './ThemeContext';

type ThemeClasses = Record<string, string | Record<string, string>>;

export const getThemeClasses = (theme: Theme, component: string, state: string = ''): string => {
  const baseClasses: Record<string, ThemeClasses> = {
    // Button component
    'button': {
      base: 'theme-button relative overflow-hidden rounded-lg font-medium transition-all duration-300',
      glass: {
        primary: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-300/50 text-blue-200 dark:text-blue-100',
        secondary: 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-300/50 text-gray-200 dark:text-gray-100',
        success: 'bg-green-500/20 hover:bg-green-500/30 border-green-300/50 text-green-200 dark:text-green-100',
        warning: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-300/50 text-yellow-200 dark:text-yellow-100',
        error: 'bg-red-500/20 hover:bg-red-500/30 border-red-300/50 text-red-200 dark:text-red-100',
        glass: 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
      },
      classic: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
        success: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600',
        error: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
        glass: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
      }
    },
    "typography": {
      primary: theme === 'glass'
        ? 'text-gray-700 dark:text-gray-300'
        : 'text-gray-900 dark:text-gray-200',
      secondary: theme === 'glass'
        ? 'text-gray-600 dark:text-gray-400'
        : 'text-gray-700 dark:text-gray-400',
      muted: theme === 'glass'
        ? 'text-gray-500 dark:text-gray-500'
        : 'text-gray-600 dark:text-gray-600',
    },
    // Collapse Panel
    'collapse-panel': {
      base: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
      header: {
        base: 'theme-panel-header flex items-center justify-between p-4 cursor-pointer',
        glass: 'bg-white/50 dark:bg-gray-900/50 hover:bg-white/60 dark:hover:bg-gray-900/60',
        classic: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
      },
      content: {
        base: 'theme-panel-content overflow-hidden',
        glass: 'bg-white/40 dark:bg-gray-900/40',
        classic: 'bg-gray-50 dark:bg-gray-900'
      },
      active: {
        glass: 'bg-blue-500/10 dark:bg-blue-500/20 border-l-4 border-blue-500 dark:border-blue-400',
        classic: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400'
      }
    },

    // Message component
    'message': {
      base: {
        glass: 'rounded-xl border p-3 sm:p-4 mb-2 transform transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-glass',
        classic: 'rounded-xl border p-3 sm:p-4 mb-2 transform transition-all duration-300 bg-white dark:bg-gray-800 shadow-classic'
      },
      info: {
        glass: 'border-blue-400/30 text-blue-200',
        classic: 'border-blue-200 text-blue-800'
      },
      success: {
        glass: 'border-green-400/30 text-green-200',
        classic: 'border-green-200 text-green-800'
      },
      warning: {
        glass: 'border-yellow-400/30 text-yellow-200',
        classic: 'border-yellow-200 text-yellow-800'
      },
      error: {
        glass: 'border-red-400/30 text-red-200',
        classic: 'border-red-200 text-red-800'
      }
    }
  };

  const componentConfig = baseClasses[component];
  if (!componentConfig) return '';

  if (component === 'button' && state) {
    const btnConfig = componentConfig as Record<string, Record<string, string>>;
    return `${btnConfig.base} ${theme === 'glass' ? btnConfig.glass[state] : btnConfig.classic[state]}`;
  }

  if (component === 'collapse-panel') {
    if (state.startsWith('header')) {
      const headerConfig = (componentConfig as any).header;
      return `${headerConfig.base} ${theme === 'glass' ? headerConfig.glass : headerConfig.classic}`;
    }
    if (state.startsWith('content')) {
      const contentConfig = (componentConfig as any).content;
      return `${contentConfig.base} ${theme === 'glass' ? contentConfig.glass : contentConfig.classic}`;
    }
    if (state === 'active') {
      const activeConfig = (componentConfig as any).active;
      return theme === 'glass' ? activeConfig.glass : activeConfig.classic;
    }
  }

  if (component === 'message') {
    if (state) {
      const msgConfig = componentConfig as Record<string, Record<string, string>>;
      const base = msgConfig.base[theme];
      const typeClass = msgConfig[state][theme];
      return `${base} ${typeClass}`;
    }
    return (componentConfig as Record<string, string>).base;
  }

  return `${(componentConfig as Record<string, string>).base} ${theme === 'glass' ? (componentConfig as Record<string, string>).glass : (componentConfig as Record<string, string>).classic}`;
};