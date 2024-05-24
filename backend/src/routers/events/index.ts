import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import EventsController from 'controllers/events.controller';

export default class EventsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const eventsController = new EventsController(this.ctx);
    this.registerPOST('/', eventsController.createEvent());
    this.registerGET('/:id', eventsController.getEventById());
    this.registerPOST('/:id/posts', eventsController.createPost());
    this.registerGET('/:id/posts/:postId', eventsController.getPostById());
    this.registerPOST('/:id/polls', eventsController.createPoll());
    this.registerGET('/:id/polls/:pollId', eventsController.getPollById());
    this.registerPOST('/:/id/invite/:role', eventsController.sendInvite());
    this.registerPOST('/:/id/invite/:inviteId/accept/:role', eventsController.acceptInvite());
  }
}
