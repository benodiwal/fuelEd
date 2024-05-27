import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import EventsController from 'controllers/events.controller';

export default class EventsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const eventsController = new EventsController(this.ctx);

    // CRUD
    this.registerPOST('/', eventsController.createEvent());
    this.registerGET('/all', eventsController.getAllEventsByUserId());
    this.registerGET('/:id', eventsController.getEventById());

    // Event Posts
    this.registerPOST('/:id/posts', eventsController.createPost());
    this.registerGET('/:id/posts/:postId', eventsController.getPostById());

    // Invite Routes
    this.registerPOST('/:id/invite/:role', eventsController.sendInvite());
    this.registerPOST('/:id/invite/:inviteId/accept/:role', eventsController.acceptInvite());

    // RSVP Routes
    this.registerPOST('/:id/rsvp/accept', eventsController.acceptRSVP());
    this.registerPOST('/:id/rsvp/decline', eventsController.declineRSVP());

    // Event Polls
    this.registerPOST('/:id/polls', eventsController.createPoll());
    this.registerGET('/:id/polls/:pollId', eventsController.getPollById());
    this.registerPOST('/:id/polls/:pollId/vote', eventsController.updatePollById());

    // Event Venue Plan
    this.registerPOST('/:id/venue', eventsController.createVenuePlan());
  }
}
