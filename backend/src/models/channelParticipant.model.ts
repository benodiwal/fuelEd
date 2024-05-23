import { Prisma, ChannelParticipant } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IChannelParticipantModel } from 'interfaces/models/channelParticipant.model';

export default class ChannelParticipantModel implements IChannelParticipantModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ChannelParticipantCreateArgs): Promise<ChannelParticipant> {
    return this.db.client.channelParticipant.create(args);
  }

  async findFirst(args: Prisma.ChannelParticipantFindFirstArgs): Promise<ChannelParticipant | null> {
    return this.db.client.channelParticipant.findFirst(args);
  }

  async findUnqiue(args: Prisma.ChannelParticipantFindUniqueArgs): Promise<ChannelParticipant | null> {
    return this.db.client.channelParticipant.findUnique(args);
  }

  async findMany(args: Prisma.ChannelParticipantFindManyArgs): Promise<ChannelParticipant[]> {
    return this.db.client.channelParticipant.findMany(args);
  }

  async update(args: Prisma.ChannelParticipantUpdateArgs): Promise<ChannelParticipant> {
    return this.db.client.channelParticipant.update(args);
  }

  async updateMany(args: Prisma.ChannelParticipantUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channelParticipant.updateMany(args);
  }

  async upsert(args: Prisma.ChannelParticipantUpsertArgs): Promise<ChannelParticipant> {
    return this.db.client.channelParticipant.upsert(args);
  }

  async delete(args: Prisma.ChannelParticipantDeleteArgs): Promise<ChannelParticipant> {
    return this.db.client.channelParticipant.delete(args);
  }

  async deleteMany(args: Prisma.ChannelParticipantDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.channelParticipant.deleteMany(args);
  }
}
