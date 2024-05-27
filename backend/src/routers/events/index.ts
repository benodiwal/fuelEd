import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import EventsController from 'controllers/events.controller';
import ChannelRouter from 'routers/channels';
import { forwardEventId } from 'middlewares/forwardEventId.middleware';

export default class EventsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [
      isAuthenticated,
    ];
  }

  registerRoutes(): void {
    const eventsController = new EventsController(this.ctx);
    this.registerPOST('/', eventsController.createEvent());
    this.registerGET('/all', eventsController.getAllEventsByUserId());
    this.registerGET('/:id', eventsController.getEventById());
    
    this.registerPOST('/:id/venue', eventsController.createVenuePlan());
    
    this.registerPOST('/:id/posts', eventsController.createPost());
    this.registerGET('/:id/posts/:postId', eventsController.getPostById());
    
    this.registerPOST('/:id/polls', eventsController.createPoll());
    this.registerGET('/:id/polls/:pollId', eventsController.getPollById());
    
    this.registerPOST('/:id/invite/:role', eventsController.sendInvite());
    this.registerPOST('/:id/invite/:inviteId/accept/:role', eventsController.acceptInvite());

    console.log('Registering ChannelRouter under /:id/channels');
    const channelRouter = new ChannelRouter(this.ctx, this.engine, '');
    this.extendRouter('/:id/channels/', channelRouter, forwardEventId());
  }
}
