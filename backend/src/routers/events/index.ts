import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import EventsController from 'controllers/events.controller';
import ChannelRouter from 'routers/channels';
import { forwardEventId } from 'middlewares/forwardEventId.middleware';
import GuestRouter from 'routers/guest';
import ContractRouter from 'routers/contracts';

export default class EventsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const eventsController = new EventsController(this.ctx);

    this.registerPOST('/', eventsController.createEvent());
    this.registerGET('/all', eventsController.getAllEventsByUserId());
    this.registerGET('/:id', eventsController.getEventById());

    this.registerPOST('/:id/posts', eventsController.createPost());
    this.registerGET('/:id/posts/:postId', eventsController.getPostById());

    this.registerGET('/:id/role', eventsController.getRole());
    this.registerPOST('/:id/invite/:role', eventsController.sendInvite());
    this.registerPOST('/:id/invite/:inviteId/accept/:role', eventsController.acceptInvite());

    this.registerPOST('/:id/guest-post', eventsController.createGuestPost());

    this.registerPOST('/:id/rsvp/accept', eventsController.acceptRSVP());
    this.registerPOST('/:id/rsvp/decline', eventsController.declineRSVP());

    this.registerPOST('/:id/polls', eventsController.createPoll());
    this.registerGET('/:id/polls/:pollId', eventsController.getPollById());
    this.registerPUT('/:id/polls/:pollId/vote', eventsController.updatePollById());
    this.registerPOST('/:id/venue', eventsController.createVenuePlan());

    this.registerGET('/:id/theme', eventsController.getEventTheme());
    this.registerPOST('/:id/theme', eventsController.updateEventTheme());

    console.log('Registering ChannelRouter under /:id/channels');
    const channelRouter = new ChannelRouter(this.ctx, this.engine, '');
    this.extendRouter('/:id/channels/', channelRouter, forwardEventId());

    console.log('Registering GuestRouter under /:id/guests');
    const guestRouter = new GuestRouter(this.ctx, this.engine, '');
    this.extendRouter('/:id/guests/', guestRouter, forwardEventId());

    console.log('Registering ContractRouter under /:id/contracts');
    const contractRouter = new ContractRouter(this.ctx, this.engine, '');
    this.extendRouter('/:id/contracts/', contractRouter, forwardEventId());
  }
}
