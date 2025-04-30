import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
  accountType: string;
}

export function generateToken(payload: TokenPayload): string {
  const tokenPayload: TokenPayload = {
    id: payload.id,
    email: payload.email,
    accountType: payload.accountType ,
  };

  return jwt.sign(tokenPayload, process.env.USER_JWT_SECRET!,);
}