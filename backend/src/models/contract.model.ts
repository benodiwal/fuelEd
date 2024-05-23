import { Prisma, Contract } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IContractModel } from 'interfaces/models/contract.model';

export default class ContractModel implements IContractModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ContractCreateArgs): Promise<Contract> {
    return this.db.client.contract.create(args);
  }

  async findFirst(args: Prisma.ContractFindFirstArgs): Promise<Contract | null> {
    return this.db.client.contract.findFirst(args);
  }

  async findUnqiue(args: Prisma.ContractFindUniqueArgs): Promise<Contract | null> {
    return this.db.client.contract.findUnique(args);
  }

  async findMany(args: Prisma.ContractFindManyArgs): Promise<Contract[]> {
    return this.db.client.contract.findMany(args);
  }

  async update(args: Prisma.ContractUpdateArgs): Promise<Contract> {
    return this.db.client.contract.update(args);
  }

  async updateMany(args: Prisma.ContractUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.contract.updateMany(args);
  }

  async upsert(args: Prisma.ContractUpsertArgs): Promise<Contract> {
    return this.db.client.contract.upsert(args);
  }

  async delete(args: Prisma.ContractDeleteArgs): Promise<Contract> {
    return this.db.client.contract.delete(args);
  }

  async deleteMany(args: Prisma.ContractDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.contract.deleteMany(args);
  }
}
