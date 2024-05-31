import { Prisma, EventPollOptionSelection } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventPollOptionSelectionModel } from 'interfaces/models/eventPollSelection.model';

export default class EventPollOptionSelectionModel implements IEventPollOptionSelectionModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventPollOptionSelectionCreateArgs): Promise<EventPollOptionSelection> {
    return this.db.client.eventPollOptionSelection.create(args);
  }

  async findFirst(args: Prisma.EventPollOptionSelectionFindFirstArgs): Promise<EventPollOptionSelection | null> {
    return this.db.client.eventPollOptionSelection.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventPollOptionSelectionFindUniqueArgs): Promise<EventPollOptionSelection | null> {
    return this.db.client.eventPollOptionSelection.findUnique(args);
  }

  async findMany(args: Prisma.EventPollOptionSelectionFindManyArgs): Promise<EventPollOptionSelection[]> {
    return this.db.client.eventPollOptionSelection.findMany(args);
  }

  async update(args: Prisma.EventPollOptionSelectionUpdateArgs): Promise<EventPollOptionSelection> {
    return this.db.client.eventPollOptionSelection.update(args);
  }

  async updateMany(args: Prisma.EventPollOptionSelectionUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPollOptionSelection.updateMany(args);
  }

  async upsert(args: Prisma.EventPollOptionSelectionUpsertArgs): Promise<EventPollOptionSelection> {
    return this.db.client.eventPollOptionSelection.upsert(args);
  }

  async delete(args: Prisma.EventPollOptionSelectionDeleteArgs): Promise<EventPollOptionSelection> {
    return this.db.client.eventPollOptionSelection.delete(args);
  }

  async deleteMany(args: Prisma.EventPollOptionSelectionDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPollOptionSelection.deleteMany(args);
  }
}
