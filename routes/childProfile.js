const router = require('express').Router();
const passport = require('passport');
const { getChild, updateChild } = require('../controllers/childProfile');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.get('/', authMother, getChild);
router.post('/', authMother, updateChild);

module.exports = router;
