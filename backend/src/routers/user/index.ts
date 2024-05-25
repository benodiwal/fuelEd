import AbstractRouter from 'routers';
import UserController from 'controllers/user.controller';
import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';

export default class UserRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const userController = new UserController(this.ctx);
    this.registerGET('/logout', userController.getLogout());
    this.registerPOST('/me', userController.me());
  }
}
