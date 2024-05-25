import AbstractRouter from '..';
import AuthController from 'controllers/auth.controller';

export default class AuthRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const authController = new AuthController(this.ctx);
    this.registerPOST('/google', authController.getAuthGoogleCallback());
  }
}
