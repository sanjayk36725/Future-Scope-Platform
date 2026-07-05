import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: string;
  read: boolean;
  source: string;
}

interface Toast {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  source: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    title: string,
    desc: string,
    type?: 'info' | 'success' | 'warning' | 'danger',
    source?: string
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Initial notifications representing automated agent startup actions
    return [
      {
        id: 'init-1',
        title: 'Cognitive Gateway Operational',
        desc: 'Semantic router initialized 25+ specialized agent endpoints successfully.',
        type: 'success',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        source: 'Central Routing Engine',
      },
      {
        id: 'init-2',
        title: 'Rerouting Engine Live',
        desc: 'Specialized corporate and campus routing maps loaded on standby.',
        type: 'info',
        timestamp: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        source: 'Rerouting Service',
      }
    ];
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  const addNotification = (
    title: string,
    desc: string,
    type: 'info' | 'success' | 'warning' | 'danger' = 'info',
    source: string = 'System Service'
  ) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newNotif: Notification = {
      id,
      title,
      desc,
      type,
      timestamp,
      read: false,
      source,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Push active temporary visual toast alert
    const newToast: Toast = { id, title, desc, type, source };
    setToasts((prev) => [...prev, newToast]);

    // Automatically dismiss toast after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Helpers to get styling and icon based on notification type
  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        };
      case 'danger':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
          icon: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
        };
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}

      {/* Floating Toast Alerts Overlay */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const styles = getToastStyles(toast.type);
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 50 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`p-4 rounded-xl border shadow-lg flex items-start gap-3 pointer-events-auto font-sans text-xs ${styles.bg}`}
              >
                {styles.icon}
                <div className="grow">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold">{toast.title}</span>
                    <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.2 bg-white/60 border border-current/10 rounded-sm uppercase opacity-90">
                      {toast.source}
                    </span>
                  </div>
                  <p className="text-[11px] leading-normal opacity-90 font-medium">
                    {toast.desc}
                  </p>
                </div>
                <button
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded-md hover:bg-black/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
