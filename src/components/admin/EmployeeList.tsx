import React from 'react';
import { Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { Employee } from '../../types';
import { formatDate } from '../../lib/utils';

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Contact</th>
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Joined</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="py-4">
                <div>
                  <p className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{employee.department}</p>
                </div>
              </td>
              <td className="py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {employee.phoneNumber}
                  </div>
                </div>
              </td>
              <td className="py-4">
                <p className="text-sm">{employee.jobTitle}</p>
              </td>
              <td className="py-4">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
              </td>
              <td className="py-4">
                <p className="text-sm text-gray-600">
                  {formatDate(employee.createdAt)}
                </p>
              </td>
              <td className="py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(employee.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}