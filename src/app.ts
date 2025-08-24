import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routers/authRoutes';
import matchesRoutes from './routers/matchesRoutes';
import playerController from './controllers/players.controller';
import playersRoutes from './routers/player.Routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// app.use('/api/products', productRouter);
// matches routes
app.use('/api/matches', matchesRoutes);
// players routes
app.use('/api/players', playersRoutes);
// auth routes
app.use('/api/auth', authRouter);

app.use(errorHandler);
export default app;
