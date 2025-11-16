// TestMain.tsx - Обновленная документация компонентов
"use client"
import {
  Button,
  Card,
  Code,
  Collapse,
  Modal,
  MessageProvider,
  useMessage,
  ThemeProvider,
  useTheme,
  Layout,
  Header,
  Body,
  Footer,
  Sidebar,
  Input,
  Textarea,
  Spinner,
  Progress,
  Skeleton,
  FloatingContentBackground,
  ProductGrid,
  ProductCard,
  Badge,
  Price
} from "mipo-ui"
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Settings,
  User,
  Mail,
  Bell,
  Download,
  Share2,
  Plus,
  Grid,
  Zap,
  Activity,
  Menu,
  X,
  Type,
  Edit3,
  Maximize2,
  Minimize2,
  Component,
  Sparkles,
  Code as CodeIcon,
  Sun,
  Moon,
  Palette,
  CreditCard,
  AlertCircle as AlertCircleIcon,
  ShoppingCart,
  Heart,
  Eye,
  Star
} from "lucide-react"
import { useState } from "react"
import { FeedbackDemo } from "./FeedbackDemo"
import { InputDemo } from "./InputDemo"
import { motion, MotionProps } from "framer-motion"

// ===== КОМПОНЕНТ ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ И РЕЖИМА =====
function ThemeAndModeToggle() {
  const { theme, setTheme, mode, setMode } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setMode('light')}
          className={`p-2 rounded-md transition-all ${mode === 'light'
            ? 'bg-white shadow-sm text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMode('dark')}
          className={`p-2 rounded-md transition-all ${mode === 'dark'
            ? 'bg-gray-700 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setTheme('glass')}
          className={`p-2 rounded-md transition-all ${theme === 'glass'
            ? 'bg-white shadow-sm text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Zap className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme('classic')}
          className={`p-2 rounded-md transition-all ${theme === 'classic'
            ? 'bg-gray-700 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ===== КОМПОНЕНТ ШАПКИ =====
function AppHeader({ onToggleSidebar, isSidebarVisible }: {
  onToggleSidebar: () => void
  isSidebarVisible: boolean
}) {
  return (
    <Header
      sticky
      blur
      className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            icon={isSidebarVisible ? <X size={16} /> : <Menu size={16} />}
            className="lg:hidden"
          />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Mipo UI Kit
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Библиотека компонентов
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeAndModeToggle />
          <AIGenerator />
        </div>
      </div>
    </Header>
  )
}

// ===== КОМПОНЕНТ САЙДБАРА =====
function ComponentsSidebar({
  onComponentSelect,
  currentComponent
}: {
  onComponentSelect: (component: string) => void
  currentComponent: string
}) {

  const components = [
    { id: 'buttons', label: 'Кнопки', icon: <Component className="w-4 h-4" /> },
    { id: 'inputs', label: 'Поля ввода', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'feedback', label: 'Обратная связь', icon: <Activity className="w-4 h-4" /> },
    { id: 'modals', label: 'Модальные окна', icon: <Maximize2 className="w-4 h-4" /> },
    { id: 'collapse', label: 'Аккордеон', icon: <Minimize2 className="w-4 h-4" /> },
    { id: 'messages', label: 'Уведомления', icon: <Bell className="w-4 h-4" /> },
    { id: 'typography', label: 'Типография', icon: <Type className="w-4 h-4" /> },
    { id: 'cards', label: 'Карточки', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'alerts', label: 'Алерты', icon: <AlertCircleIcon className="w-4 h-4" /> },
    { id: 'product-card', label: 'Карточка товара', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'product-grid', label: 'Сетка товаров', icon: <Grid className="w-4 h-4" /> },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <h2 className="font-bold text-gray-800 dark:text-white mb-1">Компоненты</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Выберите компонент для демонстрации</p>
      </div>

      <div className="flex-1 space-y-2 p-4">
        {components.map((component) => (
          <button
            key={component.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${currentComponent === component.id
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 border-blue-500'
              : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            onClick={() => onComponentSelect(component.id)}
          >
            <div className={`p-2 rounded-lg ${currentComponent === component.id
              ? 'bg-white/20'
              : 'bg-gray-100 dark:bg-gray-800'
              }`}>
              {component.icon}
            </div>
            <span className="font-medium">{component.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ===== ГЕНЕРАЦИЯ САЙТА ЧЕРЕЗ AI =====
function AIGenerator() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const { success, error } = useMessage()

  const generateSite = async () => {
    if (!prompt.trim()) {
      error('Введите описание сайта')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
      success('Сайт успешно сгенерирован!')
      setIsAIModalOpen(false)
      setPrompt('')
    }, 2000)
  }

  return (
    <>
      <Button
        btnType="primary"
        icon={<Sparkles className="w-4 h-4" />}
        onClick={() => setIsAIModalOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg shadow-purple-500/25"
      >
        AI Генератор
      </Button>

      <Modal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        title={
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white">Генерация сайта через AI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Создайте сайт по описанию</p>
            </div>
          </div>
        }
        footer={
          <div className="flex gap-3 w-full">
            <Button
              btnType="secondary"
              onClick={() => setIsAIModalOpen(false)}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              btnType="primary"
              loading={isGenerating}
              onClick={generateSite}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 border-0"
              icon={<Sparkles className="w-4 h-4" />}
            >
              {isGenerating ? 'Генерация...' : 'Сгенерировать'}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white">
              Описание сайта
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Например: Создай интернет-магазин электроники с корзиной товаров и системой фильтров..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Примеры запросов:</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>"Лендинг для салона красоты с формой записи и галереей работ"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>"Блог о путешествиях с картой маршрутов и галереей фотографий"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>"Портфолио фотографа с фильтрами по категориям и контактной формой"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ===== ДЕМО КОМПОНЕНТОВ БЕЗ CLASSNAME =====

function ButtonDemo() {
  const { info } = useMessage()

  const buttonTypes = [ 'primary', 'secondary', 'success', 'warning', 'error', 'glass' ]

  return (
    <Card>
      <h2>Button (Кнопки)</h2>
      <div>
        {buttonTypes.map(type => (
          <Button
            key={type}
            btnType={type as any}
            onClick={() => info(`Нажата ${type} кнопка`)}
          >
            {type}
          </Button>
        ))}
      </div>
    </Card>
  )
}

function TypographyDemo() {
  return (
    <Card>
      <h2>Typography (Типография)</h2>
      <div>
        <h1>Заголовок 1</h1>
        <h2>Заголовок 2</h2>
        <h3>Заголовок 3</h3>
        <p>Обычный текст</p>
        <p>Мелкий текст</p>
      </div>
    </Card>
  )
}

function CardDemo() {
  return (
    <Card>
      <h2>Card (Карточки)</h2>
      <ProductGrid>
        <Card>
          <h3>Простая карточка</h3>
          <p>Содержимое карточки</p>
        </Card>
        
        <Card header={<div>Карточка с заголовком</div>}>
          <p>Карточка с header</p>
        </Card>
      </ProductGrid>
    </Card>
  )
}

function AlertDemo() {
  return (
    <Card>
      <h2>Alert (Уведомления)</h2>
      <div>
        <div>Информационное уведомление</div>
        <div>Успешное действие</div>
        <div>Предупреждение</div>
      </div>
    </Card>
  )
}

function ProgressDemo() {
  const [progress, setProgress] = useState(0)

  const startProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <Card>
      <h2>Progress (Прогресс)</h2>
      <Progress value={progress} type="primary" />
      <Button onClick={startProgress}>Запустить прогресс</Button>
    </Card>
  )
}

function SpinnerDemo() {
  return (
    <Card>
      <h2>Spinner (Загрузка)</h2>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Card>
  )
}

function CollapseDemo() {
  const items = [
    {
      key: '1',
      label: 'Раздел 1: Основная информация',
      children: <p>Содержимое первого раздела</p>,
    },
    {
      key: '2',
      label: 'Раздел 2: Технические детали',
      children: <p>Техническая информация</p>,
    }
  ]

  return (
    <Card>
      <h2>Collapse (Аккордеон)</h2>
      <Collapse items={items} defaultActiveKey={['1']} />
    </Card>
  )
}

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card>
      <h2>Modal (Модальные окна)</h2>
      <Button btnType="primary" onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Пример модального окна"
        footer={<Button onClick={() => setIsOpen(false)}>Закрыть</Button>}
      >
        <p>Содержимое модального окна</p>
      </Modal>
    </Card>
  )
}

function MessageDemo() {
  const { info, success, warning, error } = useMessage()

  return (
    <Card>
      <h2>Message (Уведомления)</h2>
      <div>
        <Button onClick={() => info('Информация')}>Info</Button>
        <Button onClick={() => success('Успех')}>Success</Button>
        <Button onClick={() => warning('Предупреждение')}>Warning</Button>
        <Button onClick={() => error('Ошибка')}>Error</Button>
      </div>
    </Card>
  )
}

function ProductCardDemo() {
  const { success } = useMessage()

  return (
    <Card>
      <h2>ProductCard (Карточка товара)</h2>
      <ProductGrid>
        <ProductCard
          id="1"
          image="/product1.jpg"
          title="Ноутбук ProBook"
          price={89990}
          oldPrice={99990}
          rating={4.5}
          reviewCount={128}
          badges={[{ type: 'sale', text: 'Скидка' }]}
          onAddToCart={() => success('Товар добавлен в корзину')}
        />
        
        <ProductCard
          id="2"
          image="/product2.jpg"
          title="Беспроводные наушники"
          price={12990}
          rating={5}
          reviewCount={45}
          badges={[{ type: 'new', text: 'Новинка' }]}
          onAddToCart={() => success('Товар добавлен в корзину')}
        />
      </ProductGrid>
    </Card>
  )
}

function ProductGridDemo() {


  return (
    <Card>
      <h2>ProductGrid (Сетка товаров)</h2>
      
      {/* Состояние загрузки */}
      <ProductGrid
        isLoading={true}
        skeletonCount={6}
        gridConfig={{
          columns: 3,
          gap: 'lg',
          responsive: true
        }}
      />

      {/* Пустое состояние */}
      <ProductGrid
        isEmpty={true}
        emptyState={<div>Товары не найдены</div>}
      />

      {/* Анимированная сетка */}
      <ProductGrid
        gridConfig={{
          columns: 3,
          gap: 'md',
          responsive: true,
          breakpoints: { sm: 1, md: 2, lg: 3 }
        }}
        animationConfig={{
          type: 'stagger',
          duration: 0.3
        }}
      >
        <ProductCard
          id="1"
          image="/product1.jpg"
          title="Товар 1"
          price={1000}
        />
        <ProductCard
          id="2"
          image="/product2.jpg"
          title="Товар 2"
          price={2000}
        />
      </ProductGrid>
    </Card>
  )
}

// ===== ОСНОВНОЙ КОМПОНЕНТ =====
export default function TestMain() {
  const [isSidebarVisible, setSidebarVisible] = useState(true)
  const [currentComponent, setCurrentComponent] = useState('buttons')
  
  const contentItems = [
    {
      type: 'image' as const,
      content: (
        <div>
          <img src="/project1.jpg" alt="Project 1" />
        </div>
      ),
      size: { width: 80, height: 60 },
      motionProps: {
        whileHover: { scale: 1.3, rotate: 5 }
      }
    }
  ];

  const renderComponent = () => {
    switch (currentComponent) {
      case 'buttons': return <ButtonDemo />
      case 'inputs': return <InputDemo />
      case 'feedback': return <FeedbackDemo />
      case 'modals': return <ModalDemo />
      case 'collapse': return <CollapseDemo />
      case 'messages': return <MessageDemo />
      case 'typography': return <TypographyDemo />
      case 'cards': return <CardDemo />
      case 'alerts': return <AlertDemo />
      case 'progress': return <ProgressDemo />
      case 'spinner': return <SpinnerDemo />
      case 'product-card': return <ProductCardDemo />
      case 'product-grid': return <ProductGridDemo />
      default: return <ButtonDemo />
    }
  }

  return (
    <ThemeProvider defaultTheme="glass" defaultMode="system">
      <MessageProvider>
        <Layout>
          <AppHeader
            onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
            isSidebarVisible={isSidebarVisible}
          />

          <div className="flex flex-1">
            <Sidebar
              position="left"
              width="md"
              static={true}
              isOpen={isSidebarVisible}
            >
              <ComponentsSidebar
                onComponentSelect={setCurrentComponent}
                currentComponent={currentComponent}
              />
            </Sidebar>

            <Body padding="lg">
              <Card>
                <h1>{getComponentTitle(currentComponent)}</h1>
                <p>{getComponentDescription(currentComponent)}</p>
              </Card>
              
              <div>
                <h2>Пример использования</h2>
                <FloatingContentBackground
                  contentItems={contentItems}
                  config={{
                    enableRotation: true,
                    pauseOnHover: true
                  }}
                />
              </div>
              
              {renderComponent()}
            </Body>
          </div>

          <Footer>
            <p>© 2024 Mipo UI Kit | Библиотека React компонентов с AI-генерацией</p>
          </Footer>
        </Layout>
      </MessageProvider>
    </ThemeProvider>
  )
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function getComponentTitle(componentId: string): string {
  const titles: Record<string, string> = {
    buttons: 'Button (Кнопки)',
    inputs: 'Input & Textarea (Поля ввода)',
    feedback: 'Feedback (Обратная связь)',
    modals: 'Modal (Модальные окна)',
    collapse: 'Collapse (Аккордеон)',
    messages: 'Message (Уведомления)',
    typography: 'Typography (Типография)',
    cards: 'Card (Карточки)',
    alerts: 'Alert (Уведомления)',
    progress: 'Progress (Прогресс)',
    spinner: 'Spinner (Загрузка)',
    'product-card': 'ProductCard (Карточка товара)',
    'product-grid': 'ProductGrid (Сетка товаров)'
  }
  return titles[componentId] || 'Компонент'
}

function getComponentDescription(componentId: string): string {
  const descriptions: Record<string, string> = {
    buttons: 'Универсальная кнопка с множеством вариантов стилизации и анимаций',
    inputs: 'Поля ввода с валидацией и анимациями',
    feedback: 'Компоненты загрузки, прогресс-бары и скелетоны',
    modals: 'Всплывающие окна с анимациями и различными размерами',
    collapse: 'Компонент для создания сворачиваемых панелей и аккордеона',
    messages: 'Всплывающие уведомления с таймером автоматического закрытия',
    typography: 'Типографические стили для заголовков и текста',
    cards: 'Гибкий контейнер для группировки контента',
    alerts: 'Визуальные уведомления для важной информации',
    progress: 'Индикатор выполнения операций',
    spinner: 'Анимированный индикатор загрузки',
    'product-card': 'Карточка товара для интернет-магазина с рейтингом и ценой',
    'product-grid': 'Адаптивная сетка для отображения товаров с анимациями'
  }
  return descriptions[componentId] || 'Демонстрация компонента'
}