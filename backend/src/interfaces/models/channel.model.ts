import { Prisma, Channel } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IChannelModel {
  db: IDatabase;
  create(args: Prisma.ChannelCreateArgs): Promise<Channel>;

  findFirst(args: Prisma.ChannelFindFirstArgs): Promise<Channel | null>;

  findUnqiue(args: Prisma.ChannelFindUniqueArgs): Promise<Channel | null>;

  findMany(args: Prisma.ChannelFindManyArgs): Promise<Channel[]>;

  update(args: Prisma.ChannelUpdateArgs): Promise<Channel>;

  updateMany(args: Prisma.ChannelUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ChannelUpsertArgs): Promise<Channel>;

  delete(args: Prisma.ChannelDeleteArgs): Promise<Channel>;

  deleteMany(args: Prisma.ChannelDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
