import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail, EmailError } from '../../lib/email';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export function ForgotPasswordForm({ onCancel }: ForgotPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError(null);
      await sendPasswordResetEmail(data.email);
      setIsSubmitted(true);
      toast.success('Reset instructions sent successfully');
    } catch (error) {
      console.error('Password reset failed:', error);
      if (error instanceof EmailError) {
        setError('Email service is not properly configured. Please try again later or contact support.');
        toast.error('Email service error');
      } else {
        setError('An unexpected error occurred. Please try again later.');
        toast.error('Failed to send reset instructions');
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent password reset instructions to:
          </p>
          <p className="mt-1 font-medium text-gray-900">{email}</p>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Try another email
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <Link to="/login" className="flex items-center text-green-600 hover:text-green-500">
              Back to login
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <p className="mt-2 text-sm text-gray-600">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Send Instructions
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link to="/login" className="text-green-600 hover:text-green-500">
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
}