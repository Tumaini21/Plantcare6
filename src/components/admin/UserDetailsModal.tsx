import React from 'react';
import { X, Mail, Calendar, Activity, Plane as Plant2, Bell, Camera, Phone, Building } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { useAuth } from '../../lib/auth';
import { usePlants } from '../../lib/plants';

interface UserActivity {
  type: string;
  description: string;
  date: string;
}

interface PlantProgress {
  id: string;
  name: string;
  image: string;
  addedDate: string;
  lastWatered: string;
  health: 'good' | 'average' | 'poor';
  photos: Array<{
    id: string;
    url: string;
    date: string;
    caption: string;
  }>;
}

interface UserDetailsModalProps {
  user: {
    id: string;
    name: string;
    email: string;
    plants: number;
    joinDate: string;
    status: 'active' | 'inactive';
    lastLogin?: string;
    activities: UserActivity[];
    plantProgress: PlantProgress[];
    isEmployee?: boolean;
    department?: string;
    phoneNumber?: string;
    jobTitle?: string;
  };
  onClose: () => void;
  onSuspend: (userId: string) => void;
  onActivate: (userId: string) => void;
}

export function UserDetailsModal({ user, onClose, onSuspend, onActivate }: UserDetailsModalProps) {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'plants' | 'photos'>('overview');
  const { user: currentUser } = useAuth();
  const { plants } = usePlants();

  // Get user's plants
  const userPlants = plants.filter(plant => plant.userId === user.id);

  // Calculate total photos from all plants
  const totalPhotos = userPlants.length;

  // Check if current user is super admin
  const isSuperAdmin = currentUser?.adminRole === 'super_admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* User Profile Section */}
          <div className="border-b bg-white px-6 py-4">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D9488&color=fff`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    {user.email}
                  </div>
                  {user.isEmployee && (
                    <>
                      <div className="flex items-center text-gray-600">
                        <Phone className="mr-2 h-4 w-4" />
                        {user.phoneNumber}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Building className="mr-2 h-4 w-4" />
                        {user.department} - {user.jobTitle}
                      </div>
                    </>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Joined {formatDate(user.joinDate)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="mr-2 h-4 w-4" />
                    Status: <span className={`ml-1 rounded-full px-2 py-1 text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>{user.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b bg-gray-50 px-6">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              {!user.isEmployee && (
                <>
                  <button
                    onClick={() => setActiveTab('plants')}
                    className={`border-b-2 px-1 py-4 text-sm font-medium ${
                      activeTab === 'plants'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Plants
                  </button>
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`border-b-2 px-1 py-4 text-sm font-medium ${
                      activeTab === 'photos'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Photos
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4">
                  {!user.isEmployee && (
                    <>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <Plant2 className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">Plants</span>
                        </div>
                        <p className="mt-2 text-2xl font-semibold">{userPlants.length}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">Reminders</span>
                        </div>
                        <p className="mt-2 text-2xl font-semibold">
                          {user.activities.filter(a => a.type === 'reminder').length}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <Camera className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">Photos</span>
                        </div>
                        <p className="mt-2 text-2xl font-semibold">{totalPhotos}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Recent Activity Section */}
                <div>
                  <h4 className="mb-4 text-lg font-medium">Recent Activity</h4>
                  <div className="space-y-4">
                    {user.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <Activity className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="mt-1 text-xs text-gray-500">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plants' && !user.isEmployee && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium">Plant Collection</h4>
                <div className="grid gap-6 sm:grid-cols-2">
                  {userPlants.map((plant) => (
                    <div key={plant.id} className="overflow-hidden rounded-lg border bg-white shadow">
                      <div className="relative h-48">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h4 className="font-medium text-white">{plant.name}</h4>
                          <p className="text-sm text-gray-200">Added {formatDate(plant.createdAt)}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Species: {plant.species}
                          </span>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && !user.isEmployee && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium">Plant Photos</h4>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {userPlants.map(plant => (
                    <div key={plant.id} className="overflow-hidden rounded-lg border bg-white shadow">
                      <div className="relative aspect-square">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900">{plant.name}</p>
                        <p className="text-sm text-gray-500">{formatDate(plant.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t bg-gray-50 p-4">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {isSuperAdmin && (
              user.status === 'active' ? (
                <Button
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => onSuspend(user.id)}
                >
                  Suspend User
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="text-green-600 hover:bg-green-50"
                  onClick={() => onActivate(user.id)}
                >
                  Activate User
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}