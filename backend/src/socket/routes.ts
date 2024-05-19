import Redis from 'libs/redis.lib';

const redisService = new Redis();
redisService.createConnection();

const SOCKET_ID_IN_CHANNEL = 'socketIdInChannel-';
const USER = 'user-';
const ONLINE_USER = 'online-user-';
const USERS_IN_CHANNEL = 'usersInChannel-';

const routes = [
  {
    name: 'online',
    controller: async (socket: any, { userId }: any) => {
      await redisService.redis?.set(`${ONLINE_USER}${socket.id}`, userId);
      socket.join(userId);
    },
  },
  {
    name: 'joinChannel',
    controller: async (socket: any, { channelId, userId }: any) => {
      await Promise.all([
        redisService.redis?.set(`${SOCKET_ID_IN_CHANNEL}${socket.id}`, channelId),
        redisService.redis?.set(`${USER}${socket.id}`, userId),
        redisService.redis?.hSet(`${USERS_IN_CHANNEL}${socket.id}`, userId, socket.id),
      ]);

      socket.join(channelId);
    },
  },
  {
    name: 'leaveChannel',
    controller: async (socket: any, channelId: any) => {
      redisService.redis?.del(`${SOCKET_ID_IN_CHANNEL}${socket.id}`);
      socket.leave(channelId);
    },
  },
  {
    name: 'logOut',
    controller: async (socket: any, userId: any) => {
      redisService.redis?.del(`${ONLINE_USER}${socket.id}`);
      redisService.redis?.del(`${SOCKET_ID_IN_CHANNEL}${socket.id}`);
      socket.leave(userId);
    },
  },
];

export default routes;
