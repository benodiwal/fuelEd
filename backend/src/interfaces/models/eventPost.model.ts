import { Prisma, EventPost } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventPostModel {
  db: IDatabase;
  create(args: Prisma.EventPostCreateArgs): Promise<EventPost>;

  findFirst(args: Prisma.EventPostFindFirstArgs): Promise<EventPost | null>;

  findUnqiue(args: Prisma.EventPostFindUniqueArgs): Promise<EventPost | null>;

  findMany(args: Prisma.EventPostFindManyArgs): Promise<EventPost[]>;

  update(args: Prisma.EventPostUpdateArgs): Promise<EventPost>;

  updateMany(args: Prisma.EventPostUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventPostUpsertArgs): Promise<EventPost>;

  delete(args: Prisma.EventPostDeleteArgs): Promise<EventPost>;

  deleteMany(args: Prisma.EventPostDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
