import { Prisma, Venue } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IVenueModel {
  db: IDatabase;
  create(args: Prisma.VenueCreateArgs): Promise<Venue>;

  findFirst(args: Prisma.VenueFindFirstArgs): Promise<Venue | null>;

  findUnqiue(args: Prisma.VenueFindUniqueArgs): Promise<Venue | null>;

  findMany(args: Prisma.VenueFindManyArgs): Promise<Venue[]>;

  update(args: Prisma.VenueUpdateArgs): Promise<Venue>;

  updateMany(args: Prisma.VenueUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.VenueUpsertArgs): Promise<Venue>;

  delete(args: Prisma.VenueDeleteArgs): Promise<Venue>;

  deleteMany(args: Prisma.VenueDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
