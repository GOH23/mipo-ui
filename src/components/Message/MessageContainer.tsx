import { useState } from 'react';
import { MessageItem, MessageType } from './MessageContext';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import { getThemeClasses } from '../../themes/themeClasses';

interface MessageContainerProps {
  messages: MessageItem[];
}

const MessageContainer = ({ messages }: MessageContainerProps) => {
  if (messages.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[9999] max-w-md w-full pointer-events-none">
      <div className="space-y-2">
        {messages.map(message => (
          <MessageItemComponent key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
};

interface MessageItemComponentProps extends MessageItem {
  onClose?: () => void;
}

const MessageItemComponent = ({ 
  id, 
  content, 
  type, 
  visible, 
  duration,
  onClose 
}: MessageItemComponentProps) => {
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = contextTheme;
  const [isVisible, setIsVisible] = useState(visible);

  const messageBaseClasses = getThemeClasses(effectiveTheme, 'message');
  const messageTypeClasses = getThemeClasses(effectiveTheme, 'message', type);

  const iconMap = {
    info: <Info size={18} className="text-blue-500 dark:text-blue-300" />,
    success: <CheckCircle size={18} className="text-green-500 dark:text-green-300" />,
    warning: <AlertTriangle size={18} className="text-yellow-500 dark:text-yellow-300" />,
    error: <AlertCircle size={18} className="text-red-500 dark:text-red-300" />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${messageBaseClasses} ${messageTypeClasses} pointer-events-auto relative overflow-hidden shadow-lg`}
        >
          <div className="flex items-start">
            <div className="mt-0.5 mr-3 flex-shrink-0">
              {iconMap[type]}
            </div>
            <div className="flex-1 text-sm sm:text-base font-medium">
              {content}
            </div>
            <button 
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 300);
              }}
              className="ml-2 p-1 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10"
              aria-label="Close message"
            >
              <X size={16} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
          </div>
          
          {duration && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${
                type === 'info' ? 'bg-blue-500' : 
                type === 'success' ? 'bg-green-500' : 
                type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageContainer;