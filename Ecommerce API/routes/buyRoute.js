const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// handleBuy
router.post('/',transactionController.handleBuy);

module.exports = router;