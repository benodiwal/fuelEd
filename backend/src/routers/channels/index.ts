import ChannelController from 'controllers/channel.controller';
import AbstractRouter from '..';

export default class ChannelRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const channelController = new ChannelController(this.ctx);
    this.registerPOST('/', channelController.createChannel());
  }
}
