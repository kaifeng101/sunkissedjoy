const express = require('express');

const router = express.Router();
const controller = require('../controller/template');
const protect = require('../middlewares/protect');

router.route('/').post(controller.createTempalte).get(controller.getTemplates);


module.exports = router;