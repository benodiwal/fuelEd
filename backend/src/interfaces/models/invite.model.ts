import { Prisma, Invite } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IInviteModel {
  db: IDatabase;
  create(args: Prisma.InviteCreateArgs): Promise<Invite>;

  findFirst(args: Prisma.InviteFindFirstArgs): Promise<Invite | null>;

  findUnqiue(args: Prisma.InviteFindUniqueArgs): Promise<Invite | null>;

  findMany(args: Prisma.InviteFindManyArgs): Promise<Invite[]>;

  update(args: Prisma.InviteUpdateArgs): Promise<Invite>;

  updateMany(args: Prisma.InviteUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.InviteUpsertArgs): Promise<Invite>;

  delete(args: Prisma.InviteDeleteArgs): Promise<Invite>;

  deleteMany(args: Prisma.InviteDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
