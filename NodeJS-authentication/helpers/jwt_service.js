const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// const client = require('../helpers/connection_redis');

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y',
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      // save to redis
      // client.set(
      //   userId.toString(),
      //   token,
      //   'EX',
      //   365 * 24 * 60 * 60,
      //   (err, reply) => {
      //     if (err) {
      //       return reject(createError.InternalServerError());
      //     }
      //     resolve(token);
      //   }
      // );
      resolve(token);
    });
  });
};

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(createError.Unauthorized());
  }

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  // start verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === 'JsonWebTokenError')
        return next(createError.Unauthorized());

      return next(createError.Unauthorized(err.message));
    }
    req.payload = payload;

    next();
  });
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return reject(err);
        }
        // work with redis
        // client.get(payload.userId, (err, reply) => {
        //   if (err) return reject(createError.InternalServerError());

        //   if (refreshToken === reply) {
        //     return resolve(payload);
        //   }

        //   return reject(createError.Unauthorized());
        // });
        resolve(payload);
      }
    );
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
