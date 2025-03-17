import toast from 'react-hot-toast';
import { User } from '../../types';

// Define admin accounts
const ADMIN_ACCOUNTS = [
  {
    email: 'admin@plantcare.com',
    password: 'admin123',
    name: 'Super Admin',
    role: 'super_admin'
  },
  {
    email: 'employee1@plantcare.com',
    password: 'employee123',
    name: 'Employee Admin 1',
    role: 'employee_admin'
  },
  {
    email: 'employee2@plantcare.com',
    password: 'employee123',
    name: 'Employee Admin 2',
    role: 'employee_admin'
  }
];

export async function signIn(email: string, password: string): Promise<{ 
  user: User | null; 
  error: string | null; 
  isAdmin: boolean;
  adminRole?: 'super_admin' | 'employee_admin';
}> {
  try {
    // Check for admin accounts
    const adminAccount = ADMIN_ACCOUNTS.find(
      admin => admin.email === email && admin.password === password
    );

    if (adminAccount) {
      const adminUser: User = {
        id: `admin_${adminAccount.role}`,
        email: adminAccount.email,
        name: adminAccount.name,
        isAdmin: true,
        adminRole: adminAccount.role,
        createdAt: new Date().toISOString(),
      };
      return { 
        user: adminUser, 
        error: null, 
        isAdmin: true, 
        adminRole: adminAccount.role 
      };
    }

    // Regular user authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email);
    
    if (!user) {
      throw new Error('No account found with this email');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    // Remove sensitive data before returning
    const { password: _, ...userWithoutPassword } = user;
    return { 
      user: { ...userWithoutPassword, isAdmin: false }, 
      error: null, 
      isAdmin: false 
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { user: null, error: message, isAdmin: false };
  }
}

export async function signUp(email: string, password: string, name: string): Promise<{
  user: User | null;
  error: string | null;
}> {
  try {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    // Prevent admin emails from being used
    if (ADMIN_ACCOUNTS.some(admin => admin.email === email)) {
      throw new Error('This email address is reserved');
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.email === email)) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { user: null, error: message };
  }
}

export async function signOut() {
  localStorage.removeItem('auth-storage');
  return { error: null };
}