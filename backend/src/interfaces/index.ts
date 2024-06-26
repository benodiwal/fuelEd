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
import { IEventFloorPlanModel } from './models/eventFloorPlan.model';
import { IRSVPModel } from './models/rsvp.model';
import { IEventThemeModel } from './models/eventTheme.model';
import { IGuestPostModel } from './models/guestPost.model';
import { IContractModel } from './models/contract.model';
import { IEventPollOptionSelectionModel } from './models/eventPollSelection.model';
import { IEventHostMessageModel } from './models/eventHostMessage.model';
import { IVenueModel } from './models/venue.model';

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
  eventFloorPlans: IEventFloorPlanModel;
  rsvp: IRSVPModel;
  eventTheme: IEventThemeModel;
  guestPost: IGuestPostModel;
  contracts: IContractModel;
  eventPollOptionsSelection: IEventPollOptionSelectionModel;
  eventHostMessage: IEventHostMessageModel;
  venue: IVenueModel;
}
