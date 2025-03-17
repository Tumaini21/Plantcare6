import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

export async function hash(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await pbkdf2Async(
    password,
    salt,
    ITERATIONS,
    KEYLEN,
    DIGEST
  );
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verify(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, key] = hashedPassword.split(':');
  const derivedKey = await pbkdf2Async(
    password,
    salt,
    ITERATIONS,
    KEYLEN,
    DIGEST
  );
  return key === derivedKey.toString('hex');
}