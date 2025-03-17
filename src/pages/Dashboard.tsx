import React from 'react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RecentPlants } from '../components/dashboard/RecentPlants';
import { QuickActions } from '../components/dashboard/QuickActions';
import { usePlants } from '../lib/plants';
import { useAuth } from '../lib/auth';
import { Bell, Calendar, MessageSquare, Sun, Cloud, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';

interface WeatherInfo {
  temp: number;
  humidity: number;
  condition: string;
}

interface ActivityCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
  type: 'reminder' | 'message' | 'task';
}

function WeatherCard({ weather }: { weather: WeatherInfo }) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Today's Weather</h3>
          <p className="mt-1 text-sm text-blue-100">Perfect for your plants</p>
        </div>
        <Sun className="h-10 w-10 text-yellow-300" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-blue-100">Temperature</p>
          <div className="mt-1 flex items-center">
            <Thermometer className="mr-2 h-4 w-4" />
            <span className="text-2xl font-bold">{weather.temp}°C</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-blue-100">Humidity</p>
          <div className="mt-1 flex items-center">
            <Cloud className="mr-2 h-4 w-4" />
            <span className="text-2xl font-bold">{weather.humidity}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-blue-100">Condition</p>
          <p className="mt-1 text-2xl font-bold capitalize">{weather.condition}</p>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ icon: Icon, title, description, time, type }: ActivityCardProps) {
  return (
    <div className={`flex items-start gap-4 rounded-lg border p-4 ${
      type === 'reminder' ? 'bg-blue-50 border-blue-100' :
      type === 'message' ? 'bg-green-50 border-green-100' :
      'bg-purple-50 border-purple-100'
    }`}>
      <div className={`rounded-full p-2 ${
        type === 'reminder' ? 'bg-blue-100' :
        type === 'message' ? 'bg-green-100' :
        'bg-purple-100'
      }`}>
        <Icon className={`h-5 w-5 ${
          type === 'reminder' ? 'text-blue-600' :
          type === 'message' ? 'text-green-600' :
          'text-purple-600'
        }`} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="mt-1 text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { plants } = usePlants();
  const { user } = useAuth();

  // Mock weather data - in a real app, this would come from a weather API
  const weather: WeatherInfo = {
    temp: 22,
    humidity: 65,
    condition: "sunny"
  };

  const upcomingActivities = [
    {
      icon: Bell,
      title: 'Water Snake Plant',
      description: 'Reminder: Time to water your Snake Plant',
      time: formatDate(new Date().toISOString()),
      type: 'reminder' as const,
    },
    {
      icon: MessageSquare,
      title: 'New Message',
      description: 'You have a new message from Admin',
      time: formatDate(new Date().toISOString()),
      type: 'message' as const,
    },
    {
      icon: Calendar,
      title: 'Plant Check-up',
      description: 'Schedule: Monthly plant health check',
      time: formatDate(new Date().toISOString()),
      type: 'task' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 🌿</h1>
        <p className="mt-2 text-lg text-gray-600">Here's how your plants are doing today</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardStats plants={plants} />
        </div>
        <div>
          <WeatherCard weather={weather} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Plants</h2>
                <p className="text-sm text-gray-600">Recent additions to your collection</p>
              </div>
              <Link
                to="/dashboard/plants"
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                View all plants
              </Link>
            </div>

            <RecentPlants plants={plants} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
            </div>
            <QuickActions />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Activities</h2>
              <p className="text-sm text-gray-600">Your scheduled tasks and reminders</p>
            </div>
            <div className="space-y-4">
              {upcomingActivities.map((activity, index) => (
                <ActivityCard key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}