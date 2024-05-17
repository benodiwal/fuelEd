import { Prisma, Channel_Message } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IChannelMessageModel } from 'interfaces/models/channelMessage.model';

export default class ChannelMessageModel implements IChannelMessageModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.Channel_MessageCreateArgs): Promise<Channel_Message> {
    return this.db.client.channel_Message.create(args);
  }

  async findFirst(args: Prisma.Channel_MessageFindFirstArgs): Promise<Channel_Message | null> {
    return this.db.client.channel_Message.findFirst(args);
  }

  async findUnqiue(args: Prisma.Channel_MessageFindUniqueArgs): Promise<Channel_Message | null> {
    return this.db.client.channel_Message.findUnique(args);
  }

  async findMany(args: Prisma.Channel_MessageFindManyArgs): Promise<Channel_Message[]> {
    return this.db.client.channel_Message.findMany(args);
  }

  async update(args: Prisma.Channel_MessageUpdateArgs): Promise<Channel_Message> {
    return this.db.client.channel_Message.update(args);
  }

  async updateMany(args: Prisma.Channel_MessageUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channel_Message.updateMany(args);
  }

  async upsert(args: Prisma.Channel_MessageUpsertArgs): Promise<Channel_Message> {
    return this.db.client.channel_Message.upsert(args);
  }

  async delete(args: Prisma.Channel_MessageDeleteArgs): Promise<Channel_Message> {
    return this.db.client.channel_Message.delete(args);
  }

  async deleteMany(args: Prisma.Channel_MessageDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channel_Message.deleteMany(args);
  }
}
