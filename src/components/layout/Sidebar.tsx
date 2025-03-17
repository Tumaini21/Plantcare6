import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Leaf, 
  Bell, 
  Camera, 
  BookOpen, 
  Users, 
  Settings, 
  BarChart2,
  Shield,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Plants', href: '/dashboard/plants', icon: Leaf },
    { name: 'Reminders', href: '/dashboard/reminders', icon: Bell },
    { name: 'Gallery', href: '/dashboard/gallery', icon: Camera },
    { name: 'Guides', href: '/dashboard/guides', icon: BookOpen },
    { name: 'Community', href: '/dashboard/community', icon: Users },
  ];

  const adminNavigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart2 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Security', href: '/admin/security', icon: Shield },
    { name: 'Reports', href: '/admin/reports', icon: AlertCircle },
  ];

  const navigation = isAdmin ? adminNavigation : userNavigation;

  return (
    <div className="hidden w-64 bg-white lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex h-16 flex-shrink-0 items-center px-4">
          <h1 className="text-xl font-bold text-green-600">
            {isAdmin ? 'PlantCare Admin' : 'PlantCare'}
          </h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-gray-100 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}