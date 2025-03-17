import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { ImageUpload } from '../ui/ImageUpload';
import { X } from 'lucide-react';

const plantSchema = z.object({
  name: z.string().min(1, 'Plant name is required'),
  species: z.string().min(1, 'Species is required'),
  wateringFrequency: z.number().min(1, 'Watering frequency must be at least 1 day'),
  sunlight: z.enum(['low', 'medium', 'high']),
  temperature: z.object({
    min: z.number().min(0, 'Minimum temperature must be at least 0°C'),
    max: z.number().min(0, 'Maximum temperature must be at least 0°C'),
  }),
  humidity: z.object({
    min: z.number().min(0, 'Minimum humidity must be at least 0%'),
    max: z.number().min(0, 'Maximum humidity must be at least 0%'),
  }),
  image: z.string().min(1, 'Plant image is required'),
});

type PlantFormData = z.infer<typeof plantSchema>;

interface AddPlantFormProps {
  onClose: () => void;
  onSubmit: (data: PlantFormData) => void;
}

export function AddPlantForm({ onClose, onSubmit }: AddPlantFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      sunlight: 'medium',
      wateringFrequency: 7,
      temperature: { min: 18, max: 30 },
      humidity: { min: 40, max: 60 },
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-10 border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Add New Plant</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plant Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Species</label>
                <input
                  type="text"
                  {...register('species')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.species && <p className="mt-1 text-sm text-red-600">{errors.species.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Watering Frequency (days)</label>
                <input
                  type="number"
                  {...register('wateringFrequency', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.wateringFrequency && <p className="mt-1 text-sm text-red-600">{errors.wateringFrequency.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sunlight Needs</label>
                <select
                  {...register('sunlight')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="low">Low Light</option>
                  <option value="medium">Medium Light</option>
                  <option value="high">High Light</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature Range (°C)</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    {...register('temperature.min', { valueAsNumber: true })}
                    placeholder="Min"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    {...register('temperature.max', { valueAsNumber: true })}
                    placeholder="Max"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                {(errors.temperature?.min || errors.temperature?.max) && (
                  <p className="mt-1 text-sm text-red-600">Please enter valid temperature range</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Humidity Range (%)</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    {...register('humidity.min', { valueAsNumber: true })}
                    placeholder="Min"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    {...register('humidity.max', { valueAsNumber: true })}
                    placeholder="Max"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                {(errors.humidity?.min || errors.humidity?.max) && (
                  <p className="mt-1 text-sm text-red-600">Please enter valid humidity range</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Plant Image</label>
              <ImageUpload
                value={watch('image')}
                onChange={(value) => setValue('image', value)}
                onRemove={() => setValue('image', '')}
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 border-t bg-white px-6 py-4">
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              Add Plant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}