import { Prisma, EventPollOptions } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventPollOptionsModel } from 'interfaces/models/eventPollOptions.model';

export default class EventPollOptionsModel implements IEventPollOptionsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventPollOptionsCreateArgs): Promise<EventPollOptions> {
    return this.db.client.eventPollOptions.create(args);
  }

  async createByPollId(pollId: string, text: string): Promise<EventPollOptions> {
    return this.db.client.eventPollOptions.create({
        data: {
            text,
            eventPoll: {
                connect: { id: pollId },
            }
        }
    });
  }

  async findFirst(args: Prisma.EventPollOptionsFindFirstArgs): Promise<EventPollOptions | null> {
    return this.db.client.eventPollOptions.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventPollOptionsFindUniqueArgs): Promise<EventPollOptions | null> {
    return this.db.client.eventPollOptions.findUnique(args);
  }

  async findMany(args: Prisma.EventPollOptionsFindManyArgs): Promise<EventPollOptions[]> {
    return this.db.client.eventPollOptions.findMany(args);
  }

  async update(args: Prisma.EventPollOptionsUpdateArgs): Promise<EventPollOptions> {
    return this.db.client.eventPollOptions.update(args);
  }

  async updateMany(args: Prisma.EventPollOptionsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPollOptions.updateMany(args);
  }

  async upsert(args: Prisma.EventPollOptionsUpsertArgs): Promise<EventPollOptions> {
    return this.db.client.eventPollOptions.upsert(args);
  }

  async delete(args: Prisma.EventPollOptionsDeleteArgs): Promise<EventPollOptions> {
    return this.db.client.eventPollOptions.delete(args);
  }

  async deleteMany(args: Prisma.EventPollOptionsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPollOptions.deleteMany(args);
  }
}
