import { adminAuth } from '../lib/firebase-admin';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { NextRequest } from 'next/server';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  name?: string;
  decodedToken: DecodedIdToken;
}

export async function verifyAuthToken(authHeader: string | null): Promise<AuthenticatedUser | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      decodedToken,
    };
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return null;
  }
}

export async function authenticateRequest(req: NextRequest | Request): Promise<AuthenticatedUser | null> {
  const authHeader = req.headers.get('authorization');
  return verifyAuthToken(authHeader);
}
