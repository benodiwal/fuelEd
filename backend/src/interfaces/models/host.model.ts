import { Prisma, Host } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IHostModel {
  db: IDatabase;
  create(args: Prisma.HostCreateArgs): Promise<Host>;

  createHostByUserId(userId: string): Promise<Host | undefined>;

  findFirst(args: Prisma.HostFindFirstArgs): Promise<Host | null>;

  findUnqiue(args: Prisma.HostFindUniqueArgs): Promise<Host | null>;

  findMany(args: Prisma.HostFindManyArgs): Promise<Host[]>;

  update(args: Prisma.HostUpdateArgs): Promise<Host>;

  updateMany(args: Prisma.HostUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.HostUpsertArgs): Promise<Host>;

  delete(args: Prisma.HostDeleteArgs): Promise<Host>;

  deleteMany(args: Prisma.HostDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
