import { ChannelParticipant } from '@prisma/client';
import Database from 'apps/database';
import Redis from 'libs/redis.lib';
import { Socket, Server } from 'socket.io';

class SocketRoutes {
  #redisService: Redis;
  #SOCKET_ID_IN_CHANNEL: string;
  #USER: string;
  #USERS_IN_CHANNEL: string;
  #database: Database;
  #io: Server;

  constructor(database: Database, io: Server) {
    this.#redisService = new Redis();
    this.#redisService.createConnection();
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

          const user = (await this.#database.client.channelParticipant.findFirst({
            where: {
              OR: [{ hostId: roleId }, { vendorId: roleId }, { guestId: roleId }],
            },
          })) as ChannelParticipant;

          if (!user) return;

          await Promise.all([
            this.#redisService.redis?.set(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`, channelId),
            this.#redisService.redis?.set(`${this.#USER}${socket.id}`, JSON.stringify(user)),
            this.#redisService.redis?.hSet(`${this.#USERS_IN_CHANNEL}${socket.id}`, user.id, socket.id),
          ]);

          socket.join(channelId);
        },
      },
      {
        name: 'channelSendMessage',
        controller: async (socket: Socket, { msg }: { msg: any }) => {
          console.log('Channel Send Message Hit');
          console.log(msg);

          const channelId = await this.#redisService.redis?.get(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          if (channelId) {
            console.log('Send Message Channel Id: ', channelId);
            this.#io.to(channelId).emit('channelNewMessage', msg);
            console.log('Message Emitted');
          }
        },
      },
      {
        name: 'leaveChannel',
        controller: async (socket: Socket, channelId: string) => {
          console.log('Leave Channel Hit');

          this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          socket.leave(channelId);
        },
      },
    ];
  }
}

export default SocketRoutes;
