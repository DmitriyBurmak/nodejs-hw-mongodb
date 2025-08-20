import dotenv from 'dotenv';
import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
