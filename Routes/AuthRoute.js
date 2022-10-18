const express = require('express');
const authController = require('../controllers/auth');


const authRoute = express.Router();


authRoute.route('/auth/signup').post(authController)


module.exports = authRoute;