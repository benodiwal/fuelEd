import CalenderController from 'controllers/calender.controller';
import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';

class CalenderRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const calenderController = new CalenderController(this.ctx);
    this.registerPOST('/url', calenderController.generateAuthUrl());
    this.registerGET('/callback', calenderController.getToken());
    this.registerPOST('/addEvent', calenderController.addEvent());
  }
}

export default CalenderRouter;
