import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ChangePasswordForm } from '../components/settings/ChangePasswordForm';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { DeleteAccountModal } from '../components/settings/DeleteAccountModal';

export function SettingsPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <ProfileSettings />
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium">Notification Preferences</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive care reminders via email</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive care reminders on your device</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium">Account Settings</h2>
        {showPasswordForm ? (
          <div className="mt-4">
            <ChangePasswordForm onClose={() => setShowPasswordForm(false)} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
              Change Password
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}