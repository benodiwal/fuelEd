import redisObj, { RedisClientType } from 'redis';
import getEnvVar from 'env/index';

class Redis {
  redis: RedisClientType | null = null;

  async createConnection() {
    this.redis = redisObj.createClient({
      url: getEnvVar('REDIS_HOST'),
    }) as RedisClientType;

    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redis.on('disconnect', (err) => {
      console.log('err', err);
    });

    await this.redis.connect();
  }
}

export default Redis;
