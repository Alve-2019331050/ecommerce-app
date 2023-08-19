const express = require('express');
const router = express.Router();
const balanceController = require('../controller/balanceController');

//get-balance
router.get('/',balanceController);

module.exports = router;