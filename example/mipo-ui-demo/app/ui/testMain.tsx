"use client"
import { 
  Button, 
  Card, 
  Collapse, 
  Modal, 
  Dropdown, 
  MessageProvider, 
  useMessage, 
  ThemeProvider, 
  useTheme 
} from "mipo-ui"
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  X,
  Settings,
  User,
  LogOut,
  Mail,
  Bell,
  Download,
  Share2,
  Plus,
  Star,
  Heart,
  Eye,
  EyeOff,
  RefreshCw,
  Filter,
  Search,
  Menu,
  Grid,
  List,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Camera,
  Upload,
  Folder,
  File,
  Lock,
  Unlock,
  Zap,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  Activity,
  Globe,
  Shield,
  Key,
  Code,
  Database,
  Server,
  Cloud,
  Wifi,
  Bluetooth,
  Battery,
  Volume2,
  MoreVertical
} from "lucide-react"
import { useState } from "react"

// ===== ТЕМА ПЕРЕКЛЮЧАТЕЛЬ =====
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Card className="mb-8 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Тема интерфейса</h3>
        <div className="flex gap-2">
          <Button
            btnType={theme === 'glass' ? 'primary' : 'secondary'}
            variant={theme === 'glass' ? 'solid' : 'outline'}
            onClick={() => setTheme('glass')}
            icon={<Zap className="w-4 h-4" />}
          >
            Glass
          </Button>
          <Button
            btnType={theme === 'classic' ? 'primary' : 'secondary'}
            variant={theme === 'classic' ? 'solid' : 'outline'}
            onClick={() => setTheme('classic')}
            icon={<Grid className="w-4 h-4" />}
          >
            Classic
          </Button>
        </div>
      </div>
    </Card>
  )
}

