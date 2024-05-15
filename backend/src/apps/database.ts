import { PrismaClient } from '@prisma/client';
import getEnvVar from 'env/index';
import { IDatabase, txClient } from 'interfaces';

export default class Database implements IDatabase {
  client: PrismaClient | txClient;
  constructor(txClient?: txClient) {
    if (txClient != undefined) {
      this.client = txClient;
      return;
    }
    this.client = new PrismaClient({ datasourceUrl: getEnvVar('DATABASE_URL') });
    console.log('database: connection successfull');
  }
}
