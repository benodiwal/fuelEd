import { Prisma, Event } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventModel } from 'interfaces/models/events.model';

export default class EventModel implements IEventModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventCreateArgs): Promise<Event> {
    return this.db.client.event.create(args);
  }

  async findFirst(args: Prisma.EventFindFirstArgs): Promise<Event | null> {
    return this.db.client.event.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventFindUniqueArgs): Promise<Event | null> {
    return this.db.client.event.findUnique(args);
  }

  async findMany(args: Prisma.EventFindManyArgs): Promise<Event[]> {
    return this.db.client.event.findMany(args);
  }

  async update(args: Prisma.EventUpdateArgs): Promise<Event> {
    return this.db.client.event.update(args);
  }

  async updateMany(args: Prisma.EventUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.event.updateMany(args);
  }

  async upsert(args: Prisma.EventUpsertArgs): Promise<Event> {
    return this.db.client.event.upsert(args);
  }

  async delete(args: Prisma.EventDeleteArgs): Promise<Event> {
    return this.db.client.event.delete(args);
  }

  async deleteMany(args: Prisma.EventDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.event.deleteMany(args);
  }
}
