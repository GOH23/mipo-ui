"use client"
import { useState, ReactNode, Children, isValidElement } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import Panel from './Panel';
import Button from '../Button/Button';
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

export interface CollapsePanelProps {
  key: string;
  label: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export interface CollapseProps {
  activeKey?: string[];
  defaultActiveKey?: string[];
  onChange?: (keys: string[]) => void;
  accordion?: boolean;
  ghost?: boolean;
  expandIconPosition?: 'left' | 'right';
  className?: string;
  items?: CollapsePanelProps[];
  children?: ReactNode;
  showControls?: boolean;
  controlPosition?: 'top' | 'bottom';
  theme?: 'glass' | 'classic';
  motionProps?: MotionProps;
  panelMotionProps?: MotionProps;
  expandMotionProps?: MotionProps;
}

const Collapse = ({
  activeKey: controlledActiveKey,
  defaultActiveKey = [],
  onChange,
  accordion = false,
  ghost = false,
  expandIconPosition = 'right',
  className = '',
  items,
  children,
  showControls = false,
  controlPosition = 'top',
  theme: propTheme,
  motionProps = {},
  panelMotionProps = {},
  expandMotionProps = {}
}: CollapseProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string[]>(defaultActiveKey);
  const { theme: contextTheme } = useTheme();
  const effectiveTheme = propTheme || contextTheme;

  const isControlled = controlledActiveKey !== undefined;
  const activeKeys = isControlled ? controlledActiveKey : internalActiveKey;

  const handlePanelClick = (key: string) => {
    let newKeys: string[];

    if (accordion) {
      newKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      newKeys = activeKeys.includes(key)
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];
    }

    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  };

  const expandAll = () => {
    const allKeys = items ? items.map(item => item.key) : [];
    if (allKeys.length === 0) return;

    const newKeys = [...new Set([...activeKeys, ...allKeys])];
    
    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  };

  const collapseAll = () => {
    const newKeys: string[] = [];
    
    if (!isControlled) {
      setInternalActiveKey(newKeys);
    }
    
    if (onChange) {
      onChange(newKeys);
    }
  };

  const ControlButtons = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        btnType="primary" 
        variant="outline"
        icon={<ChevronDownCircle size={16} />} 
        onClick={expandAll}
        size="sm"
        theme={effectiveTheme}
        motionProps={{
          whileHover: { y: -2 },
          whileTap: { scale: 0.95 }
        }}
      >
        Expand All
      </Button>
      <Button 
        btnType="secondary" 
        variant="outline"
        icon={<ChevronUpCircle size={16} />} 
        onClick={collapseAll}
        size="sm"
        theme={effectiveTheme}
        motionProps={{
          whileHover: { y: -2 },
          whileTap: { scale: 0.95 }
        }}
      >
        Collapse All
      </Button>
    </div>
  );

  const defaultMotionProps: MotionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
    ...motionProps
  };

  return (
    <motion.div {...defaultMotionProps} className="relative">
      <div className={`${ghost ? '' : 'border rounded-xl'} border-gray-200 dark:border-gray-700 ${className}`}>
        {showControls && controlPosition === 'top' && <ControlButtons />}
        
        <AnimatePresence mode="sync">
          {items ? (
            items.map((item) => (
              <Panel
                key={item.key}
                header={item.label}
                children={item.children}
                extra={item.extra}
                showArrow={item.showArrow}
                disabled={item.disabled}
                className={item.className}
                headerClassName={item.headerClassName}
                contentClassName={item.contentClassName}
                isActive={activeKeys.includes(item.key)}
                onClick={() => handlePanelClick(item.key)}
                expandIconPosition={expandIconPosition}
                theme={effectiveTheme}
                motionProps={panelMotionProps}
                expandMotionProps={expandMotionProps}
              />
            ))
          ) : (
            Children.map(children, (child) => {
              if (isValidElement(child) && child.key) {
                const key = child.key.toString();
                return (
                  <Panel
                    key={key}
                    header={child.props.header || key}
                    children={child.props.children}
                    isActive={activeKeys.includes(key)}
                    onClick={() => handlePanelClick(key)}
                    expandIconPosition={expandIconPosition}
                    theme={effectiveTheme}
                    motionProps={panelMotionProps}
                    expandMotionProps={expandMotionProps}
                  />
                );
              }
              return null;
            })
          )}
        </AnimatePresence>

        {showControls && controlPosition === 'bottom' && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ControlButtons />
          </div>
        )}
      </div>
    </motion.div>
  );
};

Collapse.Panel = Panel;

export default Collapse;