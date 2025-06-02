import jwt from 'jsonwebtoken';

export interface AdminTokenPayload {
  id: string;
  email: string;
}

export function generateAdminToken(payload: AdminTokenPayload): string {
  const tokenPayload: AdminTokenPayload = {
    id: payload.id,
    email: payload.email,
  };

  return jwt.sign(tokenPayload, process.env.ADMIN_JWT_SECRET!,);
}