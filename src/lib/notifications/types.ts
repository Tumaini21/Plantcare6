export interface Notification {
  id: string;
  type: 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  metadata?: {
    reminderId?: string;
    plantId?: string;
  };
}

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}