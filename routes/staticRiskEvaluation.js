const router = require('express').Router();
const { createStaticRiskEvaluation, getAllCheckLists } = require('../controllers/staticRiskEvaluation');

router.post('/', createStaticRiskEvaluation);
router.get('/getAll', getAllCheckLists);

module.exports = router;
