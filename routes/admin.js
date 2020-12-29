const router = require('express').Router();
const { register, resetPassword } = require('../controllers/admin');

router.post('/register', register);
router.put('/resetPassword', resetPassword);

module.exports = router;