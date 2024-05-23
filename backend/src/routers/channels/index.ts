import ChannelController from 'controllers/channel.controller';
import AbstractRouter from '..';

export default class ChannelRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const channelController = new ChannelController(this.ctx);
    this.registerPOST('/', channelController.createChannel());
    this.registerPOST('/dms', channelController.createDM());
    this.registerGET('/:channelId', channelController.getChannelById());
    this.registerPOST('/:channelId/:role/:roleId', channelController.addParticipant());
  }
}
