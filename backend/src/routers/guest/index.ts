import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import GuestController from 'controllers/guest.controller';

export default class GuestRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const guestController = new GuestController(this.ctx);

    this.registerPOST('/update', guestController.updateGuest());
  }
}
