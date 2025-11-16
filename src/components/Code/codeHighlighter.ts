// components/Code/codeHighlighter.ts
/**
 * Интерфейс для токена подсветки синтаксиса
 * @interface HighlightToken
 * @property {string} type - Тип токена (keyword, string, comment и т.д.)
 * @property {string} value - Значение токена
 * @property {number} start - Начальная позиция в исходном коде
 * @property {number} end - Конечная позиция в исходном коде
 */
export interface HighlightToken {
  type: string;
  value: string;
  start: number;
  end: number;
}

/**
 * Интерфейс для определения языка программирования
 * @interface LanguageDefinition
 * @property {string} name - Человекочитаемое название языка
 * @property {string[]} extensions - Расширения файлов для этого языка
 * @property {string[]} keywords - Список ключевых слов языка
 * @property {string[]} [types] - Список типов данных
 * @property {string[]} [builtins] - Список встроенных функций и объектов
 * @property {string[]} [methods] - Список методов
 * @property {string[]} operators - Список операторов
 * @property {RegExp} symbols - Регулярное выражение для символов
 * @property {Object} comments - Настройки комментариев
 * @property {string} [comments.line] - Символы для однострочных комментариев
 * @property {Object} [comments.block] - Символы для многострочных комментариев
 * @property {string} comments.block.start - Начало многострочного комментария
 * @property {string} comments.block.end - Конец многострочного комментария
 * @property {Object} strings - Настройки строк
 * @property {string[]} strings.quotes - Типы кавычек для строк
 * @property {boolean} [strings.multiline] - Поддержка многострочных строк
 * @property {RegExp} numbers - Регулярное выражение для чисел
 * @property {Object} brackets - Соответствия скобок
 * @property {boolean} [jsx] - Поддержка JSX/TSX
 */
export interface LanguageDefinition {
  name: string;
  extensions: string[];
  keywords: string[];
  types?: string[];
  builtins?: string[];
  methods?: string[];
  operators: string[];
  symbols: RegExp;
  comments: {
    line?: string;
    block?: { start: string; end: string };
  };
  strings: {
    quotes: string[];
    multiline?: boolean;
  };
  numbers: RegExp;
  brackets: { [key: string]: string };
  jsx?: boolean;
}

/**
 * Объект с определениями поддерживаемых языков программирования
 * @constant {Object.<string, LanguageDefinition>}
 */
export const LANGUAGES: { [key: string]: LanguageDefinition } = {
  javascript: {
    name: 'JavaScript',
    extensions: ['js', 'javascript'],
    keywords: [
      'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
      'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if',
      'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw',
      'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'await', 'async'
    ],
    types: [
      'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number', 'Object',
      'RegExp', 'String', 'Map', 'Set', 'Promise', 'Symbol', 'Proxy', 'undefined', 'null'
    ],
    builtins: [
      'console', 'window', 'document', 'localStorage', 'sessionStorage', 'JSON',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'fetch',
      'Promise', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'Math'
    ],
    methods: [
      'log', 'error', 'warn', 'info', 'debug', 'table', 'group', 'groupEnd',
      'time', 'timeEnd', 'assert', 'count', 'dir', 'trace',
      'parse', 'stringify', 'getItem', 'setItem', 'removeItem', 'clear',
      'then', 'catch', 'finally', 'resolve', 'reject', 'all', 'race',
      'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'concat', 'join',
      'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'some', 'every',
      'includes', 'indexOf', 'split', 'replace', 'toLowerCase', 'toUpperCase',
      'trim', 'substring', 'substr', 'charAt', 'charCodeAt'
    ],
    operators: [
      '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '=>', '+', '-', '*', '/', '%',
      '++', '--', '!', '&&', '||', '?', ':', '+=', '-=', '*=', '/=', '%=', '**', '&', '|',
      '^', '~', '<<', '>>', '>>>', 'instanceof', 'in', 'delete', 'typeof', 'void'
    ],
    symbols: /[{}[\]().,;]/,
    comments: {
      line: '//',
      block: { start: '/*', end: '*/' }
    },
    strings: {
      quotes: ['"', "'", '`'],
      multiline: true
    },
    numbers: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
    brackets: { '(': ')', '[': ']', '{': '}' },
    jsx: true
  },
  
  typescript: {
    name: 'TypeScript',
    extensions: ['ts', 'typescript', 'tsx'],
    keywords: [
      'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
      'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if',
      'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw',
      'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'await', 'async',
      'interface', 'type', 'namespace', 'module', 'declare', 'abstract', 'as', 'is',
      'keyof', 'readonly', 'public', 'private', 'protected', 'implements', 'enum'
    ],
    types: [
      'string', 'number', 'boolean', 'any', 'unknown', 'void', 'null', 'undefined',
      'never', 'object', 'symbol', 'bigint', 'Array', 'Promise', 'Date', 'RegExp',
      'Map', 'Set', 'Record', 'Partial', 'Required', 'Readonly', 'Pick', 'Omit'
    ],
    builtins: [
      'console', 'window', 'document', 'localStorage', 'sessionStorage', 'JSON',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'fetch',
      'Promise', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'Math'
    ],
    methods: [
      'log', 'error', 'warn', 'info', 'debug', 'table', 'group', 'groupEnd',
      'time', 'timeEnd', 'assert', 'count', 'dir', 'trace',
      'parse', 'stringify', 'getItem', 'setItem', 'removeItem', 'clear',
      'then', 'catch', 'finally', 'resolve', 'reject', 'all', 'race',
      'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'concat', 'join',
      'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'some', 'every',
      'includes', 'indexOf', 'split', 'replace', 'toLowerCase', 'toUpperCase',
      'trim', 'substring', 'substr', 'charAt', 'charCodeAt'
    ],
    operators: [
      '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '=>', '+', '-', '*', '/', '%',
      '++', '--', '!', '&&', '||', '?', ':', '+=', '-=', '*=', '/=', '%=', '**', '&', '|',
      '^', '~', '<<', '>>', '>>>', 'instanceof', 'in', 'as', 'is'
    ],
    symbols: /[{}[\]().,;<>]/,
    comments: {
      line: '//',
      block: { start: '/*', end: '*/' }
    },
    strings: {
      quotes: ['"', "'", '`'],
      multiline: true
    },
    numbers: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
    brackets: { '(': ')', '[': ']', '{': '}', '<': '>' },
    jsx: true
  }
};

