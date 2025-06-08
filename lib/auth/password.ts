import bcrypt from 'bcrypt';

export async function hashPassword(raw: string) {
  return bcrypt.hash(raw, 10);
}

export async function verifyPassword(raw: string, hashed: string) {
  return bcrypt.compare(raw, hashed);
}
