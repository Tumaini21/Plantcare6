import { useNotifications } from '../notifications/store';
import { usePlants } from '../plants';
import { useReminders } from './store';
import { formatRelativeTime } from '../utils';

export function checkDueReminders() {
  const { reminders, completeReminder } = useReminders.getState();
  const { plants } = usePlants.getState();
  const { addNotification } = useNotifications.getState();
  const now = new Date();

  reminders.forEach((reminder) => {
    const dueDate = new Date(reminder.nextDue);
    const plant = plants.find((p) => p.id === reminder.plantId);
    
    if (!plant) return;

    // Check if reminder is due within the next minute
    const timeDiff = dueDate.getTime() - now.getTime();
    if (timeDiff <= 60000 && timeDiff > 0) { // Due within next minute
      addNotification({
        type: 'reminder',
        title: `Time to ${reminder.type} ${plant.name}!`,
        message: `${plant.name} needs ${reminder.type} ${formatRelativeTime(reminder.nextDue)}`,
        metadata: {
          reminderId: reminder.id,
          plantId: plant.id,
        },
      });
    }
  });
}

export function initializeReminderChecker() {
  // Check reminders every minute
  const interval = setInterval(checkDueReminders, 60000);
  
  // Initial check
  checkDueReminders();

  return () => clearInterval(interval);
}