import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/register', (req, res) => AuthController.registerAccount(req, res));

authRouter.post('/login', (req, res) => AuthController.login(req, res));

authRouter.post('/refresh-token', (req, res) => AuthController.refreshToken(req, res));

export default authRouter;
