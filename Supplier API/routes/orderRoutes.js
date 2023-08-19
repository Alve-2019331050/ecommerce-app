const express = require('express');
const orderController = require('../controller/orderController');
const router = express.Router();

//supply-product
router.post('/',orderController.supplyProductController)

module.exports = router;