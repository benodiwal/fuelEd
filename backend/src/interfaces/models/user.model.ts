import { Prisma, User } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IUserModel {
  db: IDatabase;
  create(args: Prisma.UserCreateArgs): Promise<User>;

  findFirst(args: Prisma.UserFindFirstArgs): Promise<User | null>;

  findUnqiue(args: Prisma.UserFindUniqueArgs): Promise<User | null>;

  findMany(args: Prisma.UserFindManyArgs): Promise<User[]>;

  update(args: Prisma.UserUpdateArgs): Promise<User>;

  updateMany(args: Prisma.UserUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.UserUpsertArgs): Promise<User>;

  delete(args: Prisma.UserDeleteArgs): Promise<User>;

  deleteMany(args: Prisma.UserDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
