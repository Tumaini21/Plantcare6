import React from 'react';
import { Plant } from '../../types';
import { Calendar, Droplet, Thermometer } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={plant.image}
          alt={plant.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h4 className="font-medium text-white">{plant.name}</h4>
          <p className="text-sm text-gray-200">{plant.species}</p>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Droplet className="h-4 w-4" />
          <span>Water every {plant.wateringFrequency} days</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Thermometer className="h-4 w-4" />
          <span>{plant.temperature.min}°C - {plant.temperature.max}°C</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Added {formatDate(plant.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}