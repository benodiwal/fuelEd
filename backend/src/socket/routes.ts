import { ChannelParticipant } from '@prisma/client';
import Database from 'apps/database';
import { Socket, Server } from 'socket.io';
import redisService from 'libs/redis.lib';

class SocketRoutes {
  #SOCKET_ID_IN_CHANNEL: string;
  #USER: string;
  #USERS_IN_CHANNEL: string;
  #database: Database;
  #io: Server;

  constructor(database: Database, io: Server) {
    this.#database = database;
    this.#io = io;

    this.#SOCKET_ID_IN_CHANNEL = 'socketIdInChannel-';
    this.#USER = 'user-';
    this.#USERS_IN_CHANNEL = 'usersInChannel-';
  }

  getRoutes() {
    return [
      {
        name: 'joinChannel',
        controller: async (socket: Socket, { channelId, roleId }: { channelId: string; roleId: string }) => {
          console.log('Join Channel Hit');
          console.log(roleId);

          const user = (await this.#database.client.channelParticipant.findFirst({
            where: {
              OR: [{ hostId: roleId }, { vendorId: roleId }, { guestId: roleId }],
            },
          })) as ChannelParticipant;

          if (!user) return;

          await Promise.all([
            redisService.redis?.set(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`, channelId),
            redisService.redis?.set(`${this.#USER}${socket.id}`, JSON.stringify(user)),
            redisService.redis?.hSet(`${this.#USERS_IN_CHANNEL}${socket.id}`, user.id, socket.id),
          ]);

          socket.join(channelId);
        },
      },
      {
        name: 'channelSendMessage',
        controller: async (socket: Socket, { msg }: { msg: any }) => { // Todo
          console.log('Channel Send Message Hit');
          console.log(msg);

          const channelId = await redisService.redis?.get(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          console.log(channelId);
          if (channelId) {
            console.log('Send Message Channel Id: ', channelId);
            console.log(msg);
            this.#io.to(channelId).emit('channelNewMessage', msg);
            console.log('Message Emitted');
          }
        },
      },
      {
        name: 'leaveChannel',
        controller: async (socket: Socket, channelId: string) => {
          console.log('Leave Channel Hit');

          redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          socket.leave(channelId);
        },
      },
    ];
  }
}

export default SocketRoutes;
