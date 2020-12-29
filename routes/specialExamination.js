const router = require('express').Router();
const { createSpecialExamination } = require('../controllers/specialExamination');

router.post('/', createSpecialExamination);

module.exports = router;
