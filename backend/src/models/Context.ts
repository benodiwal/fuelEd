import { IContext, IDatabase } from 'interfaces';
import { IUserModel } from 'interfaces/models/user.model';
import UserModel from './user.model';

export default class Context implements IContext {
  db: IDatabase;
  users: IUserModel;

  constructor(database: IDatabase) {
    this.db = database;
    this.users = new UserModel(database);
  }
}
