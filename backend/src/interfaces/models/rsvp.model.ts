import { Prisma, RSVP } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IRSVPModel {
  db: IDatabase;
  create(args: Prisma.RSVPCreateArgs): Promise<RSVP>;

  findFirst(args: Prisma.RSVPFindFirstArgs): Promise<RSVP | null>;

  findUnqiue(args: Prisma.RSVPFindUniqueArgs): Promise<RSVP | null>;

  findMany(args: Prisma.RSVPFindManyArgs): Promise<RSVP[]>;

  update(args: Prisma.RSVPUpdateArgs): Promise<RSVP>;

  updateMany(args: Prisma.RSVPUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.RSVPUpsertArgs): Promise<RSVP>;

  delete(args: Prisma.RSVPDeleteArgs): Promise<RSVP>;

  deleteMany(args: Prisma.RSVPDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
