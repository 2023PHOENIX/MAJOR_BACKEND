const express = require('express');
const {registerUser,loginUser} = require('../controllers/auth');


const authRoute = express.Router();


authRoute.route('/auth/signup').post(registerUser)
authRoute.route('/auth/login').post(loginUser);

module.exports = authRoute;