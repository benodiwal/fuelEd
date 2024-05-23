import { Prisma, ChannelMessage } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IChannelMessageModel } from 'interfaces/models/channelMessage.model';

export default class ChannelMessageModel implements IChannelMessageModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ChannelMessageCreateArgs): Promise<ChannelMessage> {
    return this.db.client.channelMessage.create(args);
  }

  async findFirst(args: Prisma.ChannelMessageFindFirstArgs): Promise<ChannelMessage | null> {
    return this.db.client.channelMessage.findFirst(args);
  }

  async findUnqiue(args: Prisma.ChannelMessageFindUniqueArgs): Promise<ChannelMessage | null> {
    return this.db.client.channelMessage.findUnique(args);
  }

  async findMany(args: Prisma.ChannelMessageFindManyArgs): Promise<ChannelMessage[]> {
    return this.db.client.channelMessage.findMany(args);
  }

  async update(args: Prisma.ChannelMessageUpdateArgs): Promise<ChannelMessage> {
    return this.db.client.channelMessage.update(args);
  }

  async updateMany(args: Prisma.ChannelMessageUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channelMessage.updateMany(args);
  }

  async upsert(args: Prisma.ChannelMessageUpsertArgs): Promise<ChannelMessage> {
    return this.db.client.channelMessage.upsert(args);
  }

  async delete(args: Prisma.ChannelMessageDeleteArgs): Promise<ChannelMessage> {
    return this.db.client.channelMessage.delete(args);
  }

  async deleteMany(args: Prisma.ChannelMessageDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channelMessage.deleteMany(args);
  }
}
