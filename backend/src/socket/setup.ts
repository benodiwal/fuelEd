import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import routes from './routes';

const setup = async (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    routes.map((route) => socket.on(route.name, (data) => route.controller(socket, data)));
  });
};

export default setup;
