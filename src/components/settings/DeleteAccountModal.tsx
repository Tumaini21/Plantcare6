import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Please enter your password to confirm'),
  confirmation: z.string().refine(val => val === 'DELETE', {
    message: 'Please type DELETE to confirm'
  })
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

interface DeleteAccountModalProps {
  onClose: () => void;
}

export function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });

  const onSubmit = async (data: DeleteAccountFormData) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log out the user and redirect to login page
      logout();
      toast.success('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('Failed to delete account. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          This action cannot be undone. All your data will be permanently deleted.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type DELETE to confirm
            </label>
            <input
              type="text"
              {...register('confirmation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="DELETE"
            />
            {errors.confirmation && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmation.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              isLoading={isSubmitting}
            >
              Delete Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}