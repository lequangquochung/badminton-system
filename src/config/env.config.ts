import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  SERVER_PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_CLOUD: process.env.DB_CLOUD || '',
  DB_NAME: process.env.DB_NAME || 'badminton-system',
};

export default ENV;
