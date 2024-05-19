import { Prisma, Host } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IHostModel } from 'interfaces/models/host.model';

export default class HostModel implements IHostModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }
  
  async createHostByUserId(userId: string): Promise<Host|undefined> {
    const user = await this.db.client.user.findUnique({
        where: { id: userId }
    });
    if (!user) return undefined;
    const host = await this.db.client.host.create({
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
    return host;
  }

  async create(args: Prisma.HostCreateArgs): Promise<Host> {
    return this.db.client.host.create(args);
  }

  async findFirst(args: Prisma.HostFindFirstArgs): Promise<Host | null> {
    return this.db.client.host.findFirst(args);
  }

  async findUnqiue(args: Prisma.HostFindUniqueArgs): Promise<Host | null> {
    return this.db.client.host.findUnique(args);
  }

  async findMany(args: Prisma.HostFindManyArgs): Promise<Host[]> {
    return this.db.client.host.findMany(args);
  }

  async update(args: Prisma.HostUpdateArgs): Promise<Host> {
    return this.db.client.host.update(args);
  }

  async updateMany(args: Prisma.HostUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.host.updateMany(args);
  }

  async upsert(args: Prisma.HostUpsertArgs): Promise<Host> {
    return this.db.client.host.upsert(args);
  }

  async delete(args: Prisma.HostDeleteArgs): Promise<Host> {
    return this.db.client.host.delete(args);
  }

  async deleteMany(args: Prisma.HostDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.host.deleteMany(args);
  }
}
