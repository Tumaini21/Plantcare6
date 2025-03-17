import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { AuthGuard } from './components/auth/AuthGuard';

// Import pages
import { DashboardPage } from './pages/Dashboard';
import { PlantsPage } from './pages/Plants';
import { RemindersPage } from './pages/Reminders';
import { GalleryPage } from './pages/Gallery';
import { GuidesPage } from './pages/Guides';
import { CommunityPage } from './pages/Community';
import { SettingsPage } from './pages/Settings';
import { NotificationsPage } from './pages/Notifications';
import { AdminDashboard } from './pages/admin/Dashboard';
import { SecurityPage } from './pages/admin/Security';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          
          {/* User routes */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="plants" element={<PlantsPage />} />
            <Route path="reminders" element={<RemindersPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="guides" element={<GuidesPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;