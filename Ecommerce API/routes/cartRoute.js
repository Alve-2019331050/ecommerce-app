const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//remove-product
router.delete('/remove-product/:userEmail/:productId',cartController.removeController);
//insert-product
router.post('/insert-product',cartController.insertController);
//get cart items
router.get('/get-items/:userEmail',cartController.getCartItemsController);
//decrement quantity
router.post('/decrease-quantity',cartController.decrementController);
//increment quantity
router.post('/increase-quantity',cartController.incrementController);

module.exports = router;