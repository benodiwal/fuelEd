import { Prisma, RSVP } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IRSVPModel } from 'interfaces/models/rsvp.model';

export default class RSVPModel implements IRSVPModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.RSVPCreateArgs): Promise<RSVP> {
    return this.db.client.rSVP.create(args);
  }

  async findFirst(args: Prisma.RSVPFindFirstArgs): Promise<RSVP | null> {
    return this.db.client.rSVP.findFirst(args);
  }

  async findUnqiue(args: Prisma.RSVPFindUniqueArgs): Promise<RSVP | null> {
    return this.db.client.rSVP.findUnique(args);
  }

  async findMany(args: Prisma.RSVPFindManyArgs): Promise<RSVP[]> {
    return this.db.client.rSVP.findMany(args);
  }

  async update(args: Prisma.RSVPUpdateArgs): Promise<RSVP> {
    return this.db.client.rSVP.update(args);
  }

  async updateMany(args: Prisma.RSVPUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.rSVP.updateMany(args);
  }

  async upsert(args: Prisma.RSVPUpsertArgs): Promise<RSVP> {
    return this.db.client.rSVP.upsert(args);
  }

  async delete(args: Prisma.RSVPDeleteArgs): Promise<RSVP> {
    return this.db.client.rSVP.delete(args);
  }

  async deleteMany(args: Prisma.RSVPDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.rSVP.deleteMany(args);
  }
}
