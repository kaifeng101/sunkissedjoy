const express = require('express');

const router = express.Router();
const controller = require('../controller/order');
const protect = require('../middlewares/protect');

router.route('/').post(protect,controller.placeOrder).get(protect,controller.getOrders);
router.route('/admin-order').post(controller.getAdminOrder);
router.route('/:id').get(protect,controller.getOrder);


module.exports = router;