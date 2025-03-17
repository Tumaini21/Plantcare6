import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { Button } from '../ui/Button';
import { ImageUpload } from '../ui/ImageUpload';
import { User } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateAvatar = (imageData: string) => {
    updateUser({ avatar: imageData });
    setIsEditing(false);
    toast.success('Profile photo updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Profile Settings</h2>
      
      <div className="flex items-start space-x-4">
        <div className="relative">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <User className="h-10 w-10 text-gray-400" />
            </div>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 -right-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">Update Profile Photo</h3>
            <ImageUpload
              value={user?.avatar}
              onChange={handleUpdateAvatar}
              onRemove={() => {
                updateUser({ avatar: undefined });
                setIsEditing(false);
                toast.success('Profile photo removed');
              }}
              maxSize={5}
            />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}