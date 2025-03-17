import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AddEmployeeModal } from '../../components/admin/AddEmployeeModal';
import { EmployeeList } from '../../components/admin/EmployeeList';
import { Employee } from '../../types';
import toast from 'react-hot-toast';

export function EmployeesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleAddEmployee = async (data: any) => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      jobTitle: data.jobTitle,
      department: data.department,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setEmployees([...employees, newEmployee]);
    toast.success('Employee added successfully');
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee deleted successfully');
  };

  const filteredEmployees = employees.filter(employee => 
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-600">Manage your employee accounts</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <EmployeeList
          employees={filteredEmployees}
          onDelete={handleDeleteEmployee}
        />
      </div>

      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEmployee}
        />
      )}
    </div>
  );
}