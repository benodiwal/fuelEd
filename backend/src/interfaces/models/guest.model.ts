import { Prisma, Guest } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IGuestModel {
  db: IDatabase;
  create(args: Prisma.GuestCreateArgs): Promise<Guest>;
  
  createGuestByUserId(userId: string): Promise<Guest|undefined>;

  findFirst(args: Prisma.GuestFindFirstArgs): Promise<Guest | null>;

  findUnqiue(args: Prisma.GuestFindUniqueArgs): Promise<Guest | null>;

  findMany(args: Prisma.GuestFindManyArgs): Promise<Guest[]>;

  update(args: Prisma.GuestUpdateArgs): Promise<Guest>;

  updateMany(args: Prisma.GuestUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.GuestUpsertArgs): Promise<Guest>;

  delete(args: Prisma.GuestDeleteArgs): Promise<Guest>;

  deleteMany(args: Prisma.GuestDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
