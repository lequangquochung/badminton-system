import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { HttpStatusCode } from '../utils/httpStatusCode.util';
import { sendSuccess } from '../utils/response.util';

export class AuthController {
  /**
   *  User registration.
   */
  async registerAccount(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    try {
      // Validation
      const newUser = await AuthService.register(username, email, password, role);
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: 'User registered successfully', user: newUser, statusCode: HttpStatusCode.CREATED });
    } catch (error: any) {
      // Handle errors
      const statusCode = error.message.includes('registered')
        ? HttpStatusCode.CONFLICT
        : HttpStatusCode.BAD_REQUEST;
      res.status(statusCode).json({ message: error.message });
    }
  }

  /**
   * User login.
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Validation
      const result = await AuthService.login(email, password);
      sendSuccess(res, HttpStatusCode.OK, result);
    } catch (err: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: err.message });
    }
  }

  /**
   * Token refresh.
   */
  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      // Validation
      const result = await AuthService.refresh(refreshToken);
      sendSuccess(res, HttpStatusCode.OK, result);
    } catch (err: any) {
      // Handle errors
      res.status(HttpStatusCode.FORBIDDEN).json({ message: err.message });
    }
  }
}

export default new AuthController();
