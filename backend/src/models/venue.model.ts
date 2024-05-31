import { Prisma, Venue } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IVenueModel } from 'interfaces/models/venue.model';

export default class VenueModel implements IVenueModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.VenueCreateArgs): Promise<Venue> {
    return this.db.client.venue.create(args);
  }

  async findFirst(args: Prisma.VenueFindFirstArgs): Promise<Venue | null> {
    return this.db.client.venue.findFirst(args);
  }

  async findUnqiue(args: Prisma.VenueFindUniqueArgs): Promise<Venue | null> {
    return this.db.client.venue.findUnique(args);
  }

  async findMany(args: Prisma.VenueFindManyArgs): Promise<Venue[]> {
    return this.db.client.venue.findMany(args);
  }

  async update(args: Prisma.VenueUpdateArgs): Promise<Venue> {
    return this.db.client.venue.update(args);
  }

  async updateMany(args: Prisma.VenueUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.venue.updateMany(args);
  }

  async upsert(args: Prisma.VenueUpsertArgs): Promise<Venue> {
    return this.db.client.venue.upsert(args);
  }

  async delete(args: Prisma.VenueDeleteArgs): Promise<Venue> {
    return this.db.client.venue.delete(args);
  }

  async deleteMany(args: Prisma.VenueDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.venue.deleteMany(args);
  }
}
