const express = require('express');
const {userDetailController,loanDetailController} = require('../controllers/user');



const userRouter = express.Router();

userRouter.route('/user/details').get(userDetailController);
userRouter.route('/user/loanForm').post(loanDetailController);

module.exports = userRouter;