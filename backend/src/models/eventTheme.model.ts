import { Prisma, EventTheme } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventThemeModel } from 'interfaces/models/eventTheme.model';

export default class EventThemeModel implements IEventThemeModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventThemeCreateArgs): Promise<EventTheme> {
    return this.db.client.eventTheme.create(args);
  }

  async findFirst(args: Prisma.EventThemeFindFirstArgs): Promise<EventTheme | null> {
    return this.db.client.eventTheme.findFirst(args);
  }

  async findUnique(args: Prisma.EventThemeFindUniqueArgs): Promise<EventTheme | null> {
    return this.db.client.eventTheme.findUnique(args);
  }

  async findMany(args: Prisma.EventThemeFindManyArgs): Promise<EventTheme[]> {
    return this.db.client.eventTheme.findMany(args);
  }

  async update(args: Prisma.EventThemeUpdateArgs): Promise<EventTheme> {
    return this.db.client.eventTheme.update(args);
  }

  async updateMany(args: Prisma.EventThemeUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventTheme.updateMany(args);
  }

  async upsert(args: Prisma.EventThemeUpsertArgs): Promise<EventTheme> {
    return this.db.client.eventTheme.upsert(args);
  }

  async delete(args: Prisma.EventThemeDeleteArgs): Promise<EventTheme> {
    return this.db.client.eventTheme.delete(args);
  }

  async deleteMany(args: Prisma.EventThemeDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventTheme.deleteMany(args);
  }
}
