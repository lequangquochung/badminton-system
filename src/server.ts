import { log } from 'console';
import app from './app';
import ENV from './config/env.config';
import { connectDatabase } from './config/database.config';
import cors from 'cors';

const PORT = ENV.SERVER_PORT;

connectDatabase();

// config cors
const corsOptions = {
  origin: '*', // Allow all origins
  optionsSuccessStatus: 200, // For legacy browser support,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.listen(PORT, () => {
  log('server is running');
});
