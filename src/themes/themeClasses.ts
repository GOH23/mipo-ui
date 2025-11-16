
import { Theme } from './ThemeContext';

type ThemeClasses = Record<string, any>;

export const getThemeClasses = (theme: Theme, component: string, state: string = ''): string => {
  const baseClasses: Record<string, ThemeClasses> = {
    // Button component
    'button': {
      base: 'theme-button relative overflow-hidden rounded-lg font-medium transition-all duration-300',
      glass: {
        primary: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-300/50 text-gray-900 dark:text-blue-100',
        secondary: 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-300/50 text-gray-900 dark:text-gray-100',
        success: 'bg-green-500/20 hover:bg-green-500/30 border-green-300/50 text-gray-900 dark:text-green-100',
        warning: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-300/50 text-gray-900 dark:text-yellow-100',
        error: 'bg-red-500/20 hover:bg-red-500/30 border-red-300/50 text-gray-900 dark:text-red-100',
        glass: 'bg-white/10 hover:bg-white/20 border-white/20 text-gray-900 dark:text-white'
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

    // Typography
    "typography": {
      base: theme === 'glass'
        ? 'text-gray-900 dark:text-gray-100'
        : 'text-gray-900 dark:text-gray-200',
      primary: theme === 'glass'
        ? 'text-gray-900 dark:text-gray-100'
        : 'text-gray-900 dark:text-gray-200',
      secondary: theme === 'glass'
        ? 'text-gray-700 dark:text-gray-300'
        : 'text-gray-700 dark:text-gray-400',
      muted: theme === 'glass'
        ? 'text-gray-600 dark:text-gray-400'
        : 'text-gray-600 dark:text-gray-600',
    },

    // Collapse Panel
    'collapse-panel': {
      base: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
      header: {
        base: 'theme-panel-header flex items-center justify-between p-4 cursor-pointer',
        glass: 'bg-white/50 dark:bg-gray-900/50 hover:bg-white/60 dark:hover:bg-gray-900/60 text-gray-900 dark:text-gray-100',
        classic: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-900 dark:text-gray-100'
      },
      content: {
        base: 'theme-panel-content overflow-hidden',
        glass: 'bg-white/40 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200',
        classic: 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
      },
      active: {
        glass: 'bg-blue-500/10 dark:bg-blue-500/20 border-l-4 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100',
        classic: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100'
      }
    },

    // Message component
    'message': {
      base: {
        glass: 'rounded-xl border p-3 sm:p-4 mb-2 transform transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-glass text-gray-900 dark:text-gray-100',
        classic: 'rounded-xl border p-3 sm:p-4 mb-2 transform transition-all duration-300 bg-white dark:bg-gray-800 shadow-classic text-gray-900 dark:text-gray-100'
      },
      info: {
        glass: 'border-blue-400/30 text-blue-900 dark:text-blue-200',
        classic: 'border-blue-200 text-blue-800 dark:text-blue-200'
      },
      success: {
        glass: 'border-green-400/30 text-green-900 dark:text-green-200',
        classic: 'border-green-200 text-green-800 dark:text-green-200'
      },
      warning: {
        glass: 'border-yellow-400/30 text-yellow-900 dark:text-yellow-200',
        classic: 'border-yellow-200 text-yellow-800 dark:text-yellow-200'
      },
      error: {
        glass: 'border-red-400/30 text-red-900 dark:text-red-200',
        classic: 'border-red-200 text-red-800 dark:text-red-200'
      }
    },
    // Floating Elements component
    'floating-elements': {
      base: 'absolute inset-0 overflow-hidden pointer-events-none z-0',
      glass: {
        container: 'bg-transparent backdrop-blur-sm',
        item: 'bg-white/20 border-white/30 text-gray-900 dark:text-white shadow-glass backdrop-blur-sm'
      },
      classic: {
        container: 'bg-transparent',
        item: 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 shadow-classic'
      }
    },
    // Добавьте в baseClasses объект:

    'product-card': {
      base: 'rounded-xl border transition-all duration-300 overflow-hidden',
      glass: {
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/40 shadow-glass hover:shadow-glass-lg',
        image: 'bg-gray-200 dark:bg-gray-700',
        content: 'p-4 bg-white/60 dark:bg-gray-800/60',
        hover: 'hover:scale-105'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic hover:shadow-classic-lg',
        image: 'bg-gray-100 dark:bg-gray-700',
        content: 'p-4 bg-white dark:bg-gray-800',
        hover: 'hover:shadow-xl'
      }
    },



    'rating': {
      base: 'flex items-center',
      glass: {
        star: {
          active: 'text-yellow-500',
          inactive: 'text-gray-300 dark:text-gray-600'
        },
        text: 'text-gray-600 dark:text-gray-400'
      },
      classic: {
        star: {
          active: 'text-yellow-500',
          inactive: 'text-gray-300 dark:text-gray-600'
        },
        text: 'text-gray-600 dark:text-gray-400'
      }
    },
    'product-grid': {
      base: 'w-full',
      glass: {
        base: 'bg-transparent',
        item: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/40 shadow-glass hover:shadow-glass-lg'
      },
      classic: {
        base: 'bg-transparent',
        item: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic hover:shadow-classic-lg'
      }
    },
    'price': {
      base: '',
      glass: {
        current: 'text-gray-900 dark:text-gray-100',
        old: 'text-gray-500 dark:text-gray-400',
        discount: 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300/50'
      },
      classic: {
        current: 'text-gray-900 dark:text-gray-100',
        old: 'text-gray-500 dark:text-gray-500',
        discount: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
      }
    },
    // Code component
    'code': {
      base: {
        glass: 'font-mono text-sm rounded-lg border backdrop-blur-sm transition-all duration-300',
        classic: 'font-mono text-sm rounded-lg border bg-gray-50 transition-all duration-300'
      },
      inline: {
        glass: 'px-2 py-1 bg-blue-500/10 border-blue-400/30 text-blue-900 dark:text-blue-200',
        classic: 'px-2 py-1 bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200'
      },
      block: {
        glass: 'p-4 bg-gray-800/5 dark:bg-gray-200/5 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-200 overflow-x-auto',
        classic: 'p-4 bg-gray-100 border-gray-300 dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-200 overflow-x-auto'
      },
      highlighted: {
        glass: 'border-l-4 border-yellow-500 bg-yellow-500/5 text-gray-900 dark:text-gray-200',
        classic: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-gray-900 dark:text-gray-200'
      },
      header: {
        glass: 'bg-gray-500/10 dark:bg-gray-500/20 border-b border-gray-400/30 dark:border-gray-600/30 text-gray-900 dark:text-gray-200',
        classic: 'bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200'
      },
      copyButton: {
        glass: 'hover:bg-white/20 dark:hover:bg-gray-600/30 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
        classic: 'hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      },
      syntax: {
        keyword: {
          glass: 'text-purple-800 dark:text-purple-400 font-semibold',
          classic: 'text-purple-700 dark:text-purple-400 font-semibold'
        },
        type: {
          glass: 'text-teal-800 dark:text-teal-400',
          classic: 'text-teal-700 dark:text-teal-400'
        },
        string: {
          glass: 'text-green-800 dark:text-green-400',
          classic: 'text-green-700 dark:text-green-400'
        },
        number: {
          glass: 'text-blue-800 dark:text-blue-400',
          classic: 'text-blue-700 dark:text-blue-400'
        },
        boolean: {
          glass: 'text-red-800 dark:text-red-400',
          classic: 'text-red-700 dark:text-red-400'
        },
        null: {
          glass: 'text-red-800 dark:text-red-400',
          classic: 'text-red-700 dark:text-red-400'
        },
        comment: {
          glass: 'text-gray-700 dark:text-gray-500 italic',
          classic: 'text-gray-600 dark:text-gray-600 italic'
        },
        operator: {
          glass: 'text-pink-800 dark:text-pink-400',
          classic: 'text-pink-700 dark:text-pink-400'
        },
        symbol: {
          glass: 'text-gray-900 dark:text-gray-300',
          classic: 'text-gray-800 dark:text-gray-400'
        },
        identifier: {
          glass: 'text-gray-900 dark:text-gray-200',
          classic: 'text-gray-900 dark:text-gray-200'
        },
        text: {
          glass: 'text-gray-900 dark:text-gray-200',
          classic: 'text-gray-900 dark:text-gray-200'
        }
      }
    },

    // Card component


    // Alert component
    'alert': {
      base: 'rounded-lg p-4 border-l-4',
      glass: {
        info: 'bg-blue-500/10 border-blue-500 text-gray-900 dark:text-blue-100',
        success: 'bg-green-500/10 border-green-500 text-gray-900 dark:text-green-100',
        warning: 'bg-yellow-500/10 border-yellow-500 text-gray-900 dark:text-yellow-100',
        error: 'bg-red-500/10 border-red-500 text-gray-900 dark:text-red-100'
      },
      classic: {
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200',
        success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200',
        error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
      }
    },

    // Badge component
    'badge': {
      base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      glass: {
        primary: 'bg-blue-500/20 text-gray-900 dark:text-blue-200',
        secondary: 'bg-gray-500/20 text-gray-900 dark:text-gray-200',
        success: 'bg-green-500/20 text-gray-900 dark:text-green-200',
        warning: 'bg-yellow-500/20 text-gray-900 dark:text-yellow-200',
        error: 'bg-red-500/20 text-gray-900 dark:text-red-200',
        outline: 'bg-transparent border border-gray-400/30 text-gray-900 dark:text-gray-200'
      },
      classic: {
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        outline: 'bg-transparent border border-gray-300 text-gray-700 dark:text-gray-300'
      }
    },

    // Input component
    'input': {
      base: 'w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2',
      glass: {
        default: 'bg-white/50 dark:bg-gray-900/50 border-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400',
        error: 'border-red-400/50 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      },
      classic: {
        default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      }
    },

    // Select component
    'select': {
      base: 'w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 appearance-none',
      glass: {
        default: 'bg-white/50 dark:bg-gray-900/50 border-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-gray-900 dark:text-white',
        error: 'border-red-400/50 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      },
      classic: {
        default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 dark:text-white',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      }
    },

    // Textarea component
    'textarea': {
      base: 'w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-vertical',
      glass: {
        default: 'bg-white/50 dark:bg-gray-900/50 border-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400',
        error: 'border-red-400/50 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      },
      classic: {
        default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-gray-900 dark:text-white'
      }
    },

    // Modal component
    'modal': {
      base: 'rounded-xl border transform transition-all duration-300',
      overlay: {
        glass: 'bg-black/40 backdrop-blur-sm',
        classic: 'bg-black/50'
      },
      glass: {
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/30 shadow-glass-lg text-gray-900 dark:text-gray-100',
        header: 'border-b border-white/30 p-6 text-gray-900 dark:text-gray-100',
        body: 'p-6 text-gray-900 dark:text-gray-100',
        footer: 'border-t border-white/30 p-6 text-gray-900 dark:text-gray-100'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic-lg text-gray-900 dark:text-gray-100',
        header: 'border-b border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100',
        body: 'p-6 text-gray-900 dark:text-gray-100',
        footer: 'border-t border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100'
      }
    },

    'layout': {
      base: 'min-h-screen flex flex-col',
      glass: 'bg-gradient-to-br from-gray-100/80 to-blue-100/50 dark:from-gray-900/80 dark:to-blue-900/30 text-gray-900 dark:text-gray-100',
      classic: 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
    },
    // Добавьте backdrop для модального окна:
    'modal-backdrop': {
      glass: 'bg-black/30 backdrop-blur-sm',
      classic: 'bg-black/50'
    },

    // Обновите card для лучшей читаемости:
    'card': {
      base: 'rounded-xl border transition-all duration-300',
      glass: {
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/40 shadow-glass text-gray-900 dark:text-gray-100',
        hover: 'hover:bg-white/90 dark:hover:bg-gray-900/90'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic text-gray-900 dark:text-gray-100',
        hover: 'hover:shadow-classic-hover'
      }
    },
    // Tabs component
    'tabs': {
      base: 'border-b',
      glass: {
        container: 'border-white/30',
        tab: {
          base: 'px-4 py-2 border-b-2 border-transparent transition-all duration-200',
          active: 'border-blue-500 text-gray-900 dark:text-blue-400 font-medium',
          inactive: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
        }
      },
      classic: {
        container: 'border-gray-200 dark:border-gray-700',
        tab: {
          base: 'px-4 py-2 border-b-2 border-transparent transition-all duration-200',
          active: 'border-blue-500 text-blue-600 dark:text-blue-400',
          inactive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }
      }
    },

    // Progress component
    'progress': {
      base: 'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
      glass: {
        track: 'bg-white/30',
        bar: {
          primary: 'bg-blue-500/80',
          success: 'bg-green-500/80',
          warning: 'bg-yellow-500/80',
          error: 'bg-red-500/80'
        }
      },
      classic: {
        track: 'bg-gray-300 dark:bg-gray-600',
        bar: {
          primary: 'bg-blue-600',
          success: 'bg-green-600',
          warning: 'bg-yellow-600',
          error: 'bg-red-600'
        }
      }
    },

    // Avatar component
    'avatar': {
      base: 'rounded-full overflow-hidden flex items-center justify-center font-medium',
      glass: {
        sm: 'w-8 h-8 text-sm text-gray-900 dark:text-white',
        md: 'w-12 h-12 text-base text-gray-900 dark:text-white',
        lg: 'w-16 h-16 text-lg text-gray-900 dark:text-white',
        xl: 'w-24 h-24 text-xl text-gray-900 dark:text-white'
      },
      classic: {
        sm: 'w-8 h-8 text-sm text-white',
        md: 'w-12 h-12 text-base text-white',
        lg: 'w-16 h-16 text-lg text-white',
        xl: 'w-24 h-24 text-xl text-white'
      }
    },

    // Tooltip component
    'tooltip': {
      base: 'absolute z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-sm transition-opacity duration-200',
      glass: {
        default: 'bg-gray-900/80 backdrop-blur-sm text-white',
        arrow: 'bg-gray-900/80'
      },
      classic: {
        default: 'bg-gray-900 text-white',
        arrow: 'bg-gray-900'
      }
    },

    // Spinner component
    'spinner': {
      base: 'animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
      glass: {
        primary: 'text-blue-600 dark:text-blue-500/80',
        secondary: 'text-gray-600 dark:text-gray-500/80',
        white: 'text-gray-900 dark:text-white/80'
      },
      classic: {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        white: 'text-white'
      }
    },

    'header': {
      base: 'border-b transition-all duration-300',
      glass: {
        base: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-white/30 shadow-glass text-gray-900 dark:text-gray-100',
        sticky: 'sticky top-0 z-40'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic text-gray-900 dark:text-gray-100',
        sticky: 'sticky top-0 z-40'
      }
    },

    'sidebar': {
      base: 'h-full border transition-all duration-300',
      glass: {
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-white/30 shadow-glass text-gray-900 dark:text-gray-100',
        collapsed: 'w-0 opacity-0'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-classic text-gray-900 dark:text-gray-100',
        collapsed: 'w-0 opacity-0'
      }
    },

    'body': {
      base: 'flex-1 transition-all duration-300',
      glass: 'bg-transparent text-gray-900 dark:text-gray-100',
      classic: 'bg-transparent text-gray-900 dark:text-gray-100'
    },

    'footer': {
      base: 'border-t transition-all duration-300',
      glass: {
        base: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-white/30 text-gray-900 dark:text-gray-100',
        sticky: 'sticky bottom-0'
      },
      classic: {
        base: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100',
        sticky: 'sticky bottom-0'
      }
    },

    // Skeleton component
    'skeleton': {
      base: 'animate-pulse rounded',
      glass: {
        default: 'bg-white/30',
        text: 'bg-white/20 h-4 rounded',
        circle: 'bg-white/20 rounded-full'
      },
      classic: {
        default: 'bg-gray-300 dark:bg-gray-600',
        text: 'bg-gray-200 dark:bg-gray-700 h-4 rounded',
        circle: 'bg-gray-200 dark:bg-gray-700 rounded-full'
      }
    }
  };

  // ... остальная часть функции getThemeClasses без изменений
  const componentConfig = baseClasses[component];
  if (!componentConfig) return '';

  // Обработка для button
  if (component === 'button' && state) {
    const btnConfig = componentConfig;
    const baseClass = btnConfig.base || '';
    const themeStyles = theme === 'glass' ? btnConfig.glass[state] : btnConfig.classic[state];
    return `${baseClass} ${themeStyles}`.trim();
  }
  if (component === 'layout' || component === 'body') {
    const baseClass = componentConfig.base || '';
    const themeClass = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
    return `${baseClass} ${themeClass}`.trim();
  }

  if (component === 'header' || component === 'footer' || component === 'sidebar') {
    if (state && ['sticky', 'collapsed'].includes(state)) {
      const baseClass = componentConfig.base || '';
      const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
      return `${baseClass} ${themeConfig.base} ${themeConfig[state] || ''}`.trim();
    }
    const baseClass = componentConfig.base || '';
    const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
    return `${baseClass} ${themeConfig.base}`.trim();
  }
  // Обработка для collapse-panel
  if (component === 'collapse-panel') {
    if (state.startsWith('header')) {
      const headerConfig = componentConfig.header;
      const baseClass = headerConfig.base || '';
      const themeClass = theme === 'glass' ? headerConfig.glass : headerConfig.classic;
      return `${baseClass} ${themeClass}`.trim();
    }
    if (state.startsWith('content')) {
      const contentConfig = componentConfig.content;
      const baseClass = contentConfig.base || '';
      const themeClass = theme === 'glass' ? contentConfig.glass : contentConfig.classic;
      return `${baseClass} ${themeClass}`.trim();
    }
    if (state === 'active') {
      const activeConfig = componentConfig.active;
      return theme === 'glass' ? activeConfig.glass : activeConfig.classic;
    }
  }

  // Обработка для message
  if (component === 'message') {
    if (state) {
      const base = componentConfig.base[theme];
      const typeClass = componentConfig[state]?.[theme] || '';
      return `${base} ${typeClass}`.trim();
    }
    return componentConfig.base[theme];
  }

  // Обработка для code
  if (component === 'code') {
    if (state) {
      if (['base', 'inline', 'block', 'highlighted', 'header', 'copyButton'].includes(state)) {
        if (state === 'base') {
          return componentConfig.base[theme];
        }
        return componentConfig[state][theme];
      }

      if (state.startsWith('syntax-')) {
        const syntaxType = state.replace('syntax-', '');
        if (componentConfig.syntax && componentConfig.syntax[syntaxType]) {
          return componentConfig.syntax[syntaxType][theme];
        }
      }
    }
    return componentConfig.base[theme];
  }

  // Обработка для card
  if (component === 'card') {
    const baseClass = componentConfig.base || '';
    const themeClass = theme === 'glass' ? componentConfig.glass.base : componentConfig.classic.base;
    return `${baseClass} ${themeClass}`.trim();
  }

  // Обработка для alert, badge, input, select, textarea
  if (['alert', 'badge', 'input', 'select', 'textarea', 'spinner', 'skeleton'].includes(component)) {
    if (state) {
      const baseClass = componentConfig.base || '';
      const themeStyles = theme === 'glass' ? componentConfig.glass[state] : componentConfig.classic[state];
      return `${baseClass} ${themeStyles}`.trim();
    }
    return componentConfig.base || '';
  }

  // Обработка для modal
  if (component === 'modal') {
    if (state === 'overlay') {
      return componentConfig.overlay[theme];
    }
    if (state && ['header', 'body', 'footer'].includes(state)) {
      const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
      return themeConfig[state];
    }
    const baseClass = componentConfig.base || '';
    const themeClass = theme === 'glass' ? componentConfig.glass.base : componentConfig.classic.base;
    return `${baseClass} ${themeClass}`.trim();
  }

  // Обработка для tabs
  if (component === 'tabs') {
    if (state === 'container') {
      const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
      return themeConfig.container;
    }
    if (state && ['base', 'active', 'inactive'].includes(state)) {
      const themeConfig = theme === 'glass' ? componentConfig.glass.tab : componentConfig.classic.tab;
      return themeConfig[state];
    }
    return componentConfig.base;
  }

  // Обработка для progress
  if (component === 'progress') {
    if (state === 'track') {
      const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
      return `${componentConfig.base} ${themeConfig.track}`.trim();
    }
    if (state && ['primary', 'success', 'warning', 'error'].includes(state)) {
      const themeConfig = theme === 'glass' ? componentConfig.glass.bar : componentConfig.classic.bar;
      return themeConfig[state];
    }
    return componentConfig.base;
  }

  // Обработка для avatar
  if (component === 'avatar') {
    if (state && ['sm', 'md', 'lg', 'xl'].includes(state)) {
      const baseClass = componentConfig.base || '';
      const themeClass = theme === 'glass' ? componentConfig.glass[state] : componentConfig.classic[state];
      return `${baseClass} ${themeClass}`.trim();
    }
    return componentConfig.base;
  }

  // Обработка для tooltip
  if (component === 'tooltip') {
    if (state === 'arrow') {
      const themeConfig = theme === 'glass' ? componentConfig.glass : componentConfig.classic;
      return themeConfig.arrow;
    }
    const baseClass = componentConfig.base || '';
    const themeClass = theme === 'glass' ? componentConfig.glass.default : componentConfig.classic.default;
    return `${baseClass} ${themeClass}`.trim();
  }

  // Общая обработка для простых компонентов
  const baseClass = componentConfig.base || '';
  const themeClass = theme === 'glass' ? componentConfig.glass : componentConfig.classic;

  if (typeof themeClass === 'string') {
    return `${baseClass} ${themeClass}`.trim();
  }

  return baseClass;
};
