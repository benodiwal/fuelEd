import { Prisma, EventPoll } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventPollModel {
  db: IDatabase;
  create(args: Prisma.EventPollCreateArgs): Promise<EventPoll>;

  findFirst(args: Prisma.EventPollFindFirstArgs): Promise<EventPoll | null>;

  findUnqiue(args: Prisma.EventPollFindUniqueArgs): Promise<EventPoll | null>;

  findMany(args: Prisma.EventPollFindManyArgs): Promise<EventPoll[]>;

  update(args: Prisma.EventPollUpdateArgs): Promise<EventPoll>;

  updateMany(args: Prisma.EventPollUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventPollUpsertArgs): Promise<EventPoll>;

  delete(args: Prisma.EventPollDeleteArgs): Promise<EventPoll>;

  deleteMany(args: Prisma.EventPollDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
