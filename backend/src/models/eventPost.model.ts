import { Prisma, EventPost } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventPostModel } from 'interfaces/models/eventPost.model';

export default class EventPostModel implements IEventPostModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventPostCreateArgs): Promise<EventPost> {
    return this.db.client.eventPost.create(args);
  }

  async findFirst(args: Prisma.EventPostFindFirstArgs): Promise<EventPost | null> {
    return this.db.client.eventPost.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventPostFindUniqueArgs): Promise<EventPost | null> {
    return this.db.client.eventPost.findUnique(args);
  }

  async findMany(args: Prisma.EventPostFindManyArgs): Promise<EventPost[]> {
    return this.db.client.eventPost.findMany(args);
  }

  async update(args: Prisma.EventPostUpdateArgs): Promise<EventPost> {
    return this.db.client.eventPost.update(args);
  }

  async updateMany(args: Prisma.EventPostUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPost.updateMany(args);
  }

  async upsert(args: Prisma.EventPostUpsertArgs): Promise<EventPost> {
    return this.db.client.eventPost.upsert(args);
  }

  async delete(args: Prisma.EventPostDeleteArgs): Promise<EventPost> {
    return this.db.client.eventPost.delete(args);
  }

  async deleteMany(args: Prisma.EventPostDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventPost.deleteMany(args);
  }
}
