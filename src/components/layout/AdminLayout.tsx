import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/auth/store';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function AdminLayout() {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isAdmin />
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-64">
        <TopNav isAdmin />
        <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}