// ===== ДЕМО КНОПОК =====
function ButtonDemo() {
  const { info } = useMessage()
  const { theme } = useTheme()
  
  const buttonTypes = [
    { type: 'primary' as const, icon: <Settings className="w-4 h-4" /> },
    { type: 'secondary' as const, icon: <User className="w-4 h-4" /> },
    { type: 'success' as const, icon: <CheckCircle className="w-4 h-4" /> },
    { type: 'warning' as const, icon: <AlertTriangle className="w-4 h-4" /> },
    { type: 'error' as const, icon: <AlertCircle className="w-4 h-4" /> },
    { type: 'glass' as const, icon: <Zap className="w-4 h-4" /> }
  ]

  const buttonVariants = [
    { name: 'solid', label: 'Solid' },
    { name: 'outline', label: 'Outline' },
    { name: 'ghost', label: 'Ghost' },
    { name: 'link', label: 'Link' }
  ]

  const buttonSizes = [
    { size: 'xs' as const, label: 'XS' },
    { size: 'sm' as const, label: 'SM' },
    { size: 'md' as const, label: 'MD' },
    { size: 'lg' as const, label: 'LG' },
    { size: 'xl' as const, label: 'XL' }
  ]

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Button (Кнопки)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Универсальная кнопка с множеством вариантов стилизации и анимаций</p>
        
        {/* Типы кнопок */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Типы кнопок</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Основные типы для разных действий</p>
        <div className="flex flex-wrap gap-3 mb-6">
          {buttonTypes.map(({ type, icon }) => (
            <Button 
              key={type}
              btnType={type}
              variant="solid"
              onClick={() => info(`Нажата ${type} кнопка`)}
              icon={icon}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        {/* Варианты кнопок */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Варианты стилей</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Различные визуальные стили кнопок</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {buttonVariants.map(({ name, label }) => (
            <Button 
              key={name}
              btnType="primary"
              variant={name as any}
              onClick={() => info(`Вариант: ${label}`)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Размеры кнопок */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Размеры кнопок</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">От XS до XL для любых нужд</p>
        <div className="flex items-end gap-3 mb-6 flex-wrap">
          {buttonSizes.map(({ size, label }) => (
            <Button 
              key={size}
              btnType="primary"
              variant="solid"
              size={size}
              onClick={() => info(`Размер: ${size}`)}
            >
              {label} Button
            </Button>
          ))}
        </div>

        {/* Кнопки с иконками */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">С иконками (позиции)</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Иконки слева, справа и состояние загрузки</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            btnType="success"
            icon={<Download className="w-4 h-4" />}
            iconPosition="left"
          >
            Иконка слева
          </Button>
          <Button 
            btnType="primary"
            icon={<Share2 className="w-4 h-4" />}
            iconPosition="right"
          >
            Иконка справа
          </Button>
          <Button 
            btnType="warning"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            loading={true}
          >
            Загрузка
          </Button>
        </div>

        {/* Полная ширина */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Полная ширина</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Кнопки растягивающиеся на всю ширину контейнера</p>
        <div className="space-y-3">
          <Button btnType="primary" fullWidth>
            Кнопка на всю ширину
          </Button>
          <Button btnType="secondary" variant="outline" fullWidth>
            Вторичная на всю ширину
          </Button>
        </div>

        {/* Код для копирования */}
        <Card 
          header="📋 Код примера"
          className="mt-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`<Button 
  btnType="primary"     // 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'glass'
  variant="solid"       // 'solid' | 'outline' | 'ghost' | 'link'
  size="md"            // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  icon={<Icon />}      // ReactNode
  iconPosition="left"  // 'left' | 'right'
  loading={false}      // boolean
  disabled={false}     // boolean
  fullWidth={false}    // boolean
  theme="glass"        // 'glass' | 'classic' (можно не указывать, будет из контекста)
  motionProps={{}}     // MotionProps от framer-motion
  onClick={() => {}}   // стандартный onClick
>
  Текст кнопки
</Button>`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ДЕМО Collapse (Аккордеон) =====
function CollapseDemo() {
  const { info } = useMessage()
  const items = [
    {
      key: '1',
      label: 'Раздел 1: Основная информация',
      children: (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">Это содержимое первого раздела. Здесь может быть любой контент: текст, картинки, другие компоненты.</p>
          <Button btnType="primary" size="sm">Действие внутри</Button>
        </div>
      ),
      extra: <Badge color="blue">NEW</Badge>
    },
    {
      key: '2',
      label: 'Раздел 2: Технические детали',
      children: (
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Технология: React 18+</li>
          <li>Анимации: Framer Motion</li>
          <li>Стилизация: Tailwind CSS</li>
          <li>Иконки: Lucide React</li>
        </ul>
      )
    },
    {
      key: '3',
      label: 'Раздел 3: Примеры кода',
      children: (
        <Card className="bg-gray-50 dark:bg-gray-900/50">
          <pre className="text-sm text-gray-700 dark:text-gray-300">
{`const example = () => {
  console.log('Пример кода')
}`}
          </pre>
        </Card>
      ),
      disabled: false
    }
  ]

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Collapse (Аккордеон)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Компонент для создания сворачиваемых панелей и аккордеона</p>
        
        {/* Базовый аккордеон */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Базовый аккордеон</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Несколько открытых панелей одновременно</p>
        <Collapse 
          items={items}
          defaultActiveKey={['1']}
          onChange={(keys) => info(`Активные разделы: ${keys.join(', ')}`)}
          className="mb-6"
        />

        {/* Аккордеон без границ */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Ghost-стиль (без границ)</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Минималистичный дизайн без рамок</p>
        <Collapse 
          items={items}
          ghost={true}
          expandIconPosition="left"
          className="mb-6"
        />

        {/* Аккордеон с контролами */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">С кнопками управления</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Кнопки "Развернуть все" / "Свернуть все"</p>
        <Collapse 
          items={items}
          showControls={true}
          controlPosition="top"
          accordion={false}
        />

        {/* Код для копирования */}
        <Card 
          header="📋 Props Collapse"
          className="mt-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`interface CollapseProps {
  activeKey?: string[]                     // Контролируемые ключи
  defaultActiveKey?: string[]             // Ключи по умолчанию
  onChange?: (keys: string[]) => void     // Callback при изменении
  accordion?: boolean                     // Только один активный
  ghost?: boolean                         // Без границ
  expandIconPosition?: 'left' | 'right'   // Позиция иконки
  showControls?: boolean                  // Показать кнопки управления
  controlPosition?: 'top' | 'bottom'      // Позиция кнопок
  items?: CollapsePanelProps[]            // Массив данных
  children?: ReactNode                    // Или дочерние компоненты
  theme?: 'glass' | 'classic'             // Тема
}

interface CollapsePanelProps {
  key: string              // Уникальный ключ
  label: ReactNode         // Заголовок
  children: ReactNode      // Содержимое
  extra?: ReactNode         // Доп. элемент справа
  showArrow?: boolean      // Показывать стрелку
  disabled?: boolean       // Отключить панель
}`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ДЕМО Modal (Модальное окно) =====
function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')
  const { info, success } = useMessage()

  const openModal = (size: typeof modalSize) => {
    setModalSize(size)
    setIsModalOpen(true)
  }

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Modal (Модальные окна)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Всплывающие окна с анимациями и различными размерами</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button btnType="primary" onClick={() => openModal('sm')}>Small Modal</Button>
          <Button btnType="secondary" onClick={() => openModal('md')}>Medium Modal</Button>
          <Button btnType="success" onClick={() => openModal('lg')}>Large Modal</Button>
          <Button btnType="warning" onClick={() => openModal('xl')}>Extra Large</Button>
          <Button btnType="error" onClick={() => openModal('full')}>Full Width</Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Модальное окно (${modalSize})`}
          size={modalSize}
          footer={
            <div className="flex gap-2">
              <Button btnType="secondary" variant="outline" onClick={() => setIsModalOpen(false)}>
                Отмена
              </Button>
              <Button btnType="primary" onClick={() => { success('Сохранено!'); setIsModalOpen(false) }}>
                Сохранить
              </Button>
            </div>
          }
          motionProps={{
            overlay: { transition: { duration: 0.3 } },
            content: { transition: { type: 'spring', damping: 25, stiffness: 300 } }
          }}
        >
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">Это содержимое модального окна размера <strong className="text-gray-900 dark:text-white">{modalSize}</strong>.</p>
            <p className="text-gray-700 dark:text-gray-300">Вы можете разместить здесь любую информацию, формы или другие компоненты.</p>
            <Card>
              <p className="text-sm text-gray-600 dark:text-gray-400">Вложенная карточка в модальном окне</p>
            </Card>
          </div>
        </Modal>

        {/* Код для копирования */}
        <Card 
          header="📋 Props Modal"
          className="mt-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`interface ModalProps {
  isOpen: boolean                    // Открыто/закрыто
  onClose: () => void               // Callback закрытия
  title?: ReactNode                  // Заголовок
  children: ReactNode                // Содержимое
  footer?: ReactNode                 // Подвал с кнопками
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'  // Размер
  hideClose?: boolean                // Скрыть кнопку X
  backdropClose?: boolean            // Закрывать по клику на фон
  theme?: 'glass' | 'classic'        // Тема
  motionProps?: {                     // Анимации
    overlay?: MotionProps
    content?: MotionProps
  }
}`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ДЕМО Dropdown (Выпадающее меню) =====
function DropdownDemo() {
  const { info, success, warning, error } = useMessage()
  
  const menuItems = [
    {
      key: 'profile',
      label: 'Мой профиль',
      icon: <User className="w-4 h-4" />,
      onClick: () => info('Открыт профиль')
    },
    {
      key: 'settings',
      label: 'Настройки',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => info('Открыты настройки'),
      badge: <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">3</span>
    },
    {
      key: 'notifications',
      label: 'Уведомления',
      icon: <Bell className="w-4 h-4" />,
      children: [
        {
          key: 'email',
          label: 'Email',
          icon: <Mail className="w-4 h-4" />,
          onClick: () => success('Email уведомления включены')
        },
        {
          key: 'push',
          label: 'Push',
          icon: <Activity className="w-4 h-4" />,
          onClick: () => success('Push уведомления включены')
        }
      ]
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      label: 'Выйти',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => warning('Вы вышли из системы'),
      disabled: false
    }
  ]

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dropdown (Выпадающее меню)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Многоуровневые меню с анимациями и вложенными элементами</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Базовое меню */}
          {/* <Dropdown 
            items={menuItems}
            trigger={
              <Button btnType="primary" icon={<ChevronDown className="w-4 h-4" />}>
                Меню пользователя
              </Button>
            }
            placement="bottom-start"
          /> */}

          {/* Меню вверх */}


          {/* Кастомный триггер */}
/
        </div>

        {/* Код для копирования */}
        <Card 
          header="📋 Props Dropdown"
          className="mt-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`interface DropdownProps {
  items: DropdownItem[]                    // Элементы меню
  trigger?: ReactNode                      // Кастомный триггер
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  className?: string
  theme?: 'glass' | 'classic'
  disabled?: boolean
  motionProps?: MotionProps
  itemMotionProps?: MotionProps
}

interface DropdownItem {
  key: string              // Уникальный ключ
  label: ReactNode         // Текст элемента
  icon?: ReactNode         // Иконка
  disabled?: boolean       // Отключен
  onClick?: () => void     // Callback
  badge?: ReactNode        // Бейдж
  children?: DropdownItem[] // Вложенные элементы
}`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ДЕМО Card (Карточки) =====
function CardDemo() {
  const { info } = useMessage()
  
  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Card (Карточки)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Гибкий контейнер для группировки контента</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Простая карточка */}
          <Card>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Базовая карточка</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Простой контент без header/footer</p>
          </Card>

          {/* Карточка с заголовком */}
          <Card 
            header={<h3 className="font-semibold text-gray-800 dark:text-white">📊 Карточка с заголовком</h3>}
          >
            <p className="text-gray-700 dark:text-gray-300">Эта карточка имеет заголовок</p>
          </Card>

          {/* Карточка с подвалом */}
          <Card 
            header={<h3 className="font-semibold text-gray-800 dark:text-white">🎯 С действиями</h3>}
            footer={
              <div className="flex justify-end gap-2">
                <Button btnType="secondary" size="sm">Отмена</Button>
                <Button btnType="primary" size="sm">OK</Button>
              </div>
            }
          >
            <p className="text-gray-700 dark:text-gray-300">Карточка с кнопками действий в подвале</p>
          </Card>

          {/* Карточка с кастомными классами */}
          <Card 
            className="border-2 border-purple-500"
            headerClassName="bg-purple-50 dark:bg-purple-900/20"
            contentClassName="bg-purple-50/50 dark:bg-purple-900/10"
          >
            <h3 className="text-purple-600 dark:text-purple-400 font-semibold">Кастомная тема</h3>
            <p className="text-gray-700 dark:text-gray-300">Изменены классы для всех секций</p>
          </Card>
        </div>

        {/* Код для копирования */}
        <Card 
          header="📋 Props Card"
          className="mt-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`interface CardProps {
  children: ReactNode                     // Основной контент
  header?: ReactNode                      // Верхняя секция
  footer?: ReactNode                      // Нижняя секция
  className?: string                      // Классы корневого элемента
  headerClassName?: string                // Классы header
  contentClassName?: string               // Классы контента
  footerClassName?: string                // Классы footer
  theme?: 'glass' | 'classic'            // Тема
}`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ДЕМО Message (Сообщения) =====
function MessageDemo() {
  const { info, success, warning, error } = useMessage()

  return (
    <Card className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Message (Уведомления)</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Всплывающие уведомления с таймером автоматического закрытия</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button btnType="primary" onClick={() => info('Информационное сообщение', 5000)}>
            Info Message
          </Button>
          <Button btnType="success" onClick={() => success('Операция успешна!', 4000)}>
            Success Message
          </Button>
          <Button btnType="warning" onClick={() => warning('Предупреждение!', 6000)}>
            Warning Message
          </Button>
          <Button btnType="error" onClick={() => error('Ошибка произошла', 7000)}>
            Error Message
          </Button>
        </div>

        <Card 
          header="📋 Как использовать Message"
          className="bg-gray-50 dark:bg-gray-900/50"
        >
          <pre className="text-xs overflow-x-auto">
{`// Внутри компонента:
const { info, success, warning, error } = useMessage()

// Вызов:
info('Текст', 5000)      // Тип: 'info' | 'success' | 'warning' | 'error'
success('Успех!', 3000)  // Второй параметр - длительность (ms)
warning('Внимание', 6000)
error('Ошибка', 4000)

// Подключить провайдер в корне:
<MessageProvider>
  <App />
</MessageProvider>`}
          </pre>
        </Card>
      </div>
    </Card>
  )
}

// ===== ГЛАВНЫЙ КОМПОНЕНТ ДОКУМЕНТАЦИИ =====
export default function TestMain() {
  return (
    <ThemeProvider defaultTheme="glass" defaultMode="system">
      <MessageProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
          {/* Шапка */}
          <Card className="mb-8">
            <div className="p-6 text-center">
              <h1 className="text-4xl font-bold mb-2 gradient-text text-gray-800 dark:text-white">🎨 Mipo UI Kit</h1>
              <p className="text-gray-600 dark:text-gray-400">Библиотека React компонентов с темами Glass и Classic</p>
            </div>
          </Card>

          {/* Переключатель темы */}
          <ThemeToggle />

          {/* Все компоненты */}
          <div className="space-y-6">
            <ButtonDemo />
            <CardDemo />
            <DropdownDemo />
            <CollapseDemo />
            <ModalDemo />
            <MessageDemo />
          </div>

          {/* Футер документации */}
          <Card className="mt-8">
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 Mipo UI Kit | <a href="#" className="text-blue-500 hover:underline">GitHub</a> | <a href="#" className="text-blue-500 hover:underline">Документация</a>
              </p>
            </div>
          </Card>
        </div>
      </MessageProvider>
    </ThemeProvider>
  )
}

// ===== ВСПОМОГАТЕЛЬНЫЙ КОМПОНЕНТ =====
function Badge({ children, color = 'blue' }: { children: React.ReactNode, color?: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }
  
  return (
    <span className={`${colors[color]} text-white px-2 py-0.5 rounded-full text-xs font-medium`}>
      {children}
    </span>
  )
}