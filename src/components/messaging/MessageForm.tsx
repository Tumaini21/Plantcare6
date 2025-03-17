import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Employee } from '../../types';
import toast from 'react-hot-toast';

const messageSchema = z.object({
  recipientId: z.string().min(1, 'Please select a recipient'),
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject is too long'),
  content: z.string().min(1, 'Message content is required').max(1000, 'Message is too long')
});

type MessageFormData = z.infer<typeof messageSchema>;

interface MessageFormProps {
  recipients: Employee[];
  onSubmit: (data: MessageFormData) => Promise<void>;
}

export function MessageForm({ recipients, onSubmit }: MessageFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema)
  });

  const handleFormSubmit = async (data: MessageFormData) => {
    try {
      await onSubmit(data);
      reset();
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          To
        </label>
        <select
          {...register('recipientId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select Recipient</option>
          {recipients.map((recipient) => (
            <option key={recipient.id} value={recipient.id}>
              {recipient.firstName} {recipient.lastName} - {recipient.department}
            </option>
          ))}
        </select>
        {errors.recipientId && (
          <p className="mt-1 text-sm text-red-600">{errors.recipientId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          {...register('subject')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          {...register('content')}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Send Message
        </Button>
      </div>
    </form>
  );
}