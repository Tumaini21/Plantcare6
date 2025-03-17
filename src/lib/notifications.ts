import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CareReminder } from '../types';

interface NotificationState {
  unreadCount: number;
  notifications: Array<{
    id: string;
    reminderId: string;
    plantId: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  addNotification: (reminder: CareReminder, plantName: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

export const useNotifications = create<NotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      notifications: [],
      addNotification: (reminder, plantName) => set((state) => {
        const notification = {
          id: Math.random().toString(36).substr(2, 9),
          reminderId: reminder.id,
          plantId: reminder.plantId,
          message: `Time to ${reminder.type} your ${plantName}!`,
          timestamp: new Date().toISOString(),
          read: false,
        };
        return {
          notifications: [notification, ...state.notifications],
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