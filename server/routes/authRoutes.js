const express = require('express');
const router = express.Router();
const authController = require('../contollers/authController.js')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/signup')
    .post(authController.createUser)

router.route('/login')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

module.exports = router