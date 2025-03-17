import { query, transaction } from '../mysql';
import { User } from '../../../types';
import { hash, verify } from '../auth/password';

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const passwordHash = await hash(password);
  const id = crypto.randomUUID();

  await query(
    'INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)',
    [id, email, passwordHash, name]
  );

  return {
    id,
    email,
    name,
    createdAt: new Date().toISOString()
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await query<User[]>(
    'SELECT id, email, name, created_at as createdAt FROM users WHERE email = ?',
    [email]
  );
  return users[0] || null;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const users = await query<Array<User & { password_hash: string }>>(
    'SELECT id, email, name, password_hash, created_at as createdAt FROM users WHERE email = ?',
    [email]
  );

  const user = users[0];
  if (!user || !await verify(password, user.password_hash)) {
    return null;
  }

  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}