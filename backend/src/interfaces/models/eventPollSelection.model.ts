import { Prisma, EventPollOptionSelection } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventPollOptionSelectionModel {
  db: IDatabase;
  create(args: Prisma.EventPollOptionSelectionCreateArgs): Promise<EventPollOptionSelection>;

  findFirst(args: Prisma.EventPollOptionSelectionFindFirstArgs): Promise<EventPollOptionSelection | null>;

  findUnqiue(args: Prisma.EventPollOptionSelectionFindUniqueArgs): Promise<EventPollOptionSelection | null>;

  findMany(args: Prisma.EventPollOptionSelectionFindManyArgs): Promise<EventPollOptionSelection[]>;

  update(args: Prisma.EventPollOptionSelectionUpdateArgs): Promise<EventPollOptionSelection>;

  updateMany(args: Prisma.EventPollOptionSelectionUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventPollOptionSelectionUpsertArgs): Promise<EventPollOptionSelection>;

  delete(args: Prisma.EventPollOptionSelectionDeleteArgs): Promise<EventPollOptionSelection>;

  deleteMany(args: Prisma.EventPollOptionSelectionDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
