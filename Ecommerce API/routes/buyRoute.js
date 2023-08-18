const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const orderController = require('../controllers/orderController');

// handleBuy
router.post('/',transactionController.handleBuy);

module.exports = router;