import { ChannelMessage, ChannelParticipant } from '@prisma/client';
import Database from 'apps/database';
import Redis from 'libs/redis.lib';
import { Socket } from 'socket.io';

class SocketRoutes {
  #redisService: Redis;
  #SOCKET_ID_IN_CHANNEL: string;
  #USER: string;
  #USERS_IN_CHANNEL: string;
  #database: Database;

  constructor(database: Database) {
    this.#redisService = new Redis();
    this.#redisService.createConnection();
    this.#database = database;

    this.#SOCKET_ID_IN_CHANNEL = 'socketIdInChannel-';
    this.#USER = 'user-';
    this.#USERS_IN_CHANNEL = 'usersInChannel-';
  }

  getRoutes() {
    return [
      {
        name: 'joinChannel',
        controller: async (socket: Socket, { channelId, roleId }: { channelId: string; roleId: string }) => {
          const user = await this.#database.client.channelParticipant.findFirst({
            where: {
              OR: [
                { hostId: roleId },
                { vendorId: roleId },
                { guestId: roleId },
              ]
            },
          }) as ChannelParticipant;

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
        controller: async (socket: Socket, { msg }: { msg: ChannelMessage }) => {
          const [channelId, user] = await Promise.all([
            this.#redisService.redis?.get(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`),
            this.#redisService.redis?.get(`${this.#USER}${socket.id}`),
          ]) as Array<string>;

          msg.senderId = JSON.parse(user).id;

          if (channelId) {
            socket.to(channelId).emit('roomNewMessage', msg);
          }
        },
      },
      {
        name: 'leaveChannel',
        controller: async (socket: Socket, channelId: string) => {
          this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          socket.leave(channelId);
        },
      },
    ];
  }
}

export default SocketRoutes;
