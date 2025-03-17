import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plant } from '../types';

interface PlantsState {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, 'id' | 'userId' | 'createdAt'>) => void;
  deletePlant: (id: string) => void;
}

export const usePlants = create<PlantsState>()(
  persist(
    (set) => ({
      plants: [],
      addPlant: (plantData) => set((state) => ({
        plants: [
          ...state.plants,
          {
            ...plantData,
            id: Math.random().toString(36).substr(2, 9),
            userId: '1', // In a real app, this would come from auth
            createdAt: new Date().toISOString(),
          },
        ],
      })),
      deletePlant: (id) => set((state) => ({
        plants: state.plants.filter((plant) => plant.id !== id),
      })),
    }),
    {
      name: 'plants-storage',
    }
  )
);