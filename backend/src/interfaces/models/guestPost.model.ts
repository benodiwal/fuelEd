import { Prisma, GuestPost } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IGuestPostModel {
  db: IDatabase;
  create(args: Prisma.GuestPostCreateArgs): Promise<GuestPost>;

  findFirst(args: Prisma.GuestPostFindFirstArgs): Promise<GuestPost | null>;

  findUnqiue(args: Prisma.GuestPostFindUniqueArgs): Promise<GuestPost | null>;

  findMany(args: Prisma.GuestPostFindManyArgs): Promise<GuestPost[]>;

  update(args: Prisma.GuestPostUpdateArgs): Promise<GuestPost>;

  updateMany(args: Prisma.GuestPostUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.GuestPostUpsertArgs): Promise<GuestPost>;

  delete(args: Prisma.GuestPostDeleteArgs): Promise<GuestPost>;

  deleteMany(args: Prisma.GuestPostDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
