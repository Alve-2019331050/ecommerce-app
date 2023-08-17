const express = require('express');
const authController = require('../controllers/authController');

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', authController.registerController);

//LOGIN || METHOD POST
router.post('/login', authController.loginController);

//forgotPassword
router.post('/forgot-password',authController.forgotPasswordController);

module.exports = router;