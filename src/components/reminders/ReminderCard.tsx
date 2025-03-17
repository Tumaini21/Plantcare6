import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Check, Trash2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { CareReminder, Plant } from '../../types';
import { formatDate, formatRelativeTime } from '../../lib/utils';

interface ReminderCardProps {
  reminder: CareReminder;
  plant: Plant;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, plant, onComplete, onDelete }: ReminderCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const isOverdue = new Date(reminder.nextDue) < new Date();

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const due = new Date(reminder.nextDue);
      const diffInSeconds = Math.floor((due.getTime() - now.getTime()) / 1000);

      if (diffInSeconds < 0) {
        setTimeLeft('Overdue');
        return;
      }

      const days = Math.floor(diffInSeconds / 86400);
      const hours = Math.floor((diffInSeconds % 86400) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h remaining`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeLeft(`${minutes}m remaining`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [reminder.nextDue]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return new Date(2000, 0, 1, parseInt(hours), parseInt(minutes)).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={`rounded-lg bg-white p-4 shadow transition-all ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-lg bg-green-100 p-2 ${isOverdue ? 'bg-red-100' : ''}`}>
            <Bell className={`h-5 w-5 ${isOverdue ? 'text-red-600' : 'text-green-600'}`} />
          </div>
          <div>
            <h3 className="font-medium capitalize">{reminder.type}</h3>
            <p className="text-sm text-gray-500">
              {plant.name}
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Due: {formatDate(reminder.nextDue)}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Time: {formatTime(reminder.time)}</span>
            </div>
            <p className={`mt-1 text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-green-600'}`}>
              {timeLeft}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onComplete(reminder.id)}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(reminder.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}