// Client Components - помечены как клиентские через "use client" в каждом файле
export { default as Button } from './components/Button/Button';
export { default as Collapse } from './components/Collapse/Collapse';
export { default as Modal } from './components/Modal/Modal';
export { default as Card } from './components/Card/Card';
export { default as Dropdown } from './components/Dropdown/Dropdown';
export { default as Alert } from './components/Alert/Alert';
export { default as Badge } from './components/Badge/Badge';
export { default as Input } from './components/Input/Input';
export { default as Textarea } from './components/Textarea/Textarea';
export { default as Spinner } from './components/Spinner/Spinner';
export { default as Skeleton } from './components/Skeleton/Skeleton';
export { default as Progress } from './components/Progress/Progress';
export { default as Code } from './components/Code/Code';
export { ThemeProvider, useTheme } from './themes/ThemeContext';
export { default as Layout } from './components/Layout/Layout';
export { default as Header } from './components/Layout/Header';
export { default as Sidebar } from './components/Layout/Sidebar';
export { default as Body } from './components/Layout/Body';
export { default as Footer } from './components/Layout/Footer';
export { FloatingContentBackground } from "./components/Other/FloatingContentBackground"
export { FloatingElements } from "./components/Other/FloatingIcons"
export { ProductCard } from "./components/ProductCard/ProductCard"
export { ProductGrid } from "./components/ProductGrid/ProductGrid"
export { Price } from "./components/Price/Price"
// Message System - работает на клиенте
export { MessageProvider, useMessage } from './components/Message/MessageContext';
export {
  Typography,
  Text,
  Heading1,
  Heading2,
  Heading3,
  TextMuted,
  TextSecondary
} from './components/Typography/Typography';
export type { TypographyProps } from './components/Typography/Typography';
// Type exports
export type {
  ButtonProps,
  ButtonType,
  ButtonVariant,
  ButtonSize
} from './components/Button/Button';
export type {
  CollapseProps,
  CollapsePanelProps
} from './components/Collapse/Collapse';
export type {
  ModalProps
} from './components/Modal/Modal';
export type {
  DropdownProps,
  DropdownItem
} from './components/Dropdown/Dropdown';
export type {
  CardProps
} from './components/Card/Card';
export type {
  Theme,
  Mode
} from './themes/ThemeContext';
export type {
  MessageItem,
  MessageType
} from './components/Message/types';



// CSS import
import './styles/index.css';