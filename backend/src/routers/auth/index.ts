import { Express } from 'express';
import AbstractRouter from '..';
import { IContext } from 'interfaces';

export default class AuthRouter extends AbstractRouter {
  constructor(ctx: IContext, engine: Express, path: string) {
    super(ctx, engine, path);
  }

  registerRoutes(): void {}
}
