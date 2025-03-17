import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../lib/notifications';

export function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <Link 
      to="/dashboard/notifications"
      className="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
    >
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );
}