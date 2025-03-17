import React, { useState } from 'react';
import { Shield, Key, Lock, UserX, AlertTriangle, Eye, EyeOff, RefreshCw, Globe, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

interface SecurityLog {
  id: string;
  event: string;
  user: string;
  timestamp: string;
  ip: string;
  location: string;
  status: 'success' | 'failed' | 'warning';
  details?: string;
}

// Mock security logs - in a real app, this would come from your API
const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    event: 'Login attempt',
    user: 'john@example.com',
    timestamp: '2024-03-10T10:30:00Z',
    ip: '192.168.1.1',
    location: 'New York, US',
    status: 'success'
  },
  {
    id: '2',
    event: 'Password change',
    user: 'jane@example.com',
    timestamp: '2024-03-10T09:15:00Z',
    ip: '192.168.1.2',
    location: 'London, UK',
    status: 'success'
  },
  {
    id: '3',
    event: 'Multiple failed login attempts',
    user: 'unknown@example.com',
    timestamp: '2024-03-10T08:45:00Z',
    ip: '192.168.1.3',
    location: 'Beijing, CN',
    status: 'warning',
    details: '5 failed attempts in 10 minutes'
  },
  {
    id: '4',
    event: 'Suspicious activity detected',
    user: 'mike@example.com',
    timestamp: '2024-03-10T07:30:00Z',
    ip: '192.168.1.4',
    location: 'Moscow, RU',
    status: 'failed',
    details: 'Login attempt from unusual location'
  }
];

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'authentication' | 'access' | 'monitoring';
}

const securitySettings: SecuritySetting[] = [
  {
    id: 'two-factor',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all admin accounts',
    enabled: true,
    category: 'authentication'
  },
  {
    id: 'password-policy',
    name: 'Strong Password Policy',
    description: 'Enforce complex passwords with minimum requirements',
    enabled: true,
    category: 'authentication'
  },
  {
    id: 'password-expiry',
    name: 'Password Expiry',
    description: 'Force password change every 90 days',
    enabled: false,
    category: 'authentication'
  },
  {
    id: 'session-timeout',
    name: 'Session Timeout',
    description: 'Automatically log out inactive users after 30 minutes',
    enabled: true,
    category: 'access'
  },
  {
    id: 'ip-restriction',
    name: 'IP Restriction',
    description: 'Restrict admin access to specific IP addresses',
    enabled: false,
    category: 'access'
  },
  {
    id: 'login-attempts',
    name: 'Login Attempt Limit',
    description: 'Lock account after 5 failed login attempts',
    enabled: true,
    category: 'access'
  },
  {
    id: 'activity-logging',
    name: 'Activity Logging',
    description: 'Log all security-related activities',
    enabled: true,
    category: 'monitoring'
  },
  {
    id: 'real-time-alerts',
    name: 'Real-time Security Alerts',
    description: 'Send notifications for suspicious activities',
    enabled: true,
    category: 'monitoring'
  }
];

interface BlockedIP {
  ip: string;
  reason: string;
  timestamp: string;
  location: string;
}

const mockBlockedIPs: BlockedIP[] = [
  {
    ip: '192.168.1.100',
    reason: 'Multiple failed login attempts',
    timestamp: '2024-03-09T15:30:00Z',
    location: 'Unknown'
  },
  {
    ip: '192.168.1.101',
    reason: 'Suspicious activity',
    timestamp: '2024-03-08T12:45:00Z',
    location: 'Shanghai, CN'
  }
];

export function SecurityPage() {
  const [settings, setSettings] = useState(securitySettings);
  const [showBlockedIPs, setShowBlockedIPs] = useState(false);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
    toast.success('Security setting updated successfully');
  };

  const getStatusColor = (status: SecurityLog['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-gray-600">Manage system security and access controls</p>
      </div>

      {/* Security Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-medium">Security Score</h3>
            </div>
            <span className="text-2xl font-bold text-green-600">85%</span>
          </div>
          <p className="mt-2 text-sm text-green-600">Good security practices in place</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-medium">Active Threats</h3>
            </div>
            <span className="text-2xl font-bold text-yellow-600">2</span>
          </div>
          <p className="mt-2 text-sm text-yellow-600">Requires attention</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Protected Regions</h3>
            </div>
            <span className="text-2xl font-bold text-blue-600">12</span>
          </div>
          <p className="mt-2 text-sm text-blue-600">Geographical access controls</p>
        </div>
      </div>

      {/* Security Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <h2 className="flex items-center text-lg font-medium">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              Authentication Controls
            </h2>
          </div>

          <div className="space-y-4">
            {settings
              .filter(setting => setting.category === 'authentication')
              .map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <h2 className="flex items-center text-lg font-medium">
              <Lock className="mr-2 h-5 w-5 text-green-600" />
              Access Controls
            </h2>
          </div>

          <div className="space-y-4">
            {settings
              .filter(setting => setting.category === 'access')
              .map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              ))}
          </div>

          <div className="mt-6 space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowBlockedIPs(!showBlockedIPs)}
              className="w-full"
            >
              <UserX className="mr-2 h-4 w-4" />
              Manage Blocked IPs
            </Button>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-medium">Security Logs</h2>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                className="rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">Monitor security events and login attempts</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium">Event</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">IP Address</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockSecurityLogs.map(log => (
                <tr key={log.id}>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{log.event}</p>
                      {log.details && (
                        <p className="text-sm text-gray-500">{log.details}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4">{log.user}</td>
                  <td className="py-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-4">{log.ip}</td>
                  <td className="py-4">{log.location}</td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blocked IPs Modal */}
      {showBlockedIPs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">Blocked IP Addresses</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowBlockedIPs(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">IP Address</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Reason</th>
                    <th className="pb-3 font-medium">Blocked On</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockBlockedIPs.map((ip) => (
                    <tr key={ip.ip}>
                      <td className="py-4">{ip.ip}</td>
                      <td className="py-4">{ip.location}</td>
                      <td className="py-4">{ip.reason}</td>
                      <td className="py-4">{new Date(ip.timestamp).toLocaleString()}</td>
                      <td className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => {
                            toast.success('IP address unblocked');
                            setShowBlockedIPs(false);
                          }}
                        >
                          Unblock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setShowBlockedIPs(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}