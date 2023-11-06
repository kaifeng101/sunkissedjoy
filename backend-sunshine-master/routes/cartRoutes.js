const express = require('express');

const router = express.Router();
const controller = require('../controller/cart');
const protect = require('../middlewares/protect');

router.route('/').get(protect,controller.getCart).post(protect,controller.addItemToCart).patch(protect,controller.updateCart).delete(protect,controller.clearCart);

module.exports = router;