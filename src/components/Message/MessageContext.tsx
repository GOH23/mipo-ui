import { createContext, useContext, useState, ReactNode } from 'react';
import MessageContainer from './MessageContainer';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageItem {
  id: string;
  content: ReactNode;
  type: MessageType;
  visible: boolean;
  duration?: number;
}

interface MessageContextType {
  addMessage: (content: ReactNode, type: MessageType, duration?: number) => void;
}

export const MessageContext = createContext<MessageContextType>({
  addMessage: () => {},
});

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addMessage = (content: ReactNode, type: MessageType, duration: number = 3000) => {
    const id = generateId();
    const newMessage = { id, content, type, visible: true, duration };
    
    setMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, visible: false } : msg
      ));
      
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      }, 300);
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ addMessage }}>
      {children}
      <MessageContainer messages={messages} />
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return {
    info: (content: ReactNode, duration?: number) => context.addMessage(content, 'info', duration),
    success: (content: ReactNode, duration?: number) => context.addMessage(content, 'success', duration),
    warning: (content: ReactNode, duration?: number) => context.addMessage(content, 'warning', duration),
    error: (content: ReactNode, duration?: number) => context.addMessage(content, 'error', duration)
  };
};

// Экспортируем по умолчанию для совместимости
export default MessageProvider;