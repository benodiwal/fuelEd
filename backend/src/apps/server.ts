import cookieSession from 'cookie-session';
import Express, { NextFunction, Request, Response, Express as TExpress } from 'express';
import logger from 'middlewares/logger.middleware';
import getEnvVar from 'env/index';
import Context from 'models/Context';
import AuthRouter from 'routers/auth';
import { NotFoundError } from 'errors/not-found-error';
import { errorHandler } from 'middlewares/error.middleware';
import { IDatabase } from 'interfaces';

export default class Server {
  db: IDatabase;
  engine: TExpress;

  constructor(database: IDatabase) {
    this.db = database;
    this.engine = Express();
  }

  #registerHandlers() {
    this.engine.use(logger);
    this.engine.use(Express.json());

    this.engine.use(
      cookieSession({
        signed: false,
        secure: true,
      }),
    );

    this.engine.get('/health', (_, res) => {
      return res.sendStatus(200);
    });

    this.engine.get('/', (_, res) => {
      return res.sendStatus(200);
    });

    const ctx = new Context(this.db);
    const authRouter = new AuthRouter(ctx, this.engine, '/auth');
    authRouter.register();

    this.engine.all('*', async (__: Request, _: Response, next: NextFunction) => {
      next(new NotFoundError());
    });

    this.engine.use(errorHandler);
  }

  start() {
    this.#registerHandlers();
    this.engine.listen(parseInt(getEnvVar('PORT')), () => {
      console.log(`Server listening at ${getEnvVar('PORT')}`);
    });
  }
}
