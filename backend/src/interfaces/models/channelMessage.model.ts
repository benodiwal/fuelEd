import { Prisma, ChannelMessage } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IChannelMessageModel {
  db: IDatabase;
  create(args: Prisma.ChannelMessageCreateArgs): Promise<ChannelMessage>;

  findFirst(args: Prisma.ChannelMessageFindFirstArgs): Promise<ChannelMessage | null>;

  findUnqiue(args: Prisma.ChannelMessageFindUniqueArgs): Promise<ChannelMessage | null>;

  findMany(args: Prisma.ChannelMessageFindManyArgs): Promise<ChannelMessage[]>;

  update(args: Prisma.ChannelMessageUpdateArgs): Promise<ChannelMessage>;

  updateMany(args: Prisma.ChannelMessageUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ChannelMessageUpsertArgs): Promise<ChannelMessage>;

  delete(args: Prisma.ChannelMessageDeleteArgs): Promise<ChannelMessage>;

  deleteMany(args: Prisma.ChannelMessageDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
