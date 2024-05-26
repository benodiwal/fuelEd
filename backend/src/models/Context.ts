import { IContext, IDatabase } from 'interfaces';
import { IUserModel } from 'interfaces/models/user.model';
import UserModel from './user.model';
import { IEventModel } from 'interfaces/models/event.model';
import EventModel from './event.model';
import { IHostModel } from 'interfaces/models/host.model';
import HostModel from './host.model';
import { IInviteModel } from 'interfaces/models/invite.model';
import InviteModel from './invite.model';
import { IGuestModel } from 'interfaces/models/guest.model';
import GuestModel from './guest.model';
import { IVendorModel } from 'interfaces/models/vendor.model';
import VendorModel from './vendor.model';
import { IEventPostModel } from 'interfaces/models/eventPost.model';
import { IEventPollModel } from 'interfaces/models/eventPoll.model';
import EventPostModel from './eventPost.model';
import EventPollModel from './eventPoll.model';
import { IEventPollOptionsModel } from 'interfaces/models/eventPollOptions.model';
import EventPollOptionsModel from './eventPollOptions.model';
import { IChannelModel } from 'interfaces/models/channel.model';
import { IChannelParticipantModel } from 'interfaces/models/channelParticipant.model';
import { IChannelMessageModel } from 'interfaces/models/channelMessage.model';
import ChannelModel from './channel.model';
import ChannelParticipantModel from './channelParticipant.model';
import ChannelMessageModel from './channelMessage.model';
import { IEventFloorPlanModel } from 'interfaces/models/eventFloorPlan.model';
import EventFloorPlanModel from './eventFloorPlan';

export default class Context implements IContext {
  db: IDatabase;
  users: IUserModel;
  events: IEventModel;
  eventPosts: IEventPostModel;
  eventPolls: IEventPollModel;
  eventFloorPlans: IEventFloorPlanModel;
  eventPollOptions: IEventPollOptionsModel;
  hosts: IHostModel;
  invites: IInviteModel;
  guests: IGuestModel;
  vendors: IVendorModel;
  channels: IChannelModel;
  channelParticipants: IChannelParticipantModel;
  channelMessages: IChannelMessageModel;

  constructor(database: IDatabase) {
    this.db = database;
    this.users = new UserModel(database);
    this.events = new EventModel(database);
    this.eventPosts = new EventPostModel(database);
    this.eventPolls = new EventPollModel(database);
    this.eventPollOptions = new EventPollOptionsModel(database);
    this.hosts = new HostModel(database);
    this.invites = new InviteModel(database);
    this.guests = new GuestModel(database);
    this.vendors = new VendorModel(database);
    this.channels = new ChannelModel(database);
    this.channelParticipants = new ChannelParticipantModel(database);
    this.channelMessages = new ChannelMessageModel(database);
    this.eventFloorPlans = new EventFloorPlanModel(database);
  }
}
