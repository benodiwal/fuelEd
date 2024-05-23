import { Prisma, Contract } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IContractModel {
  db: IDatabase;
  create(args: Prisma.ContractCreateArgs): Promise<Contract>;

  findFirst(args: Prisma.ContractFindFirstArgs): Promise<Contract | null>;

  findUnqiue(args: Prisma.ContractFindUniqueArgs): Promise<Contract | null>;

  findMany(args: Prisma.ContractFindManyArgs): Promise<Contract[]>;

  update(args: Prisma.ContractUpdateArgs): Promise<Contract>;

  updateMany(args: Prisma.ContractUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ContractUpsertArgs): Promise<Contract>;

  delete(args: Prisma.ContractDeleteArgs): Promise<Contract>;

  deleteMany(args: Prisma.ContractDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
