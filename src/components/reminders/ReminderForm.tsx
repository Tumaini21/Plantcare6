import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Plant } from '../../types';
import { DateTimePicker } from './DateTimePicker';
import { addDays } from 'date-fns';

const reminderSchema = z.object({
  plantId: z.string().min(1, 'Please select a plant'),
  type: z.enum(['watering', 'fertilizing', 'pruning', 'custom']),
  frequency: z.number().min(1, 'Frequency must be at least 1 day'),
  customType: z.string().optional(),
  notes: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

interface ReminderFormProps {
  plants: Plant[];
  onSubmit: (data: ReminderFormData & { startDate: Date; time: string }) => void;
  onCancel: () => void;
}

export function ReminderForm({ plants, onSubmit, onCancel }: ReminderFormProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('09:00');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      type: 'watering',
      frequency: 7,
    },
  });

  const selectedType = watch('type');

  const handleFormSubmit = (data: ReminderFormData) => {
    onSubmit({ ...data, startDate, time });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Plant
        </label>
        <select
          {...register('plantId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select a plant</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name} ({plant.species})
            </option>
          ))}
        </select>
        {errors.plantId && (
          <p className="mt-1 text-sm text-red-600">{errors.plantId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reminder Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="watering">Watering</option>
          <option value="fertilizing">Fertilizing</option>
          <option value="pruning">Pruning</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {selectedType === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custom Reminder Type
          </label>
          <input
            type="text"
            {...register('customType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="e.g., Repotting"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Repeat Every (days)
        </label>
        <input
          type="number"
          {...register('frequency', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          min="1"
        />
        {errors.frequency && (
          <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
        )}
      </div>

      <DateTimePicker
        date={startDate}
        time={time}
        onDateChange={setStartDate}
        onTimeChange={setTime}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes (optional)
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Reminder
        </Button>
      </div>
    </form>
  );
}