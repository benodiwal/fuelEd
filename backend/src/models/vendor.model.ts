import { Prisma, Vendor } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IVendorModel } from 'interfaces/models/vendor.model';

export default class VendorModel implements IVendorModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.VendorCreateArgs): Promise<Vendor> {
    return this.db.client.vendor.create(args);
  }

  async createVendorByUserId(userId: string): Promise<Vendor | undefined> {
    const user = await this.db.client.user.findUnique({
      where: { id: userId },
    });
    if (!user) return undefined;
    const vendor = await this.db.client.vendor.create({
      data: {
        name: user.name,
        email: user.email,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return vendor;
  }

  async findFirst(args: Prisma.VendorFindFirstArgs): Promise<Vendor | null> {
    return this.db.client.vendor.findFirst(args);
  }

  async findUnqiue(args: Prisma.VendorFindUniqueArgs): Promise<Vendor | null> {
    return this.db.client.vendor.findUnique(args);
  }

  async findMany(args: Prisma.VendorFindManyArgs): Promise<Vendor[]> {
    return this.db.client.vendor.findMany(args);
  }

  async update(args: Prisma.VendorUpdateArgs): Promise<Vendor> {
    return this.db.client.vendor.update(args);
  }

  async updateMany(args: Prisma.VendorUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.vendor.updateMany(args);
  }

  async upsert(args: Prisma.VendorUpsertArgs): Promise<Vendor> {
    return this.db.client.vendor.upsert(args);
  }

  async delete(args: Prisma.VendorDeleteArgs): Promise<Vendor> {
    return this.db.client.vendor.delete(args);
  }

  async deleteMany(args: Prisma.VendorDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.vendor.deleteMany(args);
  }
}
