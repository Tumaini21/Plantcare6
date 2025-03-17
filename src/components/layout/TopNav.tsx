import React, { useState } from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationBell } from './NotificationBell';

interface TopNavProps {
  isAdmin?: boolean;
}

export function TopNav({ isAdmin = false }: TopNavProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {!isAdmin && <NotificationBell />}
          {!isAdmin && (
            <Link
              to="/dashboard/settings"
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <Settings className="h-6 w-6" />
            </Link>
          )}
          <div className="relative">
            <button 
              className="flex items-center gap-2 rounded-full bg-gray-100 p-2 text-sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
              <span>{user?.name}</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div className="border-t border-gray-100">
                  {isAdmin ? (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Switch to User View
                    </Link>
                  ) : (
                    user?.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Switch to Admin View
                      </Link>
                    )
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout} 
                    className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}