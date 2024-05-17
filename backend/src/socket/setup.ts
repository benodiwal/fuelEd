import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const setup = async (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
  });
};

export default setup;
