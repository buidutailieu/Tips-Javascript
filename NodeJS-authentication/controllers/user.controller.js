const { userValidate } = require('../helpers/validation');
const User = require('../models/User.model');
const createError = require('http-errors');
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../helpers/jwt_service');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      // if (!email || !password) {
      //   throw createError.BadRequest();
      // }

      const isExist = await User.findOne({ username: email });

      if (isExist) {
        throw createError.Conflict(`${email} already register !`);
      }

      const user = new User({ username: email, password });

      const savedUser = await user.save();

      return res.json({
        status: 'okay',
        elements: savedUser,
      });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();

      const { userId } = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);

      return res.json({ accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const user = await User.findOne({ email });

      if (!user) {
        throw createError.NotFound('User not registered !');
      }

      const isValid = await user.isCheckPassword(password);

      if (!isValid) {
        throw createError.Unauthorized();
      }
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw createError.BadRequest();

      const { userId } = await verifyRefreshToken(refreshToken);
      // delete refresh token in redis
      // client.del(userId.toString(), (err, apply) => {
      //   if (err) throw createError.InternalServerError();

      //   res.json({
      //     message: 'Logout !',
      //   });
      // });

      return res.json({
        message: 'Logout !',
      });
    } catch (error) {
      next(error);
    }
  },
  getList: async (req, res, next) => {
    const listUsers = [{ email: 'email1' }, { email: 'email2' }];
    res.send(listUsers);
  },
};
