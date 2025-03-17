import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordFormProps {
  onClose: () => void;
}

export function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Password updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            {...register('currentPassword')}
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            {...register('newPassword')}
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            {...register('confirmPassword')}
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Update Password
        </Button>
      </div>
    </form>
  );
}