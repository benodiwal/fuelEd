import { Prisma, EventHostMessage } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventHostMessageModel } from 'interfaces/models/eventHostMessage.model';

export default class EventHostMessageModel implements IEventHostMessageModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventHostMessageCreateArgs): Promise<EventHostMessage> {
    return this.db.client.eventHostMessage.create(args);
  }

  async findFirst(args: Prisma.EventHostMessageFindFirstArgs): Promise<EventHostMessage | null> {
    return this.db.client.eventHostMessage.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventHostMessageFindUniqueArgs): Promise<EventHostMessage | null> {
    return this.db.client.eventHostMessage.findUnique(args);
  }

  async findMany(args: Prisma.EventHostMessageFindManyArgs): Promise<EventHostMessage[]> {
    return this.db.client.eventHostMessage.findMany(args);
  }

  async update(args: Prisma.EventHostMessageUpdateArgs): Promise<EventHostMessage> {
    return this.db.client.eventHostMessage.update(args);
  }

  async updateMany(args: Prisma.EventHostMessageUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventHostMessage.updateMany(args);
  }

  async upsert(args: Prisma.EventHostMessageUpsertArgs): Promise<EventHostMessage> {
    return this.db.client.eventHostMessage.upsert(args);
  }

  async delete(args: Prisma.EventHostMessageDeleteArgs): Promise<EventHostMessage> {
    return this.db.client.eventHostMessage.delete(args);
  }

  async deleteMany(args: Prisma.EventHostMessageDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventHostMessage.deleteMany(args);
  }
}
