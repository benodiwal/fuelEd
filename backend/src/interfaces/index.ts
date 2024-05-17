import { PrismaClient } from '@prisma/client';
import { IChannelModel } from './models/channels.model';
import { IEventModel } from './models/events.model';
import { IChannelMessageModel } from './models/channelMessage.model';

export type txClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

export interface IDatabase {
  client: PrismaClient | txClient;
}

export interface IContext {
  db: IDatabase;
  channels: IChannelModel;
  events: IEventModel;
  channelMessages: IChannelMessageModel;
}
