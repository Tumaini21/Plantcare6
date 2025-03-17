import React from 'react';
import { Plant } from '../../types';
import { PlantCard } from './PlantCard';

interface RecentPlantsProps {
  plants: Plant[];
}

export function RecentPlants({ plants }: RecentPlantsProps) {
  const recentPlants = plants.slice(0, 3); // Show only the 3 most recent plants

  if (recentPlants.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-600">No plants added yet. Add your first plant to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recentPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}