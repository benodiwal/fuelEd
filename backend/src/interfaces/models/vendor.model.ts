import { Prisma, Vendor } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IVendorModel {
  db: IDatabase;
  create(args: Prisma.VendorCreateArgs): Promise<Vendor>;
  
  createVendorByUserId(userId: string): Promise<Vendor|undefined>;

  findFirst(args: Prisma.VendorFindFirstArgs): Promise<Vendor | null>;

  findUnqiue(args: Prisma.VendorFindUniqueArgs): Promise<Vendor | null>;

  findMany(args: Prisma.VendorFindManyArgs): Promise<Vendor[]>;

  update(args: Prisma.VendorUpdateArgs): Promise<Vendor>;

  updateMany(args: Prisma.VendorUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.VendorUpsertArgs): Promise<Vendor>;

  delete(args: Prisma.VendorDeleteArgs): Promise<Vendor>;

  deleteMany(args: Prisma.VendorDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
