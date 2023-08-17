const express = require('express');

//initialize router to define various API endpoints
const router = express.Router();
//importing schema and collection connection
const BankAccount = require('../models/account');
const createAccountController = require('../controllers/bankController');

//CREATE ACCOUNT || POST
router.post('/createAccount', createAccountController);

module.exports = router;