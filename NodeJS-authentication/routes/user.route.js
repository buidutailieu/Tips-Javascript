const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const {

  verifyAccessToken,

} = require('../helpers/jwt_service');

router.post('/register', userController.register);

router.post('/refresh-token', userController.refreshToken);

router.post('/login', userController.login);

router.delete('/logout', userController.logout);

router.get('/getlists', verifyAccessToken, userController.getList);
module.exports = router;
