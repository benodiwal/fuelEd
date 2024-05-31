import { Prisma, EventHostMessage } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventHostMessageModel {
  db: IDatabase;
  create(args: Prisma.EventHostMessageCreateArgs): Promise<EventHostMessage>;

  findFirst(args: Prisma.EventHostMessageFindFirstArgs): Promise<EventHostMessage | null>;

  findUnqiue(args: Prisma.EventHostMessageFindUniqueArgs): Promise<EventHostMessage | null>;

  findMany(args: Prisma.EventHostMessageFindManyArgs): Promise<EventHostMessage[]>;

  update(args: Prisma.EventHostMessageUpdateArgs): Promise<EventHostMessage>;

  updateMany(args: Prisma.EventHostMessageUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventHostMessageUpsertArgs): Promise<EventHostMessage>;

  delete(args: Prisma.EventHostMessageDeleteArgs): Promise<EventHostMessage>;

  deleteMany(args: Prisma.EventHostMessageDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
