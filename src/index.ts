// Client Components - помечены как клиентские через "use client" в каждом файле
export { default as Button } from './components/Button/Button';
export { default as Collapse } from './components/Collapse/Collapse';
export { default as Modal } from './components/Modal/Modal';
export { default as Dropdown } from './components/Dropdown/Dropdown';
export { default as Card } from './components/Card/Card';

// Theme Provider - работает на клиенте
export { ThemeProvider, useTheme } from './themes/ThemeContext';

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