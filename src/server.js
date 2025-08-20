import express from 'express';
import cors from 'cors';
import pino from 'pino';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const logger = pino();

export function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url, body: req.body });
    next();
  });

  app.use(router);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return server;
}
