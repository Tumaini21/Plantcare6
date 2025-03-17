import React from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '../lib/notifications';
import { Button } from '../components/ui/Button';
import { formatRelativeTime } from '../lib/utils';

export function NotificationsPage() {
  const { notifications, markAsRead, clearNotification, markAllAsRead } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg bg-white p-4 shadow transition-colors ${
                !notification.read ? 'border-l-4 border-green-600' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Bell className={`h-6 w-6 ${!notification.read ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatRelativeTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}