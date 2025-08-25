import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routers/authRoutes';
import matchesRoutes from './routers/matchesRoutes';
import playersRoutes from './routers/playerRoutes';
import cors from 'cors';
const app = express();

// config cors
const corsOptions = {
    origin: '*', // Allow all origins
    optionsSuccessStatus: 200, // For legacy browser support,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// matches routes
app.use('/api/matches', matchesRoutes);
// players routes
app.use('/api/players', playersRoutes);
// auth routes
app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;
