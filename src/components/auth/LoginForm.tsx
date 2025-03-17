import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { signIn } from '../../lib/auth/service';
import { useAuth } from '../../lib/auth/store';
import toast from 'react-hot-toast';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuth((state) => state.setAuth);
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { user, error, isAdmin, adminRole } = await signIn(data.email, data.password);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (user) {
        setAuth(user, isAdmin);
        toast.success('Successfully signed in!');
        navigate(isAdmin ? '/admin/dashboard' : from, { replace: true });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onCancel={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>
        
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Create an account
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-center text-sm text-gray-600">
            <p>Admin login: admin@plantcare.com / admin123</p>
            <p>Employee login: employee1@plantcare.com / employee123</p>
            <p>Employee login: employee2@plantcare.com / employee123</p>
          </div>
        </div>
      </div>
    </div>
  );
}