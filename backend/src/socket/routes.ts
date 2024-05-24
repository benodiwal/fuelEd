import Database from 'apps/database';
import Redis from 'libs/redis.lib';
import { Socket } from 'socket.io';

class SocketRoutes {
  #redisService: Redis;
  #SOCKET_ID_IN_CHANNEL: string;
  #USER: string;
  #ONLINE_USER: string;
  #USERS_IN_CHANNEL: string;
  #database: Database;

  constructor(database: Database) {
    this.#redisService = new Redis();
    this.#redisService.createConnection();
    this.#database = database;

    this.#SOCKET_ID_IN_CHANNEL = 'socketIdInChannel-';
    this.#USER = 'user-';
    this.#ONLINE_USER = 'online-user-';
    this.#USERS_IN_CHANNEL = 'usersInChannel-';
  }

  getRoutes() {
    return [
      {
        name: 'online',
        controller: async (socket: Socket, { userId }: { userId: string }) => {
          await this.#redisService.redis?.set(`${this.#ONLINE_USER}${socket.id}`, userId);
          socket.join(userId);
        },
      },
      {
        name: 'joinChannel',
        controller: async (socket: Socket, { channelId, userId }: { channelId: string; userId: string }) => {
          const user = await this.#database.client.channelParticipant.findUnique({
            where: {
              id: userId,
            },
          });

          await Promise.all([
            this.#redisService.redis?.set(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`, channelId),
            this.#redisService.redis?.set(`${this.#USER}${socket.id}`, JSON.stringify(user)),
            this.#redisService.redis?.hSet(`${this.#USERS_IN_CHANNEL}${socket.id}`, userId, socket.id),
          ]);

          socket.join(channelId);
        },
      },
      {
        name: 'channelSendMessage',
        controller: async (socket: Socket, { msg }: { msg: string }) => {
          const [channelId, user] = await Promise.all([
            this.#redisService.redis?.get(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`),
            this.#redisService.redis?.get(`${this.#USER}${socket.id}`),
          ]);
          console.log(channelId, user, msg);
        },
      },
      {
        name: 'leaveChannel',
        controller: async (socket: Socket, channelId: string) => {
          this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          socket.leave(channelId);
        },
      },
      {
        name: 'logOut',
        controller: async (socket: Socket, userId: string) => {
          this.#redisService.redis?.del(`${this.#ONLINE_USER}${socket.id}`);
          this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
          socket.leave(userId);
        },
      },
    ];
  }
}

export default SocketRoutes;
