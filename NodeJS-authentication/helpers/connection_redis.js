const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

client.ping((err, pong) => {
  console.log(pong);
});

client.on('error', function (error) {
  console.log(error);
});

client.on('connected', function (error) {
  console.log('connected');
});

client.on('ready', function (error) {
  console.log('Redis to ready');
});

module.exports = client;
