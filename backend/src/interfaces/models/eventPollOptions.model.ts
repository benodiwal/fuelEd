import { Prisma, EventPollOptions } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventPollOptionsModel {
  db: IDatabase;
  create(args: Prisma.EventPollOptionsCreateArgs): Promise<EventPollOptions>;

  createByPollId(pollId: string, text: string): Promise<EventPollOptions>;

  findFirst(args: Prisma.EventPollOptionsFindFirstArgs): Promise<EventPollOptions | null>;

  findUnqiue(args: Prisma.EventPollOptionsFindUniqueArgs): Promise<EventPollOptions | null>;

  findMany(args: Prisma.EventPollOptionsFindManyArgs): Promise<EventPollOptions[]>;

  update(args: Prisma.EventPollOptionsUpdateArgs): Promise<EventPollOptions>;

  updateMany(args: Prisma.EventPollOptionsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventPollOptionsUpsertArgs): Promise<EventPollOptions>;

  delete(args: Prisma.EventPollOptionsDeleteArgs): Promise<EventPollOptions>;

  deleteMany(args: Prisma.EventPollOptionsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
