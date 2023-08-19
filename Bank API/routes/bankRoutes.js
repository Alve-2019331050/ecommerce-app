const express = require('express');

//initialize router to define various API endpoints
const router = express.Router();


//importing schema and collection connection
const BankAccount = require('../models/account');
const Transaction = require('../models/transaction');
const EmailBank = require('../models/emailBank');

//importing controllers
const { createAccountController,
    checkBalanceController,
    addMoneyController,
    subMoneyController,
    makeTransactionController,
    verifyTransactionController,
    checkAccountController,
    checkForEmailController,
    saveAccountForEmailController
} = require('../controllers/bankController');



//CREATE ACCOUNT || POST
router.post('/createAccount', createAccountController);

//GET AMOUNT || GET
router.get('/checkBalance/:acc_id/:secret', checkBalanceController);

//ADD MONEY || POST
router.post('/addMoney', addMoneyController);

//SUB MONEY || POST
router.post('/subMoney', subMoneyController);

//MAKE TRANSACTION || POST
router.post('/makeTransaction', makeTransactionController);

//VERIFY TRANSACTION || POST
router.post('/verifyTransaction', verifyTransactionController);

//CHECK ACCOUNT || GET
router.get('/checkAccount/:acc_id', checkAccountController);

//CHECK FOR EMAIL || GET
router.get('/checkForEmail/:email', checkForEmailController);

//CREATE ACCOUNT FOR EMAIL || POST
router.post('/saveAccountForEmail', saveAccountForEmailController);

module.exports = router;