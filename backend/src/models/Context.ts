import { IContext, IDatabase } from "interfaces";

export default class Context implements IContext {
    db: IDatabase;

    constructor(database: IDatabase) {
        this.db = database;
    }
}
