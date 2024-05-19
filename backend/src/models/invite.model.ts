import { Prisma, Invite } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IInviteModel } from 'interfaces/models/invite.model';

export default class InviteModel implements IInviteModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.InviteCreateArgs): Promise<Invite> {
    return this.db.client.invite.create(args);
  }

  async findFirst(args: Prisma.InviteFindFirstArgs): Promise<Invite | null> {
    return this.db.client.invite.findFirst(args);
  }

  async findUnqiue(args: Prisma.InviteFindUniqueArgs): Promise<Invite | null> {
    return this.db.client.invite.findUnique(args);
  }

  async findMany(args: Prisma.InviteFindManyArgs): Promise<Invite[]> {
    return this.db.client.invite.findMany(args);
  }

  async update(args: Prisma.InviteUpdateArgs): Promise<Invite> {
    return this.db.client.invite.update(args);
  }

  async updateMany(args: Prisma.InviteUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.invite.updateMany(args);
  }

  async upsert(args: Prisma.InviteUpsertArgs): Promise<Invite> {
    return this.db.client.invite.upsert(args);
  }

  async delete(args: Prisma.InviteDeleteArgs): Promise<Invite> {
    return this.db.client.invite.delete(args);
  }

  async deleteMany(args: Prisma.InviteDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.invite.deleteMany(args);
  }
}
