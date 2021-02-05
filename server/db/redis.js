const { createClient } = require('redis');
const { promisify } = require('util');
const redis = createClient(6379, 'localhost'); // todo: env variable?

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
