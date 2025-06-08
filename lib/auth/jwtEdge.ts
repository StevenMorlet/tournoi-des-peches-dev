import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export type JwtPayload = {
  userId: string;
  email?: string;
};

export async function verifyJwtEdge(token: string): Promise<JwtPayload | null> {
  console.log('[JWT Edge] JWT_SECRET:', process.env.JWT_SECRET?.slice?.(0, 8));
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}
