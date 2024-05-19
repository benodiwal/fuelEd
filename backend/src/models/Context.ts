import { IContext, IDatabase } from 'interfaces';
import { IUserModel } from 'interfaces/models/user.model';
import UserModel from './user.model';
import { IEventModel } from 'interfaces/models/event.model';
import EventModel from './event.model';
import { IHostModel } from 'interfaces/models/host.model';
import HostModel from './host.model';

export default class Context implements IContext {
  db: IDatabase;
  users: IUserModel;
  events: IEventModel;
  hosts: IHostModel;

  constructor(database: IDatabase) {
    this.db = database;
    this.users = new UserModel(database);
    this.events = new EventModel(database);
    this.hosts = new HostModel(database);
  }
}
