import jwt from 'jsonwebtoken';

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: string
}

export function generateAdminToken(payload: AdminTokenPayload): string {
  const tokenPayload: AdminTokenPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  };

  return jwt.sign(tokenPayload, process.env.ADMIN_JWT_SECRET!,);
}