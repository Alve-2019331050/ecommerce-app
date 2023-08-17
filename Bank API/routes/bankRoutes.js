const express = require('express');

//initialize router to define various API endpoints
const router = express.Router();


//importing schema and collection connection
const BankAccount = require('../models/account');

//importing controller to CREATE ACCOUNT
const createAccountController = require('../controllers/bankController');
//importing controller to GET AMOUNT
const checkBalanceController = require('../controllers/bankController');



//CREATE ACCOUNT || POST
router.post('/createAccount', createAccountController);

//GET AMOUNT || GET
router.get('/checkBalance/:acc_id/:secret', checkBalanceController);

module.exports = router;