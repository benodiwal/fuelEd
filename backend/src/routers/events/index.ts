import { Express } from 'express';
import AbstractRouter from '..';
import { IContext } from 'interfaces';
import EventsController from 'controllers/events.controller';

export default class EventsRouter extends AbstractRouter {
    #controller: EventsController;

  constructor(ctx: IContext, engine: Express, path: string) {
    super(ctx, engine, path);
    this.#controller = new EventsController(ctx);
  }

  registerRoutes(): void {
    this.registerPOST("/events", this.#controller.createEvent);
    this.registerGET("/events", this.#controller.getEvents);
    this.registerGET("/events/:id", this.#controller.getEventById);
    this.registerPUT("/events:/id", this.#controller.updateEventById);
    this.registerDELETE("/events:/id", this.#controller.deleteEventById);
    this.registerPOST("/events/:id/vendors", this.#controller.addVendorToEvent);
    this.registerPOST("/events/:id/guests", this.#controller.addGuestToEvent);
  }

}
