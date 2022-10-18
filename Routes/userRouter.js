const express = require('express');
const userDetailController = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/user/details').get(userDetailController);


module.exports = userRouter;