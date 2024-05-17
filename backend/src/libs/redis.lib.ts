import redisObj, { RedisClientType } from 'redis';
import getEnvVar from 'env/index';

class Redis {
  private async createConnection(): Promise<RedisClientType> {
    const redis: RedisClientType = redisObj.createClient({
      url: getEnvVar('DATABASE_URL'),
    });

    redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    redis.on('disconnect', (err) => {
      console.log('err', err);
    });

    await redis.connect();

    return redis;
  }

  async getConnection(): Promise<RedisClientType> {
    return await this.createConnection();
  }
}
