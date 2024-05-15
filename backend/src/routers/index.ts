import { Router, Express, Handler, Response, Request } from 'express';
import { IContext } from 'interfaces/index';

export default abstract class AbstractRouter {
  #router: Router;
  #engine: Express;
  #path: string;
  ctx: IContext;
  constructor(ctx: IContext, engine: Express, path: string) {
    this.ctx = ctx;
    this.#router = Router();
    this.#engine = engine;
    this.#path = path;
  }

  register() {
    this.registerHealthRoutes();
    this.registerRoutes();
    this.#engine.use(this.#path, this.#router);
  }

  registerGET(path: string, handler: Handler) {
    console.log(`registered: GET ${this.#path}${path}`);
    this.#router.get(path, handler);
  }

  registerPOST(path: string, handler: Handler) {
    console.log(`registered: POST ${this.#path}${path}`);
    this.#router.post(path, handler);
  }

  registerPUT(path: string, handler: Handler) {
    console.log(`registered: PUT ${this.#path}${path}`);
    this.#router.put(path, handler);
  }

  registerDELETE(path: string, handler: Handler) {
    console.log(`registered: DELETE ${this.#path}${path}`);
    this.#router.delete(path, handler);
  }

  health(_: Request, res: Response) {
    res.sendStatus(200);
  }

  registerHealthRoutes() {
    this.registerGET('/', this.health);
    this.registerGET('/health', this.health);
  }

  abstract registerRoutes(): void;
}
