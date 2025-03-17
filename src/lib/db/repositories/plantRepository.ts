import { query } from '../mysql';
import { Plant } from '../../../types';

export async function createPlant(plant: Omit<Plant, 'id' | 'createdAt'>): Promise<Plant> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await query(
    `INSERT INTO plants (
      id, user_id, name, species, watering_frequency, sunlight,
      temperature_min, temperature_max, humidity_min, humidity_max, image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      plant.userId,
      plant.name,
      plant.species,
      plant.wateringFrequency,
      plant.sunlight,
      plant.temperature.min,
      plant.temperature.max,
      plant.humidity.min,
      plant.humidity.max,
      plant.image
    ]
  );

  return {
    ...plant,
    id,
    createdAt: now
  };
}

export async function getPlantsByUserId(userId: string): Promise<Plant[]> {
  return query<Plant[]>(
    `SELECT 
      id,
      user_id as userId,
      name,
      species,
      watering_frequency as wateringFrequency,
      sunlight,
      temperature_min as "temperature.min",
      temperature_max as "temperature.max",
      humidity_min as "humidity.min",
      humidity_max as "humidity.max",
      image_url as image,
      created_at as createdAt
    FROM plants 
    WHERE user_id = ?
    ORDER BY created_at DESC`,
    [userId]
  );
}

export async function deletePlant(id: string, userId: string): Promise<void> {
  await query(
    'DELETE FROM plants WHERE id = ? AND user_id = ?',
    [id, userId]
  );
}