import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import EventsController from 'controllers/events.controller';

export default class EventsRouter extends AbstractRouter {
  
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const eventsController = new EventsController(this.ctx);
    this.registerPOST('/events', eventsController.createEvent());
    this.registerGET('/events/:id', eventsController.getEventById());
    this.registerPOST('/events/:/id/invite/:role', eventsController.sendInvite());
    this.registerPOST('/events/:/id/invite/:inviteId/accept/:role', eventsController.acceptInvite());
  }
}
