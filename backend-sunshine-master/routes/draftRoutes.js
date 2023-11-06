const express = require('express');

const router = express.Router();
const controller = require('../controller/draft');
const protect = require('../middlewares/protect');

router.route('/').get(protect,controller.getUserDrafts);
router.route('/:id').patch(protect,controller.updateDraft).delete(protect,controller.deleteDraft).get(protect,controller.getDraft);

module.exports = router;