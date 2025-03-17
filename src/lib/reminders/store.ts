import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CareReminder } from '../../types';

interface RemindersState {
  reminders: CareReminder[];
  addReminder: (reminder: CareReminder) => void;
  completeReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

export const useReminders = create<RemindersState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'reminders-storage',
    }
  )
);