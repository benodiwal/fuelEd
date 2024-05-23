import { PrismaClient } from '@prisma/client';
import { IUserModel } from './models/user.model';
import { IEventModel } from './models/event.model';
import { IHostModel } from './models/host.model';
import { IInviteModel } from './models/invite.model';
import { IGuestModel } from './models/guest.model';
import { IVendorModel } from './models/vendor.model';
import { IEventPostModel } from './models/eventPost.model';
import { IEventPollModel } from './models/eventPoll.model';
import { IEventPollOptionsModel } from './models/eventPollOptions.model';
import { IChannelModel } from './models/channel.model';
import { IChannelParticipantModel } from './models/channelParticipant.model';
import { IChannelMessageModel } from './models/channelMessage.model';

export type txClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

export interface IDatabase {
  client: PrismaClient | txClient;
}

export interface IContext {
  db: IDatabase;
  users: IUserModel;
  events: IEventModel;
  eventPosts: IEventPostModel;
  eventPolls: IEventPollModel;
  eventPollOptions: IEventPollOptionsModel;
  hosts: IHostModel;
  invites: IInviteModel;
  guests: IGuestModel;
  vendors: IVendorModel;
  channels: IChannelModel;
  channelParticipants: IChannelParticipantModel;
  channelMessages: IChannelMessageModel;
}
