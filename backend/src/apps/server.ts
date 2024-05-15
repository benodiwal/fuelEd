import Express from 'express';
import logger from 'middlewares/logger.middleware';

const expressApp = Express();

expressApp.use(logger);
expressApp.use(Express.json());

expressApp.get('/health', (_, res) => {
  return res.sendStatus(200);
});

expressApp.get('/', (_, res) => {
  return res.sendStatus(200);
});

export default expressApp;
