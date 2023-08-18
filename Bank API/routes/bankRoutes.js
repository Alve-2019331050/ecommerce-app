const express = require('express');

//initialize router to define various API endpoints
const router = express.Router();


//importing schema and collection connection
const BankAccount = require('../models/account');
const Transaction = require('../models/transaction');

// //importing controller to CREATE ACCOUNT
// const createAccountController = require('../controllers/bankController');
// //importing controller to GET AMOUNT
// const checkBalanceController = require('../controllers/bankController');
// //importing controller to MAKE TRANSACTION
// const makeTransactionController = require('../controllers/bankController');
// //importing controller to ADD MONEY
// const addMoneyController = require('../controllers/bankController');
// //importing controller to SUB MONEY
// const subMoneyController = require('../controllers/bankController');
const { createAccountController,
    checkBalanceController,
    addMoneyController,
    subMoneyController,
    makeTransactionController
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

module.exports = router;