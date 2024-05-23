import { Prisma, EventPoll } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventPollModel } from 'interfaces/models/eventPoll.model';

export default class EventPollModel implements IEventPollModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventPollCreateArgs): Promise<EventPoll> {
    return this.db.client.eventPoll.create(args);
  }

  async findFirst(args: Prisma.EventPollFindFirstArgs): Promise<EventPoll | null> {
    return this.db.client.eventPoll.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventPollFindUniqueArgs): Promise<EventPoll | null> {
    return this.db.client.eventPoll.findUnique(args);
  }

  async findMany(args: Prisma.EventPollFindManyArgs): Promise<EventPoll[]> {
    return this.db.client.eventPoll.findMany(args);
  }

  async update(args: Prisma.EventPollUpdateArgs): Promise<EventPoll> {
    return this.db.client.eventPoll.update(args);
  }

  async updateMany(args: Prisma.EventPollUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPoll.updateMany(args);
  }

  async upsert(args: Prisma.EventPollUpsertArgs): Promise<EventPoll> {
    return this.db.client.eventPoll.upsert(args);
  }

  async delete(args: Prisma.EventPollDeleteArgs): Promise<EventPoll> {
    return this.db.client.eventPoll.delete(args);
  }

  async deleteMany(args: Prisma.EventPollDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPoll.deleteMany(args);
  }
}
