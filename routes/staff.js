const router = require('express').Router();
const { login, motherRegister, createCurrentPregnancy } = require('../controllers/staff');

router.post('/login', login);
router.post('/motherRegister', motherRegister);
router.post('/createCurrentPregnancy', createCurrentPregnancy);

module.exports = router;
