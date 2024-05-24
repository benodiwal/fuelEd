import Database from 'apps/database';
import Redis from 'libs/redis.lib';

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
    controller: async (socket: any, { userId }: any) => {
      await this.#redisService.redis?.set(`${this.#ONLINE_USER}${socket.id}`, userId);
      socket.join(userId);
    },
  },
  {
    name: 'joinChannel',
    controller: async (socket: any, { channelId, userId }: any) => {
      await Promise.all([
        this.#redisService.redis?.set(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`, channelId),
        this.#redisService.redis?.set(`${this.#USER}${socket.id}`, userId),
        this.#redisService.redis?.hSet(`${this.#USERS_IN_CHANNEL}${socket.id}`, userId, socket.id),
      ]);

      socket.join(channelId);
    },
  },
  {
    name: 'leaveChannel',
    controller: async (socket: any, channelId: any) => {
      this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
      socket.leave(channelId);
    },
  },
  {
    name: 'logOut',
    controller: async (socket: any, userId: any) => {
      this.#redisService.redis?.del(`${this.#ONLINE_USER}${socket.id}`);
      this.#redisService.redis?.del(`${this.#SOCKET_ID_IN_CHANNEL}${socket.id}`);
      socket.leave(userId);
    },
  },
    ];
  }

}

export default SocketRoutes;
