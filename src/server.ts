import { log } from 'console';
import app from './app';
import ENV from './config/env.config';
import { connectDatabase } from './config/database.config';

const PORT = ENV.SERVER_PORT;

connectDatabase();


app.listen(PORT, () => {
  log('server is running');
});
