import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import Database from 'apps/database';
import SocketRoutes from './routes';

class Socket {
  #server: HttpServer;
  #database: Database;
  #io: Server;
  #socketRoutes: SocketRoutes;

  constructor(database: Database, server: HttpServer) {
    this.#server = server;
    this.#database = database;

    this.#io = new Server(this.#server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    this.#socketRoutes = new SocketRoutes(this.#database);
  }

  setupRoutes() {
    return async () => {
      this.#io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
        this.#socketRoutes.getRoutes().map((route) => socket.on(route.name, (data) => route.controller(socket, data)));
      });
    };
  }
}

export default Socket;
