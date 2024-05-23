import { Prisma, ChannelParticipant } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IChannelParticipantModel {
  db: IDatabase;
  create(args: Prisma.ChannelParticipantCreateArgs): Promise<ChannelParticipant>;

  findFirst(args: Prisma.ChannelParticipantFindFirstArgs): Promise<ChannelParticipant | null>;

  findUnqiue(args: Prisma.ChannelParticipantFindUniqueArgs): Promise<ChannelParticipant | null>;

  findMany(args: Prisma.ChannelParticipantFindManyArgs): Promise<ChannelParticipant[]>;

  update(args: Prisma.ChannelParticipantUpdateArgs): Promise<ChannelParticipant>;

  updateMany(args: Prisma.ChannelParticipantUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ChannelParticipantUpsertArgs): Promise<ChannelParticipant>;

  delete(args: Prisma.ChannelParticipantDeleteArgs): Promise<ChannelParticipant>;

  deleteMany(args: Prisma.ChannelParticipantDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
