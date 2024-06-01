import CalenderController from 'controllers/calender.controller';
import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from 'routers';

class CalenderRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const calenderController = new CalenderController(this.ctx);
    this.registerGET('/url', calenderController.generateAuthUrl());
    this.registerGET('/callback', calenderController.getToken());
    this.registerPOST('/addEvent', calenderController.addEvent());
  }
}

export default CalenderRouter;
