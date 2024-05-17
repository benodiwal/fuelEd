import { IContext } from 'interfaces';
import AbstractRouter from 'routers';
import { Express } from 'express';
import ChannelsController from 'controllers/channels.controller';

export default class ChannelsRouter extends AbstractRouter {
  #controller: ChannelsController;

  constructor(ctx: IContext, engine: Express, path: string) {
    super(ctx, engine, path);
    this.#controller = new ChannelsController(ctx);
  }

  registerRoutes(): void {
    this.registerPOST('/channels', this.#controller.createChannel);
    this.registerGET('/channels', this.#controller.getChannels);
    this.registerGET('/channels/:id', this.#controller.getChannelById);
    this.registerGET('/channels/type/:type', this.#controller.getChannelByType);
    this.registerPOST('/channels/:id/messages', this.#controller.sendMessage);
  }
}
