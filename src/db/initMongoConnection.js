import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export const initMongoConnection = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const dbName = process.env.MONGODB_DB;

    const connectionString = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);

    logger.info('Mongo connection successfully established!');
  } catch (err) {
    logger.error(`Failed to connect to MongoDB. Error: ${err.message}`);
    process.exit(1);
  }
};
