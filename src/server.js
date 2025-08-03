import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { contactsRouter } from './routers/contacts.js';

const logger = pino();

export function setupServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());

  app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url, body: req.body });
    next();
  });

  app.use(contactsRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return server;
}
