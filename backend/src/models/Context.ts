import { IContext, IDatabase } from 'interfaces';
import { IChannelModel } from 'interfaces/models/channels.model';
import ChannelModel from './channels.model';
import { IEventModel } from 'interfaces/models/events.model';
import EventModel from './events.model';
import { IChannelMessageModel } from 'interfaces/models/channelMessage.model';
import ChannelMessageModel from './channelMessage.model';

export default class Context implements IContext {
  db: IDatabase;
  events: IEventModel;
  channels: IChannelModel;
  channelMessages: IChannelMessageModel;

  constructor(database: IDatabase) {
    this.db = database;
    this.channels = new ChannelModel(database);
    this.events = new EventModel(database);
    this.channelMessages = new ChannelMessageModel(database);
  }
}
