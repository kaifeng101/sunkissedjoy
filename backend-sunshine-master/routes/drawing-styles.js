const express = require('express');

const router = express.Router();
const controller = require('../controller/drawingstyle');
const protect = require('../middlewares/protect');

router.route('/').get(controller.getDrawingStyles).post(controller.createDrawingStyle)

module.exports = router;