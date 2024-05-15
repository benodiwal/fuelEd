import Database from 'apps/database';
import Server from 'apps/server';
import { parseEnv } from 'env/index';
parseEnv();

const database = new Database();
const server = new Server(database);

server.start();
