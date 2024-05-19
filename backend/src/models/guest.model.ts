import { Prisma, Guest } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IGuestModel } from 'interfaces/models/guest.model';

export default class GuestModel implements IGuestModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.GuestCreateArgs): Promise<Guest> {
    return this.db.client.guest.create(args);
  }

  async createGuestByUserId(userId: string): Promise<Guest|undefined> {
    const user = await this.db.client.user.findUnique({
        where: { id: userId }
    });
    if (!user) return undefined;
    const guest = await this.db.client.guest.create({
        data: {
            name: user.name,
            email: user.email,
            user: {
                connect: {
                    id: user.id,
                }
            }
        }
    });
    return guest;
  }

  async findFirst(args: Prisma.GuestFindFirstArgs): Promise<Guest | null> {
    return this.db.client.guest.findFirst(args);
  }

  async findUnqiue(args: Prisma.GuestFindUniqueArgs): Promise<Guest | null> {
    return this.db.client.guest.findUnique(args);
  }

  async findMany(args: Prisma.GuestFindManyArgs): Promise<Guest[]> {
    return this.db.client.guest.findMany(args);
  }

  async update(args: Prisma.GuestUpdateArgs): Promise<Guest> {
    return this.db.client.guest.update(args);
  }

  async updateMany(args: Prisma.GuestUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.guest.updateMany(args);
  }

  async upsert(args: Prisma.GuestUpsertArgs): Promise<Guest> {
    return this.db.client.guest.upsert(args);
  }

  async delete(args: Prisma.GuestDeleteArgs): Promise<Guest> {
    return this.db.client.guest.delete(args);
  }

  async deleteMany(args: Prisma.GuestDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.guest.deleteMany(args);
  }
}
