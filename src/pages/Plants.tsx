import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Plant } from '../types';
import { Plus, Trash2 } from 'lucide-react';
import { AddPlantForm } from '../components/plants/AddPlantForm';
import { usePlants } from '../lib/plants';
import toast from 'react-hot-toast';

export function PlantsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { plants, addPlant, deletePlant } = usePlants();

  const handleAddPlant = (data: Omit<Plant, 'id' | 'userId' | 'createdAt'>) => {
    addPlant(data);
    setShowAddForm(false);
    toast.success('Plant added successfully!');
  };

  const handleDeletePlant = (id: string) => {
    deletePlant(id);
    toast.success('Plant deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Plants</h1>
          <p className="text-gray-600">Manage your plant collection</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Plant
        </Button>
      </div>

      {showAddForm && (
        <AddPlantForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddPlant}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <div key={plant.id} className="group overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-lg">
            <div className="relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="h-48 w-full object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2 bg-white/90 text-red-600 hover:bg-red-50"
                onClick={() => handleDeletePlant(plant.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">{plant.name}</h3>
              <p className="text-sm text-gray-500">{plant.species}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Watering:</span>
                  <span>Every {plant.wateringFrequency} days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Light:</span>
                  <span className="capitalize">{plant.sunlight}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Temperature:</span>
                  <span>{plant.temperature.min}°C - {plant.temperature.max}°C</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Humidity:</span>
                  <span>{plant.humidity.min}% - {plant.humidity.max}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}