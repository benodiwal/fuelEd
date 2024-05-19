import { Prisma, User } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IUserModel } from 'interfaces/models/user.model';

export default class UserModel implements IUserModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    return this.db.client.user.create(args);
  }

  async findFirst(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return this.db.client.user.findFirst(args);
  }

  async findUnqiue(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.db.client.user.findUnique(args);
  }

  async findMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.db.client.user.findMany(args);
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return this.db.client.user.update(args);
  }

  async updateMany(args: Prisma.UserUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.user.updateMany(args);
  }

  async upsert(args: Prisma.UserUpsertArgs): Promise<User> {
    return this.db.client.user.upsert(args);
  }

  async delete(args: Prisma.UserDeleteArgs): Promise<User> {
    return this.db.client.user.delete(args);
  }

  async deleteMany(args: Prisma.UserDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.user.deleteMany(args);
  }
}
