import { Router, Express, Handler, Response, Request, RequestHandler } from 'express';
import { IContext } from 'interfaces/index';

export default abstract class AbstractRouter {
  router: Router;
  engine: Express;
  #path: string;
  ctx: IContext;
  constructor(ctx: IContext, engine: Express, path: string) {
    this.ctx = ctx;
    this.router = Router();
    this.engine = engine;
    this.#path = path;
  }

  register() {
    this.registerHealthRoutes();
    const middlewares = this.registerMiddlewares();
    for (const middleware of middlewares) {
      this.router.use(middleware());
    }
    this.registerRoutes();
    this.engine.use(this.#path, this.router);
  }

  extendRouter(path: string, other: AbstractRouter, middleware?: RequestHandler) {
    console.log(`Extending router at path: ${this.#path}${path}`);
    other.registerHealthRoutes();
    const middlewares = other.registerMiddlewares();
    for (const middleware of middlewares) {
      other.router.use(middleware());
    }
    other.registerRoutes();
    this.router.use(path, middleware!, other.router);
  }

  registerGET(path: string, handlers: Handler[]) {
    console.log(`registered: GET ${this.#path}${path}`);
    this.router.get(path, handlers);
  }

  registerPOST(path: string, handlers: Handler[]) {
    console.log(`registered: POST ${this.#path}${path}`);
    this.router.post(path, handlers);
  }

  registerPUT(path: string, handlers: Handler[]) {
    console.log(`registered: PUT ${this.#path}${path}`);
    this.router.put(path, handlers);
  }

  registerDELETE(path: string, handlers: Handler[]) {
    console.log(`registered: DELETE ${this.#path}${path}`);
    this.router.delete(path, handlers);
  }

  health(_: Request, res: Response) {
    res.sendStatus(200);
  }

  registerHealthRoutes() {
    this.registerGET('/', [this.health]);
    this.registerGET('/health', [this.health]);
  }

  abstract registerMiddlewares(): (() => RequestHandler)[];
  abstract registerRoutes(): void;
}
