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

export default class Context implements IContext {
  db: IDatabase;
  users: IUserModel;
  events: IEventModel;
  hosts: IHostModel;
  invites: IInviteModel;
  guests: IGuestModel;
  vendors: IVendorModel

  constructor(database: IDatabase) {
    this.db = database;
    this.users = new UserModel(database);
    this.events = new EventModel(database);
    this.hosts = new HostModel(database);
    this.invites = new InviteModel(database);
    this.guests = new GuestModel(database);
    this.vendors = new VendorModel(database);
  }
}
