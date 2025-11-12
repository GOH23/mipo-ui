export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageItem {
  id: string;
  content: React.ReactNode;
  type: MessageType;
  visible: boolean;
  duration?: number;
}
