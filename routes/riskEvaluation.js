const router = require('express').Router();
const { createRiskEvaluation } = require('../controllers/riskEvaluation');

router.post('/', createRiskEvaluation);

module.exports = router;
