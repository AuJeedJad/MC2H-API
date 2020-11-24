const passport = require('passport');
const router = require('express').Router();
const { login } = require('../controllers/mother');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.post('/login', login);

module.exports = router;
