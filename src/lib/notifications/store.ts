import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationStore } from './types';

export const useNotifications = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) => set((state) => {
        const newNotification = {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          read: false,
        };
        
        // Show browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/vite.svg',
          });
        }

        return {
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        };
      }),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),
      clearNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.unreadCount - (state.notifications.find((n) => n.id === id)?.read ? 0 : 1),
      })),
    }),
    {
      name: 'notifications-storage',
    }
  )
);