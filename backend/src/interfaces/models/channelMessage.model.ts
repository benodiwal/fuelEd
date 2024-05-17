import { Channel_Message, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IChannelMessageModel {
  db: IDatabase;

  create(args: Prisma.Channel_MessageCreateArgs): Promise<Channel_Message>;

  findFirst(args: Prisma.Channel_MessageFindFirstArgs): Promise<Channel_Message | null>;

  findUnqiue(args: Prisma.Channel_MessageFindUniqueArgs): Promise<Channel_Message | null>;

  findMany(args: Prisma.Channel_MessageFindManyArgs): Promise<Channel_Message[]>;

  update(args: Prisma.Channel_MessageUpdateArgs): Promise<Channel_Message>;

  updateMany(args: Prisma.Channel_MessageUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.Channel_MessageUpsertArgs): Promise<Channel_Message>;

  delete(args: Prisma.Channel_MessageDeleteArgs): Promise<Channel_Message>;

  deleteMany(args: Prisma.Channel_MessageDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
