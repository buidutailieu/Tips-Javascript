const mongoose = require('mongoose');
require('dotenv').config();

function newConnection(uri) {
  const conn = mongoose.createConnection(uri);

  conn.on('connected', function () {
    console.log('Mongodb:: connected::' + this.name);
  });

  conn.on('disconnected', function (error) {
    console.log('Disconnected :' + this.name);
  });

  conn.on('error', function (error) {
    console.log('Error :' + error);
  });

  return conn;
}

const testConnection = newConnection(process.env.URI_MONGODB_TEST);
const userConnection = newConnection(process.env.URI_MONGODB_USERS);

module.exports = { testConnection, userConnection };
