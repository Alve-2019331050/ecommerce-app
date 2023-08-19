const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//remove-product
router.delete('/remove-product/:userEmail/:productId',cartController.removeController);
//insert-product
router.post('/insert-product',cartController.insertController);
//get cart items
router.get('/get-items/:userEmail',cartController.getCartItemsController);

module.exports = router;