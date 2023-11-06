const express = require('express');

const router = express.Router();
const controller = require('../controller/user');
const protect = require('../middlewares/protect')
const restrictTo = require('../middlewares/restrictTo')

router.route('/cart').post(protect,controller.updateCart);
router.route('/').patch(protect,controller.editUser);


module.exports = router;