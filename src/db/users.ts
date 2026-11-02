// @ts-nocheck
import { db } from './index';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email: string) {
  try {
    const result = await (db as any).select().from(users).where(eq(users.email, email));
    return result[0] || null;
  } catch (error) {
    console.error('Database query failed in getUserByEmail:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserById(id: number) {
  try {
    const result = await (db as any).select().from(users).where(eq(users.id, id));
    return result[0] || null;
  } catch (error) {
    console.error('Database query failed in getUserById:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getOrCreateUser(email: string, role: string = 'admin') {
  try {
    const existing = await getUserByEmail(email);
    if (existing) return existing;

    const result = await (db as any).insert(users)
      .values({
        email,
        role,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
