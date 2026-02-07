import Redis from 'ioredis';

const redisClient = () => {
  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL);
  }
  throw new Error('REDIS_URL is not defined in .env');
};

export const redis = redisClient();