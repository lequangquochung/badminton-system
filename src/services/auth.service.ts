import UserRepository from '../repositories/user.repository';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/auth.utils';
import { hashPassword } from '../utils/password.utils';

class AuthService {
  /*
   * User Register
   */
  async register(username: string, email: string, password: string, role: string) {
    // Validation
    if (!username || !email || !password) {
      throw new Error('Missing required fields');
    }

    // Check if the user already exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await UserRepository.createUser({ username, email, password: hashed, role });

    return user;
  }

  /*
   * User login
   */
  async login(email: string, password: string) {
    // Validation
    const user = await UserRepository.findByEmail(email);

    // Check user exists
    if (!user) throw new Error('Invalid email or password');

    // Compare password
    const match = await comparePassword(password, user.password);

    // Check password correct
    if (!match) throw new Error('Invalid email or password');

    // Generate token
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    // Update the user's refresh token in the database
    await UserRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  /*
   * Refresh the access token
   */
  async refresh(refreshToken: string) {
    try {
      // Verify the refresh token
      const decoded = verifyRefreshToken(refreshToken) as any;

      // Check if the user exists and has the correct refresh token
      const user = await UserRepository.findById(decoded.id);

      // If the user does not exist or the refresh token does not match, throw an error
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken({ id: user.id, role: user.role });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new Error('Refresh token expired or invalid');
    }
  }
}

export default new AuthService();
