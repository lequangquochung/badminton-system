import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';

export const comparePassword = async (plain: string, hashed: string) =>
  await bcrypt.compare(plain, hashed);

// ======================
// Generate Access Token
// ======================
export const generateAccessToken = (payload: Record<string, any>): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }

  const options: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue) || '15m',
  };

  return jwt.sign(payload, secret, options);
};

// ======================
// Generate Refresh Token
// ======================
export const generateRefreshToken = (payload: Record<string, any>): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }

  const options: SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue || '7d',
  };

  return jwt.sign(payload, secret, options);
};

// ======================
// Verify Refresh Token
// ======================
export const verifyRefreshToken = (token: string): any => {
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};
