import { Prisma, EventTheme } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventThemeModel {
  db: IDatabase;
  create(args: Prisma.EventThemeCreateArgs): Promise<EventTheme>;

  findFirst(args: Prisma.EventThemeFindFirstArgs): Promise<EventTheme | null>;

  findUnique(args: Prisma.EventThemeFindUniqueArgs): Promise<EventTheme | null>;

  findMany(args: Prisma.EventThemeFindManyArgs): Promise<EventTheme[]>;

  update(args: Prisma.EventThemeUpdateArgs): Promise<EventTheme>;

  updateMany(args: Prisma.EventThemeUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventThemeUpsertArgs): Promise<EventTheme>;

  delete(args: Prisma.EventThemeDeleteArgs): Promise<EventTheme>;

  deleteMany(args: Prisma.EventThemeDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
