import React from 'react';
import { Plant } from '../../types';
import { StatsCard } from './StatsCard';
import { Leaf, Droplet, Sun, Heart } from 'lucide-react';

interface DashboardStatsProps {
  plants: Plant[];
}

export function DashboardStats({ plants }: DashboardStatsProps) {
  const plantsToWater = plants.filter(plant => {
    const lastWatering = new Date(plant.createdAt);
    const daysElapsed = Math.floor((new Date().getTime() - lastWatering.getTime()) / (1000 * 60 * 60 * 24));
    return daysElapsed >= plant.wateringFrequency;
  }).length;

  const healthyPlants = plants.filter(plant => {
    const optimalTemp = plant.temperature.min <= 22 && plant.temperature.max >= 22;
    const optimalHumidity = plant.humidity.min <= 50 && plant.humidity.max >= 50;
    return optimalTemp && optimalHumidity;
  }).length;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Plants" 
        value={plants.length}
        icon={Leaf}
        trend={{
          value: 12,
          isPositive: true
        }}
      />
      <StatsCard 
        title="Plants to Water" 
        value={plantsToWater}
        icon={Droplet}
        valueColor="text-blue-600"
      />
      <StatsCard 
        title="Healthy Plants" 
        value={healthyPlants}
        icon={Heart}
        valueColor="text-green-600"
      />
      <StatsCard 
        title="Light Conditions" 
        value={plants.filter(p => p.sunlight === 'high').length}
        icon={Sun}
        valueColor="text-yellow-600"
      />
    </div>
  );
}