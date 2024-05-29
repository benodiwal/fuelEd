import { Prisma, GuestPost } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IGuestPostModel } from 'interfaces/models/guestPost.model';

export default class GuestPostModel implements IGuestPostModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.GuestPostCreateArgs): Promise<GuestPost> {
    return this.db.client.guestPost.create(args);
  }

  async findFirst(args: Prisma.GuestPostFindFirstArgs): Promise<GuestPost | null> {
    return this.db.client.guestPost.findFirst(args);
  }

  async findUnqiue(args: Prisma.GuestPostFindUniqueArgs): Promise<GuestPost | null> {
    return this.db.client.guestPost.findUnique(args);
  }

  async findMany(args: Prisma.GuestPostFindManyArgs): Promise<GuestPost[]> {
    return this.db.client.guestPost.findMany(args);
  }

  async update(args: Prisma.GuestPostUpdateArgs): Promise<GuestPost> {
    return this.db.client.guestPost.update(args);
  }

  async updateMany(args: Prisma.GuestPostUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.guestPost.updateMany(args);
  }

  async upsert(args: Prisma.GuestPostUpsertArgs): Promise<GuestPost> {
    return this.db.client.guestPost.upsert(args);
  }

  async delete(args: Prisma.GuestPostDeleteArgs): Promise<GuestPost> {
    return this.db.client.guestPost.delete(args);
  }

  async deleteMany(args: Prisma.GuestPostDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.guestPost.deleteMany(args);
  }
}
