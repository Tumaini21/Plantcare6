import React from 'react';
import { format } from 'date-fns';

interface DateTimePickerProps {
  date: Date;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

export function DateTimePicker({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          min={format(new Date(), 'yyyy-MM-dd')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
    </div>
  );
}