import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePassword = async (plain: string, hashed: string) =>
  await bcrypt.compare(plain, hashed);

export const generateAccessToken = (payload: object): string =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  });

export const generateRefreshToken = (payload: object): string =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  });

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret');
