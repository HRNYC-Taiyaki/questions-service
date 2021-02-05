const { createClient } = require('redis');
const { promisify } = require('util');
const redis = process.env.REDIS_URL ? createClient(process.env.REDIS_URL) : createClient(6379, 'localhost');

redis.on('error', function(error) {
  console.error(error);
});

redis.on('connect', () => {
  console.log('Connected to redis');
});



module.exports = {
  ...redis,
  getAsync: promisify(redis.get).bind(redis),
  setAsync: promisify(redis.set).bind(redis),
  keysAsync: promisify(redis.keys).bind(redis)
};
