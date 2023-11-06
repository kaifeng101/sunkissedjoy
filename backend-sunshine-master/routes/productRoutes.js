const express = require('express');

const router = express.Router();
const controller = require('../controller/product');
const protect = require('../middlewares/protect')
const restrictTo = require('../middlewares/restrictTo')

router.route('/').get(controller.fetchProducts).post(controller.addProduct);
router.route('/:id').delete(controller.deleteProduct);

module.exports = router;