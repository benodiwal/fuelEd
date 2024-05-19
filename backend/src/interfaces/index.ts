import { PrismaClient } from '@prisma/client';
import { IUserModel } from './models/user.model';
import { IEventModel } from './models/event.model';
import { IHostModel } from './models/host.model';
import { IInviteModel } from './models/invite.model';
import { IGuestModel } from './models/guest.model';
import { IVendorModel } from './models/vendor.model';

export type txClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

export interface IDatabase {
  client: PrismaClient | txClient;
}

export interface IContext {
  db: IDatabase;
  users: IUserModel;
  events: IEventModel;
  hosts: IHostModel;
  invites: IInviteModel;
  guests: IGuestModel;
  vendors: IVendorModel;
}
