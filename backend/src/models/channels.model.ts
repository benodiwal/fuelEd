import { Prisma, Channel } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IChannelModel } from 'interfaces/models/channels.model';

export default class ChannelModel implements IChannelModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ChannelCreateArgs): Promise<Channel> {
    return this.db.client.channel.create(args);
  }

  async findFirst(args: Prisma.ChannelFindFirstArgs): Promise<Channel | null> {
    return this.db.client.channel.findFirst(args);
  }

  async findUnqiue(args: Prisma.ChannelFindUniqueArgs): Promise<Channel | null> {
    return this.db.client.channel.findUnique(args);
  }

  async findMany(args: Prisma.ChannelFindManyArgs): Promise<Channel[]> {
    return this.db.client.channel.findMany(args);
  }

  async update(args: Prisma.ChannelUpdateArgs): Promise<Channel> {
    return this.db.client.channel.update(args);
  }

  async updateMany(args: Prisma.ChannelUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channel.updateMany(args);
  }

  async upsert(args: Prisma.ChannelUpsertArgs): Promise<Channel> {
    return this.db.client.channel.upsert(args);
  }

  async delete(args: Prisma.ChannelDeleteArgs): Promise<Channel> {
    return this.db.client.channel.delete(args);
  }

  async deleteMany(args: Prisma.ChannelDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channel.deleteMany(args);
  }
}
