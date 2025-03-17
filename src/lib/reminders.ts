import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CareReminder } from '../types';
import { useNotifications } from './notifications';
import { usePlants } from './plants';

interface RemindersState {
  reminders: CareReminder[];
  addReminder: (reminder: CareReminder) => void;
  completeReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  checkDueReminders: () => void;
}

export const useReminders = create<RemindersState>()(
  persist(
    (set, get) => ({
      reminders: [],
      addReminder: (reminder) => set((state) => ({
        reminders: [...state.reminders, reminder],
      })),
      completeReminder: (id) => set((state) => ({
        reminders: state.reminders.map((reminder) =>
          reminder.id === id
            ? {
                ...reminder,
                lastCompleted: new Date().toISOString(),
                nextDue: new Date(
                  Date.now() + reminder.frequency * 24 * 60 * 60 * 1000
                ).toISOString(),
              }
            : reminder
        ),
      })),
      deleteReminder: (id) => set((state) => ({
        reminders: state.reminders.filter((reminder) => reminder.id !== id),
      })),
      checkDueReminders: () => {
        const { reminders } = get();
        const now = new Date();
        const plants = usePlants.getState().plants;
        const addNotification = useNotifications.getState().addNotification;

        reminders.forEach((reminder) => {
          const dueDate = new Date(reminder.nextDue);
          if (dueDate <= now && !reminder.lastCompleted) {
            const plant = plants.find((p) => p.id === reminder.plantId);
            if (plant) {
              addNotification(reminder, plant.name);
              // Mark as completed to prevent duplicate notifications
              get().completeReminder(reminder.id);
            }
          }
        });
      },
    }),
    {
      name: 'reminders-storage',
    }
  )
);

// Initialize reminder checking
let checkInterval: number;

export function initializeReminderChecking() {
  // Clear any existing interval
  if (checkInterval) {
    clearInterval(checkInterval);
  }

  // Perform initial check
  useReminders.getState().checkDueReminders();

  // Set up interval for future checks
  checkInterval = window.setInterval(() => {
    useReminders.getState().checkDueReminders();
  }, 60000); // Check every minute

  return () => {
    if (checkInterval) {
      clearInterval(checkInterval);
    }
  };
}