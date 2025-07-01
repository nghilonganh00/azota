import React, { createContext, useContext, useState, useCallback } from "react";

// Types
interface Notification {
  id: string;
  message: string;
  type: "SUCCESS" | "WARNING" | "ERROR";
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"], duration?: number) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider Component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: Notification["type"], duration = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: Notification = { id, message, type, duration };

    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

// Notification Container Component
const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const getColor = (type: Notification["type"]) => {
    switch (type) {
      case "SUCCESS":
        return "bg-[#68cc00]";
      case "WARNING":
        return "bg-[#ffcc00]";
      case "ERROR":
        return "bg-[#ff4444]";
      default:
        return "bg-[#68cc00]";
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "SUCCESS":
        return "✓";
      case "WARNING":
        return "⚠";
      case "ERROR":
        return "✕";
      default:
        return "✓";
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center ${getColor(notification.type)} transform rounded-lg px-6 py-3 shadow-lg transition-all duration-300 ease-in-out`}
          style={{
            animation: "slideInRight 0.3s ease-out",
          }}
        >
          <span className="mr-3 text-lg font-bold text-white">{getIcon(notification.type)}</span>
          <div className="flex-1 text-sm font-semibold text-white">{notification.message}</div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-3 text-white transition-colors hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
