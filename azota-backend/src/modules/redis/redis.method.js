const { Redis } = require("ioredis");

const redis = new Redis();

const redisMethod = {
  delete: async (key) => {
    try {
      const result = await redis.del(key);
      console.log(`Key ${key} deleted: ${result}`);
    } catch (error) {
      console.error("Error deleting key from Redis:", error);
    }
  },
};

export default redisMethod;
