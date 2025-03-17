import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ReminderForm } from '../components/reminders/ReminderForm';
import { ReminderCard } from '../components/reminders/ReminderCard';
import { usePlants } from '../lib/plants';
import { useReminders } from '../lib/reminders';
import toast from 'react-hot-toast';

export function RemindersPage() {
  const [showForm, setShowForm] = useState(false);
  const { plants } = usePlants();
  const { reminders, addReminder, completeReminder, deleteReminder } = useReminders();

  const handleAddReminder = (data: any) => {
    const [hours, minutes] = data.time.split(':').map(Number);
    const nextDue = new Date(data.startDate);
    nextDue.setHours(hours, minutes, 0, 0);

    const newReminder = {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1',
      plantId: data.plantId,
      type: data.type === 'custom' ? data.customType : data.type,
      frequency: data.frequency,
      time: data.time,
      lastCompleted: new Date().toISOString(),
      nextDue: nextDue.toISOString(),
      notes: data.notes,
    };

    addReminder(newReminder);
    setShowForm(false);
    toast.success('Reminder created successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Care Reminders</h1>
          <p className="text-gray-600">Keep track of your plant care schedule</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium">Create New Reminder</h2>
          <ReminderForm
            plants={plants}
            onSubmit={handleAddReminder}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {reminders.map((reminder) => {
          const plant = plants.find(p => p.id === reminder.plantId);
          if (!plant) return null;
          
          return (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              plant={plant}
              onComplete={() => {
                completeReminder(reminder.id);
                toast.success('Reminder marked as complete!');
              }}
              onDelete={() => {
                deleteReminder(reminder.id);
                toast.success('Reminder deleted successfully!');
              }}
            />
          );
        })}
      </div>
    </div>
  );
}