import React, { useState, useEffect } from 'react';
import { Users, Flower, Bell, Search, Filter, Download, ChevronRight, Leaf, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { UserDetailsModal } from '../../components/admin/UserDetailsModal';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Employee } from '../../types';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <Icon className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
            <span className="block text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  to: string;
}

function QuickActionCard({ title, description, icon: Icon, to }: QuickActionCardProps) {
  return (
    <Link
      to={to}
      className="flex items-start rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg"
    >
      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
        <Icon className="h-6 w-6 text-green-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        <div className="mt-2 flex items-center text-sm text-green-600">
          <span>View details</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEmployees, setShowEmployees] = useState(false);

  useEffect(() => {
    // Load users and employees from localStorage
    const loadData = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        
        // Add default admin user if not present
        const adminUser = {
          id: 'admin',
          name: 'Super Admin',
          email: 'admin@plantcare.com',
          isEmployee: true,
          department: 'Administration',
          phoneNumber: '+1 (555) 123-4567',
          jobTitle: 'System Administrator',
          status: 'active',
          joinDate: '2024-01-01T00:00:00.000Z',
          activities: [
            {
              type: 'Login',
              description: 'System access',
              date: new Date().toISOString()
            }
          ]
        };

        const hasAdmin = storedUsers.some((user: User) => user.email === 'admin@plantcare.com');
        if (!hasAdmin) {
          storedUsers.push(adminUser);
        }

        setUsers(storedUsers);
        setEmployees(storedEmployees);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    loadData();
  }, []);

  const stats = {
    totalUsers: users.length,
    totalEmployees: employees.length,
    activeReminders: 15,
    totalPlants: users.reduce((acc, user) => acc + (user.plants?.length || 0), 0),
  };

  const trends = {
    users: { value: 12, isPositive: true },
    employees: { value: 8, isPositive: true },
    plants: { value: 15, isPositive: true },
    reminders: { value: 5, isPositive: false }
  };

  const displayUsers = showEmployees 
    ? users.filter(user => user.isEmployee)
    : users.filter(user => !user.isEmployee);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your PlantCare system</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          trend={trends.users}
        />
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          trend={trends.employees}
        />
        <StatCard
          title="Total Plants"
          value={stats.totalPlants}
          icon={Flower}
          trend={trends.plants}
        />
        <StatCard
          title="Active Reminders"
          value={stats.activeReminders}
          icon={Bell}
          trend={trends.reminders}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          title="Manage Employees"
          description="Add, edit, or remove employee accounts"
          icon={Users}
          to="/admin/employees"
        />
        <QuickActionCard
          title="Plant Management"
          description="Monitor and manage user plants"
          icon={Leaf}
          to="/admin/plants"
        />
        <QuickActionCard
          title="Messages"
          description="View and manage system messages"
          icon={MessageSquare}
          to="/admin/messages"
        />
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <p className="text-sm text-gray-600">Latest actions across the platform</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowEmployees(!showEmployees)}
              >
                {showEmployees ? 'Show Users' : 'Show Employees'}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {displayUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {user.isEmployee && (
                    <p className="text-sm text-gray-500">{user.department}</p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(user)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuspend={() => {
            // Handle user suspension
            toast.success('User suspended successfully');
            setSelectedUser(null);
          }}
          onActivate={() => {
            // Handle user activation
            toast.success('User activated successfully');
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}