/**
 * Определяет язык программирования по имени файла или расширению
 * @function
 * @param {string} filenameOrLang - Имя файла или идентификатор языка
 * @returns {string} Ключ языка из объекта LANGUAGES
 * 
 * @example
 * detectLanguage('script.js') // returns 'javascript'
 * detectLanguage('typescript') // returns 'typescript'
 */
export const detectLanguage = (filenameOrLang: string): string => {
  const lower = filenameOrLang.toLowerCase();
  
  if (LANGUAGES[lower]) {
    return lower;
  }
  
  const extension = lower.split('.').pop() || '';
  for (const [lang, def] of Object.entries(LANGUAGES)) {
    if (def.extensions.includes(extension)) {
      return lang;
    }
  }
  
  return 'javascript';
};

/**
 * Токенизирует код на указанном языке программирования
 * @function
 * @param {string} code - Исходный код для токенизации
 * @param {string} [language='javascript'] - Язык программирования
 * @returns {HighlightToken[]} Массив токенов с информацией о типах и позициях
 */
export const tokenize = (code: string, language: string = 'javascript'): HighlightToken[] => {
  const lang = LANGUAGES[language] || LANGUAGES.javascript;
  const tokens: HighlightToken[] = [];
  let position = 0;
  const codeLength = code.length;

  while (position < codeLength) {
    // Пропускаем пробелы
    const whitespace = code.slice(position).match(/^\s+/);
    if (whitespace) {
      tokens.push({
        type: 'whitespace',
        value: whitespace[0],
        start: position,
        end: position + whitespace[0].length
      });
      position += whitespace[0].length;
      continue;
    }

    // Комментарии (самый высокий приоритет)
    let matched = false;
    
    // Однострочные комментарии
    if (lang.comments.line) {
      const lineComment = code.slice(position).match(new RegExp(`^${escapeRegex(lang.comments.line)}.*`));
      if (lineComment) {
        tokens.push({
          type: 'comment',
          value: lineComment[0],
          start: position,
          end: position + lineComment[0].length
        });
        position += lineComment[0].length;
        matched = true;
        continue;
      }
    }

    // Многострочные комментарии
    if (lang.comments.block) {
      const blockComment = code.slice(position).match(new RegExp(`^${escapeRegex(lang.comments.block.start)}[\\s\\S]*?${escapeRegex(lang.comments.block.end)}`));
      if (blockComment) {
        tokens.push({
          type: 'comment',
          value: blockComment[0],
          start: position,
          end: position + blockComment[0].length
        });
        position += blockComment[0].length;
        matched = true;
        continue;
      }
    }

    // Строки (второй по приоритету)
    for (const quote of lang.strings.quotes) {
      const stringRegex = lang.strings.multiline 
        ? new RegExp(`^${escapeRegex(quote)}[\\s\\S]*?${escapeRegex(quote)}`)
        : new RegExp(`^${escapeRegex(quote)}[^${escapeRegex(quote)}]*${escapeRegex(quote)}`);
      
      const stringMatch = code.slice(position).match(stringRegex);
      if (stringMatch) {
        tokens.push({
          type: 'string',
          value: stringMatch[0],
          start: position,
          end: position + stringMatch[0].length
        });
        position += stringMatch[0].length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Числа (только отдельные числа, не часть идентификаторов)
    const numberMatch = code.slice(position).match(/^\d+/);
    if (numberMatch) {
      // Проверяем, что число не является частью идентификатора
      const before = position > 0 ? code[position - 1] : '';
      const after = position + numberMatch[0].length < codeLength ? code[position + numberMatch[0].length] : '';
      
      const isWordCharBefore = /[a-zA-Z_$]/.test(before);
      const isWordCharAfter = /[a-zA-Z_$]/.test(after);
      
      if (!isWordCharBefore && !isWordCharAfter) {
        tokens.push({
          type: 'number',
          value: numberMatch[0],
          start: position,
          end: position + numberMatch[0].length
        });
        position += numberMatch[0].length;
        continue;
      }
    }

    // Ключевые слова и идентификаторы
    const wordMatch = code.slice(position).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      let type = 'identifier';
      
      if (lang.keywords.includes(word)) {
        type = 'keyword';
      } else if (lang.types && lang.types.includes(word)) {
        type = 'type';
      } else if (lang.builtins && lang.builtins.includes(word)) {
        type = 'builtin';
      } else if (lang.methods && lang.methods.includes(word)) {
        type = 'method';
      } else if (word === 'true' || word === 'false') {
        type = 'boolean';
      } else if (word === 'null' || word === 'undefined') {
        type = 'null';
      }
      
      tokens.push({
        type,
        value: word,
        start: position,
        end: position + word.length
      });
      position += word.length;
      continue;
    }

    // Операторы
    let operatorMatched = false;
    for (const op of lang.operators.sort((a, b) => b.length - a.length)) {
      if (code.startsWith(op, position)) {
        tokens.push({
          type: 'operator',
          value: op,
          start: position,
          end: position + op.length
        });
        position += op.length;
        operatorMatched = true;
        break;
      }
    }
    if (operatorMatched) continue;

    // Символы
    const symbolMatch = code.slice(position).match(lang.symbols);
    if (symbolMatch) {
      tokens.push({
        type: 'symbol',
        value: symbolMatch[0],
        start: position,
        end: position + symbolMatch[0].length
      });
      position += symbolMatch[0].length;
      continue;
    }

    // Любой другой символ
    tokens.push({
      type: 'text',
      value: code[position],
      start: position,
      end: position + 1
    });
    position++;
  }

  return tokens;
};

/**
 * Экранирует специальные символы в регулярных выражениях
 * @function
 * @param {string} string - Строка для экранирования
 * @returns {string} Экранированная строка
 */
const escapeRegex = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Преобразует массив токенов в HTML с CSS-классами
 * @function
 * @param {HighlightToken[]} tokens - Массив токенов для преобразования
 * @returns {string} HTML-строка с подсвеченным кодом
 */
export const tokensToHTML = (tokens: HighlightToken[]): string => {
  return tokens.map(token => {
    const escapedValue = escapeHtml(token.value);
    
    // Пропускаем пробелы без обертки
    if (token.type === 'whitespace') {
      return escapedValue;
    }
    
    return `<span class="token-${token.type}">${escapedValue}</span>`;
  }).join('');
};

/**
 * Экранирует HTML-символы в строке
 * @function
 * @param {string} unsafe - Небезопасная HTML-строка
 * @returns {string} Безопасная HTML-строка
 */
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Основная функция для подсветки синтаксиса кода
 * @function
 * @param {string} code - Исходный код для подсветки
 * @param {string} [language='javascript'] - Язык программирования
 * @returns {string} HTML-строка с подсвеченным кодом
 * 
 * @example
 * highlightCode('function test() {}', 'javascript')
 */
export const highlightCode = (code: string, language: string = 'javascript'): string => {
  const detectedLang = detectLanguage(language);
  const tokens = tokenize(code, detectedLang);
  return tokensToHTML(tokens);
};