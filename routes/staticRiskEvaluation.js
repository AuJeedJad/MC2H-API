const router = require('express').Router();
const { createStaticRiskEvaluation, getAllCheckLists } = require('../controllers/staticRiskEvaluation');

router.post('/', createStaticRiskEvaluation);
router.get('/', getAllCheckLists);

module.exports = router;
