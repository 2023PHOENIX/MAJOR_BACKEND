const express = require('express');
const registerUser = require('../controllers/auth');


const authRoute = express.Router();


authRoute.route('/auth/signup').post(registerUser)


module.exports = authRoute;