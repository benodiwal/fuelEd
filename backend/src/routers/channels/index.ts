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

    this.registerPOST('/:channelId/messages', channelController.createMessage());
    this.registerGET('/:channelId/messages', channelController.getAllMessages());
    this.registerGET('/:channelId/messages/:messageId', channelController.getMessageById());
    this.registerPUT('/:channelId/messages/:messageId', channelController.editMessage());
  }
}
