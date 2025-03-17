export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  adminRole?: 'super_admin' | 'employee_admin';
  avatar?: string;
  createdAt: string;
  password?: string; // Only used internally, never exposed to frontend
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  wateringFrequency: number;
  sunlight: 'low' | 'medium' | 'high';
  temperature: {
    min: number;
    max: number;
  };
  humidity: {
    min: number;
    max: number;
  };
  image: string;
  createdAt: string;
  userId: string;
}

export interface CareReminder {
  id: string;
  userId: string;
  plantId: string;
  type: string;
  frequency: number;
  time: string;
  lastCompleted?: string;
  nextDue: string;
  notes?: string;
}

export interface PlantPhoto {
  id: string;
  userId: string;
  plantId: string;
  imageUrl: string;
  caption: string;
  type: 'progress' | 'issue' | 'achievement';
  likes: number;
  createdAt: string;
}