const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

//get-balance
router.get('/',balanceController);

module.exports = router;