import { Prisma, Event } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventModel {
  db: IDatabase;
  create(args: Prisma.EventCreateArgs): Promise<Event>;

  findFirst(args: Prisma.EventFindFirstArgs): Promise<Event | null>;

  findUnqiue(args: Prisma.EventFindUniqueArgs): Promise<Event | null>;

  findMany(args: Prisma.EventFindManyArgs): Promise<Event[]>;

  update(args: Prisma.EventUpdateArgs): Promise<Event>;

  updateMany(args: Prisma.EventUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventUpsertArgs): Promise<Event>;

  delete(args: Prisma.EventDeleteArgs): Promise<Event>;

  deleteMany(args: Prisma.EventDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
