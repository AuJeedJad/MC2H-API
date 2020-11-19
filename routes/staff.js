const router = require('express').Router();
const { login } = require('../controllers/staff');

router.post('/login', login);

module.exports = router;